import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    registration: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    profileUpdate: builder.mutation({
      query: ({ ...data }) => ({
        url: "/profile",
        method: "PATCH",
        body: data,
      }),
    }),

    profile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useLogoutMutation,
  useProfileQuery,
  useProfileUpdateMutation,
} = authApi;
