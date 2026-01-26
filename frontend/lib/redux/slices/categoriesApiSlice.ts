import { apiSlice } from "../apiSlice";

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/categories',
            transformResponse: (response: any) => response.data,
            providesTags: ['Category' as any],
        }),
        getMegaMenu: builder.query({
            query: () => '/categories/menu',
            providesTags: ['Category' as any, 'MegaMenu' as any],
        }),
        createCategory: builder.mutation({
            query: (data: any) => ({
                url: '/categories',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Category' as any],
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...data }: { id: string;[key: string]: any }) => ({
                url: `/categories/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Category' as any],
        }),
        deleteCategory: builder.mutation({
            query: (id: string) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category' as any],
        }),

        // New Mega Menu Builder Endpoints
        getAdminMegaMenus: builder.query({
            query: () => '/admin/management/megamenus',
            providesTags: ['MegaMenu' as any],
        }),
        createMegaMenu: builder.mutation({
            query: (data: any) => ({
                url: '/admin/management/megamenus',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['MegaMenu' as any, 'Category' as any],
        }),
        updateMegaMenu: builder.mutation({
            query: ({ id, ...data }: { id: string;[key: string]: any }) => ({
                url: `/admin/management/megamenus/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['MegaMenu' as any, 'Category' as any],
        }),
        deleteMegaMenu: builder.mutation({
            query: (id: string) => ({
                url: `/admin/management/megamenus/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['MegaMenu' as any, 'Category' as any],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetMegaMenuQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetAdminMegaMenusQuery,
    useCreateMegaMenuMutation,
    useUpdateMegaMenuMutation,
    useDeleteMegaMenuMutation,
} = categoriesApiSlice;
