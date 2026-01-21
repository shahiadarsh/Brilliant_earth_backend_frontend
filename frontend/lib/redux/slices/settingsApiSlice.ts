import { apiSlice } from '../apiSlice';

export const settingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSettings: builder.query({
            query: () => '/settings',
            providesTags: ['Setting'],
        }),
        updateSettings: builder.mutation({
            query: (data) => ({
                url: '/settings',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Setting'],
        }),
    }),
});

export const {
    useGetSettingsQuery,
    useUpdateSettingsMutation,
} = settingsApiSlice;
