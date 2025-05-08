import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Banner, Product, CartItem, Order} from './productApi.type';
import {BASE_URL} from '../../utils/constants';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Cart', 'Order'],
  endpoints: builder => ({
    // Home screen: banners
    getBanners: builder.query<Banner[], void>({
      query: () => '/banners',
    }),

    // Home + Search screen: products
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),

    searchProducts: builder.query<Product[], string>({
      query: query => `/products?q=${query}`,
    }),

    getProductById: builder.query<Product, string>({
      query: id => `/products/${id}`,
    }),

    // Cart actions (assumes a simplified cart API)
    getCart: builder.query<CartItem[], void>({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation<void, CartItem>({
      query: item => ({
        url: '/cart',
        method: 'POST',
        body: item,
      }),
      invalidatesTags: ['Cart'],
    }),

    updateCartItem: builder.mutation<void, CartItem>({
      query: item => ({
        url: `/cart/${item.productId}`,
        method: 'PUT',
        body: item,
      }),
      invalidatesTags: ['Cart'],
    }),

    removeFromCart: builder.mutation<void, string>({
      query: productId => ({
        url: `/cart/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    // Orders
    placeOrder: builder.mutation<Order, Partial<Order>>({
      query: order => ({
        url: '/orders',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Cart', 'Order'],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  usePlaceOrderMutation,
} = productApi;
