import { create } from "zustand";
import axios from "axios";

interface Blog {
  title: string;
  content: string;
  author: string;
  image: string;
  category: string;
  _id?: string;
}

interface BlogStore {
  blogs: Blog[];
  setBlogs: (blogs: Blog[]) => void;
  fetchBlogs: () => Promise<void>;
  createBlog: (
    blog: Blog
  ) => Promise<{ success: boolean; message: string } | undefined>;
  fetchBlogById: (id: string) => Promise<Blog>;
  updateBlog: (
    id: string,
    blog: Blog
  ) => Promise<{ success: boolean; message: string } | undefined>;
  deleteBlog: (id: string) => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  fetchBlogs: async () => {
    try {
      const res = await axios.get("/api/blog");
      set({ blogs: res.data.data });
    } catch (error: any) {
      console.error("Error while fetching blogs", error.message);
    }
  },
  createBlog: async (blog: Blog) => {
    if (
      !blog.title ||
      !blog.content ||
      !blog.author ||
      !blog.image ||
      !blog.category
    ) {
      return { success: false, message: "Please provide all the fields." };
    }

    try {
      const newBlog = await axios.post("/api/blog", blog);
      set((state) => ({ blogs: [...state.blogs, newBlog.data] }));
      return { success: true, message: "Blog successfully created !" };
    } catch (error: any) {
      console.error("Error while creating new blog", error.message);
    }
  },
  fetchBlogById: async (id: string) => {
    try {
      const blog = await axios.get(`/api/blog/${id}`);
      return blog.data.data;
    } catch (error: any) {
      console.error("Error while fetching blog", error.message);
    }
  },
  updateBlog: async (id: string, blog: Blog) => {
    if (
      !blog.title ||
      !blog.content ||
      !blog.author ||
      !blog.image ||
      !blog.category
    ) {
      return { success: false, message: "Please provide all the fields." };
    }

    try {
      const updatedBlog = await axios.put(`/api/blog/${id}`, blog);
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog._id === id ? updatedBlog.data.data : blog
        ),
      }));
    } catch (error: any) {
      console.error("Error while updating the blog", error.message);
    }
  },
  deleteBlog: async (id: string) => {
    try {
      await axios.delete(`/api/blog/${id}`);
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog._id !== id),
      }));
    } catch (error: any) {
      console.error("Error deleting book.", error.message);
    }
  },
}));
