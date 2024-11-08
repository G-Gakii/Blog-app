import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET_TOKEN as string, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
const RefreshTokenfn = (id: string) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN as string, {
    expiresIn: "1y",
  });
};
export { RefreshTokenfn };
export default generateToken;
