import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const signup = (userData) => api.post('/auth/signup', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const registerProvider = (providerData) => api.post('/auth/provider-signup', providerData);

export const getServices = (params) => api.get('/services', { params });
export const getService = (id) => api.get(`/services/${id}`);

export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getUserBookings = () => api.get('/bookings/my-bookings');
export const getBooking = (id) => api.get(`/bookings/${id}`);


export default api;

