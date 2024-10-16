import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "../store/blog";

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    category: "",
  });

  const [isCreated, setIsCreated] = useState(false); // New state for blog creation
  const navigate = useNavigate();
  const { createBlog } = useBlogStore();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setBlog((prevVal) => ({
      ...prevVal,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBlog(blog);
      setIsCreated(true); // Set the creation flag to true
    } catch (error: any) {
      console.error("Error while creating new blog", error.message);
    }
  };

  const handleBackToHome = () => {
    navigate("/"); // Navigate back to home
    window.location.reload();
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border border-gray-200">
        {isCreated ? (
          // Show success message and button if blog is created
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Blog Created Successfully!
            </h2>
            <button
              onClick={handleBackToHome}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Back to Home
            </button>
          </div>
        ) : (
          // Show the form if the blog is not created yet
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">
              Create a New Blog
            </h2>
            {/* Title Input */}
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="title"
              >
                Blog Title
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter blog title"
                value={blog.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Content Input */}
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="content"
              >
                Blog Content
              </label>
              <textarea
                id="content"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter blog content"
                value={blog.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Author Input */}
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="author"
              >
                Author Name
              </label>
              <input
                id="author"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter author name"
                value={blog.author}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category Input */}
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <input
                id="category"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter category"
                value={blog.category}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image URL Input */}
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="image"
              >
                Image URL
              </label>
              <input
                id="image"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter image URL"
                value={blog.image}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Create Blog
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
