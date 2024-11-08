import mongoose, { CallbackError } from "mongoose";
import { Iuser } from "../interface/user.interface";
import { log } from "console";
const argon2 = require("argon2");

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
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashedPassword = await argon2.hash(this.password);

      this.password = hashedPassword;
      next();
    }
  } catch (error) {
    next(error as CallbackError);
  }
});
userSchema.methods.isValidPassword = async function (password: string) {
  try {
    const isvalid = await argon2.verify(this.password, password);

    return isvalid;
  } catch (error) {
    throw error;
  }
};
const User = mongoose.model<Iuser>("user", userSchema);
export default User;
