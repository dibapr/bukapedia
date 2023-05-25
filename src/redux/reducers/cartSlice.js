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
  recapCheckOut: [],
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const { id, quantity } = action.payload;
      const objectIndex = state.cart.findIndex((item) => item.id === id);
      objectIndex === -1
        ? state.cart.push({ ...action.payload, quantity: quantity })
        : (state.cart[objectIndex].quantity += quantity);
    },
    updateQuantityCart: (state, action) => {
      const { id, quantity } = action.payload;
      const objectIndex = state.cart.findIndex((item) => item.id === id);

      state.cart[objectIndex].quantity = quantity;
    },
    checkOutCart: (state, action) => {
      const { id } = action.payload;
      const newArray = state.cart.filter((cart) => {
        return !action.payload.some((payload) => payload.id === cart.id);
      });
      state.cart = newArray;
    },
    updateRecapCheckOut: (state, action) => {
      const { quantity } = action.payload;
      let objectIndex;
      action.payload.map(
        (item) => {
          objectIndex = state.recapCheckOut.findIndex(
            (recap) => recap.id === item.id
          );
          objectIndex === -1
            ? state.recapCheckOut.push({ ...item })
            : (state.recapCheckOut[objectIndex].quantity += item.quantity);
        }
        // (
        //   (objectQuantity = state.product.find(
        //     (prod) => prod.id === item.id
        //   )?.quantity),
        //   { ...item, quantity: objectQuantity }
        // )
      );
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

export const {
  setCart,
  updateQuantityCart,
  checkOutCart,
  updateRecapCheckOut,
} = cartSlice.actions;
export default cartSlice.reducer;
