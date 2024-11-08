import { Request, Response, NextFunction } from "express";

import createError from "http-errors";
import verifyRefreshToken from "../token/verifyRefreshToken";
import generateToken, { RefreshTokenfn } from "../token/token";

const refreshTokenfn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw createError.BadRequest();
  const userId = await verifyRefreshToken(refreshToken);

  const accessToken = await generateToken(userId as string);
  const myrefreshToken = await RefreshTokenfn(userId as string);
  res
    .status(200)
    .json({ accessToken: accessToken, refreshToken: myrefreshToken });
};
export default refreshTokenfn;
