const fs = require("fs");

// 创建文件夹
// fs.mkdirSync("111");

//删除文件夹 只能删除空文件夹
// fs.rmdirSync("111");

//重命名
// fs.renameSync("111","222");

//读取文件夹 只能读取一层
// fs.readdirSync("111");

//利用递归实现完全删除文件夹
function myRemove(src) {
    try {
        let arr = fs.readdirSync(src);
        if (arr.length === 0) {
            fs.rmdirSync(src);
        } else {
            arr.forEach(item => {
                if (fs.statSync(src+"/"+item).isDirectory()) {
                    myRemove(src+"/"+item);
                } else {
                    fs.unlinkSync(src+"/"+item);
                }
            })
            fs.rmdirSync(src);
        }
    } catch (err) {
        console.log(err);
    }

}
// myRemove("./111");