'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import notFound from '@/assets/not-found.svg';

export default function NotFound() {
    return (
       <div className="flex flex-col lg:flex-row items-center justify-center h-screen bg-background text-foreground overflow-hidden -mt-20">
            <div className='flex flex-col items-center sm:w-1/2'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-[160px] font-bold text-primary">404</h1>
                    <p className="mt-4 text-xl max-w-[300px] text-foreground">
                        Oops! The page you&apos;re looking for doesn&apos;t exist.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8"
                >
                    <Link href="/">
                        <Button className={cn('px-6 py-3 text-lg')}>
                            Go Back Home
                        </Button>
                    </Link>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12 sm:w-1/2 p-10"
            >
                <Image
                    width={300}
                    height={300}
                    src={notFound}
                    alt="Not Found Illustration"
                    className="w-full h-full"
                />
            </motion.div>
        </div>

    );
}