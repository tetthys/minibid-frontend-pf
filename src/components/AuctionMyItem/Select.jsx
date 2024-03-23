const Select = ({ children }) => (
  <select className="px-5 py-2.5 rounded-md outline-none focus:outline-none placeholder-shown:ring-2 placeholder-shown:ring-offset-2 placeholder-shown:ring-gray-200 placeholder-shown:text-base placeholder-shown:text-gray-400 placeholder-shown:font-medium transition-all duration-300 ease-in-out focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:text-base focus:text-gray-800 focus:font-medium ring-2 ring-offset-2 ring-gray-200 text-base text-gray-800 font-medium">
    {children}
  </select>
);

export default Select;
