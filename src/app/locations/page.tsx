'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // or `next/router` for older Next.js versions
import { getLocationDetails } from '../../api/location';

const LocationDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getLocationDetails(Number(id));
        setLocation(data);
      } catch (error) {
        console.error('Failed to fetch location details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!location) {
    return <p>Location not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{location.title}</h1>
      {location.image && (
        <img
          src={location.image}
          alt={location.title}
          className="w-full h-auto rounded-md my-4"
        />
      )}
      <p>Latitude: {location.map_lat}</p>
      <p>Longitude: {location.map_lng}</p>
      <p>Zoom Level: {location.map_zoom}</p>
    </div>
  );
};

export default LocationDetails;
