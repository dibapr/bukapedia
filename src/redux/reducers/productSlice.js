import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (url) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const getProductByFilter = createAsyncThunk(
  "product/getProductByFilter",
  async (url) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  product: [],
  filter: [],
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateQuantityProduct: (state, action) => {
      let objectIndex;
      action.payload.map(
        (item) => (
          (objectIndex = state.product.findIndex(
            (prod) => prod.id === item.id
          )),
          item.available === false
            ? state.product[objectIndex.quantity]
            : (state.product[objectIndex].quantity -= item.quantity)
        )
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
      })
      //Filter Case
      .addCase(getProductByFilter.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductByFilter.fulfilled, (state, action) => {
        state.filter = action.payload;
        let objectIndex;
        let objectQuantity;
        action.payload.map(
          (item) => (
            (objectIndex = state.product.findIndex(
              (prod) => prod.id === item.id
            )),
            { ...item, quantity: state.product[objectIndex].quantity }
          )
        );
        state.isLoading = false;
      })
      .addCase(getProductByFilter.rejected, (state, action) => {
        state.isLoading = false;
        console.log("error", action.error.message);
      });
  },
});

export const { updateQuantityProduct } = productSlice.actions;
export default productSlice.reducer;
