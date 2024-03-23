import getCurrencySymbol from "../../helpers/getCurrencySymbol";
import { classNames } from "../../helpers/tailwindcss";
import useAuthValue from "../../hooks/useAuthValue";
import FixFlickering from "../utils/FixFlickering";

const BiddingPriceInput = ({
  placeholder,
  onChangeHandler,
  error,
  errorLabel,
}) => {
  const isThisErrorLabelError = () =>
    error?.some(
      (err) =>
        (err.context && errorLabel.includes(err.context.label)) ||
        (err.field && errorLabel.includes(err.field))
    );
  const { storage } = useAuthValue();
  return (
    <>
      <FixFlickering />
      {/* Currency Symbol */}
      <div className="mb-1 w-full flex items-center justify-start">
        <span className="text-base font-medium text-gray-700 mr-2">
          {getCurrencySymbol(storage.user.currency)}
        </span>
        {getCurrencySymbol(storage.user.currency) !== storage.user.currency && (
          <span className="text-base font-medium text-gray-700">
            {storage.user.currency}
          </span>
        )}
      </div>
      <input
        className={classNames(
          "px-4 py-2.5 rounded-md w-[20rem] text-4xl text-gray-700 font-medium placeholder:text-4xl placeholder:text-gary-300 placeholder:font-medium focus:placeholder:text-transparent focus:outline-none transition-all duration-300 ease-in-out",
          isThisErrorLabelError()
            ? "ring-2 ring-danger focus:ring-2 focus:ring-danger"
            : "placeholder-shown:ring-2 placeholder-shown:ring-gray-300 focus:ring-2 focus:ring-blue-300 ring-2 ring-gray-300"
        )}
        placeholder={placeholder}
        onChange={onChangeHandler}
        type="text"
        name="bidding-price"
        id="bidding-price"
      />
      <div className="w-full max-w-[20rem] flex justify-start">
        {error?.map((err, i) => {
          if (
            (err.context && errorLabel.includes(err.context.label)) ||
            (err.field && errorLabel.includes(err.field))
          )
            return (
              <p key={i} className="mt-2 text-base font-medium text-danger">
                {err.message}
              </p>
            );
        })}
      </div>
    </>
  );
};

export default BiddingPriceInput;
