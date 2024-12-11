// app/tour/[id]/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';  // Use the useParams hook for App Router
import { fetchTourDetails, TourDetailsResponse } from '../../../Api/tourDetails';
import Image from 'next/image';
import CheckAvailability from '@/components/CheckAvailability';

const TourDetailsPage = () => {
  const { id } = useParams(); // Get the dynamic tour ID from the URL
  const [tour, setTour] = useState<TourDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch tour details when the component mounts or ID changes
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const tourData = await fetchTourDetails(id as string);
          setTour(tourData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching tour details:", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);

  // If loading, display a loading state
  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // If no tour details are found, display an error message
  if (!tour) {
    return <div className="text-center p-4">Tour not found.</div>;
  }

  // Destructure tour data for easy access
  const {
    title,
    price,
    sale_price,
    discount_percent,
    content,
    address,
    location,
    gallery,
    banner_image,
    duration,
    review_score,
    review_lists,
  } = tour.data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner Image */}
      <div className="relative mb-8">
        <Image src={banner_image} alt={title} width={500} height={500} className="w-full h-96 object-cover" />
      </div>

      {/* Title and Pricing */}
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="flex items-center gap-4 mb-4">
        <p className="text-xl text-gray-700">Price: ${price}</p>
        {sale_price && (
          <p className="text-xl text-red-500 line-through">${sale_price}</p>
        )}
        {discount_percent && (
          <p className="text-xl text-green-500">-{discount_percent} % OFF</p>
        )}
      </div>

      {/* Location and Address */}
      <div className="text-gray-600 mb-4">
        <p>{location.name}</p>
        <p>{address}</p>
      </div>

      {/* Duration */}
      <div className="text-gray-600 mb-4">
        <p>Duration: {duration}</p>
      </div>

      {/* Tour Content */}
      <div className="prose mb-8">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Gallery */}
      {gallery && gallery.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((image, index) => (
              <div key={index} className="w-full h-40 bg-gray-200">
                <Image src={image} width={500} height={500} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <div className="text-gray-700">
          <p>{review_score.score_text}</p>
          <div className="flex gap-2">
            {Object.entries(review_score.rate_score).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <span className="font-semibold">{value.title}:</span>
                <span className="ml-2">{value.total}</span>
              </div>
            ))}
          </div>
        </div>
            <div>
            <CheckAvailability tourId={id as string} />
            </div>
        {review_lists?.data && review_lists.data.length > 0 && (
          <div className="mt-4">
            {review_lists.data.map((review, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg">
                <p className="font-semibold">{review.author.name}</p>
                <p>{review.content}</p>
                <p className="text-yellow-500">Rating: {review.rate_number} / 5</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourDetailsPage;
