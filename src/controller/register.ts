import express, { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import * as argon2 from "argon2";
import generateToken, { RefreshTokenfn } from "../token/token";
import userSchema from "../models/validatorSchema.model";
import createError from "http-errors";
import refreshTokenfn from "./refreshToken";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userSchema.validateAsync(req.body);
    const existingUser = await User.findOne({ email: result.email });

    if (existingUser) {
      throw createError.Conflict(`${result.email} is already registered`);
    }

    const newuser = new User(result);
    const user = await newuser.save();
    const accessToken = generateToken((await user)._id);
    const refreshToken = RefreshTokenfn((await user)._id);
    const hashedToken = await argon2.hash(refreshToken);
    user.refreshToken = hashedToken;
    await user.save();

    res.json({ accessToken, refreshToken });
    return;
  } catch (error: any) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    next(error);
  }
};
export default createUser;
