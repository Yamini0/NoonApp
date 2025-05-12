// cartSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedColor?: string;
        selectedStorage?: string;
      }>,
    ) => {
      console.log('--->addToCart called', action.payload);
      const {productId, selectedColor, selectedStorage} = action.payload;
      const existingItem = state.items.find(
        item =>
          item.productId === productId &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          productId,
          quantity: 1,
          selectedColor,
          selectedStorage,
        });
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedColor?: string;
        selectedStorage?: string;
      }>,
    ) => {
      const {productId, selectedColor, selectedStorage} = action.payload;
      state.items = state.items.filter(
        item =>
          !(
            item.productId === productId &&
            item.selectedColor === selectedColor &&
            item.selectedStorage === selectedStorage
          ),
      );
    },
    incrementQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedColor?: string;
        selectedStorage?: string;
      }>,
    ) => {
      const item = state.items.find(
        i =>
          i.productId === action.payload.productId &&
          i.selectedColor === action.payload.selectedColor &&
          i.selectedStorage === action.payload.selectedStorage,
      );
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedColor?: string;
        selectedStorage?: string;
      }>,
    ) => {
      const item = state.items.find(
        i =>
          i.productId === action.payload.productId &&
          i.selectedColor === action.payload.selectedColor &&
          i.selectedStorage === action.payload.selectedStorage,
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        state.items = state.items.filter(
          i =>
            !(
              i.productId === action.payload.productId &&
              i.selectedColor === action.payload.selectedColor &&
              i.selectedStorage === action.payload.selectedStorage
            ),
        );
      }
    },
    updateCartItem: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        selectedColor?: string;
        selectedStorage?: string;
      }>,
    ) => {
      const item = state.items.find(
        i =>
          i.productId === action.payload.productId &&
          i.selectedColor === action.payload.selectedColor &&
          i.selectedStorage === action.payload.selectedStorage,
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateCartItem,
} = cartSlice.actions;

export const selectCartItemByProductId = (
  state: RootState,
  productId: string,
  selectedColor?: string,
  selectedStorage?: string,
): CartItem | undefined => {
  return state.cart.items.find(
    item =>
      item.productId === productId &&
      item.selectedColor === selectedColor &&
      item.selectedStorage === selectedStorage,
  );
};

export const selectTotalCartItemCount = (state: RootState): number => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export default cartSlice.reducer;
