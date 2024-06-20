let clientGoodsData = JSON.parse(JSON.stringify(goodData));
// console.log(clientGoodsData)
clientGoodsData.buy = { originalPrice: clientGoodsData.goodsDetail.price, changePrice: 0, buyNum: 1 };
// console.log(clientGoodsData)

function randerPath(path) {
    let conPointEle = document.querySelector(".conPoint");
    conPointEle.innerHTML = "";
    path.forEach(item => {
        let pathEle = document.createElement("a");
        conPointEle.appendChild(pathEle);
        pathEle.innerHTML = item.title;
        pathEle.href = item.url;
    });
}
randerPath(goodData.path);

function randerList(imgsrc) {
    let listEle = document.querySelector(".list");
    listEle.innerHTML = "";
    imgsrc.forEach(item => {
        let liEle = document.createElement("li");
        let imgEle = document.createElement("img");
        liEle.appendChild(imgEle);
        listEle.appendChild(liEle);
        imgEle.src = item.s
    });
    listEle.firstElementChild.firstElementChild.style.border = "1px solid red";
}
randerList(goodData.imgsrc);

function changeList(imgsrc) {
    let leftBtn = document.querySelector(".left");
    let rightBtn = document.querySelector(".right");
    let listOutEle = document.querySelector(".listOut");
    let listEle = document.querySelector(".list");
    let length = Math.ceil((imgsrc.length || 0) / 5);
    let index = 0;

    leftBtn.onclick = function () {
        if (index > 0) {
            index--;
            listEle.style.transform = `translate(${-listOutEle.offsetWidth * index}px)`;
        }
    }
    rightBtn.onclick = function () {
        if (index < length - 1) {
            index++;
            listEle.style.transform = `translate(${-listOutEle.offsetWidth * index}px)`;
        }
    }
}
changeList(goodData.imgsrc);

function changePrevious(imgsrc) {
    let smallAreaEle = document.querySelector(".smallArea");
    let bigAreaEle = document.querySelector(".bigArea");
    let listEle = document.querySelector(".list");

    [...listEle.children].forEach((item, key) => {
        item.onmouseenter = function () {
            [...listEle.children].forEach((item) => {
                item.firstElementChild.style.border = "1px solid #ccc";
            })
            this.firstElementChild.style.border = "1px solid red";
            smallAreaEle.firstElementChild.src = imgsrc[key].s;
            bigAreaEle.firstElementChild.src = imgsrc[key].b;
        }
    })
}
changePrevious(goodData.imgsrc);

function enlarge() {
    let smallAreaEle = document.querySelector(".smallArea");
    let maskEle = document.querySelector(".mask");
    let bigAreaEle = document.querySelector(".bigArea");

    smallAreaEle.onmouseenter = function (e) {
        maskEle.style.display = "block";
        bigAreaEle.style.display = "block";
    }
    smallAreaEle.onmousemove = function (e) {
        let x = e.clientX - this.getBoundingClientRect().left - maskEle.offsetWidth / 2;
        let y = e.clientY - this.getBoundingClientRect().top - maskEle.offsetHeight / 2;
        maskEle.style.left = x + "px";
        maskEle.style.top = y + "px";
        if (x < 0) {
            maskEle.style.left = "0";
        }
        if (y < 0) {
            maskEle.style.top = "0";
        }
        if (x > this.offsetWidth - maskEle.offsetWidth) {
            maskEle.style.left = this.offsetWidth - maskEle.offsetWidth + "px";
        }
        if (y > this.offsetHeight - maskEle.offsetHeight) {
            maskEle.style.top = this.offsetHeight - maskEle.offsetHeight + "px";
        }
        bigAreaEle.firstElementChild.style.left = -(maskEle.offsetLeft / smallAreaEle.offsetWidth * bigAreaEle.firstElementChild.offsetWidth) + "px";
        bigAreaEle.firstElementChild.style.top = -(maskEle.offsetTop / smallAreaEle.offsetHeight * bigAreaEle.firstElementChild.offsetHeight) + "px";
    }
    smallAreaEle.onmouseleave = function (e) {
        maskEle.style.display = "none";
        bigAreaEle.style.display = "none";
    }
}
enlarge();

function randerGoodsDetials(goodsDetail) {
    let titleEle = document.querySelector(".title");
    let recommendEle = document.querySelector(".con1");
    let priceEle = document.querySelector(".priceDetail span");
    let promoteSalesTypeEle = document.querySelector(".buy span");
    let promoteSalesContentEle = document.querySelector(".buy").lastElementChild.lastChild;
    let supportDetailsEle = document.querySelector(".supportDetail").lastElementChild;
    let addressEle = document.querySelector(".address").lastElementChild;

    titleEle.innerHTML = goodsDetail.title;
    recommendEle.innerHTML = goodsDetail.recommend;
    priceEle.innerHTML = goodsDetail.price;
    promoteSalesTypeEle.innerHTML = goodsDetail.promoteSales.type;
    promoteSalesContentEle.textContent = goodsDetail.promoteSales.content;
    supportDetailsEle.innerHTML = goodsDetail.support;
    addressEle.innerHTML = goodsDetail.address;
}
randerGoodsDetials(goodData.goodsDetail)

function randerCrumb(crumbData) {

    let chooseAreaEle = document.querySelector(".chooseArea");
    chooseAreaEle.innerHTML = "";

    crumbData.forEach(item => {
        let dlEle = document.createElement("dl");
        let dtEle = document.createElement("dt");
        dtEle.innerHTML = item.title;
        dlEle.appendChild(dtEle);
        item.data.forEach((item, key) => {
            let ddEle = document.createElement("dd");
            ddEle.innerHTML = item.type;
            //
            ddEle.changePrice = item.changePrice;
            if (key === 0) {
                ddEle.isChecked = true;
            } else {
                ddEle.isChecked = false;
            }
            dlEle.appendChild(ddEle);

            ddEle.onclick = function () {
                dlEle.querySelectorAll("dd").forEach((item, k) => {
                    if (k === key) {
                        this.style.color = "red";
                        this.isChecked = true;
                    } else {
                        item.style.color = "#666";
                        item.isChecked = false;
                    }
                })
                randerMark(clientGoodsData);
            }
        })
        chooseAreaEle.appendChild(dlEle)
    })
}
randerCrumb(goodData.goodsDetail.crumbData);

function randerMark(goodsData) {
    let chooseInsertEle = document.querySelector(".chooseInsert");
    let chooseAreaEle = document.querySelector(".chooseArea");
    // let priceEle = document.querySelector(".priceDetail span");
    let totalPrice = 0;
    chooseInsertEle.innerHTML = '';
    chooseAreaEle.querySelectorAll("dl").forEach((item) => {
        item.querySelectorAll("dd").forEach(item => {
            if (item.isChecked) {
                let markEle = document.createElement("mark");
                markEle.innerHTML = `${item.innerText}<a>X</a>`;
                chooseInsertEle.appendChild(markEle);
                // console.log(goodsData.buy.changePrice)
                totalPrice += item.changePrice;
                goodsData.buy.changePrice = totalPrice;

                markEle.querySelector("a").onclick = function () {
                    markEle.remove();
                    item.style.color = "#666";
                    item.isChecked = false;
                    randerMark(clientGoodsData);
                }
            }
        })
    })
    randerPrice();
}
randerMark(clientGoodsData);

function randerPrice() {
    let priceEle1 = document.querySelector(".priceDetail span");
    let priceEle2 = document.querySelector(".master p");
    let totalPrice = 0;
    totalPrice = ((clientGoodsData.buy.originalPrice || 0) + (clientGoodsData.buy.changePrice || 0)) * (clientGoodsData.buy.buyNum || 1);
    priceEle1.innerHTML = totalPrice;
    priceEle2.innerHTML = "¥" + totalPrice;
    randerSuitsPrice();
}
randerPrice();
function randerSuitsPrice() {
    let suitsPriceEle = document.querySelector(".result .price");
    let suitsEle = document.querySelector(".suits");
    let suitsPrice = 0;
    let totalPrice = 0;

    suitsEle.querySelectorAll("input").forEach((item) => {
        if (item.checked) {
            suitsPrice += parseInt(item.value);
        }
    })
    totalPrice = ((clientGoodsData.buy.originalPrice || 0) + (clientGoodsData.buy.changePrice || 0)) * (clientGoodsData.buy.buyNum || 1) + suitsPrice;
    suitsPriceEle.innerHTML = "¥" + totalPrice;
}
randerSuitsPrice();

function changeGoodsNum(goodsData) {
    let plusNumBtn = document.querySelector(".plus");
    let minsNumBtn = document.querySelector(".mins");
    let numEle = document.querySelector(".num")
    let goodsNum = 1;

    numEle.firstElementChild.value = goodsNum;

    plusNumBtn.onclick = function () {
        goodsNum++;
        numEle.firstElementChild.value = goodsNum;
        goodsData.buy.buyNum = goodsNum;
        randerPrice();
    }
    minsNumBtn.onclick = function () {
        if (goodsNum > 1) {
            goodsNum--;
            numEle.firstElementChild.value = goodsNum;
            goodsData.buy.buyNum = goodsNum;
            randerPrice();
        }
    }
}
changeGoodsNum(clientGoodsData);

function chooseSuits() {
    let suitsEle = document.querySelector(".suits");
    suitsEle.querySelectorAll("input").forEach((itme) => {
        itme.onclick = function () {
            randerSuitsPrice();
        }
    })
}
chooseSuits();

function asideTab() {
    let tabEle = document.querySelector(".tabTitle");
    let tabContentEle = document.querySelector(".tabContent");

    [...tabEle.children].forEach((item, key) => {
        item.onclick = function () {
            [...tabEle.children].forEach((item, k) => {
                if (k === key) {
                    item.className = "active";
                } else {
                    item.className = "";
                }
            });
            [...tabContentEle.children].forEach((val, k) => {
                if (k === key) {
                    val.className = "tab-pane active";
                } else {
                    val.className = "tab-pane";
                }
            })
        }
    })
}
asideTab();

function introduce(){
    let tabEle = document.querySelector(".tab-wraped");
    let tabContentEle = document.querySelector(".tab-content");

    [...tabEle.children].forEach((item, key) => {
        item.onclick = function () {
            [...tabEle.children].forEach((item, k) => {
                if (k === key) {
                    item.className = "active";
                } else {
                    item.className = "";
                }
            });
            [...tabContentEle.children].forEach((val, k) => {
                if (k === key) {
                    val.className = "tab-pane active";
                } else {
                    val.className = "tab-pane";
                }
            })
        }
    })
}
introduce()