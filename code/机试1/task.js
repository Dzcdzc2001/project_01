function tab() {
    let tabBarEle = document.querySelector(".tabBar");
    let tabContentEle = document.querySelector(".tabContent");

    [...tabBarEle.children].forEach((item, key) => {
        item.onclick = function () {
            [...tabBarEle.children].forEach(val => {
                val.classList.remove("active");
            })
            this.classList.add("active");

            [...tabContentEle.children].forEach(vall => {
                vall.classList.remove("active");
            });
            [...tabContentEle.children][key].classList.add("active");

            menu();
        }
    })
}
tab();


function menu() {
    let tabContentEle = document.querySelector(".tabContent");
    let activeContent = document.querySelector(".content.active");
    let index = 0;

    activeContent.oncontextmenu = function (e) {
        e.preventDefault();
        let menuEle = document.createElement("div");
        let x = e.clientX;
        let y = e.clientY;
        menuEle.className = "menu";
        menuEle.innerText = "新建文件夹";
        menuEle.style.left = x + 2 + "px";
        menuEle.style.top = y + 2 + "px";

        menuEle.onmouseenter = function () {
            this.style.backgroundColor = "#80fdcf";
        }
        menuEle.onmouseleave = function () {
            this.style.backgroundColor = "white";
        }
        menuEle.onclick = function () {
            index++;
            let dirEle = document.createElement("div");
            dirEle.className = "dir";
            dirEle.innerHTML = `<img src="./imgs/文件夹.png" alt=""><span>文件夹${index}</span>`;
            activeContent.appendChild(dirEle);
            this.remove();
        }

        if (tabContentEle.querySelector(".menu")) {
            tabContentEle.removeChild(tabContentEle.querySelector(".menu"));
        }
        tabContentEle.appendChild(menuEle);

        activeContent.onclick = function () {
            if (tabContentEle.querySelector(".menu")) {
                tabContentEle.removeChild(tabContentEle.querySelector(".menu"));
            }
        }
    }
}
menu()

function boxSelection() {
    let activeContent = document.querySelector(".content.active");
    let dirs = document.querySelectorAll(".dir");
    let posDown = { x: 0, y: 0 };
    let posUp = { x: 0, y: 0 };
    let selecttionBox;
    let boxWidth;
    let boxHeight;

    activeContent.onmousedown = function (e) {
        // console.log(e.button, 111)
        if (e.button === 0) {
            selecttionBox = document.createElement("div");
            selecttionBox.style.border = "1px dashed";
            selecttionBox.style.backgroundColor = "#66feff";
            selecttionBox.style.opacity = ".2";
            selecttionBox.style.position = "absolute";
            this.appendChild(selecttionBox);

            posDown.x = e.clientX;
            posDown.y = e.clientY;
            // console.log(posDown)
            activeContent.onmousemove = function (e) {
                posUp.x = e.clientX;
                posUp.y = e.clientY;
                // console.log(posUp)
                boxWidth = posUp.x - posDown.x;
                boxHeight = posUp.y - posDown.y;
                // console.log(boxWidth,boxHeight)
                if (boxWidth >= 0 && boxHeight >= 0) {
                    // console.log(selecttionBox)
                    selecttionBox.style.left = posDown.x + "px";
                    selecttionBox.style.top = posDown.y + "px";
                    selecttionBox.style.width = Math.abs(boxWidth) + "px";
                    selecttionBox.style.height = Math.abs(boxHeight) + "px";
                    // console.log(Math.abs(boxWidth),Math.abs(boxHeight))
                } else if (boxWidth >= 0 && boxHeight < 0) {
                    selecttionBox.style.left = posDown.x + "px";
                    selecttionBox.style.top = posUp.y + "px";
                    selecttionBox.style.width = Math.abs(boxWidth) + "px";
                    selecttionBox.style.height = Math.abs(boxHeight) + "px";
                } else if (boxWidth <= 0 && boxHeight < 0) {
                    selecttionBox.style.left = posUp.x + "px";
                    selecttionBox.style.top = posUp.y + "px";
                    selecttionBox.style.width = Math.abs(boxWidth) + "px";
                    selecttionBox.style.height = Math.abs(boxHeight) + "px";
                } else {
                    selecttionBox.style.left = posUp.x + "px";
                    selecttionBox.style.top = posDown.y + "px";
                    selecttionBox.style.width = Math.abs(boxWidth) + "px";
                    selecttionBox.style.height = Math.abs(boxHeight) + "px";
                }
            }
            document.onmouseup = function (e) {
                // console.log(e.button, 111)
                if (e.button === 0) {
                    activeContent.onmousemove = "";

                    dirs.forEach(item => {
                        if (item.getBoundingClientRect().right - posDown.x >= 0 && item.getBoundingClientRect().right - posUp.x <= 0) {
                            // if(){
                            //     // item.style.backgroundColor = "blue";
                            // }  
                        }
                    })
                    selecttionBox.remove();
                }

            }
        }

    }




}
boxSelection();