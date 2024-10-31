"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logout = (req, res) => {
    res.clearCookie("token").json({ message: "logged out" });
};
exports.default = logout;
