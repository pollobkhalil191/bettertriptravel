// api/tourDetails.ts

import axios from "axios";

// Define the type for the tour details response
export interface TourDetailsResponse {
  data: {
    is_featured: boolean;
    image: string;
    booking_fee: { name: string; desc: string; price: number }[];
    person_types: never[];
    faqs: never[];
    itinerary: never[];
    id: number;
    title: string;
    price: number;
    sale_price?: number;
    discount_percent?: string;
    content: string;

    category: { name: string };

    max_people: number;
    min_people: number;
    address: string;
    location: { name: string };
    gallery: string[];
    banner_image: string;
    video?: string;
    enable_extra_price: boolean;
    extra_price?: { name: string; price: number; type: string }[];
    duration: string;
    review_score: {
      score_text: string;
      score_total: number;
      rate_score: Record<
        string,
        {
          percent: number;
          title: string;
          total: number;
        }
      >;
    };
    review_lists?: {
      data: {
        data: unknown;
        id: number | null | undefined;
        created_at: string;
        author: {
          country: string;
          name: string;
        };
        content: string;
        rate_number: number;
      }[];
    };
  };
  related_tours: {
    id: number;
    title: string;
    price: number;
    sale_price: number;
    discount_percent: string;
    image: string;
    location: { name: string };
  }[];
}

// Fetch details of a single tour
export const fetchTourDetails = async (
  tourId: string | number
): Promise<TourDetailsResponse> => {
  try {
    const response = await axios.get<TourDetailsResponse>(
      `https://btt.triumphdigital.co.th/api/tour/detail/${tourId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tour details:", error);
    throw error;
  }
};
