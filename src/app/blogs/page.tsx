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
        <div className="py-12 min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                    All Blogs
                </h1>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-16 w-full">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading blogs...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-10">
                        <p className="text-lg text-red-500">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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