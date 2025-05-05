"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import MarkdownContent from '@/components/MarkdownContent';

interface Blog {
    id: number;
    title: string;
    description: string;
    coverImage: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    content?: string;
}

// Function to convert a title to a slug
const titleToSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^\w\s-.]/g, '') // Keep dots in the slug
        .replace(/\s+/g, '-');
};

// Normalize slug for comparison (to handle potential URL encoding issues)
const normalizeSlug = (slug: string): string => {
    return decodeURIComponent(slug)
        .toLowerCase()
        .replace(/\s+/g, '-');
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
                    normalizeSlug(titleToSlug(blog.title)) === normalizeSlug(String(slugs))
                );

                if (!foundBlog) {
                    setError('Blog not found');
                    return;
                }

                // Fetch the full blog content using the blog ID
                const contentResponse = await fetch(`/api/blogs/${foundBlog.id}`);
                
                if (!contentResponse.ok) {
                    throw new Error('Failed to fetch blog content');
                }
                
                const blogWithContent = await contentResponse.json();
                setBlog(blogWithContent);
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
        return (
            <div className="flex flex-col items-center justify-center h-screen w-full">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading blog...</p>
            </div>
        );
    }

    if (error || !blog) {
        return <div className="max-w-5xl mx-auto p-4 h-screen text-start">Error: {error || 'Blog not found'}</div>;
    }

    // Format date for display
    const formattedDate = new Date(blog.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="max-w-5xl mx-auto p-4 py-12">
            {/* Blog Header */}
            <div className="mb-10">
                {blog.coverImage && (
                    <div className="relative w-full h-80 mb-8 rounded-lg overflow-hidden">
                        <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
                <h1 className="text-4xl font-bold mb-4 text-foreground">{blog.title}</h1>
                <p className="text-xl mb-6 text-muted-foreground">{blog.description}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{blog.author}</span>
                    <span className="mx-2">•</span>
                    <time dateTime={blog.updatedAt}>{formattedDate}</time>
                </div>
            </div>
            
            {/* Blog Content */}
            <article className="mt-12">
                {blog.content ? (
                    <MarkdownContent content={blog.content} />
                ) : (
                    <p className="text-muted-foreground">This blog content is not available yet.</p>
                )}
            </article>
        </div>
    );
};

export default BlogPage;