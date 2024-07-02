const express = require("express");
const fs = require("fs");
const bodyparser = require("body-parser");
// const users = require("./data/user.json");

let app = express();

app.use(bodyparser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/userinfo", (req, res) => {
    // res.send(fs.readFileSync("./data/user.json"));
    let red = fs.createReadStream("./data/user.json");
    let str = '';
    red.on("data", chunk => {
        str += chunk;
    })
    red.on("end", err => {
        if (err) {
            console.log(err)
        } else {
            res.send(str);
        }
    })
})

app.post("/signup", (req, res) => {

    fs.writeFileSync("./data/user.json", JSON.stringify(req.body));
    console.log(JSON.stringify(req.body));
    res.json({ info: "更改成功", status: 1 });
})

app.listen(8989)