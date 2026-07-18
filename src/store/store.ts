import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/auth/slice';
import productsReducer from '@/store/products/slice';
import filtersReducer from '@/store/filters/slice';
import cartReducer from '@/store/cart/slice';
import favoritesReducer from '@/store/favorites/slice';
import recentlyViewedReducer from '@/store/recently-viewed/slice';
import checkoutReducer from '@/store/checkout/slice';
import userReducer from '@/store/user/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    filters: filtersReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    recentlyViewed: recentlyViewedReducer,
    checkout: checkoutReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
