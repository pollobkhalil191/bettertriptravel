// app/tour/[id]/page.tsx

import { fetchTourDetails } from '../../../Api/tourDetails'; // Your API function
import { notFound } from 'next/navigation'; // Use for handling errors
import Image from 'next/image';
import Gallery from '../../../components/Gallery'; // Import the Gallery component

type Review = {
  author: { name: string };
  content: string;
  rate_number: number;
};

type ReviewScore = {
  score_text: string;
  score_total: number;
  rate_score: Record<string, { title: string; total: number }> ;
};

type Gallery = string[];

type ExtraPrice = {
  name: string;
  price: number;
  type: string;
};

type Location = {
  name: string;
};

type Tour = {
  title: string;
  price: number;
  sale_price?: number;
  discount_percent?: string;
  content: string;
  address: string;
  location: Location;
  gallery: Gallery;
  video?: string;
  enable_extra_price: boolean;
  extra_price?: ExtraPrice[];
  duration: string;
  review_score: ReviewScore;
  review_lists?: { data: Review[] };
  banner_image?: string;
};

interface PageProps {
  params: {
    id: string; // Dynamic parameter from the URL (e.g., `tour/123`)
  };
}

const TourDetails = async ({ params }: PageProps) => {
  const { id } = params; // Access the `id` parameter directly
  let tour: Tour | null = null;

  try {
    const data = await fetchTourDetails(id);
    tour = data.data;
  } catch (error) {
    console.error('Error fetching tour details:', error);
    notFound(); // You can show a "not found" page if the tour doesn't exist
  }

  if (!tour) {
    return <div>Tour not found</div>;
  }

  // Default to empty array if tour.gallery is undefined
  const galleryImages = tour.gallery || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{tour.title}</h1>
      
      {/* Review Score */}
      <div className="review-score mb-8">
        <p className="text-lg text-gray-800">
          Rating: <span className="font-semibold">{tour.review_score.score_text}</span> 
          ({tour.review_score.score_total} stars)
        </p>
        
        {/* Render stars dynamically based on score_total */}
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`text-xl ${index < Math.round(tour.review_score.score_total) ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Banner Image */}
      {tour.banner_image && (
        <div className="relative w-full h-64 lg:h-96 mb-8">
          <Image
            src={tour.banner_image}
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            priority // To prioritize loading this image
          />
        </div>
      )}

      {/* Gallery Component */}
      <Gallery images={galleryImages} />

      <div className="flex flex-col lg:flex-row justify-between items-start space-y-6 lg:space-y-0 lg:space-x-6 mt-6">
  {/* Description Section */}
  <div className="tour-description  mb-8 text-sm font-semibold text-gray-700 space-y-4 flex-1">
    <div dangerouslySetInnerHTML={{ __html: tour.content }} />
  </div>

  {/* Price and Availability Section */}
  <div className="flex flex-col lg:w-1/3 space-y-6 lg:space-y-8">
    {/* Price Section */}
    <div className="price-section flex items-center justify-between border-2 border-t-4 border-t-blue-600 bg-white p-6  shadow-sm">
      {tour.sale_price && (
        <p className="text-3xl font-semibold text-primary ">
          <span className="text-sm text-primary">From</span> <br/>
          ${tour.sale_price}
          <br />
          <span className="text-sm text-primary">per person</span>
        </p>
      )}
      <div>
      <div className="flex justify-center lg:justify-start">
      <button className="bg-blue-500  text-white py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300 w-full lg:w-auto">
        Check Availability
      </button>
    </div>
    </div>
    </div>

    
    
    
  </div>
</div>


     
      {/* Location and Address */}
      <div className="location-section mb-8">
        <p className="text-xl font-semibold text-gray-800">Location: {tour.location.name}</p>
        <p className="text-sm text-gray-500">{tour.address}</p>
      </div>

      {/* Video */}
      {tour.video && (
        <div className="video mb-8">
          <iframe
            src={tour.video}
            title="Tour Video"
            width="100%"
            height="400"
            className="rounded-lg"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Extra Price (Optional Add-ons) */}
      {tour.enable_extra_price && tour.extra_price && (
        <div className="extra-price mb-8">
          <h3 className="text-xl font-semibold text-gray-800">Extra Price Options:</h3>
          <div className="space-y-4">
            {tour.extra_price.map((item, index) => (
              <div key={index} className="flex justify-between text-lg text-gray-700">
                <p>{item.name}</p>
                <p className="text-green-600">${item.price} ({item.type})</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Duration */}
      <div className="duration mb-8">
        <p className="text-lg text-gray-700">Duration: {tour.duration}</p>
      </div>

      {/* Review Score */}
      <div className="review-score mb-8">
        <p className="text-lg text-gray-800">Rating: <span className="font-semibold">{tour.review_score.score_text}</span> ({tour.review_score.score_total} stars)</p>
        <div className="review-stats grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {tour.review_score.rate_score && Object.keys(tour.review_score.rate_score).map((key) => (
            <div key={key} className="flex flex-col items-center">
              <p className="font-semibold">{tour.review_score.rate_score[key].title}</p>
              <p className="text-lg">{tour.review_score.rate_score[key].total}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {tour.review_lists && (
        <div className="reviews-list">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Reviews:</h3>
          {tour.review_lists.data.map((review, index) => (
            <div key={index} className="review mb-4">
              <p className="text-lg text-gray-800">{review.author.name}</p>
              <p className="text-sm text-gray-500">{review.content}</p>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-xl ${index < Math.round(review.rate_number) ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourDetails;
