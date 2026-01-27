import { apiSlice } from '../apiSlice';

export const bulkUploadApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        bulkUpload: builder.mutation({
            query: (formData) => ({
                url: '/admin/bulk-upload',
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['Ring', 'Diamond', 'Gemstone', 'Jewelry'],
        }),
    }),
});

export const {
    useBulkUploadMutation,
} = bulkUploadApiSlice;
