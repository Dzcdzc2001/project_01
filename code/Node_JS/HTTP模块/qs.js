const amodule = require("../amodule");

function qs(req) {
    let data = req.url.split("?")[1];
    let obj = {};
    data.split("&").forEach(item => {
        obj[item.split("=")[0]] = item.split("=")[1];
    })
    return obj;
}
module.exports = {
    qs
}