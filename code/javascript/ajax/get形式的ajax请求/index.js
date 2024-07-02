const express = require("express");
const ejs = require("ejs");
const fs = require("fs")
const bodyParser = require("body-parser")
const news = require("./data/news.json");

let app = express();

let static = express.static;

app.use(static(__dirname + "/static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/user", (req, res) => {
    let { username, password } = req.query;
    res.send(`username:${username},password:${password}`);
})
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/news.html");
})
app.get("/news", (req, res) => {
    // ejs.render("/news", { news })
    res.send(JSON.stringify(news));
})

app.get("/sign", (req, res) => {
    res.sendFile(__dirname + "/views/user.html");
})

app.post("/signup", (req, res) => {
    try {
        console.log(req.body)
        fs.writeFileSync("./data/users.json", JSON.stringify(req.body));
        res.send(JSON.stringify({ info: "注册成功", status: 1 }));
    } catch {
        res.send(JSON.stringify({ info: "注册失败", status: 0 }));
    }
})
//发送xml格式数据
app.get("/xml", (req, res) => {
    let str = "<?xml version='1.0' encoding='uttf-8'?>";
    str += `<userinfo>
        <username>qwer</username>
        <password>123456</password>
    </userinfo>`
    res.setHeader("Content-Type", "text/xml")
    res.send(str);
})

//终止ajax请求 超时、自动
app.get("/ajaxtimeout", (req, res) => {
    setTimeout(()=>{
        res.json({info:"pass",status:1});
    },3000); 
})

app.listen(8989);