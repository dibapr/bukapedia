import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/users/3");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  username: "",
  password: "",
  isLoading: false,
};

const getUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload.username;
        state.password = action.payload.password;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        console.log("error", action.error.message);
      });
  },
});

export default getUserSlice.reducer;
