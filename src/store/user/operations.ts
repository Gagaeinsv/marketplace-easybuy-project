import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CustomerProfileDto, CustomerAddressDto } from './types';
import toast from 'react-hot-toast';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://89.168.115.138:8080/api';

// Get Profile
export const fetchUserProfile = createAsyncThunk<CustomerProfileDto, void, { rejectValue: string }>(
  'user/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get<CustomerProfileDto>('/customer/profile');
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error fetching profile');
    }
  }
);

// Update Profile
export const updateUserProfile = createAsyncThunk<CustomerProfileDto, CustomerProfileDto, { rejectValue: string }>(
  'user/updateProfile',
  async (profileData, thunkAPI) => {
    try {
      const res = await axios.put<CustomerProfileDto>('/customer/profile', profileData);
      toast.success('Profile updated successfully!');
      return res.data;
    } catch (error) {
      toast.error('Failed to update profile');
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error updating profile');
    }
  }
);

// Update Address
export const updateUserAddress = createAsyncThunk<CustomerAddressDto, CustomerAddressDto, { rejectValue: string }>(
  'user/updateAddress',
  async (addressData, thunkAPI) => {
    try {
      const res = await axios.put<CustomerAddressDto>('/customer/address', addressData);
      toast.success('Address updated successfully!');
      return res.data;
    } catch (error) {
      toast.error('Failed to update address');
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error updating address');
    }
  }
);
