import { GamePlay } from "./GamePlay";

export class Map extends GamePlay {
    constructor() {
        super();
        this.name = "map";
        this.borderEle = document.createElement("div");
        this.width = 0;
        this.height = 0;
        // this.gameoverEle = document.createElement("div");
    }
    init() {
        this.borderEle.className = "container";
        document.body.appendChild(this.borderEle);
        this.width = parseInt(getComputedStyle(this.borderEle).width);
        this.height = parseInt(getComputedStyle(this.borderEle).height);
        // this.gameoverEle.className = "gameover";
        // this.borderEle.appendChild(this.gameoverEle);
        // console.log(this.width,this.height)
    }
}