import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";

interface AddToCartButtonProps {
  tourId: number;
  adultGuests: number;
  childGuests: number;
  serviceFee: number;
  startDate: Date | null;
  guests: number;
  token: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  tourId,
  adultGuests,
  childGuests,
  serviceFee,
  startDate,
}) => {
  const { isAuthenticated, token } = useAuth(); // Access authentication state and token
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Custom type guard to check if the error is an AxiosError
  const isAxiosError = (error: unknown): error is AxiosError => {
    return (error as AxiosError).isAxiosError !== undefined;
  };

  const handleAddToCart = async () => {
    if (!startDate) {
      setError("Please select a start date before adding to cart.");
      return;
    }

    if (!isAuthenticated || !token) {
      setError("You need to be logged in to add to cart.");
      return;
    }

    setError(null);
    setLoading(true);

    const startDateString = startDate.toISOString().split("T")[0];

    const personTypes = [
      {
        name: "Adult",
        desc: "Age 18+",
        min: "1",
        max: "10",
        price: "1000",
        display_price: "$1,000",
        number: adultGuests.toString(),
      },
      {
        name: "Child",
        desc: "Age 6-17",
        min: "0",
        max: "10",
        price: "300",
        display_price: "$300",
        number: childGuests.toString(),
      },
    ];

    const payload = {
      service_id: tourId,
      service_type: "tour",
      start_date: startDateString,
      person_types: personTypes,
      extra_price:
        serviceFee > 0
          ? [
              {
                name: "Service Fee",
                price: serviceFee.toString(),
                type: "one_time",
                number: 1,
                enable: "1",
                price_html: `$${serviceFee}`,
                price_type: "currency",
              },
            ]
          : [],
      guests: adultGuests + childGuests,
    };

    try {
      const response = await axios.post(
        "https://btt.triumphdigital.co.th/api/booking/addToCart",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 1) {
        const { booking_code, url } = response.data;
        alert(`Added to cart successfully! Booking Code: ${booking_code}`);
        window.location.href = url;
      } else {
        setError(response.data.message || "Failed to add to cart.");
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        // Define the type of response data to include the 'message' property
        const responseData = err.response?.data as { message?: string };
        const errorMessage =
          responseData?.message || "An error occurred while adding to cart.";
        setError(errorMessage);
      } else if (err instanceof Error) {
        // Fallback for other types of errors (e.g., network error)
        setError(err.message || "An unexpected error occurred.");
      } else {
        // Generic fallback for unknown errors
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="button"
        onClick={handleAddToCart}
        className={`${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600"
        } text-white py-2 px-4 rounded`}
        disabled={loading}
      >
        {loading ? "Adding to Cart..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default AddToCartButton;
