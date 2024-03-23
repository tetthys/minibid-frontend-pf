import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productApi";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";
import { uiSlice } from "./slice/uiSlice";
import { authSlice } from "./slice/authSlice";
import { querySlice } from "./slice/querySlice";
import { userCardApi } from "./api/user/userCard";
import { userBankAccountApi } from "./api/user/userBankAccount";
import { searchApi } from "./api/searchApi";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    query: querySlice.reducer,

    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userCardApi.reducerPath]: userCardApi.reducer,
    [userBankAccountApi.reducerPath]: userBankAccountApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      userApi.middleware,
      authApi.middleware,
      userCardApi.middleware,
      userBankAccountApi.middleware,
      searchApi.middleware,
    ]),
});
