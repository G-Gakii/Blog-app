import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { authorizedRequest } from "../interface/auth";

const logout = async (
  req: authorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("somw.....");

    const authHeader = req.headers.authorization;
    if (!authHeader) throw createError[401];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    let decoded: string | JwtPayload;
    decoded = jwt.verify(token, process.env.SECRET_TOKEN as string);
    console.log("my decoded" + decoded);

    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      const userId = decoded.id;

      const user = await User.findById(userId);
      if (!user) throw createError[404];
      user.refreshToken = null;

      await user.save();
      res.status(200).json({ message: "Logged out successfully" });
    }
  } catch (error) {
    next(error);
  }
};
export default logout;
