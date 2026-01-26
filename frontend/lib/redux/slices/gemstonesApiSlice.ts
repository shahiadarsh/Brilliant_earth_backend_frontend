import { apiSlice } from '../apiSlice';

export const gemstonesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGemstones: builder.query({
            query: (params) => ({
                url: '/gemstones',
                params,
            }),
            providesTags: ['Gemstone'],
        }),
        createGemstone: builder.mutation({
            query: (data) => ({
                url: '/gemstones',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Gemstone'],
        }),
        updateGemstone: builder.mutation({
            query: ({ id, data }) => ({
                url: `/gemstones/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Gemstone'],
        }),
        deleteGemstone: builder.mutation({
            query: (id) => ({
                url: `/gemstones/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Gemstone'],
        }),
    }),
});

export const {
    useGetGemstonesQuery,
    useCreateGemstoneMutation,
    useUpdateGemstoneMutation,
    useDeleteGemstoneMutation,
} = gemstonesApiSlice;
