import { Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { ModeToggle } from './ui/toggle';
import { Button } from './ui/button';

const Navbar: React.FC = () => {

  return (
    <nav className="border-b z-50 bg-background/50 sticky top-0 backdrop-blur">
      <div className="container mx-auto px-8 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"} className="text-4xl text-primary">
          MyBlog
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link href="/" className="text-foreground hover:text-foreground/50 underline-animation">
            HOME
          </Link>
          <Link href="/about" className="text-foreground hover:text-foreground/50 underline-animation">
            ABOUT
          </Link>
          <Link href="/blogs" className="text-foreground hover:text-foreground/50 underline-animation">
            BLOGS
          </Link>
          <Link href="/contact" className="text-foreground hover:text-foreground/50 underline-animation">
            CONTACT
          </Link>
          <ModeToggle />
          <div className='flex gap-2'>
            <Button variant="default">
              LOGIN
            </Button>
            <Button variant="outline">
              SIGNUP
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className='flex items-center space-x-4'>
            <ModeToggle />
            <Sheet>
              <SheetTrigger><Menu /></SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className='text-xl'></SheetTitle>
                  {/* <SheetDescription>
                                    Navigate through the sections
                                    </SheetDescription> */}
                </SheetHeader>
                <div className="flex flex-col h-full pt-5 pb-10 space-y-4 items-center justify-between">
                  <div className='flex flex-col gap-8 text-2xl items-center'>
                    <Link href="/" className="text-foreground hover:text-foreground/50 underline-animation">
                      HOME
                    </Link>
                    <Link href="/about" className="text-foreground hover:text-foreground/50 underline-animation">
                      ABOUT
                    </Link>
                    <Link href="/blog" className="text-foreground hover:text-foreground/50 underline-animation">
                      BLOG
                    </Link>
                    <Link href="/contact" className="text-foreground hover:text-foreground/50 underline-animation">
                      CONTACT
                    </Link>
                  </div>
                  <div className='flex flex-col items-center gap-8'>
                    <Button variant="default" className='text-2xl px-10 py-7'>
                      LOGIN
                    </Button>
                    <Button variant="outline" className='text-2xl px-10 py-7'>
                      SIGNUP
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;