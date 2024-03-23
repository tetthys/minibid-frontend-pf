import { useEffect } from "react";

const useEffectOnExist = (callback, dependencies) => {
  useEffect(() => {
    if (dependencies.some((d) => d === undefined)) return;
    callback();
  }, dependencies);
};

export default useEffectOnExist;
