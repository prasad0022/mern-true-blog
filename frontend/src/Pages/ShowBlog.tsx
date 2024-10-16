import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogStore } from "../store/blog";
import ConfirmationModal from "../Components/ConfirmationModal";

const ShowBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    image: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchBlogById, deleteBlog } = useBlogStore();

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

  const handleBack = () => {
    navigate("/");
  };

  const handleUpdate = () => {
    navigate(`/blog/edit/${id}`);
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteBlog(id);
      navigate("/");
    } catch (error: any) {
      console.error("Error deleting book.", error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg relative">
      <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
      <div className="text-gray-500 mt-2">
        <span>{blog.author}</span> · <span>29 June 2022</span>
      </div>
      <span className="text-sm text-red-600 mt-2" style={{ color: "#F95454" }}>
        {blog.category}
      </span>
      <div className="mt-6">
        <img
          className="w-full h-47 object-cover rounded"
          src={blog.image}
          alt={blog.title}
        />
      </div>
      <p className="text-gray-600 mt-4">{blog.content}</p>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        >
          Back to Home
        </button>
        <button
          onClick={handleUpdate}
          className="ml-5 px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-400"
        >
          Update
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-5 px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-400"
        >
          Delete
        </button>
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this blog?"
        onConfirm={() => {
          handleDelete(id);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ShowBlog;
