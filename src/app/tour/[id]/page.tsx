import { fetchTourDetails } from '../../../Api/tourDetails'; // Your API function
import { notFound } from 'next/navigation'; // Use for handling errors

import Gallery from '../../../components/Gallery'; // Import the Gallery component

interface PageProps {
  params: {
    id: string; // Dynamic parameter from the URL (e.g., `tour/123`)
  };
}

// Async function to fetch the data
async function getTourDetails(id: string) {
  try {
    const data = await fetchTourDetails(id);
    return data?.data || null;
  } catch (error) {
    console.error('Error fetching tour details:', error);
    return null;
  }
}

// Synchronous React Server Component
const TourDetails = async ({ params }: PageProps) => {
  const { id } = params;
  const tour = await getTourDetails(id);

  if (!tour) {
    notFound(); // Redirect to a "not found" page if the tour doesn't exist
    return null; // Ensures no component is rendered
  }

  // Safely handle undefined fields
  const galleryImages = tour?.gallery || [];
  const reviewScore = tour?.review_score || { score_text: 'No reviews', score_total: 0 };
  const salePrice = tour?.sale_price || 'N/A';
  const location = tour?.location?.name || 'Unknown';
  const address = tour?.address || 'Not provided';
  const video = tour?.video || null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{tour.title}</h1>

      {/* Review Score */}
      <div className="review-score mb-8">
        <p className="text-lg text-gray-800">
          Rating: <span className="font-semibold">{reviewScore.score_text}</span> 
          ({reviewScore.score_total} stars)
        </p>
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`text-xl ${index < Math.round(reviewScore.score_total) ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Gallery Component */}
      <Gallery images={galleryImages} />

      <div className="flex flex-col lg:flex-row justify-between items-start space-y-6 lg:space-y-0 lg:space-x-6 mt-6">
        {/* Description Section */}
        <div className="tour-description mb-8 text-sm font-semibold text-gray-700 space-y-4 flex-1">
          <div dangerouslySetInnerHTML={{ __html: tour?.content || 'No description available.' }} />
        </div>

        {/* Price and Availability Section */}
        <div className="flex flex-col lg:w-1/3 space-y-6 lg:space-y-8">
          <div className="price-section flex items-center justify-between border-2 border-t-4 border-t-blue-600 bg-white p-6 shadow-sm">
            {salePrice !== 'N/A' && (
              <p className="text-3xl font-semibold text-primary ">
                <span className="text-sm text-primary">From</span> <br />
                ${salePrice}
                <br />
                <span className="text-sm text-primary">per person</span>
              </p>
            )}
            <div>
              <button className="bg-blue-500 text-white py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Location and Address */}
      <div className="location-section mb-8">
        <p className="text-xl font-semibold text-gray-800">Location: {location}</p>
        <p className="text-sm text-gray-500">{address}</p>
      </div>

      {/* Video */}
      {video && (
        <div className="video mb-8">
          <iframe
            src={video}
            title="Tour Video"
            width="100%"
            height="400"
            className="rounded-lg"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default TourDetails;
