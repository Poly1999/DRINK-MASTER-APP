import instance, { setAuthHeader, clearAuthHeader } from './axios';

export const signupAPI = async userData => {
  const { data } = await instance.post('/auth/signup', userData);
  setAuthHeader(data.token);
  return data;
};

export const loginAPI = async userData => {
  const { data } = await instance.post('/auth/login', userData);
  setAuthHeader(data.token);
  return data;
};

export const logoutAPI = async () => {
  await instance.post('/auth/logout');
  clearAuthHeader();
};
