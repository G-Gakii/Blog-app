import { NextFunction, Request, Response } from "express";
import Blog from "../models/blog.model";
import { authorizedRequest } from "../interface/auth";
const checkAuthorization = async (
  req: authorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: "blog not found" });
      return;
    }
    if (blog.author.toString() !== req.user?.id.toString()) {
      console.log("Blog author ID:", blog.author.toString());
      console.log("Request user ID:", req.user?.id.toString());
      res.status(403).json({ mesage: "acess denied" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
export default checkAuthorization;
