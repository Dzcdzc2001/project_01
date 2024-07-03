function page(data, set, index) {
    let pages = Math.ceil(data.length / set);
    let cpage = data.filter((item, key) => {
        return key >= set * (index - 1) && key < set * index;
    })
    return { cpage, pages, index };
}

module.exports = page;