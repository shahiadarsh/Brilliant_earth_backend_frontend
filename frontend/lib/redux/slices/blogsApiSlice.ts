import { apiSlice } from '../apiSlice';

export const blogsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: (params) => ({
                url: '/blogs',
                params,
            }),
            providesTags: ['Blog'],
        }),
        getBlogById: builder.query({
            query: (id) => `/blogs/${id}`,
            providesTags: ['Blog'],
        }),
        createBlog: builder.mutation({
            query: (data) => ({
                url: '/blogs',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Blog'],
        }),
        updateBlog: builder.mutation({
            query: ({ id, data }) => ({
                url: `/blogs/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Blog'],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blog'],
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogsApiSlice;
