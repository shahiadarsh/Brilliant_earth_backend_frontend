import { apiSlice } from '../apiSlice';

export const gemstonesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGemstones: builder.query({
            query: (params) => ({
                url: '/admin/products',
                params: { ...params, productType: 'gemstone' },
            }),
            providesTags: ['Gemstone'],
        }),
        createGemstone: builder.mutation({
            query: (data) => ({
                url: '/admin/products/gemstones',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Gemstone'],
        }),
        updateGemstone: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/products/gemstones/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Gemstone'],
        }),
        deleteGemstone: builder.mutation({
            query: (id) => ({
                url: `/admin/products/gemstones/${id}`,
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
