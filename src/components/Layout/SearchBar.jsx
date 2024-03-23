import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useHelper from "../../hooks/useHelper";
import { queryActions } from "../../redux/slice/querySlice";
import { useState } from "react";

const SearchBar = () => {
  const { navigate, dispatch } = useHelper();

  const [nameInput, setNameInput] = useState("");

  const searchHandler = () => {
    dispatch(queryActions.setName(nameInput));
    navigate("/search");
  };

  return (
    <div className="flex justify-center items-center">
      <div className="my-8 flex justify-center items-center w-full max-w-xs lg:max-w-lg bg-transparent focus:shadow-md">
        <input
          className="px-3 py-2.5 w-full rounded-l-xl focus:outline-none placeholder-shown:placeholder:text-sm placeholder-shown:placeholder:text-gray-300 placeholder-shown:placeholder:font-medium text-sm text-gray-800 font-medium cursor-default"
          placeholder="Search"
          type="text"
          name="search-bar"
          id="search-bar"
          onChange={(e) => {
            setNameInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchHandler();
            }
          }}
        />
        <button className="inline-flex justify-center items-center w-10 h-10 bg-white rounded-r-xl">
          <FontAwesomeIcon
            className="w-5 h-5 text-gray-400 hover:text-gray-500"
            icon={faSearch}
            onClick={() => {
              searchHandler();
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
