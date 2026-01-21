import { apiSlice } from '../apiSlice';

export const promosApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPromos: builder.query({
            query: (params) => ({
                url: '/promos',
                params,
            }),
            providesTags: ['Promo'],
        }),
        getPromoById: builder.query({
            query: (id) => `/promos/${id}`,
            providesTags: ['Promo'],
        }),
        createPromo: builder.mutation({
            query: (data) => ({
                url: '/promos',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Promo'],
        }),
        updatePromo: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/promos/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Promo'],
        }),
        deletePromo: builder.mutation({
            query: (id) => ({
                url: `/promos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Promo'],
        }),
    }),
});

export const {
    useGetPromosQuery,
    useGetPromoByIdQuery,
    useCreatePromoMutation,
    useUpdatePromoMutation,
    useDeletePromoMutation,
} = promosApiSlice;
