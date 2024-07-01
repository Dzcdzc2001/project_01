function bodyparser() {
    return function (req, res, next) {
        let str = "";
        req.on("data", chunk => {
            str += chunk.toString();
        })
        req.on("end", err => {
            req.body = str;
            next();
        })
    }
}
module.exports = bodyparser;