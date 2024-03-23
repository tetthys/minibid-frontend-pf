import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import createWebSocketUrl from "../helpers/createWebSocketUrl";

const useWebSocket = ({
  url,
  dependencies = [],
  allowGuest = false,
  WebSocketClass = WebSocket,
}) => {
  const token = Cookies.get("access_token");
  const [wsCli, setWsCli] = useState();
  const wsUrl = createWebSocketUrl(url, token);

  useEffect(() => {
    if (dependencies.some((dependency) => dependency === undefined)) return;
    if (!token && allowGuest) {
      setWsCli(new WebSocketClass(wsUrl, "echo-protocol"));
    }
    if (!token) return;
    setWsCli(new WebSocketClass(wsUrl, "echo-protocol"));
  }, [...dependencies]);

  return {
    wsCli,
  };
};

export default useWebSocket;
