"use client"; // Enables React client-side features like state and effects

import React, { useState, useEffect } from "react";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]); // State to store blogs
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(false); // State for handling errors

  // Fetch blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch data from the API
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) {
          throw new Error(`Failed to fetch blogs. Status code: ${res.status}`);
        }
        const data = await res.json();
        setBlogs(data); // Store blogs in state
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(true); // Set error state to true
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBlogs();
  }, []);

  // Display loading state
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading blogs...
        </p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600">
          Failed to load blogs. Please try again later.
        </p>
      </div>
    );
  }

  // Display blogs when loaded
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Blog Posts
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h2>
            <a href={`/blog/${blog.id}`} className="block">
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                Read More
              </button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
