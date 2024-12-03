import axios from 'axios';

export const fetchHomePageData = async () => {
  try {
    const response = await axios.get('https://btt.triumphdigital.co.th/api/home-page');
    return response.data;
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return null;
  }
};
