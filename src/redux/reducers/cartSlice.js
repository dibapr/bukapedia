import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("Cart/getCart", async (userID) => {
  try {
    const resp = await axios.get(
      `https://fakestoreapi.com/carts/user/${userID}`
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  cart: [],
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const { id, quantity, available } = action.payload;
      const objectIndex = state.cart.findIndex((item) => item.id === id);
      objectIndex === -1
        ? state.cart.push({ ...action.payload, quantity: quantity })
        : ((state.cart[objectIndex].quantity += quantity),
          (state.cart[objectIndex].available = available));
    },
    updateQuantityCart: (state, action) => {
      const { id, quantity, available } = action.payload;
      const objectIndex = state.cart.findIndex((item) => item.id === id);

      state.cart[objectIndex].quantity = quantity;
      state.cart[objectIndex].available = available;
    },
    checkOutCart: (state, action) => {
      const { id } = action.payload;
      const newArray = state.cart.filter((cart) => {
        return !action.payload.some((payload) => payload.id === cart.id);
      });

      // const newArray = state.cart.filter(
      //   (item) => item.available !== true || item.quantity <= 0
      // );

      state.cart = newArray;
      console.log(state.cart);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        console.log("error", action.error.message);
      });
  },
});

export const { setCart, updateQuantityCart, checkOutCart } = cartSlice.actions;
export default cartSlice.reducer;
