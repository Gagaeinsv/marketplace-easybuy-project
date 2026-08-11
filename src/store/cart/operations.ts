import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ShoppingCartItemDto {
  id: string;
  productInfo: {
    id: string;
    name: string;
    price: number;
    mainImageUrl?: string;
  };
  productQuantity: number;
}

export interface ShoppingCartDto {
  id: string;
  userId: string;
  items: ShoppingCartItemDto[];
  itemsTotalPrice: number;
  itemsQuantity: number;
}

// Fetch cart from backend
export const fetchCart = createAsyncThunk<ShoppingCartDto, void, { rejectValue: string }>(
  'cart/fetch',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<ShoppingCartDto>('/v1/cart');
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Failed to fetch cart');
    }
  }
);

// Add items to cart API
export const addToCartApi = createAsyncThunk<
  ShoppingCartDto,
  { productId: string; quantity: number },
  { rejectValue: string }
>(
  'cart/add',
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await axios.post<ShoppingCartDto>('/v1/cart/items', {
        items: [{ productId, productQuantity: quantity }],
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Failed to add item to cart');
    }
  }
);

// Remove items from cart API
export const removeFromCartApi = createAsyncThunk<
  string[],
  string[],
  { rejectValue: string }
>(
  'cart/remove',
  async (shoppingCartItemIds, thunkAPI) => {
    try {
      await axios.delete('/v1/cart/items', {
        data: { shoppingCartItemIds },
      });
      return shoppingCartItemIds;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Failed to remove cart item');
    }
  }
);
