import { apiSlice } from '../apiSlice';

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStats: builder.query({
            query: () => '/dashboard/stats',
            providesTags: ['Dashboard'],
        }),
        getInventoryAlerts: builder.query({
            query: () => '/dashboard/inventory-alerts',
            providesTags: ['Dashboard'],
        }),
        getRecentTransactions: builder.query({
            query: () => '/dashboard/recent-transactions',
            providesTags: ['Order'],
        }),
    }),
});

export const {
    useGetStatsQuery,
    useGetInventoryAlertsQuery,
    useGetRecentTransactionsQuery,
} = dashboardApiSlice;
