import React from "react";

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-fixed min-w-full bg-white">
        <tbody className="divide-y-2 divide-gray-100">{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
