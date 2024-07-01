const express = require("express");
const fs = require("fs");
const path = require("path");
const page = require("./util/page");
const news = require("./data/news.json")

let app = express();

app.use(express.static(path.join(__dirname, "/img")))

app.set("view engin", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.redirect("/news?id=1")
})
app.get("/news", (req, res) => {
    let { id } = req.query;
    id = parseInt(id);
    let { cpage, pages } = page(news, 5, id);
    // console.log(req.query)
    res.render("index.ejs", { cpage, pages, id })
})
app.get("/detail", (req, res) => {
    let { id } = req.query;
    let [{ title, detail }] = news.filter(item => item.id == id);
    res.render("detail.ejs", { title, detail })
})
app.listen(8989)
