import express from "express";
import { fetchBlogs, createBlog, fetchBlogById, updateBlog, deleteBlog } from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", fetchBlogs);
router.post("/", createBlog);
router.get("/:id", fetchBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;