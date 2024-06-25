const fs = require("fs");
const util = require("util");
let arr = [{ name: "张三", age: 20 }, { name: "李四", age: 22 }];
// util.promisify

// function myWriteFile(src, data) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(src, JSON.stringify(data), err => {
//             if (err) {
//                 reject("写入失败");
//             }
//             resolve("写入成功");
//         });
//     })
// }

// function myModifyFile(src) {
//     return new Promise((resolve, reject) => {
//         let person = { name: "王五", age: 21 };
//         let res;
//         try {
//             res = fs.readFileSync(src);
//         } catch (err) {
//             reject("读取失败");
//         }
//         res = JSON.parse(res);
//         res.push(person);
//         resolve(res);
//     })
// }
// (async function () {
//     try {
//         let res = await myWriteFile("./user.json",arr);
//         console.log(res);
//         res = await myModifyFile("./user.json");
//         res = await myWriteFile("./user.json",res);
//         console.log(res);
//     } catch (err) {
//         console.log(err);
//     }
// })();


// if (!fs.existsSync("./person.json")) {
//     fs.writeFile("./person.json", JSON.stringify(arr), err => {
//         if (err) {
//             return console.log("写入失败")
//         }
//         console.log("写入成功")
//     });


// } else {
//     let person = { name: "王五", age: 21 };
//     let res;
//     try {
//         res = fs.readFileSync("./person.json");
//         // console.log(res)
//         console.log("读取成功");
//     } catch (err) {
//         console.log("读取失败")
//     }
//     // console.log(JSON.parse(res),person)
//     res = JSON.parse(res);
//     res.push(person);
//     // console.log(res)
//     fs.writeFile("./person.json", JSON.stringify(res), err => {
//         if (err) {
//             return console.log("写入失败")
//         }
//         console.log("写入成功")
//     });
// }
if (!fs.existsSync("./a.txt")) {
    fs.writeFileSync("./a.txt", "hello world");
}
//同步
function myCopySync(src1, src2) {
    try {
        let data = fs.readFileSync(src1);
        console.log("复制成功");
        fs.writeFileSync(src2, data);
        console.log("粘贴成功");
    } catch (err) {
        console.log(err);
    }
}
// myCopySync("./a.txt", "./b.txt")

//异步回调
function myCopyAsync1(src1, src2) {
    try {
        fs.readFile(src1, (err, data) => {
            if (err) {
                return console.log("复制失败");
            }
            console.log("复制成功");
            fs.writeFile(src2, data, err => {
                if (err) {
                    return console.log("粘贴失败");
                }
                console.log("粘贴成功");
            });
        });
    } catch (err) {
        console.log(err);
    }
}
// myCopyAsync1("./a.txt", "./b.txt")
//promise改写
function myCopyAsync2(src1, src2) {
    return (new Promise((resolve, reject) => {
        fs.readFile(src1, (err, data) => {
            if (err) {
                reject("复制失败");
            }
            resolve(data);
        });
    })).then(data => {
        console.log("复制成功");
        return new Promise((resolve, reject) => {
            fs.writeFile(src2, data, err => {
                if (err) {
                    reject("粘贴失败");
                }
                resolve("粘贴成功")
            });
        })
    })
}
//then调用
// myCopyAsync2("./a.txt", "./b.txt").then(res => {
//     console.log(res);
//     return myCopyAsync2("./a.txt", "./c.txt")
// }).then(res => { console.log(res); }).catch(err => { console.log(err); });

//async await 改写
// (async function () {
//     try {
//         await myCopyAsync2("./a.txt", "./b.txt");
//         await myCopyAsync2("./a.txt", "./c.txt");
//     } catch (err) {
//         console.log(err);
//     }
// })();

function myPromiseify(fn) {
    return function (...arg) {
        return new Promise((resolve, reject) => {
            fn(...arg, (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data) {
                    resolve(data);
                } else {
                    resolve("粘贴成功");
                }
            });
        })
    }
}
function myCopyAsync3(src1, src2) {
    return myPromiseify(fs.readFile)(src1).then(data => {
        console.log("复制成功");
        return myPromiseify(fs.writeFile)(src2, data);
    })
}
(async function () {
    try {
        await myCopyAsync3("./a.txt", "./b.txt");
        await myCopyAsync3("./a.txt", "./c.txt");
    } catch (err) {
        console.log(err);
    }
})();



function signUp() {
    if (!fs.existsSync("./user.json")) {
        fs.writeFile("./user.json", "[]", err => {
            if (err) {
                return console.log("初始化失败", err);
            }
            console.log("初始化成功");
        })
    } else {
        let data = JSON.parse(fs.readFileSync("./user.json"));
        // if (data.length === 0) {
        //     data.push({ id: 1, name: `张三1` });
        // } else {
        //     data.push({ id: data[data.length - 1].id + 1, name: `张三${data[data.length - 1].id + 1}` });
        // }
        data.push({ id: data.length + 1, name: `张三${data.length + 1}` });

        fs.writeFile("./user.json", JSON.stringify(data), err => {
            if (err) {
                return console.log("创建失败");
            }
            console.log("创建成功");
        })
    }
}
// signUp();


