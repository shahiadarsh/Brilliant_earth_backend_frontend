import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('userToken');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Ring', 'Diamond', 'Gemstone', 'Jewelry', 'Order', 'Blog', 'Promo', 'Setting', 'User', 'Dashboard', 'Category', 'MegaMenu'],
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (formData) => ({
                url: '/admin/upload',
                method: 'POST',
                body: formData,
                // body: formData, // No need to set headers, browser will set multipart/form-data
            }),
        }),
    }),
});

export const { useUploadImageMutation } = apiSlice;
