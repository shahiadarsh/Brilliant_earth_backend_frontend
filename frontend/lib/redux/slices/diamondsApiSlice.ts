import { apiSlice } from '../apiSlice';

export const diamondsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDiamonds: builder.query({
            query: (params) => ({
                url: '/admin/products',
                params: { ...params, productType: 'diamond' },
            }),
            providesTags: ['Diamond'],
        }),
        createDiamond: builder.mutation({
            query: (data) => ({
                url: '/admin/products/diamonds',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Diamond'],
        }),
        updateDiamond: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/products/diamonds/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Diamond'],
        }),
        deleteDiamond: builder.mutation({
            query: (id) => ({
                url: `/admin/products/diamonds/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Diamond'],
        }),
    }),
});

export const {
    useGetDiamondsQuery,
    useCreateDiamondMutation,
    useUpdateDiamondMutation,
    useDeleteDiamondMutation,
} = diamondsApiSlice;
