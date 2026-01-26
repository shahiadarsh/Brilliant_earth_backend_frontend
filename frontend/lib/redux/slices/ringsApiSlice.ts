import { apiSlice } from '../apiSlice';

export const ringsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRings: builder.query({
            query: (params) => ({
                url: '/rings',
                params,
            }),
            providesTags: ['Ring'],
        }),
        getRing: builder.query({
            query: (id) => `/rings/${id}`,
            providesTags: (result, error, id) => [{ type: 'Ring', id }],
        }),
        createRing: builder.mutation({
            query: (data) => ({
                url: '/rings',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Ring'],
        }),
        updateRing: builder.mutation({
            query: ({ id, data }) => ({
                url: `/rings/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => ['Ring', { type: 'Ring', id }],
        }),
        deleteRing: builder.mutation({
            query: (id) => ({
                url: `/rings/${id}`,
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
