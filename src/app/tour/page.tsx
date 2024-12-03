import TourCard from '@/components/TourCard';
import React from 'react';

const page = () => {
  // Set locationId to null to show all tours
  const locationId = null; // or you can omit it completely

  return (
    <div>
      {/* Pass location_id as a prop to TourCard */}
      <TourCard location_id={locationId} />
    </div>
  );
};

export default page;
