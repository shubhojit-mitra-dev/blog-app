"use client";

import HeroSection from "@/components/home/HeroSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogsSection from "@/components/home/BlogsSection";

export default function Home() {
  return (
    <main className="dark:bg-[#111]">
      <HeroSection />
      <PricingSection />
      <TestimonialsSection />
      <BlogsSection />
    </main>
  );
}
