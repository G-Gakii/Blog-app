"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_model_1 = __importDefault(require("../models/blog.model"));
const createBlog = async (req, res) => {
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
        const newBlog = new blog_model_1.default({
            title,
            body,
            author: req.user?._id,
        });
        const myblog = await newBlog.save();
        res.status(201).json(myblog);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" + error });
        return;
    }
};
exports.default = createBlog;
