'use client';

import { useState, useEffect } from 'react';
import TourCard from './TourCard'; // Assuming TourCard is in the same folder
import { fetchAllLocations } from '../Api/locationService'; // Mock function to fetch locations

interface Location {
  id: number;
  name: string;
}

const TourTabs = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null); // `null` for "All Tours"
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const data: Location[] = await fetchAllLocations(); // Fetch all location names from API
        setLocations(data);
      } catch (err) {
        setError('Failed to load locations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) return <div>Loading locations...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        {/* "All Tours" Tab */}
        <button
          className={`px-4 py-2 text-sm ${
            activeTab === null ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab(null)}
        >
          All Tours
        </button>
        {/* Dynamic Tabs for Locations */}
        {locations.map((location) => (
          <button
            key={location.id}
            className={`px-4 py-2 text-sm ${
              activeTab === location.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(location.id)}
          >
            {location.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {/* Pass `location_id` to `TourCard` based on active tab */}
        <TourCard location_id={activeTab} />
      </div>
    </div>
  );
};

export default TourTabs;
