import { Request, Response } from "express";
import Blog from "../models/blog.model";

const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
    return;
  } catch (error) {
    res.status(500).json({ message: "internal server error" + error });
    return;
  }
};

export default getBlogs;
