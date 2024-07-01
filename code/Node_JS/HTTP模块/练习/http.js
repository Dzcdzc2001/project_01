const http = require("http");
const fs = require("fs");
const { decode } = require("punycode");

const server = http.createServer((request, response) => {
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    let path = request.url.split("?")[0];

    let arr = JSON.parse(fs.readFileSync("./news.json"));
    let pageNum = Math.ceil(arr.length / 5);
    if (request.url === "/") {
        response.end("<h1><a href='/news?id=1'>点我看新闻</a></h1><h1><a href='/addnews'>点我写新闻</a></h1>");
    } else if (path === "/news") {
        // console.log("news");

        let qs = request.url.split("?")[1];
        if (parseInt(qs.split("=")[1]) === 1) {
            let str = "<ul>";
            arr.forEach((item, key) => {
                if (key < 5) {
                    str += `<li><a href="/detail?id=${item.id}">${item.title}</a></li>`;
                }
            })
            str += `</ul></br><button><a href='/news?id=${parseInt(qs.split("=")[1]) + 1}'>下一页</a></button>`;
            response.end(str);
        } else if (parseInt(qs.split("=")[1]) > 1 && parseInt(qs.split("=")[1]) <= pageNum) {
            let str = "<ul>";
            arr.forEach((item, key) => {
                if (key < 5 * parseInt(qs.split("=")[1]) && key >= 5 * (parseInt(qs.split("=")[1]) - 1)) {
                    str += `<li><a href="/detail?id=${item.id}">${item.title}</a></li>`;
                }
            })
            str += `</ul></br><button><a href='/news?id=${parseInt(qs.split("=")[1]) - 1}'>上一页</a></button><button><a href='/news?id=${parseInt(qs.split("=")[1]) + 1}'>下一页</a></button>`;
            response.end(str);
        }
    } else if (path === "/detail") {
        // console.log("detail")
        let qs = request.url.split("?")[1];
        let id = parseInt(qs.split("=")[1]);
        // console.log(id)
        let [{ detail }] = arr.filter(item => { return item.id === id })
        response.end(detail);
    } else if (path === "/addnews") {
        let html = " <form action='/success' method='get'>标题：<input type='text' name='title'></br>新闻内容：<input type='text' name='detail'></br><input type='submit'></form>";
        response.end(html);
    } else if (path === "/success") {
        let qs = request.url.split("?")[1];
        let id = arr.length + 1;
        let title = qs.split("&")[0].split("=")[1];
        let detail = qs.split("&")[1].split("=")[1];
        let html = `<h1>${title}</h1><p>${detail}</p><a href="/news?id=1">返回新闻首页</a>`;
        response.end(decodeURIComponent(html));
        arr.push({ id: id, title: decodeURIComponent(title), detail: decodeURIComponent(detail) });
        // fs.writeFileSync('./news.json', JSON.stringify(arr));
        let ws = fs.createWriteStream("./news.json");
        ws.write(JSON.stringify(arr));
        ws.end();
    } else {
        response.end("<h1>404 Not Found</h1>");
    }
})
server.listen(8989);