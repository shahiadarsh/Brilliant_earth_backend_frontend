import { apiSlice } from "../apiSlice";

export const promosApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Public endpoints
        getPublicPromos: builder.query({
            query: () => "/public/promos",
            transformResponse: (response: any) => response.data,
            providesTags: ["Promo"],
        }),

        // Admin endpoints
        getAdminPromos: builder.query({
            query: () => "/admin/management/promos",
            transformResponse: (response: any) => response.data,
            providesTags: ["Promo"],
        }),
        createPromo: builder.mutation({
            query: (data) => ({
                url: "/admin/management/promos",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Promo"],
        }),
        updatePromo: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/admin/management/promos/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Promo"],
        }),
        deletePromo: builder.mutation({
            query: (id) => ({
                url: `/admin/management/promos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Promo"],
        }),
    }),
});

export const {
    useGetPublicPromosQuery,
    useGetAdminPromosQuery,
    useCreatePromoMutation,
    useUpdatePromoMutation,
    useDeletePromoMutation,
} = promosApiSlice;
