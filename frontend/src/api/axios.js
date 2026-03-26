import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const setAuthHeader = token => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common['Authorization'] = '';
};

export default instance;
