import axios from "axios";

const API_BASE_URL = "https://btt.triumphdigital.co.th/api";

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

// Updated fetchToursByLocation to handle pagination and filters
export const fetchAllToursByLocation = async (
  location_id: number,
  filters: Record<string, unknown> = {} // Accept filters as an argument (empty by default)
): Promise<TourResponse> => {
  try {
    let allTours: Tour[] = [];
    let page = 1;

    // Build query parameters with location_id and filters
    const params = { location_id, ...filters };

    while (true) {
      // Make the API request with location_id and filter params
      const response = await axios.get<TourResponse>(
        `https://btt.triumphdigital.co.th/api/tour/search`,
        { params: { ...params, page } }
      );

      const tours = response.data.data;

      if (!tours || tours.length === 0) break; // Stop fetching if there are no more tours

      allTours = [...allTours, ...tours]; // Combine tours from all pages
      page++;
    }

    // Return the final result as a TourResponse
    return { data: allTours };
  } catch (error) {
    console.error("Error fetching tours:", error);
    throw error;
  }
};

// Fetch details of a single tour
export const fetchTourDetails = async (
  tourId: number
): Promise<TourDetailResponse> => {
  try {
    const response = await axios.get<TourDetailResponse>(
      `https://btt.triumphdigital.co.th/api/tour/detail/${tourId}`
    );
    return response.data; // Return the full data object
  } catch (error) {
    console.error("Error fetching tour details:", error);
    throw error;
  }
};

export const checkTourAvailability = async (
  id: number,
  start: string,
  end: string,
  forSingle: number
) => {
  try {
    const token = "YOUR_TOKEN_HERE"; // Replace with your token if needed
    const response = await axios.get(
      `${API_BASE_URL}/tour/availability/${id}`,
      {
        params: { start, end, for_single: forSingle },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error checking tour availability:", error);
    throw error;
  }
};
