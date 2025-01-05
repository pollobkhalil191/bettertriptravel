// api/news.ts

// Fetch News Categories
export const fetchNewsCategories = async () => {
  const res = await fetch("https://btt.triumphdigital.co.th/api/news/category");

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  if (data && Array.isArray(data.data)) {
    return data.data; // Return the categories array
  }

  return []; // Return an empty array if no valid 'data' array is found
};

// Fetch News Details based on the slug
export const fetchNewsDetails = async (slug: string) => {
  const res = await fetch(`https://btt.triumphdigital.co.th/api/news/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch news details");
  }

  const data = await res.json();

  if (data && data.data) {
    return data.data; // Return the news details
  }

  throw new Error("News not found"); // Throw error if no data found for this slug
};
