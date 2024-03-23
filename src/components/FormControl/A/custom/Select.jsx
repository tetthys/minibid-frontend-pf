import { classNames } from "../../../../helpers/tailwindcss";

const Select = ({
  id,
  name,
  placeholder,
  conditionalClassName,
  onChangeHandler,
  error,
  errorLabel,
  children,
}) => {
  const isThisErrorLabelError = () =>
    error?.some(
      (err) =>
        (err.context && err.context.label === errorLabel) ||
        (err.field && err.field === errorLabel)
    );
  return (
    <>
      <select
        className={classNames(
          conditionalClassName,
          "p-3 text-base text-gray-700 outline-none rounded-md w-full focus:outline-none placeholder:text-base placeholder:text-gray-300 focus:border-transparent transition-all duration-300 ease-in-out",
          isThisErrorLabelError()
            ? "ring-danger ring-[3px] focus:ring-danger focus:ring-[3px]"
            : "ring-2 ring-gray-300 focus:ring-[3px] focus:ring-blue-300"
        )}
        placeholder={placeholder}
        onChange={onChangeHandler}
        name={name}
        id={id}
      >
        {children}
      </select>
      {error?.map((err, i) => {
        if (
          (err.context && err.context.label === errorLabel) ||
          (err.field && err.field === errorLabel)
        )
          return (
            <p key={i} className="mt-2 text-sm font-medium text-danger">
              {err.message}
            </p>
          );
      })}
    </>
  );
};

export default Select;
