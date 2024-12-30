import axios from "axios";

interface Term {
  id: number;
  name: string;
  slug: string;
}

interface FilterData {
  id: number;
  name: string;
  slug: string;
  terms?: Term[];
}

interface Filter {
  title: string;
  field: string;
  position: string;
  min_price?: number;
  max_price?: number;
  min?: string;
  max?: string;
  data?: FilterData[];
}

interface FilterResponse {
  data: Filter[];
}

export const fetchTourFilters = async (): Promise<FilterResponse> => {
  try {
    const response = await axios.get<FilterResponse>(
      "https://btt.triumphdigital.co.th/api/tour/filters"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching tour filters:", error);
    throw error;
  }
};
