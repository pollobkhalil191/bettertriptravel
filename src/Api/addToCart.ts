import axios from "axios";

export const addToCart = async (
  tourId: number | string,
  startDate: string,
  guests: { adult: string; child: string },
  serviceFeeEnabled: number,
  token: string
) => {
  const personTypes = [
    {
      name: "Adult",
      desc: "Age 18+",
      min: "1",
      max: "10",
      price: "1000",
      display_price: "$1,000",
      number: guests.adult,
    },
    {
      name: "Child",
      desc: "Age 6-17",
      min: "0",
      max: "10",
      price: "300",
      display_price: "$300",
      number: guests.child,
    },
  ];

  const extraPrice = serviceFeeEnabled
    ? [
        {
          name: "Clean",
          price: "100",
          type: "one_time",
          number: 1,
          enable: "1",
          price_html: "$100",
          price_type: "",
        },
      ]
    : [];

  const payload = {
    service_id: tourId,
    service_type: "tour",
    start_date: startDate,
    person_types: personTypes,
    extra_price: extraPrice,
    guests: guests.adult + guests.child,
  };

  try {
    const response = await axios.post(
      "https://btt.triumphdigital.co.th/api/booking/addToCart",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || "Failed to add to cart.";
    } else {
      throw "Failed to add to cart.";
    }
  }
};
