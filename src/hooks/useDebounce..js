import { useState } from "react";

const useDebounce = (ms = 3000) => {
  const [timer, setTimer] = useState();
  const debounce = (callback) => {
    clearTimeout(timer);
    setTimer(setTimeout(callback, ms));
  };
  return { debounce };
};

export default useDebounce;
