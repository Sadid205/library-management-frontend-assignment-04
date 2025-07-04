import type { IBookWithoutId } from "@/interfaces/Ibook";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-mu-orcin.vercel.app/api/",
  }),
  tagTypes: ["book"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: ({ limit, page }) => {
        const params = new URLSearchParams();
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        return `books?${params.toString()}`;
      },
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
    deleteBook: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    createBook: builder.mutation({
      query: ({ bookData }: { bookData: IBookWithoutId }) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBookMutation,
} = bookApi;
