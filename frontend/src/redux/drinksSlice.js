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
      await instance.delete(`/drinks/favorite/remove/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const addOwnDrink = createAsyncThunk(
  'drinks/addOwnDrink',
  async (drinkData, thunkAPI) => {
    try {
      const { data } = await instance.post('/drinks/own/add', drinkData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getPopular = createAsyncThunk(
  'drinks/getPopular',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/drinks/popular');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getOwnDrinks = createAsyncThunk(
  'drinks/getOwnDrinks',
  async ({ page = 1 } = {}, thunkAPI) => {
    try {
      const { data } = await instance.get('/drinks/own', { params: { page } });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const removeOwnDrink = createAsyncThunk(
  'drinks/removeOwnDrink',
  async (id, thunkAPI) => {
    try {
      await instance.delete(`/drinks/own/remove/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getFavorites = createAsyncThunk(
  'drinks/getFavorites',
  async ({ page = 1 } = {}, thunkAPI) => {
    try {
      const { data } = await instance.get('/drinks/favorite', {
        params: { page },
      });
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
    ownDrinks: [],
    favoriteDrinks: [],
    popularDrinks: [],
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
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favoriteDrinks = state.favoriteDrinks.filter(
          drink => drink._id !== action.payload,
        );
      })
      .addCase(getPopular.fulfilled, (state, action) => {
        state.popularDrinks = action.payload.drinks;
      })
      .addCase(addOwnDrink.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(getOwnDrinks.pending, state => {
        state.totalPages = 0;
        state.currentPage = 1;
      })
      .addCase(getOwnDrinks.fulfilled, (state, action) => {
        state.ownDrinks = action.payload.drinks;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(removeOwnDrink.fulfilled, (state, action) => {
        state.ownDrinks = state.ownDrinks.filter(
          drink => drink._id !== action.payload,
        );
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favoriteDrinks = action.payload.drinks;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      });
  },
});

export default drinksSlice.reducer;
