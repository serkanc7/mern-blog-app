import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem("user") || "{}").token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Post"],
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    getUserPosts: builder.query({
      query: () => "/posts/user",
      providesTags: ["Post"],
    }),
    getPostBySlug: builder.query({
      query: (slug) => `/posts/${slug}`,
      providesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: "/comments/add",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetUserPostsQuery,
  useUpdatePostMutation,
  useGetPostBySlugQuery,
  useAddCommentMutation,
} = apiSlice;
