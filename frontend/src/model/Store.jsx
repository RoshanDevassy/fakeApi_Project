import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductsSlice";
import CartSlice from "./CartSlice";

export const Store = configureStore({
  reducer: {
    fakeApiProducts: ProductSlice,
    fakeApiCartItems: CartSlice,
  },
});
