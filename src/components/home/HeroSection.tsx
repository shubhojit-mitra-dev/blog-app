"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function HeroSection() {
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
    <section className="container px-8 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
      <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8 border-b-2 pb-10">
        <h1 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
          A <span className="font-semibold">free repository</span> for community <br className="hidden md:block" /> posts about <br className="md:hidden" /> <span className="font-semibold underline decoration-primary">
            <span ref={el} />
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, placeat. <br className="hidden md:block" /> Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
        <Image src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg" alt="tailwind css components" className="w-full h-full max-w-md mx-auto" width={400} height={200} />
      </div>
    </section>
  );
}
