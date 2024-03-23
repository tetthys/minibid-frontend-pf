import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../config/config";
import getAccessToken from "../../helpers/getAccessToken";

export const productApi = createApi({
  reducerPath: "productApi",
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
    getProducts: builder.query({
      query: (page = 1) => `/products?page=${page}`,
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: (result, error, args) => [{ type: "Product", id: args }],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, body }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, args) => [
        { type: "Product", id: args.productId },
        "Products",
      ],
    }),
    getProductForUpdateById: builder.query({
      query: (productId) => `/products/${productId}/edit`,
    }),
    getProductsFromUserWithUsername: builder.query({
      query: ({ username, page }) =>
        `/users/username/${username}/products?page=${page}`,
    }),
    postProductBid: builder.mutation({
      query: ({ productId, body }) => ({
        url: `/products/${productId}/bids`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    getRandomProducts: builder.query({
      query: () => `/random-products`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductForUpdateByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductsFromUserWithUsernameQuery,
  usePostProductBidMutation,
  useGetRandomProductsQuery,
} = productApi;
