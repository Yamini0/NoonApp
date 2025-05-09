import {Product} from '../../redux/api/productApi.type';

export type SectionItem = Product[] | Product;
export type ProductSection = {
  title: string;
  horizontal: boolean;
  data: SectionItem[]; // Always wrap in an array due to SectionList API
};
