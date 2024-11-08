import express, { NextFunction, Request, Response } from "express";

import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./database/db";
import blogRouter from "./router/blog.router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import createError from "http-errors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/blog", blogRouter);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  connectDatabase();
  console.log(`listening at port ${PORT} `);
});
