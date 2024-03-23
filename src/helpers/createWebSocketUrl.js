import { config } from "../config/config";

const createWebSocketUrl = (param, token) => {
  let url = config.backendWsUrl + param;
  if (token) {
    param.includes("?")
      ? (url += `&access_token=${token}`)
      : (url += `?access_token=${token}`);
  }
  return url;
};

export default createWebSocketUrl;
