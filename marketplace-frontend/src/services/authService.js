import apiClient from './api';

export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const loginUser = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};