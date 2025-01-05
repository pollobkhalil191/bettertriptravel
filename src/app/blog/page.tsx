"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Define Blog Post Type
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  image_url: string;
  category: { name: string };
  created_at: string;
}

const BlogArchive = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Fetch blog posts
  useEffect(() => {
    fetch("https://btt.triumphdigital.co.th/api/news")
      .then((response) => response.json())
      .then((data) => setPosts(data.data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  if (posts.length === 0) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        Blog Archive
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="rounded-lg border border-gray-200 shadow-md"
          >
            <div className="relative">
              <Image
                src={post.image_url}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 bg-white text-gray-800 text-sm px-2 py-1 rounded-md">
                {post.category.name}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {post.title}
              </h2>
              <p
                className="text-gray-600 mb-4"
                dangerouslySetInnerHTML={{
                  __html: post.content.substring(0, 150) + "...",
                }}
              />
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:underline"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogArchive;
