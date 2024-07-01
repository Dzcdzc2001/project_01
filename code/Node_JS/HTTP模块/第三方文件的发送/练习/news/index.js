const fs = require("fs");
const http = require("http");
const path = require("path");
const cheerio = require("cheerio");
const toData = require("./utils/toData");
const news = require("./data/news.json");
const mime = require("./data/mime.json");

const server = http.createServer((req, res) => {
    let pathname = req.url.split("?")[0];
    // console.log(mime[path.extname(pathname)])
    // res.hasHeader("Content-Type", mime[path.extname(pathname.split("/")[1])])
    if (pathname === "/index") {
        res.hasHeader("Content-Type", "text/html;charset=utf-8")
        let $ = cheerio.load(fs.readFileSync("./views/index.html"))
        let str = '';
        news.forEach(item => {
            str += `<li class="news">
                <a href="javascript:;">
                    <img src="./img/img.png" alt="">
                </a>
                <div class="newsContainer">
                    <h3>
                        <a href="/detail?id=${item.id}" class="title">${item.title}</a>
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
        // console.log(str);
        res.end($.html());
    } else if (pathname === "/detail") {
        res.end();
    } else if (pathname === "/static") {
        res.end(fs.readFileSync("./static" + pathname));
    }
})
server.listen(8988);