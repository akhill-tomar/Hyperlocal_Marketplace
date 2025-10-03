import apiClient from './api';

export const getAllServiceCategories = () => {
  return apiClient.get('/services');
};

export const getProvidersByCategoryId = (categoryId) => {
  return apiClient.get(`/services/${categoryId}/providers`);
};

export const getProviderServiceById = (id) => {
  return apiClient.get(`/provider-services/${id}`);
};