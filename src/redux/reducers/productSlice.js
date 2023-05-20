import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk("product/getProduct", async () => {
  try {
    const resp = await axios.get("https://fakestoreapi.com/products/");
    return resp.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  product: [],
  cart: [],
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const { id, quantity } = action.payload;
      const objectIndex = state.cart.findIndex((item) => item.id === id);

      objectIndex === -1
        ? state.cart.push({ ...action.payload, quantity: 1 })
        : (state.cart[objectIndex].quantity += quantity);
    },
    updateQuantityCart: (state, action) => {
      const { id, quantity } = action.payload;
      const objectIndex = state.cart.findIndex((item) => item.id === id);

      state.cart[objectIndex].quantity = Number(quantity);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.product = action.payload.map((item) => ({
          ...item,
          quantity: 20,
        }));
        state.isLoading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        console.log("error", action.error.message);
      });
  },
});

export const { setCart, updateQuantityCart } = productSlice.actions;
export default productSlice.reducer;
