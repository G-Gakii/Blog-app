import express, { Request, Response } from "express";
import User from "../models/user.model";
import * as argon2 from "argon2";
import generateToken from "../token/token";

const logIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).json({ message: "All fields required" });
      return;
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const ispasswordValid = await argon2.verify(user.password, password);
    if (!ispasswordValid) {
      res.status(400).json({ message: "invalid credential" });
      return;
    }
    const token = generateToken(user._id);
    res.cookie("token", token, {
      domain: "localhost",
      path: "/",
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 86400000),
      sameSite: "none",
    });
    res.json({ token });
    return;
  } catch (error) {
    res.status(500).json({ message: "internal server error" + error });
    return;
  }
};
export default logIn;
