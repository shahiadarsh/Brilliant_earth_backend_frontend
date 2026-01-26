import { apiSlice } from '../apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: '/products',
                params,
            }),
            providesTags: ['Ring', 'Jewelry', 'Diamond', 'Gemstone'],
        }),
        getProductBySlug: builder.query({
            query: (slug) => `/products/${slug}`,
            providesTags: ['Ring', 'Jewelry', 'Diamond', 'Gemstone'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductBySlugQuery,
} = productsApiSlice;
