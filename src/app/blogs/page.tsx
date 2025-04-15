"use client";

import React, { useEffect, useState } from 'react';
import BlogCard from '@/components/home/BlogCard';

interface Blog {
    id: number;
    title: string;
    description: string;
    coverImage: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

const BlogsPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/blogs');

                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }

                const data = await response.json();
                setBlogs(data);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Failed to load blogs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                    All Blogs
                </h1>

                {loading && (
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-600 dark:text-gray-300">Loading blogs...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-10">
                        <p className="text-lg text-red-500">{error}</p>
                    </div>
                )}

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

                {!loading && !error && blogs.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-600 dark:text-gray-300">No blogs found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogsPage;