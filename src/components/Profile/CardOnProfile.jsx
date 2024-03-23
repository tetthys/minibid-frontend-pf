import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHelper from "../../hooks/useHelper";
import { uiActions } from "../../redux/slice/uiSlice";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import useAuthValue from "../../hooks/useAuthValue";
import { useGetUserCardQuery } from "../../redux/api/user/userCard";
import { useEffect } from "react";
import CardModal from "../Card/CardModal";

const CardOnProfile = () => {
  const { dispatch } = useHelper();
  const { storage } = useAuthValue();
  const {
    data: card,
    isLoading,
    isFetching,
    isError,
  } = useGetUserCardQuery(storage.user.id);
  useEffect(() => {
    console.log(card);
  }, [card]);
  if (isLoading || isFetching) return <div>...</div>;
  else if (isError) return <div>Error</div>;
  else
    return (
      <>
        {card && card.id ? (
          <>
            <div className="px-16 py-24 rounded-md flex flex-col justify-center gap-y-4 bg-white w-full max-w-[480px]">
              <div
                onClick={() => {
                  dispatch(
                    uiActions.toggleCard({
                      open: true,
                    })
                  );
                }}
                className="flex justify-start items-center group cursor-pointer"
              >
                <FontAwesomeIcon
                  className="text-gray-700 w-5 h-5 mr-4 group-hover:text-gray-500"
                  icon={faCreditCard}
                />
                <span className="font-medium text-xl text-gray-700 group-hover:text-gray-500">
                  {card.info}
                </span>
              </div>
              <div className="flex gap-x-5">
                <p className="font-medium text-gray-700 text-sm">**** ****</p>
                <p className="font-medium text-gray-700 text-sm">**** ****</p>
              </div>
            </div>
            <CardModal cardNumberUserCreated={card.info} />
          </>
        ) : (
          <>
            <div className="px-16 py-24 rounded-md flex flex-col justify-center items-center gap-y-4 bg-white w-full max-w-[480px]">
              <div
                onClick={() => {
                  dispatch(
                    uiActions.toggleCard({
                      open: true,
                    })
                  );
                }}
                className="flex justify-start items-center group cursor-pointer"
              >
                <FontAwesomeIcon
                  className="text-gray-700 w-5 h-5 mr-4 group-hover:text-gray-500"
                  icon={faCreditCard}
                />
                <span className="font-medium text-xl text-gray-700 group-hover:text-gray-500">
                  Register Your Card
                </span>
              </div>
              <p className="font-medium text-warning text-sm">
                You can’t place a bid without card
              </p>
            </div>
            <CardModal />
          </>
        )}
      </>
    );
};

export default CardOnProfile;
