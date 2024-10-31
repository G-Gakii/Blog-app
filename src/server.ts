import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./database/db";
import blogRouter from "./router/blog.router";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/blog", blogRouter);

app.listen(PORT, () => {
  connectDatabase();
  console.log(`listening at port ${PORT} `);
});
