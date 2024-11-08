import express, { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import * as argon2 from "argon2";
import generateToken, { RefreshTokenfn } from "../token/token";
import userSchema from "../models/validatorSchema.model";
const createError = require("http-errors");

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user)
      throw createError.NotFound(` ${result.email} is not registered `);
    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch)
      throw createError.Unauthorized("username or password invalid");

    const accessToken = await generateToken(user.id);
    const refreshToken = await RefreshTokenfn(user.id);

    const hashedRefreshToken = await argon2.hash(refreshToken);
    user.refreshToken = hashedRefreshToken;
    await user.save();
    res.status(200).json({ accessToken, refreshToken });
  } catch (error: any) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};
export default logIn;
