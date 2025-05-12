import {Product} from '../redux/api/productApi.type';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  ProductDetails: {product: Product};
  Cart: undefined;
  Review: undefined;
  Confirmation: undefined;
};
