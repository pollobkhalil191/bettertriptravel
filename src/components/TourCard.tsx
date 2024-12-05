'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchToursByLocation } from '../Api/tourService';
import { FaHeart } from 'react-icons/fa';

interface ReviewScore {
  score_total: number;
  total_review: number;
}

interface Tour {
  id: number;
  title: string;
  image: string;
  duration: string;
  price: number;
  sale_price?: number;
  review_score: ReviewScore;
  location?: {
    name: string;
  };
}

interface TourResponse {
  data: Tour[];
}

const locations = [
  { id: null, name: 'All Locations' }, // Default tab for all locations
  { id: 1, name: 'New York' },
  { id: 2, name: 'Paris' },
  { id: 3, name: 'Tokyo' },
];

const TourCard = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null); // State for selected location tab

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        console.log('Fetching tours for location_id:', selectedLocation);

        const data: TourResponse = await fetchToursByLocation(selectedLocation ?? NaN);
        console.log('Fetched data:', data);

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setTours(data.data); // Set the fetched tours
          setError(null); // Clear previous errors
        } else {
          setTours([]);
          setError('No tours available for this location');
        }
      } catch (err) {
        setError('Failed to fetch tour data');
        console.error('Error fetching tours:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [selectedLocation]);

  return (
    <div className="px-4 py-8">
      {/* Location Tabs */}
      <div className="flex gap-4 mb-6 border-b-2 pb-4">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => setSelectedLocation(location.id)}
            className={`px-4 py-2 text-sm font-medium rounded ${
              selectedLocation === location.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {location.name}
          </button>
        ))}
      </div>

      {/* Loading/Error/No Tours */}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && tours.length === 0 && !error && <div>No tours available</div>}

      {/* Tour Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <Link href={`/tour/${tour.id}`} key={tour.id}>
            <div className="tour-card bg-white shadow-sm rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out border relative">
              <div className="absolute top-2 right-2 z-10 rounded-full p-2 shadow-md cursor-pointer">
                <FaHeart className="text-white hover:text-red-500 transition duration-200" size={20} />
              </div>
              <div className="relative w-full h-[200px] overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  width={500}
                  height={200}
                  className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-500">{tour.location?.name || 'Unknown Location'}</p>
                <h3 className="text-xl font-semibold">{tour.title}</h3>
                <p className="text-gray-600 mt-2">{tour.duration}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-500">{'★'.repeat(Math.round(tour.review_score.score_total))}</span>
                  <span className="ml-1 text-gray-500">({tour.review_score.total_review} reviews)</span>
                </div>
                <div className="mt-2 items-center">
                  <p className="text-sm text-gray-400 line-through">
                    {tour.sale_price ? `$${tour.price}` : ''}
                  </p>
                  <p className="text-lg font-bold text-textPrimary">
                    From {`$${tour.sale_price || tour.price}`} <span className="text-sm">per person</span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TourCard;
