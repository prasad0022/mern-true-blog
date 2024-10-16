import mongoose from "mongoose";
import Blog from "../model/blog.model.js";

// Async function which creates new blog in MongoDB.
export const createBlog = async (req, res) => {
    const blog = req.body;
    if (!blog.title || !blog.content || !blog.author || !blog.image || !blog.category) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" });
    }

    try {
        const newBlog = new Blog(blog);
        await newBlog.save();
        res.status(201).json({ success: true, data: newBlog });
    } catch (error) {
        console.error("Error creating new blog", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Async function which fetch all blogs from MongoDB.
export const fetchBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (error) {
        console.error("Error fetching blogs from DB", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Async function which fetches a blog based on _id.
export const fetchBlogById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid blog id" });
    }

    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        console.error("Error fetching blog from DB", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Async function which updates existing blog.
export const updateBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid blog id" });
    }

    const blog = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
        if (!updatedBlog) return res.status(404).json({ success: false, message: "Blog not found" });
        res.status(200).json({ success: true, data: updatedBlog });
    } catch (error) {
        console.error("Error updating the blog in DB", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Async function which deletes blog from MongoDB.
export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid blog id" });
    }

    try {
        const isDeleted = await Blog.findByIdAndDelete(id);
        if (!isDeleted) return res.status(404).json({ success: false, message: "Blog not found" });
        res.status(200).json({ success: true, message: "Blog deleted succesfully." });
    } catch (error) {
        console.error("Error deleting the blog from DB", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};