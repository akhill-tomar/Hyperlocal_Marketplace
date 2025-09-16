import apiClient from './api';

export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};