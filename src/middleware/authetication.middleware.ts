import jwt, { JwtPayload } from "jsonwebtoken";
import { authorizedRequest } from "../interface/auth";
import { Response, Request, NextFunction } from "express";
import User from "../models/user.model";
import createError from "http-errors";

const autheticate = async (
  req: authorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw createError.Unauthorized();
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    jwt.verify(
      token,
      process.env.SECRET_TOKEN as string,
      async (err, payload) => {
        if (err) {
          if (err.name === "JsonWebTokenError") {
            return next(createError.Unauthorized("invalid token"));
          } else {
            return next(createError.Unauthorized(err.message));
          }
        }
        const decode = payload as JwtPayload;
        const userId = decode.id;
        const user = await User.findById(userId);
        if (!user) throw createError[404];
        req.user = user;
        req.payload = payload;
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

export default autheticate;
