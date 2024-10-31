import jwt from "jsonwebtoken";
import { authorizedRequest } from "../interface/auth";
import { Response, Request, NextFunction } from "express";
import User from "../models/user.model";

const autheticate = async (
  req: authorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).json({ mesage: "access denied" });
      return;
    }
    const decode = jwt.verify(token, process.env.SECRET_TOKEN as string) as {
      id: string;
    };
    const user = await User.findById(decode.id);
    if (!user) {
      res.status(403).json({ message: "invalid token" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "internal server error " + error });
    return;
  }
};

export default autheticate;
