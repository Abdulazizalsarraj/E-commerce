import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ 
          ...action.payload,
          price: action.payload.discountedPrice, 
          discountedPrice: action.payload.discountedPrice,
          quantity: 1 
        });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;