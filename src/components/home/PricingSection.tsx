import PricingCard from "./PricingCard";

const pricingData = [
  {
    title: "Basic",
    price: "$10",
    features: [
      { text: "10GB Storage", included: false },
      { text: "Basic Support", included: false },
      { text: "Single User", included: false },
      { text: "Community Access", included: true },
      { text: "Weekly Updates", included: true },
    ],
  },
  {
    title: "Standard",
    price: "$20",
    features: [
      { text: "50GB Storage", included: true },
      { text: "Priority Support", included: true },
      { text: "Up to 5 Users", included: true },
      { text: "Community Access", included: true },
      { text: "Daily Updates", included: true },
    ],
    isFeatured: true,
    label: "Bestseller"
  },
  {
    title: "Premium",
    price: "$30",
    features: [
      { text: "200GB Storage", included: true },
      { text: "24/7 Support", included: true },
      { text: "Unlimited Users", included: true },
      { text: "Community Access", included: true },
      { text: "Real-time Updates", included: true },
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Pricing Plans</h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Choose the plan that suits you best</p>
        </div>
        <div className="flex flex-wrap justify-center">
          {pricingData.map((plan, index) => (
            <PricingCard 
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              isFeatured={plan.isFeatured}
              label={plan.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
