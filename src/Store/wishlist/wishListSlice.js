import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
  const savedWishlist = localStorage.getItem('wishlist');
  return savedWishlist ? JSON.parse(savedWishlist) : [];
};

const initialState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push({
          ...action.payload,
          price: action.payload.discountedPrice,
        });
      }
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },

    clearWishlist: (state) => {
      state.items = [];
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
