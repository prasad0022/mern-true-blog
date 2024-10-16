import { useParams } from "react-router-dom";
import BlogCard from "../Components/BlogCard";
import { useBlogStore } from "../store/blog";
import { useEffect, useState } from "react";

const Category = () => {
  const { categoryName } = useParams();
  const { blogs, fetchBlogs } = useBlogStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchBlogs();
      } catch (error) {
        console.error("Error while fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchBlogs]);

  const filteredBlogs = blogs.filter((blog) =>
    categoryName
      ? blog.category.toLowerCase() === categoryName.toLowerCase()
      : true
  );

  return (
    <div className="container mx-auto p-4 mt-20">
      <h2 className="text-2xl font-semibold text-left mb-6">
        Latest blog posts related to {categoryName}
      </h2>

      {loading ? (
        <p>Loading blogs...</p>
      ) : filteredBlogs.length === 0 ? (
        <p>No blogs available for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredBlogs.map((blog, index) => (
            <BlogCard
              key={blog._id || index} // Use _id as key if available
              title={blog.title}
              content={blog.content}
              author={blog.author}
              image={blog.image}
              category={blog.category}
              _id={blog._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
