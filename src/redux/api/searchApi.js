import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: config.backendHttpUrl }),
  endpoints: (builder) => ({
    getSearchResult: builder.query({
      query: ({ name, page = 1 }) => `/search?name=${name}&page=${page}`,
    }),
  }),
});

export const { useGetSearchResultQuery } = searchApi;
