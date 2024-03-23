import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHelper from "../../hooks/useHelper";
import { uiActions } from "../../redux/slice/uiSlice";
import { faMoneyBill1 } from "@fortawesome/free-regular-svg-icons";
import useAuthValue from "../../hooks/useAuthValue";
import { useGetUserBankAccountQuery } from "../../redux/api/user/userBankAccount";
import { useEffect } from "react";
import BankModal from "../Bank/BankModal";

const BankOnProfile = () => {
  const { dispatch } = useHelper();
  const { storage } = useAuthValue();
  const {
    data: bankAccount,
    isLoading,
    isFetching,
    isError,
  } = useGetUserBankAccountQuery(storage.user.id);
  useEffect(() => {
    console.log(bankAccount);
  }, [bankAccount]);
  if (isLoading || isFetching) return <div>...</div>;
  else if (isError) return <div>Error</div>;
  else
    return (
      <>
        {bankAccount && bankAccount.id ? (
          <>
            <div className="px-16 py-24 rounded-md flex flex-col justify-center gap-y-4 bg-white w-full max-w-[480px]">
              <div
                onClick={() => {
                  dispatch(
                    uiActions.toggleBank({
                      open: true,
                    })
                  );
                }}
                className="flex justify-start items-center group cursor-pointer"
              >
                <FontAwesomeIcon
                  className="text-gray-700 w-5 h-5 mr-4 group-hover:text-gray-500"
                  icon={faMoneyBill1}
                />
                <span className="font-medium text-xl text-gray-700 group-hover:text-gray-500">
                  {bankAccount.info}
                </span>
              </div>
              <div className="flex gap-x-5">
                <p className="font-medium text-gray-700 text-sm">**** ****</p>
                <p className="font-medium text-gray-700 text-sm">**** ****</p>
              </div>
            </div>
            <BankModal bankAccountNumberUserCreated={bankAccount.info} />
          </>
        ) : (
          <>
            <div className="px-16 py-24 rounded-md flex flex-col justify-center items-center gap-y-4 bg-white w-full max-w-[480px]">
              <div
                onClick={() => {
                  dispatch(
                    uiActions.toggleBank({
                      open: true,
                    })
                  );
                }}
                className="flex justify-start items-center group cursor-pointer"
              >
                <FontAwesomeIcon
                  className="text-gray-700 w-5 h-5 mr-4 group-hover:text-gray-500"
                  icon={faMoneyBill1}
                />
                <span className="font-medium text-xl text-gray-700 group-hover:text-gray-500">
                  Register Your Bank Account
                </span>
              </div>
              <p className="font-medium text-warning text-sm">
                You can’t withdraw without bank account
              </p>
            </div>
            <BankModal />
          </>
        )}
      </>
    );
};

export default BankOnProfile;
