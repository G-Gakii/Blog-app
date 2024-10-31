"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_model_1 = __importDefault(require("../models/blog.model"));
const getBlogs = async (req, res) => {
    try {
        const blogs = await blog_model_1.default.find({});
        res.status(200).json(blogs);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" + error });
        return;
    }
};
exports.default = getBlogs;
