import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useHelper from "../../hooks/useHelper";
import { uiActions } from "../../redux/slice/uiSlice";
import { useSelector } from "react-redux";
import useAuthValue from "../../hooks/useAuthValue";
import {
  useCreateUserBankAccountMutation,
  useUpdateUserBankAccountMutation,
} from "../../redux/api/user/userBankAccount";
import FixFlickering from "../utils/FixFlickering";
import useWebSocketEvent from "../../hooks/useWebSocketEvent";
import useWebSocketValidation from "../../hooks/useWebSocketValidation";
import FormControl from "../FormControl/B/FormControl";
import useWebSocket from "../../hooks/useWebSocket";

const BankModal = ({
  bankAccountNumberUserCreated,
  bankCompanyUserCreated,
}) => {
  const [bankAccountNumber, setBankAccountNumber] = useState();
  const [bankCompany, setBankCompany] = useState();
  const [verificationCode, setVerificationCode] = useState();

  const { storage } = useAuthValue();
  const [createUserBankAccount] = useCreateUserBankAccountMutation();
  const [updateUserBankAccount] = useUpdateUserBankAccountMutation();
  const { dispatch } = useHelper();
  const isBankOpen = useSelector((state) => state.ui.bank.open);

  const [validationError, setValidationError] = useState();

  const { wsCli: wsCliForCreate } = useWebSocket({
    url: "/live_validation?middleware=createUserBankAccount",
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
        info: bankAccountNumber,
      },
    },

    {
      wsCli: wsCliForCreate,
      dependencies: [bankAccountNumber, bankCompany, verificationCode],
    }
  );

  const createUserBankAccountHandler = () => {
    createUserBankAccount({
      userId: storage.user.id,
      body: {
        info: bankAccountNumber,
      },
    })
      .then((res) => {
        if (res.error) throw res;
        return res.data;
      })
      .then((data) => {
        // ui action
        dispatch(
          uiActions.toggleBank({
            open: false,
          })
        );

        // clearing
        setBankAccountNumber();
        setBankCompany();
        setVerificationCode();
        setValidationError();
      })
      .catch((err) => {
        console.log(err);
        setValidationError(err.error.data);
      });
  };

  const updateUserBankAccountHandler = () => {
    updateUserBankAccount({
      userId: storage.user.id,
      body: {
        info: bankAccountNumber,
      },
    })
      .then((res) => {
        if (res.error) throw res;
        return res.data;
      })
      .then((data) => {
        // ui action
        dispatch(
          uiActions.toggleBank({
            open: false,
          })
        );

        // clearing
        setBankAccountNumber();
        setBankCompany();
        setVerificationCode();
        setValidationError();
      })
      .catch((err) => {
        console.log(err);
        setValidationError(err.error.data);
      });
  };

  return (
    <>
      <Transition
        show={isBankOpen}
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
              uiActions.toggleBank({
                open: false,
              })
            );
          }}
        >
          <div className="py-14 px-8 bg-white shadow-md">
            <FixFlickering />
            <div className="grid grid-cols-1 gap-y-8">
              <FormControl
                label={"Bank Account Number"}
                type={"text"}
                id={"bank-account-number"}
                name={"bank-account-number"}
                defaultValue={bankAccountNumberUserCreated}
                placeholder={"1111 2222 3333 444"}
                onChangeHandler={(e) => {
                  setBankAccountNumber(e.target.value);
                }}
                // error={validationError}
                // errorLabel={[""]}
              />
              <FormControl
                label={"Bank Company"}
                type={"text"}
                id={"bank-company"}
                name={"bank-company"}
                defaultValue={bankCompanyUserCreated}
                onChangeHandler={(e) => {
                  setBankCompany(e.target.value);
                }}
                // error={validationError}
                // errorLabel={[""]}
              />
              <FormControl
                label={"Verification Code"}
                type={"text"}
                id={"verification-code"}
                name={"verification-code"}
                placeholder={"123456"}
                onChangeHandler={(e) => {
                  setVerificationCode(e.target.value);
                }}
                // error={validationError}
                // errorLabel={[""]}
              />
            </div>
            <div className="mt-20 flex justify-center items-center">
              {bankAccountNumberUserCreated || bankCompanyUserCreated ? (
                <>
                  <button
                    onClick={() => {
                      updateUserBankAccountHandler();
                    }}
                    className="px-5 py-2.5 bg-ocean-blue text-white text-base font-medium rounded-md"
                  >
                    Edit Bank Account
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      createUserBankAccountHandler();
                    }}
                    className="px-5 py-2.5 bg-ocean-blue text-white text-base font-medium rounded-md"
                  >
                    Register Bank Account
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

export default BankModal;
