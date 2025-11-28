import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cart/cartSlice";
import modalReduser from "../slices/modal/modalSlice";

function createStore() {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      modal: modalReduser,
    },
  });

  return store;
};

const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;