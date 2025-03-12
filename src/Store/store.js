import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import productsReducer from "./products/productsSlice";
import authReducer from "./auth/authSlice";
import wishlistReducer from "./wishlist/wishListSlice";
import offersReducer from "./offers/offersSlice";
import drawerReducer from "./drawer/drawerSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    offers: offersReducer,
    drawer: drawerReducer
  },
});

export default store;

