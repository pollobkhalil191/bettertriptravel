import axios from 'axios';

const fetchLocations = async (searchTerm: string) => {
  try {
    const response = await axios.get(
      `https://btt.triumphdigital.co.th/api/locations?service_name=${searchTerm}`
    );
    return response.data.data; // Return the location data
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

export default fetchLocations;
