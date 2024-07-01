const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
    res.redirect("/index");
})
indexRouter.get("/index", (req, res) => {
    res.send("<h1>我是主页</h1><a href='admin/index'>跳转到admin主页</a> <a href='user/index'>跳转到user主页</a>");
})

module.exports = indexRouter;