import { useEffect } from "react";
import useDebounce from "./useDebounce.";
import json from "../helpers/json";

const useWebSocketValidation = (object, { wsCli, dependencies }) => {
  const { debounce } = useDebounce();

  useEffect(() => {
    if (wsCli === undefined) return;
    debounce(() => {
      wsCli.send(json(object));
    });
  }, dependencies);
};

export default useWebSocketValidation;
