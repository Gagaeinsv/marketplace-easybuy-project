import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCart, addToCartApi, removeFromCartApi } from './operations';

export interface CartItem {
  id: string;
  art: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  cartItemId?: string; // Backend ShoppingCartItemDto id
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const getInitialCartItems = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('easybuy_cart_items');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return [];
};

const initialState: CartState = {
  items: getInitialCartItems(),
  isOpen: false,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.isOpen = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('easybuy_cart_items', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; size?: string; color?: string }>) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color)
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('easybuy_cart_items', JSON.stringify(state.items));
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; size?: string; color?: string; quantity: number }>) => {
      const item = state.items.find(
        (item) => item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color
      );
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('easybuy_cart_items', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('easybuy_cart_items');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.items) {
          state.items = action.payload.items.map((dto) => ({
            id: dto.productInfo.id,
            cartItemId: dto.id,
            art: dto.productInfo.id.slice(0, 8),
            name: dto.productInfo.name,
            price: dto.productInfo.price,
            image: dto.productInfo.mainImageUrl || '',
            quantity: dto.productQuantity,
          }));
          if (typeof window !== 'undefined') {
            localStorage.setItem('easybuy_cart_items', JSON.stringify(state.items));
          }
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error fetching cart';
      })
      // Add to Cart API
      .addCase(addToCartApi.fulfilled, (state, action) => {
        if (action.payload && action.payload.items) {
          state.items = action.payload.items.map((dto) => ({
            id: dto.productInfo.id,
            cartItemId: dto.id,
            art: dto.productInfo.id.slice(0, 8),
            name: dto.productInfo.name,
            price: dto.productInfo.price,
            image: dto.productInfo.mainImageUrl || '',
            quantity: dto.productQuantity,
          }));
          if (typeof window !== 'undefined') {
            localStorage.setItem('easybuy_cart_items', JSON.stringify(state.items));
          }
        }
      })
      // Remove from Cart API
      .addCase(removeFromCartApi.fulfilled, (state, action) => {
        const removedCartItemIds = action.payload;
        state.items = state.items.filter((item) => !item.cartItemId || !removedCartItemIds.includes(item.cartItemId));
        if (typeof window !== 'undefined') {
          localStorage.setItem('easybuy_cart_items', JSON.stringify(state.items));
        }
      });
  },
});

export const { toggleCart, openCart, closeCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectIsCartOpen = (state: { cart: CartState }) => state.cart.isOpen;
export const selectIsCartLoading = (state: { cart: CartState }) => state.cart.isLoading;
export const selectCartTotalItems = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;
