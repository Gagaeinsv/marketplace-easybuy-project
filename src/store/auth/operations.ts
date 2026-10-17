import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { setAuthHeader, clearAuthHeader } from '@/services/api/axiosClient';
import { AuthResponse, Credentials } from '@/types/Auth';

export const login = createAsyncThunk<AuthResponse, Credentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, thunkAPI) => {
    delete axios.defaults.headers.common.Authorization;
    try {
      const payload = {
        email: credentials.email,
        password: credentials.password,
      };
      const res = await axios.post<AuthResponse>('v1/auth/authenticate', payload);
      const accessToken = res.data.token || res.data.accessToken || '';
      const refreshToken = res.data.refreshToken || '';

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        setAuthHeader(accessToken);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      return { ...res.data, accessToken, refreshToken };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Unknown login error');
    }
  }
);

export const register = createAsyncThunk<AuthResponse, Credentials & Record<string, any>, { rejectValue: string }>(
  'auth/register',
  async (credentials, thunkAPI) => {
    delete axios.defaults.headers.common.Authorization;
    try {
      const payload: Record<string, any> = {
        email: credentials.email,
        password: credentials.password,
        role: credentials.role || 'CUSTOMER',
      };
      if (credentials.firstName) payload.firstName = credentials.firstName;
      if (credentials.lastName) payload.lastName = credentials.lastName;

      const res = await axios.post<AuthResponse | string>('v1/auth/register', payload);
      if (typeof res.data === 'object' && res.data !== null) {
        const accessToken = res.data.token || res.data.accessToken;
        if (accessToken) {
          setAuthHeader(accessToken);
          return { ...res.data, accessToken };
        }
      }
      return { accessToken: '', refreshToken: '' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
      }
      return thunkAPI.rejectWithValue('Unknown register error');
    }
  }
);

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('v1/auth/logout');
    } catch (error) {
      // Clear local session even if server logout fails
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      clearAuthHeader();
    }
  }
);

export const refreshUser = createAsyncThunk<AuthResponse, void, { rejectValue: string }>(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token');

      setAuthHeader(refreshToken);
      const res = await axios.post<AuthResponse>('v1/auth/refresh', { refreshToken });

      const newAccessToken = res.data.token || res.data.accessToken || '';
      const newRefreshToken = res.data.refreshToken || refreshToken;

      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
        setAuthHeader(newAccessToken);
      }
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
      }

      return { ...res.data, accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Unable to refresh user'
      );
    }
  }
);
