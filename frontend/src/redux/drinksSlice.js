import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../api/axios';

export const getMainPage = createAsyncThunk(
  'drinks/getMainPage',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/drinks/mainpage');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const searchDrinks = createAsyncThunk(
  'drinks/search',
  async (
    { keyword = '', category = '', ingredient = '', page = 1 },
    thunkAPI,
  ) => {
    try {
      const { data } = await instance.get('/drinks/search', {
        params: { keyword, category, ingredient, page },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getCategories = createAsyncThunk(
  'drinks/getCategories',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/filters/categories');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getIngredients = createAsyncThunk(
  'drinks/getIngredients',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/filters/ingredients');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getDrinkById = createAsyncThunk(
  'drinks/getDrinkById',
  async (id, thunkAPI) => {
    try {
      const { data } = await instance.get(`/drinks/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const addFavorite = createAsyncThunk(
  'drinks/addFavorite',
  async (id, thunkAPI) => {
    try {
      const { data } = await instance.post(`/drinks/favorite/add/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const removeFavorite = createAsyncThunk(
  'drinks/removeFavorite',
  async (id, thunkAPI) => {
    try {
      const { data } = await instance.delete(`/drinks/favorite/remove/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const drinksSlice = createSlice({
  name: 'drinks',
  initialState: {
    mainPageDrinks: [],
    drinks: [],
    totalPages: 0,
    currentPage: 1,
    categories: [],
    ingredients: [],
    currentDrink: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMainPage.pending, state => {
        state.isLoading = true;
      })
      .addCase(getMainPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mainPageDrinks = action.payload.drinks;
      })
      .addCase(getMainPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(searchDrinks.pending, state => {
        state.isLoading = true;
      })
      .addCase(searchDrinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.drinks = action.payload.drinks;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(searchDrinks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload.ingredients;
      })
      .addCase(getDrinkById.pending, state => {
        state.isLoading = true;
        state.currentDrink = null;
      })
      .addCase(getDrinkById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDrink = action.payload.drink;
      })
      .addCase(getDrinkById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addFavorite.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(removeFavorite.fulfilled, state => {
        state.isLoading = false;
      });
  },
});

export default drinksSlice.reducer;
