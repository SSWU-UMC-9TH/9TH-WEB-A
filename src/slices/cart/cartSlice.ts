import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";
import type { CartItems } from "../../types/cart";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) item.amount += 1;
    },

    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item)
        item.amount > 1
          ? (item.amount -= 1)
          : (state.cartItems = state.cartItems.filter(
              (ci) => ci.id !== item.id
            ));
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(
        (i) => i.id !== action.payload.id
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    calculateTotals: (state) => {
      const { amount, total } = state.cartItems.reduce(
        (acc, item) => {
          acc.amount += item.amount;
          acc.total += item.amount * item.price;
          return acc;
        },
        { amount: 0, total: 0 }
      );

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
