import { Request, Response } from "express";
import Blog from "../models/blog.model";
import { authorizedRequest } from "../interface/auth";

const createBlog = async (req: authorizedRequest, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "request body required" });
      return;
    }
    const { title, body } = req.body;

    if (!(title && body)) {
      res.status(400).json({ message: "All field required" });
      return;
    }
    const newBlog = new Blog({
      title,
      body,
      author: req.user?._id,
    });
    const myblog = await newBlog.save();
    res.status(201).json(myblog);
    return;
  } catch (error) {
    res.status(500).json({ message: "internal server error" + error });
    return;
  }
};

export default createBlog;
