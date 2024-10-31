import mongoose from "mongoose";
import { Iuser } from "../interface/user.interface";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,

      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model<Iuser>("user", userSchema);
export default User;
