import { NextFunction, Request, Response } from "express";
import Blog from "../models/blog.model";
import { authorizedRequest } from "../interface/auth";
import { log } from "util";
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
    if (!blog.author) {
      console.error("Blog author is undefined");
      res.status(500).json({ message: "Blog author is undefined" });
      return;
    }
    if (!req.user) {
      console.error("User not authenticated");
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    if (blog.author.toString() !== req.user?.id.toString()) {
      res.status(403).json({ mesage: "acess denied" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" + error });
    return;
  }
};
export default checkAuthorization;
