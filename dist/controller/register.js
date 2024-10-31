"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const argon2 = __importStar(require("argon2"));
const token_1 = __importDefault(require("../token/token"));
const createUser = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({ message: "request body required" });
            return;
        }
        const { username, email, password } = req.body;
        if (!(username && email && password)) {
            res.status(400).json({ message: "All fields required" });
            return;
        }
        const existingUser = await user_model_1.default.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(409).json({ message: "User already exist" });
            return;
        }
        const hashedPassword = await argon2.hash(password);
        const newuser = new user_model_1.default({
            username,
            email,
            password: hashedPassword,
        });
        const user = newuser.save();
        const token = (0, token_1.default)((await user)._id);
        res.cookie("token", token, {
            domain: "localhost",
            path: "/",
            expires: new Date(Date.now() + 86400000),
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        res.json(user);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" + error });
        return;
    }
};
exports.default = createUser;
