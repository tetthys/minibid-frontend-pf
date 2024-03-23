import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useHelper from "../../hooks/useHelper";
import { uiActions } from "../../redux/slice/uiSlice";
import { useSelector } from "react-redux";
import {
  useCreateUserCardMutation,
  useUpdateUserCardMutation,
} from "../../redux/api/user/userCard";
import useAuthValue from "../../hooks/useAuthValue";
import FixFlickering from "../utils/FixFlickering";
import useWebSocketEvent from "../../hooks/useWebSocketEvent";
import useWebSocketValidation from "../../hooks/useWebSocketValidation";
import FormControl from "../FormControl/B/FormControl";
import useWebSocket from "../../hooks/useWebSocket";

const CardModal = ({
  cardNumberUserCreated,
  securityCodeUserCreated,
  expirationDateUserCreated,
}) => {
  const { storage } = useAuthValue();
  const [createUserCard] = useCreateUserCardMutation();
  const [updateUserCard] = useUpdateUserCardMutation();
  const { dispatch } = useHelper();
  const isCardOpen = useSelector((state) => state.ui.card.open);
  const [cardNumber, setCardNumber] = useState();
  const [securityCode, setSecurityCode] = useState();
  const [expirationDate, setExpirationDate] = useState();

  const [validationError, setValidationError] = useState();

  const { wsCli: wsCliForCreate } = useWebSocket({
    url: "/live_validation?middleware=createUserCard",
  });

  useWebSocketEvent(
    wsCliForCreate,
    () => {},
    (data) => {
      if (data.type === "server.send:validation.error") {
        setValidationError(data.data);
      }
      if (data.type === "server.send:validation.success") {
        setValidationError();
      }
    },
    "BankModal"
  );

  useWebSocketValidation(
    {
      type: "client.send:data",
      data: {
        info: cardNumber,
      },
    },

    {
      wsCli: wsCliForCreate,
      dependencies: [cardNumber, securityCode, expirationDate],
    }
  );

  const createUserCardHandler = () => {
    createUserCard({
      userId: storage.user.id,
      body: {
        info: cardNumber,
      },
    })
      .then((res) => {
        if (res.error) throw res;
        return res.data;
      })
      .then((data) => {
        // ui action
        dispatch(
          uiActions.toggleCard({
            open: false,
          })
        );

        // clearing
        setCardNumber();
        setSecurityCode();
        setExpirationDate();
      })
      .catch((err) => {
        console.log(err);
        setValidationError(err.error.data);
      });
  };

  const updateUserCardHandler = () => {
    updateUserCard({
      userId: storage.user.id,
      body: {
        info: cardNumber,
      },
    })
      .then((res) => {
        if (res.error) throw res;
        return res.data;
      })
      .then((data) => {
        // ui action
        dispatch(
          uiActions.toggleCard({
            open: false,
          })
        );

        // clearing
        setCardNumber();
        setSecurityCode();
        setExpirationDate();
      })
      .catch((err) => {
        console.log(err);
        setValidationError(err.error.data);
      });
  };

  return (
    <>
      <Transition
        show={isCardOpen}
        as={Fragment}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          className={
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm mx-auto"
          }
          onClose={() => {
            dispatch(
              uiActions.toggleCard({
                open: false,
              })
            );
          }}
        >
          <div className="py-14 px-8 bg-white shadow-md">
            <FixFlickering />
            <div className="grid grid-cols-1 gap-y-8">
              <FormControl
                label={"Card Number"}
                type={"text"}
                id={"card-number"}
                name={"card-number"}
                defaultValue={cardNumberUserCreated}
                placeholder={"1234 5678 9101 1121"}
                onChangeHandler={(e) => {
                  setCardNumber(e.target.value);
                }}
                // error={validationError}
                // errorLabel={[""]}
              />
              <FormControl
                label={"Security Code"}
                type={"text"}
                id={"card-security-code"}
                name={"card-security-code"}
                defaultValue={securityCodeUserCreated}
                placeholder={"123456"}
                onChangeHandler={(e) => {
                  setSecurityCode(e.target.value);
                }}
                // error={validationError}
                // errorLabel={[""]}
              />
              <FormControl
                label={"Expiration Date"}
                type={"text"}
                id={"card-expiration-date"}
                name={"card-expiration-date"}
                defaultValue={expirationDateUserCreated}
                placeholder={"MM/YY"}
                onChangeHandler={(e) => {
                  setExpirationDate(e.target.value);
                }}
                // error={validationError}
                // errorLabel={[""]}
              />
            </div>
            <div className="mt-20 flex justify-center items-center">
              {cardNumberUserCreated ||
              securityCodeUserCreated ||
              expirationDateUserCreated ? (
                <>
                  <button
                    onClick={() => {
                      updateUserCardHandler();
                    }}
                    className="px-5 py-2.5 bg-ocean-blue text-white text-base font-medium rounded-md"
                  >
                    Edit Card
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      createUserCardHandler();
                    }}
                    className="px-5 py-2.5 bg-ocean-blue text-white text-base font-medium rounded-md"
                  >
                    Register Card
                  </button>
                </>
              )}
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CardModal;
