"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_model_1 = __importDefault(require("../models/blog.model"));
const checkAuthorization = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await blog_model_1.default.findById(id);
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
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
exports.default = checkAuthorization;
