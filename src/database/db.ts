import mongoose, { Mongoose } from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("connected to database");
  } catch (error) {
    console.log("failed to connect " + error);
  }
};

export default connectDatabase;
