// import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-[#7E30E1] text-white px-4 py-4 fixed w-full top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand Name */}
        <Link
          to="/"
          className="text-2xl font-bold hover:text-gray-200 transition"
        >
          TrueBlog
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <div className="relative group">
            <span className="cursor-pointer hover:text-gray-200 transition">
              Category
            </span>
            <div className="absolute left-0 mt-2 w-40 bg-white text-black shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Link
                to="/blog/category/science"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Science
              </Link>
              <Link
                to="/blog/category/history"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                History
              </Link>
              <Link
                to="/blog/category/nature"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Nature
              </Link>
              <Link
                to="/blog/category/sports"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Sports
              </Link>
              <Link
                to="/blog/category/health"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Health
              </Link>
            </div>
          </div>
          <Link to="/blog/create" className="hover:text-gray-200 transition">
            Post a Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
