"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import dotenv from "dotenv";
// dotenv.config();
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("connected to database");
    }
    catch (error) {
        console.log("failed to connect " + error);
    }
};
exports.default = connectDatabase;
