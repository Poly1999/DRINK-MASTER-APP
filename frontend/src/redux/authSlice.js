import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  signupAPI,
  loginAPI,
  logoutAPI,
  refreshUserAPI,
  updateUserAPI,
} from '../api/auth';
import { addFavorite, removeFavorite } from './drinksSlice';

export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, thunkAPI) => {
    try {
      return await signupAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await loginAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await logoutAPI();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      return await refreshUserAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (userData, thunkAPI) => {
    try {
      return await updateUserAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isRefreshing: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(updateUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Оновлюємо favorites в user після додавання
      .addCase(addFavorite.fulfilled, (state, action) => {
        if (state.user) {
          state.user.favorites = [
            ...(state.user.favorites || []),
            action.meta.arg,
          ];
        }
      })

      .addCase(removeFavorite.fulfilled, (state, action) => {
        if (state.user) {
          state.user.favorites = state.user.favorites.filter(
            id => id !== action.meta.arg,
          );
        }
      });
  },
});

export default authSlice.reducer;
