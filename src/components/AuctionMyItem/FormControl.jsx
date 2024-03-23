import { classNames } from "../../helpers/tailwindcss";

const FormControl = ({
  placeholder,
  type,
  name,
  id,
  defaultValue,
  onChangeHandler,
  error,
  errorLabel,
}) => {
  const isThisErrorLabelError = () =>
    error?.some(
      (err) =>
        (err.context && err.context.label === errorLabel) ||
        (err.field && err.field === errorLabel)
    );
  return (
    <>
      <input
        className={classNames(
          "px-5 py-2.5 rounded-md outline-none focus:outline-none placeholder-shown:ring-2 placeholder-shown:ring-offset-2 placeholder-shown:text-base placeholder-shown:text-gray-400 placeholder-shown:font-medium transition-all duration-300 ease-in-out focus:ring-2 focus:ring-offset-2 focus:text-base focus:text-gray-800 focus:font-medium ring-2 ring-offset-2 text-base text-gray-800 font-medium",
          isThisErrorLabelError()
            ? "ring-danger"
            : "placeholder-shown:ring-gray-200 focus:ring-blue-300 ring-gray-200"
        )}
        placeholder={placeholder}
        type={type}
        name={name}
        id={id}
        defaultValue={defaultValue}
        onChange={onChangeHandler}
      />
      {error?.map((err, i) => {
        if (
          (err.context && err.context.label === errorLabel) ||
          (err.field && err.field === errorLabel)
        )
          return (
            <p key={i} className="mt-2 text-base font-medium text-danger">
              {err.message}
            </p>
          );
      })}
    </>
  );
};

export default FormControl;
