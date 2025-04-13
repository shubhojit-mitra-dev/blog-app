import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    quote: "This service has been a game-changer for our business. Highly recommend!",
    name: "John Doe",
    title: "CEO, Company A"
  },
  {
    quote: "Amazing experience! The team was professional and the results were outstanding.",
    name: "Jane Smith",
    title: "Marketing Director, Company B"
  },
  {
    quote: "Exceptional service and support. We couldn't be happier with the results.",
    name: "Michael Brown",
    title: "CTO, Company C"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-12 bg-white dark:bg-[#111]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Hear from our satisfied customers</p>
        </div>
        <div className="flex flex-wrap justify-center">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
