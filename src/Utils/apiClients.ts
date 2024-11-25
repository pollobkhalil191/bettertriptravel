// utils/apiClient.ts
import axios from "axios";

const API_BASE_URL = "https://btt.triumphdigital.co.th/api";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor (e.g., for adding auth tokens)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const fetchHomePageData = async () => {
  const response = await api.get("/home-page");
  return response.data;
};

// Export the client
export default apiClient;
