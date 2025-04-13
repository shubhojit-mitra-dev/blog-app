export interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

export default function TestimonialCard({ quote, name, title }: TestimonialCardProps) {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
      <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-[#1b1b1b] transform transition duration-500 hover:scale-105 text-center">
        <p className="text-gray-600 dark:text-gray-400">&quot;{quote}&quot;</p>
        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">{name}</h3>
        <p className="text-gray-500 dark:text-gray-300">{title}</p>
      </div>
    </div>
  );
}
