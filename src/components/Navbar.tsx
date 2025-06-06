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

const Navbar: React.FC = () => {

  return (
    <nav className="border-b z-50 bg-background/50 sticky top-0 backdrop-blur">
      <div className="container mx-auto px-8 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"} className="text-2xl font-extrabold text-primary">
          {"<DevCodeJourney/>"}
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
          {/* <div className='flex gap-2'>
            <Link href={"/login"} className={buttonVariants({ variant: "default" })}>
              LOGIN
            </Link>
            <Link href={"/signup"} className={buttonVariants({ variant: "outline" })}>
              SIGNUP
            </Link>
          </div> */}
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
                    <Link href="/blogs" className="text-foreground hover:text-foreground/50 underline-animation">
                      BLOGS
                    </Link>
                    <Link href="/contact" className="text-foreground hover:text-foreground/50 underline-animation">
                      CONTACT
                    </Link>
                  </div>
                  {/* <div className='flex flex-col items-center gap-8'>
                    <Link href={"/login"} className={buttonVariants({ variant: "outline" })}>
                      LOGIN
                    </Link>
                    <Link href={"/signup"} className={buttonVariants({ variant: "outline" })}>
                      SIGNUP
                    </Link>
                  </div> */}
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