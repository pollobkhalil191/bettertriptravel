'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchToursByLocation } from '../../Api/tourService';
import { FaHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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

const ParisTours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParisTours = async () => {
      try {
       

        // Replace `2` with the actual location_id for Paris
        const locationIdForParis = 2; // Example location_id for Paris
        const data: TourResponse = await fetchToursByLocation(locationIdForParis);

        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setTours(data.data); // Filtered tours for Paris
          setError(null); // Clear any error
        } else {
          setTours([]);
          setError('No tours available for Paris');
        }
      } catch (err) {
        setError('Failed to fetch tour data');
        console.error('Error fetching tours:', err);
      } 
    };

    fetchParisTours();
  }, []);

 
  if (error) return <div>{error}</div>;

 

  const isSliderActive = tours.length > 4;

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Explore more in New York</h2>
      <div className="mb-8">
       
        {/* Swiper Slider if there are more than 4 tours */}
        {isSliderActive ? (
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="tour-swiper"
            navigation={false} // Disable navigation (arrows)
          >
            {tours.map((tour) => (
              <SwiperSlide key={tour.id}>
                <Link href={`/tour/${tour.id}`}>
                  <div className="tour-card bg-white shadow-sm rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out border relative flex flex-col h-full">
                    {/* Favorite Icon */}
                    <div className="absolute top-2 right-2 z-10 rounded-full p-2 shadow-md cursor-pointer">
                      <FaHeart className="text-white hover:text-red-500 transition duration-200" size={20} />
                    </div>

                    {/* Tour Image */}
                    <div className="relative w-full h-[200px] overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        width={500}
                        height={200}
                        className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>

                    {/* Tour Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Location */}
                      <p className="text-sm font-medium text-gray-500">{tour.location?.name || 'Unknown Location'}</p>

                      {/* Title (One or Two Lines) */}
                      <h3 className="text-xl font-semibold line-clamp-2 mb-2">{tour.title}</h3>

                      {/* Duration */}
                      <p className="text-gray-600">{tour.duration}</p>

                      {/* Reviews */}
                      <div className="mt-2 flex items-center">
                        <span className="text-yellow-500">{'★'.repeat(Math.round(tour.review_score.score_total))}</span>
                        <span className="ml-1 text-gray-500">({tour.review_score.total_review} reviews)</span>
                      </div>

                      {/* Price */}
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
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <Link href={`/tour/${tour.id}`} key={tour.id}>
                <div className="tour-card bg-white shadow-sm rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out border relative flex flex-col h-full">
                  {/* Favorite Icon */}
                  <div className="absolute top-2 right-2 z-10 rounded-full p-2 shadow-md cursor-pointer">
                    <FaHeart className="text-white hover:text-red-500 transition duration-200" size={20} />
                  </div>

                  {/* Tour Image */}
                  <div className="relative w-full h-[200px] overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      width={500}
                      height={200}
                      className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>

                  {/* Tour Content */}
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Location */}
                    <p className="text-sm font-medium text-gray-500">{tour.location?.name || 'Unknown Location'}</p>

                    {/* Title (One or Two Lines) */}
                    <h3 className="text-xl font-semibold line-clamp-2 mb-2">{tour.title}</h3>

                    {/* Duration */}
                    <p className="text-gray-600">{tour.duration}</p>

                    {/* Reviews */}
                    <div className="mt-2 flex items-center">
                      <span className="text-yellow-500">{'★'.repeat(Math.round(tour.review_score.score_total))}</span>
                      <span className="ml-1 text-gray-500">({tour.review_score.total_review} reviews)</span>
                    </div>

                    {/* Price */}
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
        )}
      </div>
    </div>
  );
};

export default ParisTours;
