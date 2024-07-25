import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../../types/types';

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

interface CustomError {
  message: string;
}

export const loginUser = createAsyncThunk<
  IUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue((error.response.data as CustomError).message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export const registerUser = createAsyncThunk<
  IUser,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data as IUser;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue((error.response.data as CustomError).message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});

export const updateUserProfile = createAsyncThunk<
  IUser,
  { name: string; profilePicture: string },
  { rejectValue: string }
>('auth/updateProfile', async (userData, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '{}').token}`,
      },
    });
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue((error.response.data as CustomError).message);
    }
    return thunkAPI.rejectWithValue('An unknown error occurred');
  }
});
