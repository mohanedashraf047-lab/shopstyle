import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products from API with delay
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);

const initialState = {
  items: [], // products from API
  cart: [], // all products in cart not quantity
  value: 0, // total quantity in cart
  loading: false, // loading state
  error: null, // error
  userInfo: null,
  favorites: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const item = action.payload;
    //   const existingItem = state.cart.find((p) => p.id === item.id);

    //   const quantityToAdd = item.quantity || 1;

    //   if (existingItem) {
    //     existingItem.quantity += quantityToAdd;
    //   } else {
    //     state.cart.push({ ...item, quantity: quantityToAdd });
    //   }

    //   state.value += quantityToAdd;
    // },

    addToCart: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      item.quantity++;
    },

    decrementQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload);
      // if(item.quantity === 1) return;
      // item.quantity--;
      item.quantity === 1 ? "return " : item.quantity--;
    },

    setQuantity: (state, action) => {
      const item = state.cart.find((i) => i.id === action.payload.id);
      item.quantity = action.payload.quantity;
    },

    // updateQuantity: (state, action) => {
    //   const { id, quantity } = action.payload;
    //   const item = state.cart.find((i) => i.id === id);

    //   if (item && quantity > 0) {
    //     state.value += quantity - item.quantity;
    //     item.quantity = quantity;
    //   }
    // },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((i) => i.id === id);

      if (item) {
        state.value -= item.quantity;
        state.cart = state.cart.filter((i) => i.id !== id);
      }
    },

    ClearCart: (state) => {
      state.cart = [];
      state.value = 0;
    },

    setUser: (state, action) => {
      state.userInfo = action.payload;
    },

    LogOutUser: (state) => {
      state.userInfo = null;
    },
    addToFavorites: (state, action) => {
      const existing = state.favorites.find(
        (item) => item.id === action.payload.id
      );
      if (!existing) {
        state.favorites.push(action.payload);
      }
    },

    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },

    clearFavorites: (state) => {
      state.favorites = [];
    },
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  ClearCart,
  setUser,
  LogOutUser,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  updateUserInfo,
} = productSlice.actions;

export default productSlice.reducer;
