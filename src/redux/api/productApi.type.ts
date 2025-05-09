export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  tags: string[];
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  paymentMethod: string;
  total: number;
}
