const fs = require("fs");


function myRemove(src) {
    try {
        let arr = fs.readdirSync(src);
        if (arr.length === 0) {
            fs.rmdirSync(src);
        } else {
            arr.forEach(item => {
                if (fs.statSync(item).isDirectory()) {
                    myRemove(item);
                } else {
                    fs.unlinkSync(item);
                }
            })
        }
    } catch (err) {
        console.log(err);
    }

}
myRemove("111");