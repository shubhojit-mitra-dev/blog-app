"use client";

import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

interface Blog {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestBlogs() {
      try {
        const response = await fetch('/api/blogs/latest');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestBlogs();
  }, []);

  return (
    <section className="py-12 bg-gray-100 dark:bg-[#1b1b1b]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Top Blogs</h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Check out our most popular blog posts</p>
        </div>
        <div className="flex flex-wrap justify-center">
          {loading ? (
            <p>Loading latest blogs...</p>
          ) : (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                image={blog.coverImage || "https://via.placeholder.com/400x250"}
                title={blog.title}
                description={blog.description}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
