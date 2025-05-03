"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Button } from "../ui/button";

export default function HeroSection() {
  const content = "A markdown based blog application that is fast, simple and easy to use. Made for developers, by developers, focusing on performance and simplicity, and maximizing developer experience.";

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Coding', 'Web Development', 'Full Stack', 'UI/UX Design', 'Next.js'],
      typeSpeed: 90,
      backSpeed: 50,
      backDelay: 3000,
      loop: true,
      loopCount: Infinity,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="container px-8 py-10 mx-auto lg:h-screen lg:space-x-8 lg:flex lg:items-center relative">
      <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8 pb-10 border-b-2">
        <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
          A <span className="font-semibold">free repository</span> for community <br className="hidden md:block" /> blogs about <br className="md:hidden" /> <span className="font-semibold underline decoration-primary">
            <span ref={el} />
          </span>
        </h1>
        <div className="mt-4 flex flex-wrap text-lg text-gray-500 dark:text-gray-300 w-full">
          {content.split(' ').map((word, wordIndex) => (
            <div key={wordIndex} className="flex mr-1 scale-hover-span">
              {[...word].map((letter, letterIndex) => (
                <span
                  key={`${wordIndex}-${letterIndex}`}
                  className='h-7'
                >
                  {letter}
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* <div className="mb-12 ml-8 mt-3 h-1 w-64 sm:w-96 bg-primary -rotate-3 rounded-full"></div> */}
        <Link href="/blog">
          <Button className="text-xl py-6 mt-8 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">Get Started</Button>
        </Link>
      </div>
      <div className="w-full mt-4 lg:mt-0 lg:w-1/2 hover:scale-105 transition-transform duration-300 ease-in-out">
        <Image src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg" alt="tailwind css components" className="w-full h-full max-w-md mx-auto" width={400} height={200} />
      </div>
    </section>
  );
}
