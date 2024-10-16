import React from "react";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  title: string;
  content: string;
  author: string;
  image: string;
  category: string;
  _id?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  author,
  image,
  category,
  _id,
}) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/details/${_id}`);
  };

  return (
    <div className="max-w-lg mx-auto bg-white overflow-hidden shadow-md border border-gray-200 flex flex-col h-full">
      {/* Image Section */}
      <img className="w-full h-48 object-cover p-1" src={image} alt={title} />

      {/* Content Section */}
      <div className="p-6 pt-2 flex flex-col flex-grow">
        <span className="text-sm" style={{ color: "#F95454" }}>
          {category}
        </span>
        <h2 className="font-bold text-2xl text-gray-800 mt-2 truncate">
          {title}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {"29 June 2022"} · {author}
        </p>

        {/* Content Preview */}
        <p className="text-gray-600 text-left mt-4 w-full overflow-hidden overflow-ellipsis max-h-18">
          {content.slice(0, 150)}... {/* Truncated content preview */}
        </p>

        {/* Button Section */}
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={handleReadMore}
            className="px-4 py-2 bg-transparent border border-gray-400 text-gray-600 rounded-full hover:bg-gray-100"
          >
            Continue reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
