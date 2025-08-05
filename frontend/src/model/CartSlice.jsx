import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

export const getCartProducts = createAsyncThunk(
  "api/get/fakeapi/cartproducts",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:6600/fakeapi/cartitems"
      );
      return response.data;
    } catch (error) {
      throw new Error("Error Fetching Cart Products :", error);
    }
  }
);

export const postCartProducts = createAsyncThunk(
  "api/post/fakeapi/cartproducts",
  async (obj) => {
    try {
      const response = await axios.post(
        "http://localhost:6600/fakeapi/cartitems",
        obj
      );

      return response.data;
    } catch (error) {
      throw new Error("Error Fetching Cart Products :", error);
    }
  }
);

export const deleteCartProducts = createAsyncThunk(
  "api/delete/fakeapi/cartproducts",
  async (obj) => {
    console.info(" received id", obj);
    try {
      const response = await axios.delete(
        `http://localhost:6600/fakeapi/cartitems/${obj}`
      );

      return response.data;
    } catch (error) {
      throw new Error("Error Deleting Cart Products :", error);
    }
  }
);

const CartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    cartProducts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.cartProducts = action.payload;
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        toast.error(action.error.message);
      })

      .addCase(postCartProducts.fulfilled, (state, action) => {
        console.info("post cart action :", action.payload);
        console.info("post cart executed");
        toast.success("Product Added to Cart");
        state.cartProducts = [...state.cartProducts, action.payload];
      })
      .addCase(postCartProducts.rejected, (state, action) => {
        toast.error("Product not added to Cart!!!", action.error);
      })

      .addCase(deleteCartProducts.fulfilled, (state, action) => {
        console.info("Delete id", action.payload);
        state.cartProducts = state.cartProducts.filter(
          (obj) => obj._id !== action.payload
        );
        toast.success("Cart Item deleted");
      });
  },
});

export default CartSlice.reducer;
