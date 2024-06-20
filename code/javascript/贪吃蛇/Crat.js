export class Crat {
    constructor(color) {
        this.ele = document.createElement("div");
        this.ele.className = "crat";
        this.ele.style.backgroundColor = color;
        this.position = { x: 0, y: 0 };
        // map.borderEle.appendChild
    }
    setPosition(x, y) {
        this.ele.style.left = x + "px";
        this.ele.style.top = y + "px";
        this.position.x = x;
        this.position.y = y;
    }
}
