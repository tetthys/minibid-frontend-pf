import { classNames } from "../../../helpers/tailwindcss";

const FormControl = ({
  label,
  type,
  id,
  name,
  placeholder,
  conditionalClassName,
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
    <div>
      <h4 className="text-sm text-gray-900 font-medium mb-2">{label}</h4>
      <input
        className={classNames(
          conditionalClassName,
          "p-3 text-base text-gray-700 outline-none rounded-md w-full focus:outline-none placeholder:text-base placeholder:text-gray-300 focus:border-transparent transition-all duration-300 ease-in-out",
          isThisErrorLabelError()
            ? "ring-danger ring-[3px] focus:ring-danger focus:ring-[3px]"
            : "ring-2 ring-gray-300 focus:ring-[3px] focus:ring-blue-300"
        )}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
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
    </div>
  );
};

export default FormControl;
