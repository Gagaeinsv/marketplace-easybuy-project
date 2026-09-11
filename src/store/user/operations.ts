import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/services/api/axiosClient';
import { CustomerProfileDto, CustomerAddressDto } from './types';
import toast from 'react-hot-toast';

// Get Profile
export const fetchUserProfile = createAsyncThunk<CustomerProfileDto, void, { rejectValue: string }>(
  'user/fetchProfile',
  async (_, thunkAPI) => {
    try {
      // Primary OpenAPI endpoint from Sasha's backend
      const res = await axios.get<CustomerProfileDto>('/v1/users');
      return res.data;
    } catch (error) {
      // Fallback
      try {
        const res = await axios.get<CustomerProfileDto>('/customer/profile');
        return res.data;
      } catch (err2) {
        if (axios.isAxiosError(error)) {
          return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
        return thunkAPI.rejectWithValue('Unknown error fetching profile');
      }
    }
  }
);

// Update Profile
export const updateUserProfile = createAsyncThunk<CustomerProfileDto, CustomerProfileDto, { rejectValue: string }>(
  'user/updateProfile',
  async (profileData, thunkAPI) => {
    try {
      const res = await axios.put<CustomerProfileDto>('/v1/users', profileData);
      toast.success('Профіль успішно оновлено!');
      return res.data;
    } catch (error) {
      try {
        const res = await axios.put<CustomerProfileDto>('/customer/profile', profileData);
        toast.success('Профіль успішно оновлено!');
        return res.data;
      } catch (err2) {
        toast.error('Помилка оновлення профілю');
        if (axios.isAxiosError(error)) {
          return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
        return thunkAPI.rejectWithValue('Unknown error updating profile');
      }
    }
  }
);

// Update Address
export const updateUserAddress = createAsyncThunk<CustomerAddressDto, CustomerAddressDto, { rejectValue: string }>(
  'user/updateAddress',
  async (addressData, thunkAPI) => {
    try {
      const res = await axios.post<CustomerAddressDto>('/v1/users/addresses', addressData);
      toast.success('Адресу успішно оновлено!');
      return res.data;
    } catch (error) {
      try {
        const res = await axios.put<CustomerAddressDto>('/customer/address', addressData);
        toast.success('Адресу успішно оновлено!');
        return res.data;
      } catch (err2) {
        toast.error('Помилка оновлення адреси');
        if (axios.isAxiosError(error)) {
          return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
        return thunkAPI.rejectWithValue('Unknown error updating address');
      }
    }
  }
);
