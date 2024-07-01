const fs = require("fs");
const https = require("https");
const cheerio = require("cheerio");

https.get("https://www.bqgui.cc/", req => {
    let str;
    req.on("data", thunk => {
        str += thunk;
    })
    req.on("end", err => {
        // console.log(str.toString());
        let arr = [];
        let $ = cheerio.load(str.toString());
        $(".lis li a").each((key, item) => {
            let obj = {};
            let txt = $(item).text();
            obj.id = key + 1;
            obj.txt = txt;
            arr.push(obj);
        })
        fs.writeFileSync("title.json", JSON.stringify(arr));
    })
})