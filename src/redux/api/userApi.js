import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import getAccessToken from "../../helpers/getAccessToken";

export const userApi = createApi({
  reducerPath: "userApi",
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
    getUsers: builder.query({
      query: (page) => `/users?page=${page}`,
    }),
    getUser: builder.query({
      query: (userId = 1) => `/users/${userId}`,
    }),
    getUserByUsername: builder.query({
      query: (username = "user0") => `/users/username/${username}`,
    }),
    //
    //
    getUserCheckoutsByUsername: builder.query({
      query: ({ username, page }) => `/users/${username}/checkouts?page=${page}`,
    }),
    getUserBidsByUsername: builder.query({
      query: ({ username, page }) => `/users/${username}/bids?page=${page}`,
    }),
    getUserWithdrawalsByUsername: builder.query({
      query: ({ username, page }) => `/users/${username}/withdrawals?page=${page}`,
    }),
    //
    //
    getUserCheckoutsById: builder.query({
      query: ({ userId, page }) => `/users/${userId}/checkouts?page=${page}`,
    }),
    getUserBidsById: builder.query({
      query: ({ userId, page }) => `/users/${userId}/bids?page=${page}`,
    }),
    getUserWithdrawalsById: builder.query({
      query: ({ userId, page }) => `/users/${userId}/withdrawals?page=${page}`,
    }),
    //
    //
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetUserByUsernameQuery,
  //
  useGetUserCheckoutsByUsernameQuery,
  useGetUserBidsByUsernameQuery,
  useGetUserWithdrawalsByUsernameQuery,
  //
  useGetUserCheckoutsByIdQuery,
  useGetUserBidsByIdQuery,
  useGetUserWithdrawalsByIdQuery,
} = userApi;
