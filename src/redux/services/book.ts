import type { IBook, IBookWithoutId } from "@/interfaces/Ibook";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-mu-orcin.vercel.app/api/",
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "books",
      providesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ bookData, id }: { bookData: IBookWithoutId; id: string }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const { useGetAllBooksQuery, useUpdateBookMutation } = bookApi;
