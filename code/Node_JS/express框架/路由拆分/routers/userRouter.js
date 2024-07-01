const express = require("express");
const userRouter = express.Router();

userRouter.get("/index", (req, res) => {
    res.send("<h1>我是user主页</h1>");
})
userRouter.get("/setting", (req, res) => {
    res.send("<h1>我是user设置</h1>");
})

module.exports = userRouter;