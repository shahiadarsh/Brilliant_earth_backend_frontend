import { apiSlice } from '../apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: (params) => ({
                url: '/orders',
                params,
            }),
            providesTags: ['Order'],
        }),
        getOrderDetails: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: ['Order'],
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/orders/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderDetailsQuery,
    useUpdateOrderStatusMutation,
} = ordersApiSlice;
