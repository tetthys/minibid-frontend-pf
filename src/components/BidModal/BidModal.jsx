import { Dialog, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../redux/slice/uiSlice";
import useWebSocketEvent from "../../hooks/useWebSocketEvent";
import { Fragment } from "react";
import BiddingPriceInput from "./BiddingPriceInput";
import useWebSocketValidation from "../../hooks/useWebSocketValidation";
import { classNames } from "../../helpers/tailwindcss";
import convertCurrencyFormat from "../../helpers/convertCurrencyFormat";
import { usePostProductBidMutation } from "../../redux/api/productApi";
import useWebSocket from "../../hooks/useWebSocket";

const BidModal = ({ product }) => {
  const [postProductBid] = usePostProductBidMutation();
  const dispatch = useDispatch();
  const isBidOpen = useSelector((state) => state.ui.bid.open);
  const [biddingPrice, setBiddingPrice] = useState();
  const { wsCli } = useWebSocket({
    url: `/live_validation?middleware=createBidOnProduct`,
  });

  useEffect(() => {
    if (biddingPrice) {
      setBiddingPrice((prev) => convertCurrencyFormat(biddingPrice));
    }
  }, [biddingPrice]);

  useWebSocketEvent(
    wsCli,
    () => {},
    (data) => {
      if (data.type === "server.send:validation.error") {
        setValidationError(data.data);
      }
      if (data.type === "server.send:validation.success") {
        setValidationError();
      }
    },
    "BidModal.jsx"
  );

  useWebSocketValidation(
    {
      type: "client.send:data",
      data: {
        product_id: product.id,
        bidding_price: biddingPrice,
      },
    },
    {
      wsCli: wsCli,
      dependencies: [biddingPrice],
    }
  );

  const bidHandler = () => {
    postProductBid({
      productId: product.id,
      body: {
        product_id: product.id,
        bidding_price: biddingPrice,
      },
    })
      .then((res) => {
        if (res.error) throw res;
        return res.data;
      })
      .then((res) => {
        // ui action
        dispatch(
          uiActions.toggleBid({
            open: false,
          })
        );

        // clearing
        setValidationError();
        setBiddingPrice();
      })
      .catch((err) => {
        setValidationError(err.error.data);
      });
  };

  const [validationError, setValidationError] = useState();

  return (
    <Transition
      show={isBidOpen}
      as={Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onClose={() => {
          // clearing
          dispatch(
            uiActions.toggleBid({
              open: false,
            })
          );
          setValidationError();
          setBiddingPrice();
        }}
      >
        <Dialog.Panel>
          <div className="px-8 py-16 flex flex-col justify-center items-center w-fit bg-white rounded-xl shadow-md">
            <BiddingPriceInput
              placeholder={`0.00`}
              onChangeHandler={(e) => setBiddingPrice(e.target.value)}
              error={validationError}
              errorLabel={[
                "bidding_price",
                "biddingPrice",
                "card",
                "bank_account",
                "product",
              ]}
            />
            <div className="mt-12">
              <button
                onClick={() => {
                  bidHandler();
                }}
                disabled={validationError}
                className={classNames(
                  "px-4 py-2.5 rounded-md text-base font-bold uppercase",
                  validationError
                    ? "bg-gray-300 text-gray-500"
                    : "bg-ocean-blue hover:opacity-80 text-white"
                )}
              >
                Submit Bidding Price
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
};

export default BidModal;
