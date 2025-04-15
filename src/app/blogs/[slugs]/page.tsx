"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Blog {
    id: number;
    title: string;
    description: string;
    coverImage: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    content?: string; // This might not be in your current data model
}

// Function to convert a title to a slug
const titleToSlug = (title: string): string => {
    return title.replace(/\s+/g, '-').toLowerCase();
};

const BlogPage = () => {
    const { slugs } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                // First, fetch all blogs
                const response = await fetch('/api/blogs');

                if (!response.ok) {
                    throw new Error('Failed to fetch blogs');
                }

                const allBlogs = await response.json();

                // Find the blog with a matching slug
                const foundBlog = allBlogs.find((blog: Blog) =>
                    titleToSlug(blog.title) === slugs
                );

                if (!foundBlog) {
                    setError('Blog not found');
                    return;
                }

                setBlog(foundBlog);
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Failed to load blog. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (slugs) {
            fetchBlog();
        }
    }, [slugs]);

    if (loading) {
        return <div className="max-w-5xl mx-auto p-4">Loading blog...</div>;
    }

    if (error || !blog) {
        return <div className="max-w-5xl mx-auto p-4">Error: {error || 'Blog not found'}</div>;
    }

    // Format date for display
    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="max-w-5xl mx-auto p-4">
            {blog.coverImage && (
                <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    width={800}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
            )}
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-lg mb-2">{blog.description}</p>
            <div className="flex gap-2 mb-8">
                <p className="text-sm text-gray-500 italic">By {blog.author}</p>
                <p className="text-sm text-gray-500">{formattedDate}</p>
            </div>
            {blog.content ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} className="prose max-w-none" />
            ) : (
                <p className="text-gray-600">This blog content is not available yet.</p>
            )}
        </div>
    );
};

export default BlogPage;