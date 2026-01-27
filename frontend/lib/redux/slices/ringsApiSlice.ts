import { apiSlice } from '../apiSlice';

export const ringsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRings: builder.query({
            query: (params) => ({
                url: '/admin/products',
                params: { ...params, productType: 'ring' },
            }),
            providesTags: ['Ring'],
        }),
        getRing: builder.query({
            query: (id) => ({
                url: `/admin/products/rings/${id}`,
            }),
            providesTags: (result, error, id) => [{ type: 'Ring', id }],
        }),
        createRing: builder.mutation({
            query: (data) => ({
                url: '/admin/products/rings',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Ring'],
        }),
        updateRing: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/products/rings/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ['Ring', { type: 'Ring', id }],
        }),
        deleteRing: builder.mutation({
            query: (id) => ({
                url: `/admin/products/rings/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ring'],
        }),
    }),
});

export const {
    useGetRingsQuery,
    useGetRingQuery,
    useCreateRingMutation,
    useUpdateRingMutation,
    useDeleteRingMutation,
} = ringsApiSlice;
