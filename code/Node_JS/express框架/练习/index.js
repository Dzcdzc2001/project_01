const express = require("express");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const news = require("./data/news.json")
const page = require("../util/page");


const app = express();

app.get("/", (req, res) => {
    res.redirect("/news?id=1");
})
app.get("/news", (req, res) => {
    let $ = cheerio.load(fs.readFileSync("./views/index.html"))
    let { id } = req.query;
    let str = '';
    let pages = '';
    page(news, 5, id).cpage.forEach(item => {
        str += ` <li><img src=""><a href="/detail?id=${item.id}">${item.title}</a></li>`;
    })
    for (let i = 1; i <= page(news, 5, id).pages; i++) {
        pages += `<span><a href="/news?id=${i}">${i}</a></span>&nbsp;`;
    }

    $(".news-list").html(str);
    $(".page").html(pages);
    res.send($.html());
})
app.get("/detail", (req, res) => {
    let $ = cheerio.load(fs.readFileSync("./views/detail.html"));
    let { id } = req.query;
    let [{ title, detail }] = news.filter(item => item.id == id);
    $(".title").html(title);
    $(".detail").html(detail);
    res.send($.html());
})
app.get("/static/:type/:name", (req, res) => {
    res.sendFile(path.join(__dirname,"/static",req.params.type,req.params.name));
})

app.listen(8989);