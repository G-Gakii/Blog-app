import express, { Request, Response } from "express";
import createUser from "../controller/register";
import logIn from "../controller/login";
import logout from "../controller/logout";
import createBlog from "../controller/addBlogs";
import getBlogs from "../controller/getBlogs";
import getBlog from "../controller/getBlog";
import updateBlog from "../controller/updateBlog";
import deleteBlog from "../controller/deleteBlog";
import autheticate from "../middleware/authetication.middleware";
import checkAuthorization from "../middleware/authorization.middleware";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", logIn);
router.get("/logout", autheticate, logout);
router.post("/blogs", autheticate, createBlog);
router.get("/blogs", getBlogs);
router.get("/blogs/:id", getBlog);
router.put("/blogs/:id", autheticate, checkAuthorization, updateBlog);
router.delete("/blogs/:id", autheticate, checkAuthorization, deleteBlog);

export default router;
