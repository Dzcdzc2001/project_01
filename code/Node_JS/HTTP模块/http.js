const fs = require("fs");
const http = require("http");
const { qs } = require("./qs")
let server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html;charset=utf-8");

    let path = req.url.split("?")[0];
    // console.log(req.url)
    if (req.url === "/") {
        let str = "<h1><a href='/register.html'>注册</a></h1>";
        res.end(str);
    } else if (path === "/register.html") {
        res.end(fs.readFileSync("./register.html"));
    } else if (path === "/signup") {
        if (!fs.existsSync("./users.json")) {
            fs.writeFileSync("./users.json", "[]");
        }
        let arr = JSON.parse(fs.readFileSync("./users.json"));
        // if(arr)
        arr.push(qs(req));
        fs.writeFileSync("./users.json", JSON.stringify(arr));
        res.end("注册成功<p><a href='/SnakeGame.html' target='blank'>点我开始紧张刺激的小游戏</a></p>");

    } else if (path === "/SnakeGame.html") {
        res.end(fs.readFileSync("./SnakeGame.html"));
    } else {
        res.end("<h1>404 NOT FOND</h1>")
    }

    // let arr = fs.readdirSync("111");
    // str = "<table border='1'><thead><th>文件名</th><th>信息</th><th>操作</th></thead><"
    // arr.forEach(item => {
    //     if (fs.statSync("111" + "/" + item).isDirectory()) {
    //         str += `<tr><td><a href="#">${item}</a></td><td></td><td>删除</td><tr>`;
    //     } else {
    //         str += `<tr><td>${item}</td><td></td><td>删除</td><tr>`;
    //     }
    // })
    // str += `<tr><td><a href="#">点我！！！</a></td><td></td><td>删除</td><tr>`;
    // str += "</table>";


    // res.write(str);
    // res.end();
})
server.listen(8989)