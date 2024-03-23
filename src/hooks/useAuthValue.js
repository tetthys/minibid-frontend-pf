import Cookies from "js-cookie";

const useAuthValue = () => {
  const token = Cookies.get("access_token") || "";
  const storage = {
    user: JSON.parse(localStorage.getItem("user")) || {},
  };
  const removeAuthValue = () => {
    Cookies.remove("access_token");
    localStorage.clear();
  };
  return {
    token,
    storage,
    removeAuthValue,
  };
};

export default useAuthValue;
