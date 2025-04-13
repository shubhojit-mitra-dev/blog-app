import tsImage from "@/assets/typescript.webp";
import BlogCard from "./BlogCard";

const blogs = [
  {
    image: tsImage,
    title: "Blog Post Title 1",
    description: "A brief description of the blog post goes here. It should be engaging and informative."
  },
  {
    image: "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Blog Post Title 2",
    description: "A brief description of the blog post goes here. It should be engaging and informative."
  },
  {
    image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
    title: "Blog Post Title 3",
    description: "A brief description of the blog post goes here. It should be engaging and informative."
  }
];

export default function BlogsSection() {
  return (
    <section className="py-12 bg-gray-100 dark:bg-[#1b1b1b]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Top Blogs</h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Check out our most popular blog posts</p>
        </div>
        <div className="flex flex-wrap justify-center">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              image={blog.image}
              title={blog.title}
              description={blog.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
