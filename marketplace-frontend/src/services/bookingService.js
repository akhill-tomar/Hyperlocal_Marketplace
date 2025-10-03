import apiClient from './api';

export const createBooking = (bookingData) => {
  return apiClient.post('/bookings', bookingData);
};

export const getMyBookings = () => {
  return apiClient.get('/bookings/my-bookings');
};