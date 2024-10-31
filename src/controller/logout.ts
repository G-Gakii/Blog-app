import { Request, Response } from "express";

const logout = (req: Request, res: Response) => {
  res.clearCookie("token").json({ message: "logged out" });
};
export default logout;
