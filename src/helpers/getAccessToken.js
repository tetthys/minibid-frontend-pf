import Cookies from "js-cookie";

const getAccessToken = () => {
  const accessToken = Cookies.get("access_token") ? Cookies.get("access_token") : undefined;
  return accessToken;
};

export default getAccessToken;