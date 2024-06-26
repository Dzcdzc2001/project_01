const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    let path = request.url.split("?")[0];

    let arr = JSON.parse(fs.readFileSync("./news.json"));
    let pageNum = Math.ceil(arr.length / 5);
    if (request.url === "/") {
        response.end("<h1><a href='/news?id=1'>点我看新闻</a></h1>");
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
    } else {
        response.end("<h1>404 Not Found</h1>");
    }
})
server.listen(8989);