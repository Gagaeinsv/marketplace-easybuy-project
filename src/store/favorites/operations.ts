import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface FavoritesApiResponse {
  goods: string[];
}

// Fetch user favorites from backend
export const fetchFavorites = createAsyncThunk<string[], void, { rejectValue: string }>(
  'favorites/fetch',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<FavoritesApiResponse>('/v1/favorites');
      return res.data?.goods || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Failed to fetch favorites');
    }
  }
);

// Add items to favorites
export const addFavoriteApi = createAsyncThunk<string[], string, { rejectValue: string }>(
  'favorites/add',
  async (productId, thunkAPI) => {
    try {
      const res = await axios.post<FavoritesApiResponse>('/v1/favorites', { goods: [productId] });
      return res.data?.goods || [productId];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Failed to add favorite');
    }
  }
);

// Remove item from favorites by ID
export const removeFavoriteApi = createAsyncThunk<string, string, { rejectValue: string }>(
  'favorites/remove',
  async (productId, thunkAPI) => {
    try {
      await axios.delete(`/v1/favorites/${productId}`);
      return productId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Failed to remove favorite');
    }
  }
);
