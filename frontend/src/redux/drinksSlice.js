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

const drinksSlice = createSlice({
  name: 'drinks',
  initialState: {
    mainPageDrinks: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMainPage.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMainPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.mainPageDrinks = action.payload.drinks;
      })
      .addCase(getMainPage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default drinksSlice.reducer;
