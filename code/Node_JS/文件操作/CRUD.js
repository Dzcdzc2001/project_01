//使用fs模块进行文件操作
let fs = require("fs");

//文件的创建和写入
//同步
// fs.writeFileSync("./新建文件.txt","写入的内容");
//异步
// fs.writeFile("./新建文件.txt","写入的内容",err=>{});

//判断文件是否存在，同步
// if(!fs.existsSync("./新建文件.txt")){
//     //删除文件 同步
//     fs.unlinkSync("./新建文件.txt");
// }

//读取文件
//同步 返还值为读取内容 默认为十六进制 可以更改编码格式
// fs.readFileSync("./新建文件.txt","utf-8");
//异步 回调函数的参数为读取内容 默认为十六进制 可以更改编码格式 也可使用toString()方法
// fs.readFile("./新建文件.txt","utf-8",res=>{});

