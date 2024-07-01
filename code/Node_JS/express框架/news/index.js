const express = require("express");
const fs = require("fs");
const path = require("path")
const cheerio = require("cheerio");
const news = require("./data/news.json")

let app = express();

app.use(express.static(path.join(__dirname)))
app.get("/", (req, res) => {
    res.redirect("/news")
})
app.get("/news", (req, res) => {
    let $ = cheerio.load(fs.readFileSync("./views/index.html"));
    let str = '';
    news.forEach(item => {
        str += ` <li class="news">
                <a href="javascript:;">
                    <img src="./img/img.png" alt="">
                </a>
                <div class="newsContainer">
                    <h3>
                        <a href="javascript:;" class="title">${item.title}</a>
                    </h3>
                    <div class="info">
                        <span class="tips"><span>纵火</span><span>韩国</span><span>逮捕</span></span>
                        <!-- <span class="line"></span> -->
                        <span class="time">| &nbsp;&nbsp;1小时前</span>
                    </div>
                </div>
            </li>`
    })
    $(".news-list").html(str);
    res.send($.html());
    // res.sendFile
})
app.listen(8989)
