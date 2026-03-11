import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { setAuthHeader } from '../api/axios';

const token = localStorage.getItem('token');
if (token) setAuthHeader(token);

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.subscribe(() => {
  const { token } = store.getState().auth;
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
});
