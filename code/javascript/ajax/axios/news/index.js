const express = require("express");
const fs = require("fs");
const path = require("path");
const page = require("./util/page");
const news = require("./data/news.json");
const bodyParser=require("body-parser")

let app = express();

app.use(express.static(path.join(__dirname, "/img")));
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.sendFile(__dirname+"/views/index.html");
})
app.get("/detail", (req, res) => {
    res.sendFile(__dirname+"/views/detail.html");
})

app.get("/newsData", (req, res) => {
    let { id } = req.query;
    id = parseInt(id);
    // console.log(req.query)
    res.json(page(news, 5, id))
})

app.get("/detailData", (req, res) => {
    let { id } = req.query;
    res.json(...news.filter(item => item.id == id))
})
app.listen(8989)
