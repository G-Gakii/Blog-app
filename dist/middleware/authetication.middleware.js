"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const autheticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(403).json({ mesage: "access denied" });
            return;
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN);
        const user = await user_model_1.default.findById(decode.id);
        if (!user) {
            res.status(403).json({ message: "invalid token" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(500).json({ message: "internal server error " + error });
        return;
    }
};
exports.default = autheticate;
