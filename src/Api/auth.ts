// src/services/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://btt.triumphdigital.co.th/api',
});

// Add token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getCurrentUser = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};
