"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const register_1 = __importDefault(require("../controller/register"));
const login_1 = __importDefault(require("../controller/login"));
const logout_1 = __importDefault(require("../controller/logout"));
const addBlogs_1 = __importDefault(require("../controller/addBlogs"));
const getBlogs_1 = __importDefault(require("../controller/getBlogs"));
const getBlog_1 = __importDefault(require("../controller/getBlog"));
const updateBlog_1 = __importDefault(require("../controller/updateBlog"));
const deleteBlog_1 = __importDefault(require("../controller/deleteBlog"));
const authetication_middleware_1 = __importDefault(require("../middleware/authetication.middleware"));
const authorization_middleware_1 = __importDefault(require("../middleware/authorization.middleware"));
const router = express_1.default.Router();
router.post("/register", register_1.default);
router.post("/login", login_1.default);
router.get("/logout", authetication_middleware_1.default, logout_1.default);
router.post("/blogs", authetication_middleware_1.default, addBlogs_1.default);
router.get("/blogs", authetication_middleware_1.default, getBlogs_1.default);
router.get("/blogs/:id", authetication_middleware_1.default, getBlog_1.default);
router.put("/blogs/:id", authetication_middleware_1.default, authorization_middleware_1.default, updateBlog_1.default);
router.delete("/blogs/:id", authetication_middleware_1.default, authorization_middleware_1.default, deleteBlog_1.default);
exports.default = router;
