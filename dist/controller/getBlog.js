"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_model_1 = __importDefault(require("../models/blog.model"));
const getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blog_model_1.default.findById(id);
        if (!blog) {
            res.status(400).json({ message: "blog does not exist" });
            return;
        }
        res.status(200).json(blog);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" + error });
        return;
    }
};
exports.default = getBlog;
