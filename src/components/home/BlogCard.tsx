import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { StaticImageData } from "next/image";
import Link from "next/link";

export interface BlogCardProps {
  image: string | StaticImageData;
  title: string;
  description: string;
}

export default function BlogCard({ image, title, description }: BlogCardProps) {
  return (
    <div className="w-full p-4">
      <div className="p-7 bg-white rounded-lg shadow-lg dark:bg-[#111] transform transition duration-500 hover:scale-105 hover:border-2 hover:border-primary">
        <Image
          width={200}
          height={150}
          src={image}
          className="w-full h-50 object-cover rounded-t-lg"
          alt={title}
        />
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 overflow-hidden text-ellipsis">{title}</h3>
          <p className="mt-2 mb-8 text-gray-600 dark:text-gray-400 line-clamp-2 overflow-hidden text-ellipsis">{description}</p>
          <Link href={`/blogs/${title.replace(/\s+/g, '-').toLowerCase()}`} className={buttonVariants({ variant: "outline"})}>Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
