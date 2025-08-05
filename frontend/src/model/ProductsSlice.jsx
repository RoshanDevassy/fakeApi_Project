import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getFakeApiProducts = createAsyncThunk(
  "api/get/fakeapi/products",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:6600/fakeapi/products"
      );
      return await response.data;
    } catch (error) {
      throw new Error("Error during Fetching Products :", error.message);
    }
  }
);

export const addToFakeApiProducts = createAsyncThunk(
  "api/post/fakeapi/products",
  async (obj) => {
    try {
      const response = await axios.post(
        "http://localhost:6600/fakeapi/products",
        obj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.info("Backend Data :",response.data);
      return await response.data;
    } catch (error) {
      throw new Error("Error during Posting Products :", error.message);
    }
  }
);

const ProductsSlice = createSlice({
  name: "ProductsSlice",
  initialState: {
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFakeApiProducts.fulfilled, (state, action) => {
        console.table(action.payload);
        state.products = action.payload;
      })

      .addCase(getFakeApiProducts.rejected, (state, action) => {
        toast.error("Error :", action.error);
      })

      .addCase(addToFakeApiProducts.fulfilled, (state, action) => {
        console.info("Product Added :", action.payload);
        state.products = [...state.products, action.payload];
        toast.success("Product Added");
      });
  },
});

export default ProductsSlice.reducer;
