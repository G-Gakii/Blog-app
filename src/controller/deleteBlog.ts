import { Request, Response } from "express";
import Blog from "../models/blog.model";

const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      res.status(400).json({ message: "blog does not exist" });
      return;
    }

    res.status(200).json({ message: "blog deleted successfully" });
    return;
  } catch (error) {}
};
export default deleteBlog;
