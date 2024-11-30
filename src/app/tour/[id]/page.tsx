// src/app/tour/[id]/page.tsx

'use client';  // Marking this as a client-side component

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation"; // Correct import for App Router
import { Tour } from "../../types/tour"; // Import your Tour type here
import Image from "next/image"; // Next.js Image component for optimized image loading

const TourDetailPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get tour ID from the query parameters

  const [tourData, setTourData] = useState<Tour | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      // Fetch tour data using the ID from the URL
      axios
        .get<Tour>(`https://btt.triumphdigital.co.th/api/tour/detail/${id}`)
        .then((response) => {
          setTourData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tour details:", error);
          setLoading(false);
        });
    }
  }, [id]); // Re-fetch when `id` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tourData) {
    return <div>Tour not found.</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Tour Image & Video */}
        <div>
          <Image
            src={tourData.image}
            alt={tourData.title}
            width={800}
            height={500}
            className="w-full h-auto rounded-lg"
          />
          <div className="mt-4">
            <iframe
              width="100%"
              height="315"
              src={tourData.video}
              title="Tour Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Right Column: Tour Info */}
        <div>
          <h1 className="text-3xl font-bold">{tourData.title}</h1>
          <p className="text-xl text-gray-600 mt-2">
            {tourData.location.name} - {tourData.duration}
          </p>
          <div className="flex items-center mt-4">
            <span className="text-2xl font-bold">${tourData.sale_price}</span>
            <span className="text-lg line-through ml-4">${tourData.price}</span>
            <span className="text-sm text-red-500 ml-4">
              {tourData.discount_percent} OFF
            </span>
          </div>
          <p className="mt-4">{tourData.content}</p>
          
          {/* Gallery */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {tourData.gallery.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                alt={`Gallery Image ${image.id}`}
                width={300}
                height={200}
                className="w-full h-auto rounded-lg"
              />
            ))}
          </div>

          {/* Reviews */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Reviews</h2>
            {tourData.review_lists.data.map((review) => (
              <div key={review.id} className="mt-4">
                <p className="font-semibold">{review.author.name}</p>
                <p>{review.content}</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">{"⭐".repeat(review.rate_number)}</span>
                  <span className="ml-2 text-gray-500">{review.rate_number}</span>
                </div>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">FAQs</h2>
            {tourData.faqs.map((faq) => (
              <div key={faq.title} className="mt-4">
                <p className="font-semibold">{faq.title}</p>
                <p>{faq.content}</p>
              </div>
            ))}
          </div>

          {/* Extra Pricing */}
          {tourData.extra_price.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Extra Pricing</h2>
              <ul className="list-disc pl-5">
                {tourData.extra_price.map((extra, index) => (
                  <li key={index} className="mt-2">
                    {extra.name}: ${extra.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;
