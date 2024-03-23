import { config } from "../config/config";

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
};

const renderImage = (path = "") => {
  if (isValidUrl(path)) {
    return path;
  } else {
    if (path.charAt(0) === "/") {
      path = path.slice(1);
    }
    return config.backendHttpUrl + "/" + path;
  }
};

export default renderImage;
