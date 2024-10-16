import { useEffect, useState } from "react";
import { useBlogStore } from "../store/blog";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    category: "",
  });
  const { fetchBlogById, updateBlog } = useBlogStore();

  useEffect(() => {
    const fetchData = async (id: any) => {
      try {
        const blogData = await fetchBlogById(id);
        setBlog(blogData);
      } catch (error: any) {
        console.error("Error while fetching blog", error.message);
      }
    };
    fetchData(id);
  }, []);

  const hadndleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setBlog((preVal) => ({
      ...preVal,
      [id]: value,
    }));
  };

  const handleSubmit = async (id: any) => {
    try {
      await updateBlog(id, blog);
      alert("Blog updated successfully !");
    } catch (error: any) {
      console.error("Error while updating the blog", error.message);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6">Update Blog</h2>

        <form
          onSubmit={() => {
            handleSubmit(id);
          }}
          className="space-y-4"
        >
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
              onChange={hadndleChange}
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
              onChange={hadndleChange}
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
              onChange={hadndleChange}
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
              onChange={hadndleChange}
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
              onChange={hadndleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
