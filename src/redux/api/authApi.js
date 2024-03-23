import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import getAccessToken from "../../helpers/getAccessToken";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.backendHttpUrl,
    prepareHeaders: (headers, { getState }) => {
      if (getAccessToken()) {
        headers.set("Authorization", `${getAccessToken()}`);
      }
      return headers;
    },
    keepUnusedDataFor: 0,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `/auth/register`,
        method: "POST",
        body,
      }),
    }),
    signIn: builder.mutation({
      query: (body) => ({
        url: `/auth/sign-in`,
        method: "POST",
        body,
      }),
    }),
    signOut: builder.mutation({
      query: () => ({
        url: `/auth/sign-out`,
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useSignInMutation, useSignOutMutation } =
  authApi;
