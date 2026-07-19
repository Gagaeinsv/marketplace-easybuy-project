import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Interfaces for the API responses
export interface ProductItem {
  id: string;
  art: string;
  name: string;
  description: string | null;
  price: number;
  mainImageUrl: string;
  stock: number;
  reviewsCount: number;
  shopId: string;
  categoryId: string;
  goodsStatus: string;
  discountStatus: string;
  discountValue: number | null;
  rating: number;
  slug: string;
  createdAt: string;
}

export const fetchProducts = createAsyncThunk<ProductItem[], Record<string, any> | void, { rejectValue: string }>(
  'products/fetchAll',
  async (filters, thunkAPI) => {
    try {
      const response = await axios.get<ProductItem[]>(`/goods`, {
        params: filters || {}
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error fetching products');
    }
  }
);
