import type { IBorrowWithoutId } from "@/interfaces/Iborrow";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-mu-orcin.vercel.app/api/",
  }),
  tagTypes: ["borrow"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation({
      query: ({ borrowData }: { borrowData: IBorrowWithoutId }) => ({
        url: `/borrow`,
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrow"],
    }),
    getAllBorrow: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetAllBorrowQuery } = borrowApi;
