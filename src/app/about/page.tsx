"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BlogCard from '@/components/home/BlogCard';
import aboutData from '@/data/about.json';

interface Blog {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

// Helper function to apply scale-hover-span to text
const AnimatedText = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-wrap">
      {text.split(' ').map((word, wordIndex) => (
        <div key={wordIndex} className="flex mr-1 scale-hover-span">
          {[...word].map((letter, letterIndex) => (
            <span
              key={`${wordIndex}-${letterIndex}`}
              className="h-7"
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function AboutPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest blogs
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{aboutData.hero.title}</h1>
              <div className="text-xl mb-8 text-foreground">
                <AnimatedText text={aboutData.hero.subtitle} />
              </div>
              <div>
                <Link href="/blogs">
                  <Button size="lg" className="mr-4">Read My Blogs</Button>
                </Link>
                <Link href="https://shubhojit-mitra-dev.vercel.app/portfolio" target="_blank">
                  <Button variant="outline" size="lg">Visit Portfolio</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary">
                <Image 
                  src="https://avatars.githubusercontent.com/u/shubhojit-mitra-dev" 
                  alt="Shubhojit Mitra" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-foreground">About Me</h2>
          <div className="prose max-w-none dark:prose-invert space-y-6">
            {aboutData.aboutMe.paragraphs.map((paragraph, index) => (
              <div key={index} className="text-lg text-muted-foreground">
                <AnimatedText text={paragraph} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why I Write */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Why I Write Coding Blogs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {aboutData.whyIWrite.cards.map((card, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-foreground">{card.title}</h3>
                  <div className="text-muted-foreground">
                    <AnimatedText text={card.content} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How My Blogs Help */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-foreground">How My Blogs Can Help You</h2>
          <div className="prose max-w-none dark:prose-invert">
            <div className="text-lg mb-6 text-muted-foreground">
              <AnimatedText text={aboutData.howMyBlogsHelp.intro} />
            </div>
            <ul className="list-disc pl-6 mb-6 space-y-3 text-muted-foreground">
              {aboutData.howMyBlogsHelp.points.map((point, index) => (
                <li key={index} className="ml-2">
                  <AnimatedText text={point} />
                </li>
              ))}
            </ul>
            <div className="text-lg text-muted-foreground">
              <AnimatedText text={aboutData.howMyBlogsHelp.conclusion} />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-foreground">My Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {aboutData.expertise.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold mb-4 text-foreground">{section.title}</h3>
                <div className="mb-4 text-muted-foreground">
                  <AnimatedText text={section.skills} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Latest Blogs</h2>
          <div className="text-lg mb-8 text-muted-foreground">
            <AnimatedText text="Check out my most recent articles to start learning right away!" />
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 w-full">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-lg text-muted-foreground">Loading blogs...</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  image={blog.coverImage || "https://via.placeholder.com/400x250"}
                  title={blog.title}
                  description={blog.description}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link href="/blogs">
              <Button size="lg">View All Blogs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">{aboutData.connect.title}</h2>
          <div className="mb-6 text-muted-foreground flex justify-center">{aboutData.connect.description}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {aboutData.connect.links.map((link, index) => (
              <Link key={index} href={link.url} target={link.url.startsWith('http') ? "_blank" : undefined}>
                <Button variant="outline">{link.text}</Button>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}