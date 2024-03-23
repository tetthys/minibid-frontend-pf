import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter";
import { config } from "./config/config";
import { Provider } from "react-redux";
import { store } from "./redux/store";

async function enableMocking() {
  if (config.environment !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    //   <Provider store={store}>
    //     <AppRouter />
    //   </Provider>
    // </React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
});
