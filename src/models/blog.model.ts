import mongoose, { Schema } from "mongoose";
import User from "./user.model";
import { blog } from "../interface/blog.interface";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: User,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model<blog>("blog", blogSchema);
export default Blog;
