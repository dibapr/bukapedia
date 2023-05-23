import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducers/productSlice";
import categoriesSlice from "./reducers/categoriesSlice";
import getUserSlice from "./reducers/getUserSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    categories: categoriesSlice,
    user: getUserSlice,
  },
});
