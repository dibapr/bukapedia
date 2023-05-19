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
      const objectIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      state.cart =
        objectIndex === -1
          ? [...state.cart, { ...action.payload, quantity: 1 }]
          : state.cart.map((item, index) =>
              index === objectIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
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

export const { setCart } = productSlice.actions;
export default productSlice.reducer;
