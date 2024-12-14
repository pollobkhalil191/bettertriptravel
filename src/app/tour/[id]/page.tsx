import { fetchTourDetails } from "../../../Api/tourDetails";
import { notFound } from "next/navigation";
import Gallery from "../../../components/Gallery";
import Image from "next/image";
import CheckAvailability from "@/components/CheckAvailability";
import { Metadata } from "next";

// Define the Tour details type
interface Tour {
  title: string;
  price: number;
  sale_price?: number;
  discount_percent?: string;
  content: string;
  address: string;
  location: {
    name: string;
  };
  gallery: string[];
  banner_image?: string;
  video?: string;
  review_score?: {
    score_text: string;
    score_total: number;
  };
  review_lists?: Record<string, unknown>;
}

// Define API Response Type
interface TourApiResponse {
  data: Tour | null;
}

// Page Props Interface for Dynamic Route
interface PageProps {
  params: Promise<{ id: string }>; // Correct type for Next.js dynamic route parameters
}

// Fetch Tour Details
async function getTourDetails(id: string): Promise<Tour | null> {
  try {
    const response: TourApiResponse = await fetchTourDetails(id)
;
    return response?.data || null;
  } catch (error) {
    console.error("Error fetching tour details:", error);
    return null;
  }
}

// Generate Metadata for the Page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Await params to ensure we can access the id properly
  const { id } = await params;

  const tour = await getTourDetails(id)
;

  if (!tour) {
    return {
      title: "Tour Not Found",
      description: "The tour you are looking for does not exist.",
    };
  }

  return {
    title: tour.title,
    description: tour.content.substring(0, 150) + "...", // Extract a short description
  };
}

// Main Component
const TourDetails = async ({ params }: PageProps) => {
  // Await params before accessing its properties
  const { id } = await params; // Now waiting for the promise to resolve

  if (!id) {
    notFound();
    return null;
  }

  const tour = await getTourDetails(id)
;

  if (!tour) {
    notFound();
    return null;
  }

  const {
    title,
    content,
    gallery = [],
    banner_image = "",
    video = null,
    review_score = { score_text: "No reviews", score_total: 0 },
    sale_price = "N/A",
    location = { name: "Unknown" },
    address = "Not provided",
  } = tour;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{title}</h1>

      <div className="review-score mb-8">
        <p className="text-lg text-gray-800">
          Rating: <span className="font-semibold">{review_score.score_text}</span> (
          {review_score.score_total} stars)
        </p>
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={`text-xl ${
                index < Math.round(review_score.score_total)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {video && (
          <div className="video mb-8">
            <iframe
              src={video}
              title="Tour Video"
              width="100%"
              height="388"
              className="rounded-lg"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {banner_image && (
          <div className="banner mb-8">
            <Image
              src={banner_image}
              alt="Banner"
              className="w-full h-96 object-cover rounded-lg"
              width={900}
              height={400}
            />
          </div>
        )}

        <Gallery images={gallery} />
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start space-y-6 lg:space-y-0 lg:space-x-6 mt-6">
        <div className="tour-description mb-8 text-sm font-semibold text-gray-700 space-y-4 flex-1">
          <div
            dangerouslySetInnerHTML={{
              __html: content || "No description available.",
            }}
          />
        </div>

        <div className="flex flex-col lg:w-1/3 space-y-6 lg:space-y-8">
          <div className="price-section flex items-center justify-between border-2 border-t-4 border-t-blue-600 bg-white p-6 shadow-sm">
            {sale_price !== "N/A" && (
              <p className="text-3xl font-semibold text-primary">
                <span className="text-sm text-primary">From</span> <br />
                ${sale_price}
                <br />
                <span className="text-sm text-primary">per person</span>
              </p>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Check Availability
            </button>
          </div>
        </div>
      </div>

      <div className="location-section mb-8">
        <p className="text-xl font-semibold text-gray-800">
          Location: {location.name}
        </p>
        <p className="text-sm text-gray-500">{address}</p>
        <CheckAvailability tourId={id} />
      </div>
    </div>
  );
};

export default TourDetails;