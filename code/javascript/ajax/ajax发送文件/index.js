const express = require("express");
const formidable = require("formidable");
const fs = require("fs");

let app = express();

app.use(express.static(__dirname + "/static"));

app.post("/adduser", async (req, res) => {
    let form = formidable.default({
        uploadDir: __dirname + "/static/avatar",  // 文件上传的目录是哪里
        keepExtensions: true   // 保持上传文件的后缀名称 ；
    })

    let [{ username }, { avatar }] = await form.parse(req);
    // console.log(username,avatar)
    if (!fs.existsSync('./static/userinfo.json')) {
        fs.writeFileSync('./static/userinfo.json', JSON.stringify([]))
    }
    let userinfo = JSON.parse(fs.readFileSync('./static/userinfo.json'));
    userinfo.push({ username: username[0], avatar: "/avatar/" + avatar[0].newFilename });
    fs.writeFileSync('./static/userinfo.json', JSON.stringify(userinfo));
    res.send(JSON.stringify(userinfo));
})
app.get('/getuser', (req, res) => {
    res.send(fs.readFileSync('./static/userinfo.json'));
})

app.listen(8989);