import axios from 'axios';

// Define the types for the tour data
interface Tour {
  id: number;
  title: string;
  image: string;
  duration: string;
  price: number;
  sale_price: number;
  review_score: {
    score_total: number;
    total_review: number;
  };
  location?: {
    name: string;
  };
}

// Define the structure of the response data
interface TourResponse {
  data: Tour[];
}

interface TourDetailResponse {
  data: Tour;
}

// Updated fetchToursByLocation to handle pagination
export const fetchToursByLocation = async (location_id: number, page: number = 1): Promise<TourResponse> => {
    try {
      const response = await axios.get<TourResponse>(`https://btt.triumphdigital.co.th/api/tour/search?location_id=${location_id}&page=${page}`);
      return response.data; // Return the full data object
    } catch (error) {
      console.error('Error fetching tours:', error);
      throw error; // Throw the error to handle it in the component
    }
  };
  

// Fetch details of a single tour
export const fetchTourDetails = async (tourId: number): Promise<TourDetailResponse> => {
  try {
    const response = await axios.get<TourDetailResponse>(`https://btt.triumphdigital.co.th/api/tour/detail/${tourId}`);
    return response.data; // Return the full data object
  } catch (error) {
    console.error('Error fetching tour details:', error);
    throw error;
  }
};
