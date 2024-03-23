import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config/config";
import getAccessToken from "../../../helpers/getAccessToken";

export const userBankAccountApi = createApi({
  reducerPath: "userBankAccountApi",
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
    getUserBankAccount: builder.query({
      query: (userId) => `users/${userId}/bank-account`,
      providesTags: (result, error, args) => ["UserBankAccount"],
    }),
    createUserBankAccount: builder.mutation({
      query: ({ userId, body }) => ({
        url: `users/${userId}/bank-account`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserBankAccount"],
    }),
    updateUserBankAccount: builder.mutation({
      query: ({ userId, body }) => ({
        url: `users/${userId}/bank-account`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserBankAccount"],
    }),
  }),
});

export const {
  useGetUserBankAccountQuery,
  useCreateUserBankAccountMutation,
  useUpdateUserBankAccountMutation,
} = userBankAccountApi;
