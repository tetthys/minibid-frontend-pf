import { classNames } from "../../../helpers/tailwindcss";

const Tdlr = ({ children }) => {
  return (
    <td
      className={classNames(
        "px-3 py-4 text-base whitespace-normal font-medium text-righ",
        children === "queue" && "text-warning",
        children === "failed" && "text-danger",
        children === "completed" && "text-success"
      )}
    >
      {children}
    </td>
  );
};

export default Tdlr;
