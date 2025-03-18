import React from "react";

// Fetch blog details based on the dynamic "id"
export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // Generate paths for all blog posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false, // Show 404 for undefined paths
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  return {
    props: {
      post, // Pass blog details as props to the component
    },
  };
}

export default function BlogDetails({ post }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
        <p className="text-gray-700 leading-relaxed mb-4">{post.body}</p>
        <link
          href="/"
          className="text-blue-500 hover:underline text-lg"
        >
          ← Back to Home
        </link>
      </div>
    </div>
  );
}