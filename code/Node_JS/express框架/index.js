const express = require("express");
const app = express();
const bodyparser = require("body-parser");
// const bodyparser = require("./util/bodyparser");

//中间件，执行顺序为洋葱模型
//类型：内置中间件、自定义中间件、第三方中间件、错误处理中间件
function fn1(req, res, next) {
    console.log("fn1 start");
    next();
    console.log("fn1 end");
}
function fn2(req, res, next) {
    console.log("fn2 start");
    next();
    console.log("fn2 end");
}
function fn3(req, res, next) {
    console.log("fn3 start");
    next();
    console.log("fn3 end");
}
function error(err, req, res) {
    if (err) {

    } else {

    }
}


// app.use(fn1);
// app.use(fn2);
// app.use(fn3);
// app.use(bodyparser);
app.use(bodyparser.urlencoded({
    extended: true
}))

app.post("/post", (req, res) => {
    console.log(req.body);
    res.send()
})

app.get("//:id", (req, res) => {
    let { id } = req.params;
    res.send(`<h1>我是主页,${id}</h1>`)
})
app.get("/product", (req, res) => {
    let { id, name } = req.query;
    res.send(`<h1>我是产品,id=${id},name=${name}</h1>`)
})
app.get("/users", (req, res) => {
    res.send(`<h1>我是用户,${req.get("Sec-Ch-Ua-Platform")}</h1>`)
})
app.get("/jsonhandle", (req, res) => {
    res.send(`{"name":"zs","age":22}`)
})
app.get("/", (req, res) => {
    res.redirect("/index");
})
app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.listen(8989);