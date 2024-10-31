import express, { Request, Response } from "express";
import User from "../models/user.model";
import * as argon2 from "argon2";
import generateToken from "../token/token";

const createUser = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "request body required" });
      return;
    }
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      res.status(400).json({ message: "All fields required" });
      return;
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ message: "User already exist" });
      return;
    }
    const hashedPassword = await argon2.hash(password);
    const newuser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const user = newuser.save();
    const token = generateToken((await user)._id);
    res.cookie("token", token, {
      domain: "localhost",
      path: "/",
      expires: new Date(Date.now() + 86400000),
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.json(user);
    return;
  } catch (error) {
    res.status(500).json({ message: "internal server error" + error });
    return;
  }
};
export default createUser;
