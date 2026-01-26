import { apiSlice } from '../apiSlice';

export const diamondsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDiamonds: builder.query({
            query: (params) => ({
                url: '/diamonds',
                params,
            }),
            providesTags: ['Diamond'],
        }),
        createDiamond: builder.mutation({
            query: (data) => ({
                url: '/diamonds',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Diamond'],
        }),
        updateDiamond: builder.mutation({
            query: ({ id, data }) => ({
                url: `/diamonds/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Diamond'],
        }),
        deleteDiamond: builder.mutation({
            query: (id) => ({
                url: `/diamonds/${id}`,
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
