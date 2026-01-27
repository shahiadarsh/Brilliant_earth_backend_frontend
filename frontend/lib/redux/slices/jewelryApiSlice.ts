import { apiSlice } from '../apiSlice';

export const jewelryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getJewelry: builder.query({
            query: (params) => ({
                url: '/admin/products',
                params: { ...params, productType: 'jewelry' },
            }),
            providesTags: ['Jewelry'],
        }),
        getJewelryById: builder.query({
            query: (id) => ({
                url: `/admin/products/jewelry/${id}`,
            }),
            providesTags: ['Jewelry'],
        }),
        createJewelry: builder.mutation({
            query: (data) => ({
                url: '/admin/products/jewelry',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Jewelry'],
        }),
        updateJewelry: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/products/jewelry/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Jewelry'],
        }),
        deleteJewelry: builder.mutation({
            query: (id) => ({
                url: `/admin/products/jewelry/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Jewelry'],
        }),
    }),
});

export const {
    useGetJewelryQuery,
    useGetJewelryByIdQuery,
    useCreateJewelryMutation,
    useUpdateJewelryMutation,
    useDeleteJewelryMutation,
} = jewelryApiSlice;
