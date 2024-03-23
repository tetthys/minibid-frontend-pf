import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(AppRoutes),
  <ScrollRestoration />
);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
