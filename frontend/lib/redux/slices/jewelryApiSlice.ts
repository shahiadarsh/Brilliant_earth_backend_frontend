import { apiSlice } from '../apiSlice';

export const jewelryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJewelry: builder.query({
            query: (params) => ({
                url: '/jewelry',
                params,
            }),
            providesTags: ['Jewelry'],
        }),
        createJewelry: builder.mutation({
            query: (data) => ({
                url: '/jewelry',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Jewelry'],
        }),
        updateJewelry: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/jewelry/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Jewelry'],
        }),
        deleteJewelry: builder.mutation({
            query: (id) => ({
                url: `/jewelry/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Jewelry'],
        }),
    }),
});

export const {
    useGetJewelryQuery,
    useCreateJewelryMutation,
    useUpdateJewelryMutation,
    useDeleteJewelryMutation,
} = jewelryApiSlice;
