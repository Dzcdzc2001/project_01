const express = require("express");
const fs = require("fs");
const bodyparser = require("body-parser");


let app = express();

app.use(bodyparser.json());
app.use(express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/img"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/userinfo", (req, res) => {

    let red = fs.createReadStream("./data/students.json");
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

app.post("/modify", (req, res) => {
    let arr = JSON.parse(fs.readFileSync("./data/students.json"));
    console.log(arr);
    console.log(req.body);
    if (arr.some(item => item.id == req.body.id) && arr.length != 0) {
        console.log(11)
        arr = arr.filter(item => item.id != req.body.id);
    } else {
        console.log(22)
        arr.push(req.body)
    }
    fs.writeFileSync("./data/students.json", JSON.stringify(arr));
    // console.log(JSON.stringify(req.body));
    res.json({ info: "更改成功", status: 1 });
})

app.listen(8989)