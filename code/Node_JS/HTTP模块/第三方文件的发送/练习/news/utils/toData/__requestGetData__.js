function requestGetData(url) {
    let data = url.split("?")[1];
    let obj = {};
    if (data) {
        data.forEach(item => {
            obj[item.split("=")[0]] = item.split("=")[1];
        });
    }
    return obj;
}

module.exports={
    requestGetData
}