import jwt from "jsonwebtoken";
import createError from "http-errors";

const verifyRefreshToken = (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN as string,
      (err, payload) => {
        if (err) {
          return reject(createError[401]);
        }
        if (
          typeof payload === "object" &&
          payload !== null &&
          "id" in payload
        ) {
          const userId = (payload as jwt.JwtPayload).id;
          resolve(userId);
        } else {
          reject(createError(401, "Unauthorized: Invalid token payload"));
        }
      }
    );
  });
};

export default verifyRefreshToken;
