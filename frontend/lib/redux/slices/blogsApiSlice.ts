import { apiSlice } from '../apiSlice';

export const blogsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: (params) => ({
                url: '/admin/management/blogs',
                params,
            }),
            providesTags: ['Blog'],
        }),
        getBlogById: builder.query({
            query: (id) => `/admin/management/blogs/${id}`,
            providesTags: ['Blog'],
        }),
        createBlog: builder.mutation({
            query: (data) => ({
                url: '/admin/management/blogs',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Blog'],
        }),
        updateBlog: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/management/blogs/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Blog'],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/admin/management/blogs/${id}`,
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
