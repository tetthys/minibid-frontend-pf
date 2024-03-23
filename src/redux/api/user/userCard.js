import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config/config";
import getAccessToken from "../../../helpers/getAccessToken";

export const userCardApi = createApi({
  reducerPath: "userCardApi",
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
    getUserCard: builder.query({
      query: (userId) => `users/${userId}/card`,
      providesTags: (result, error, args) => ["UserCard"],
    }),
    createUserCard: builder.mutation({
      query: ({ userId, body }) => ({
        url: `users/${userId}/card`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserCard"],
    }),
    updateUserCard: builder.mutation({
      query: ({ userId, body }) => ({
        url: `users/${userId}/card`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserCard"],
    }),
  }),
});

export const {
  useGetUserCardQuery,
  useCreateUserCardMutation,
  useUpdateUserCardMutation,
} = userCardApi;
