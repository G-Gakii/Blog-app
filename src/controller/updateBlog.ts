import { Request, Response } from "express";
import Blog from "../models/blog.model";

const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body);
    if (!blog) {
      res.status(400).json({ message: "blog does not exist" });
      return;
    }
    const myupdatedBlog = await Blog.findById(id);
    res.status(200).json(myupdatedBlog);
    return;
  } catch (error) {
    res.status(500).json({ message: "internal server error" + error });
    return;
  }
};
export default updateBlog;
