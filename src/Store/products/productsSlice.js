import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://dummyjson.com/products?limit=100');
  return response.data.products.map(product => ({
    ...product,
    image: product.thumbnail,
    discountedPrice: product.price * (1 - product.discountPercentage / 100)
  }));
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    offers: [],
    loading: false,
    error: null
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
      if (action.payload.discountPercentage > 0) {
        state.offers.push(action.payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.offers = action.payload.filter(product => product.discountPercentage > 0);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch products';
      });
  }
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;

