// src/services/locationService.ts

import apiClient from './apiClient';

export const getLocations = async () => {
  try {
    const response = await apiClient.get('locations', { params: { service_name: '' } }); // You can adjust parameters as needed
    return response.data.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};



// Fetch specific location details
export const getLocationDetails = async (id: number) => {
    try {
      const response = await apiClient.get(`location/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching location details:', error);
      throw error;
    }
  };