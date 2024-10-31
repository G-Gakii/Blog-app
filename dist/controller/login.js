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
const logIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).json({ message: "All fields required" });
            return;
        }
        const user = await user_model_1.default.findOne({ username: req.body.username });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const ispasswordValid = await argon2.verify(user.password, password);
        if (!ispasswordValid) {
            res.status(400).json({ message: "invalid credential" });
            return;
        }
        const token = (0, token_1.default)(user._id);
        res.cookie("token", token, {
            domain: "localhost",
            path: "/",
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + 86400000),
            sameSite: "none",
        });
        res.json({ token });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" + error });
        return;
    }
};
exports.default = logIn;
