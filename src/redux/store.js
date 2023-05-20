import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productSlice";
import categoriesSlice from "./reducers/categoriesSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    categories: categoriesSlice,
  },
});
