// Api/api.ts
import axios from 'axios';

export const fetchTourData = async (id: string) => {
  try {
    const response = await axios.get(`https://btt.triumphdigital.co.th/api/tour/${id}`);
    
    // Return the response data (which should be in JSON format)
    return response.data;
  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw error; // Propagate error to be handled elsewhere
  }
};
