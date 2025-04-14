import { Button } from "@/components/ui/button";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingCardProps {
  title: string;
  price: string;
  features: PricingFeature[];
  isFeatured?: boolean;
  label?: string;
}

export default function PricingCard({ 
  title, 
  price, 
  features, 
  isFeatured = false,
  label
}: PricingCardProps) {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
      <div className={`p-6 bg-white flex flex-col items-center rounded-lg shadow-lg dark:bg-[#111] transform transition duration-500 hover:scale-105 text-center ${isFeatured ? 'border-2 border-purple-500' : ''}`}>
        <h3 className="text-4xl font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
        {isFeatured && (
                  <div className="mt-1 h-1 w-32 bg-primary -rotate-3 rounded-full"></div>

        )}
        <p className="mt-4 text-gray-500 dark:text-gray-300">{price}/month</p>
        {label && (
          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-purple-500 rounded-full">
            {label}
          </span>
        )}
        <ul className="mt-6 mb-10 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-gray-600 dark:text-gray-400">
              {feature.included ? feature.text : <s>{feature.text}</s>}
            </li>
          ))}
        </ul>
        <Button 
          className="mx-1 w-full hover:border-2 hover:border-purple-500 cursor-pointer" 
          variant="secondary"
        >
          Choose Plan
        </Button>
      </div>
    </div>
  );
}
