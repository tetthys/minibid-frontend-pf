import React from "react";
import { classNames } from "../../../helpers/tailwindcss";

const FormControl = ({
  label,
  type,
  id,
  name,
  placeholder,
  defaultValue,
  conditionalClassName,
  onChangeHandler,
  disabled,
  error,
  errorLabel,
}) => {
  const isThisErrorLabelError = () =>
    error?.some(
      (err) =>
        (err.context && errorLabel.includes(err.context.label)) ||
        (err.field && errorLabel.includes(err.field))
    );
  return (
    <div className="flex flex-col">
      {label && (
        <span className="font-medium text-sm text-black mb-1">{label}</span>
      )}
      <input
        className={classNames(
          conditionalClassName,
          "p-2.5 placeholder-shown:bg-gray-100 placeholder-shown:placeholder:text-gray-400 placeholder-shown:ring-0 rounded-md transition-all duration-300 ease-in-out outline-none focus:border-0 focus:placeholder:text-transparent focus:bg-white focus:text-gray-900 bg-white text-gray-900",
          isThisErrorLabelError()
            ? "focus:ring focus:ring-offset-2 focus:ring-danger ring ring-offset-2 ring-danger"
            : "focus:ring focus:ring-offset-2 focus:ring-blue-300 ring ring-offset-2 ring-gray-100"
        )}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        type={type}
        name={name}
        id={id}
        onChange={onChangeHandler}
      />
      {error?.map((err, i) => {
        if (
          (err.context && errorLabel.includes(err.context.label)) ||
          (err.field && errorLabel.includes(err.field))
        )
          return (
            <p key={i} className="mt-1 text-sm font-medium text-danger">
              {err.message}
            </p>
          );
      })}
    </div>
  );
};

export default FormControl;
