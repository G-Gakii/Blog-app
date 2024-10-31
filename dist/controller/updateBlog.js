"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_model_1 = __importDefault(require("../models/blog.model"));
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blog_model_1.default.findByIdAndUpdate(id, req.body);
        if (!blog) {
            res.status(400).json({ message: "blog does not exist" });
            return;
        }
        const myupdatedBlog = await blog_model_1.default.findById(id);
        res.status(200).json(myupdatedBlog);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" + error });
        return;
    }
};
exports.default = updateBlog;
