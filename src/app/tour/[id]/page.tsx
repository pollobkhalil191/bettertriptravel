'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

type TourDetail = {
  id: number;
  title: string;
  price: string;
  sale_price: string;
  discount_percent: string;
  image: string;
  content: string;
  location: {
    id: number;
    name: string;
  };
  banner_image: string;
  gallery: string[];
  video?: string;
  duration: string;
  review_score: {
    score_total: string;
    score_text: string;
    total_review: number;
  };
  faqs: { title: string; content: string }[];
  include: { title: string }[];
  exclude: { title: string }[];
  itinerary: {
    title: string;
    desc: string;
    content: string;
    image: string;
  }[];
  related: {
    id: number;
    title: string;
    price: string;
    sale_price: string;
    discount_percent: string;
    image: string;
    location: { name: string };
    duration: string;
  }[];
};

const getTourDetails = async (id: string): Promise<TourDetail> => {
  const res = await axios.get(
    `https://btt.triumphdigital.co.th/api/tour/detail/${id}`
  );
  return res.data.data;
};

type Props = {
  params: {
    id: string;
  };
};

const TourDetails: React.FC<Props> = ({ params }) => {
  const [tour, setTour] = useState<TourDetail | null>(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      if (params?.id) {
        const tourData = await getTourDetails(params.id);
        setTour(tourData);
      }
    };

    fetchTourDetails();
  }, [params]);

  if (!tour) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="relative h-64 sm:h-96 w-full rounded-lg overflow-hidden shadow-lg">
        <Image
          src={tour.banner_image}
          alt={tour.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-5xl font-bold">
            {tour.title}
          </h1>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="sm:col-span-2 space-y-6">
          {/* Tour Content */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
            <div
              className="mt-4 text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: tour.content }}
            ></div>
          </div>

          {/* Gallery */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {tour.gallery.map((image, idx) => (
                <Image
                  key={idx}
                  src={image}
                  alt={`Gallery ${idx + 1}`}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Itinerary</h2>
            <div className="space-y-6 mt-4">
              {tour.itinerary.map((day, idx) => (
                <div key={idx} className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">{day.title}</h3>
                  <p className="text-gray-600 mt-2">{day.desc}</p>
                  <Image
                    src={day.image}
                    alt={day.title}
                    width={300}
                    height={200}
                    className="rounded-lg mt-2"
                  />
                  <p className="text-gray-600 mt-2">{day.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">FAQs</h2>
            <div className="mt-4 space-y-4">
              {tour.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-gray-100 p-4 rounded-lg group"
                >
                  <summary className="font-semibold cursor-pointer group-open:text-blue-600">
                    {faq.title}
                  </summary>
                  <p className="mt-2 text-gray-600">{faq.content}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Price and Booking */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">Price</h2>
            <p className="text-lg mt-2 text-gray-600">
              <span className="line-through text-gray-400">${tour.price}</span>{' '}
              <span className="text-green-600 font-bold text-xl">
                ${tour.sale_price}
              </span>
            </p>
            <p className="text-red-500 font-semibold mt-2">
              Save {tour.discount_percent}!
            </p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>

          {/* Reviews */}
          <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
            <p className="text-gray-600 mt-2">
              <strong>{tour.review_score.score_text}</strong> -{' '}
              {tour.review_score.score_total}/5 (
              {tour.review_score.total_review} reviews)
            </p>
          </div>
        </div>
      </div>

      {/* Related Tours */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Related Tours</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          {tour.related.map((related) => (
            <div
              key={related.id}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src={related.image}
                alt={related.title}
                width={300}
                height={200}
                className="object-cover w-full"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{related.title}</h3>
                <p className="text-sm text-gray-500">
                  {related.location.name}
                </p>
                <p className="text-green-600 mt-2">
                  ${related.sale_price} <span className="text-gray-500">(was ${related.price})</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
