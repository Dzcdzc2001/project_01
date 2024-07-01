const express = require("express");
const adminRouter = express.Router();

adminRouter.get("/index", (req, res) => {
    res.send("<h1>我是admin主页</h1>");
})
adminRouter.get("/setting", (req, res) => {
    res.send("<h1>我是admin设置</h1>");
})

module.exports = adminRouter;