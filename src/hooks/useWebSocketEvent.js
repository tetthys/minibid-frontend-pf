import { useEffect } from "react";

const useWebSocketEvent = (wsCli, onOpen, onMessage, loggingContext) => {
  useEffect(() => {
    if (!wsCli) return;

    wsCli.onopen = () => {
      console.log(`logging :: ${loggingContext} :: wsCli.onopen`);
      onOpen();
    };

    wsCli.onmessage = (e) => {
      console.log(`logging :: ${loggingContext} :: wsCli.onmessage`);
      console.log(JSON.parse(e.data));
      onMessage(JSON.parse(e.data));
    };

    return () => {
      console.log(`logging :: ${loggingContext} :: unmounted`);
      console.log(`logging :: ${loggingContext} :: wsCli.close()`);
      wsCli.close();
    };
  }, [wsCli]);
};

export default useWebSocketEvent;
