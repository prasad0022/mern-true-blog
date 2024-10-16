import { useEffect } from "react";
import BlogCard from "../Components/BlogCard";
import { useBlogStore } from "../store/blog";

const Home = () => {
  const { blogs, fetchBlogs } = useBlogStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchBlogs();
      } catch (error) {
        console.error("Error while fetching blogs", error);
      }
    };
    fetchData();
  }, [fetchBlogs]);

  return (
    <>
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to TrueBlog
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          TrueBlog is your go-to destination for a wide range of engaging and
          insightful articles. Whether you're interested in the latest trends in
          technology, exploring scientific discoveries, or learning about
          historical events, our blog has something for everyone. Dive into our
          carefully curated collection of articles written by passionate authors
          from around the world.
        </p>
        <h2 className="text-2xl font-semibold text-left mb-6">
          Latest Blog Posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              content={blog.content}
              author={blog.author}
              image={blog.image}
              category={blog.category}
              _id={blog._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
