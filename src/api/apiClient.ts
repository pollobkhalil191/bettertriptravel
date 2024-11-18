

import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://btt.triumphdigital.co.th/api/', // Use environment variable or default base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors for Authorization
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // Token from localStorage
  if (token) {
    // Set Authorization header
    const headers: AxiosRequestHeaders = config.headers || {};
    headers.Authorization = `Bearer ${token}`;
    config.headers = headers;
  }
  return config;
});

export default apiClient;
