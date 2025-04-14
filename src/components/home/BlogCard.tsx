import Image from "next/image";
import { Button } from "@/components/ui/button";
import { StaticImageData } from "next/image";

export interface BlogCardProps {
  image: string | StaticImageData;
  title: string;
  description: string;
}

export default function BlogCard({ image, title, description }: BlogCardProps) {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
      <div className="p-7 bg-white rounded-lg shadow-lg dark:bg-[#111] transform transition duration-500 hover:scale-105 hover:border-2 hover:border-primary">
        <Image 
          width={200} 
          height={150} 
          src={image} 
          className="w-full h-50 object-cover rounded-t-lg" 
          alt={title} 
        />
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
          <Button className="m-2 cursor-pointer" variant="outline">Read More</Button>
        </div>
      </div>
    </div>
  );
}
