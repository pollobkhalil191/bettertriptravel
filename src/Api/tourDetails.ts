// services/tourService.ts
import axios from 'axios';

// Define the type for the tour details response
interface TourDetailsResponse {
  data: {
    title: string;
    price: number;
    sale_price?: number;
    discount_percent?: string;
    content: string;
    address: string;
    location: {
      name: string;
    };
    gallery: string[];
    video?: string;
    enable_extra_price: boolean;
    extra_price?: {
      name: string;
      price: number;
      type: string;
    }[];
    duration: string;
    review_score: {
      score_text: string;
      score_total: number;
      rate_score: Record<string, { title: string; total: number }>;
    };
    review_lists?: {
      data: {
        author: {
          name: string;
        };
        content: string;
        rate_number: number;
      }[];
    };
  };
}

// Fetch details of a single tour
export const fetchTourDetails = async (tourId: string): Promise<TourDetailsResponse> => {
  try {
    const response = await axios.get<TourDetailsResponse>(`https://btt.triumphdigital.co.th/api/tour/detail/${tourId}`);
    return response.data; // Return the full data object
  } catch (error) {
    console.error('Error fetching tour details:', error);
    throw error;
  }
};
