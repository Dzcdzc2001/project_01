import { GamePlay } from "./GamePlay";

export class PlayerController extends GamePlay {
    constructor() {
        super();
        this.name = "playerController";
        this.key = "";
    }
    bindKeyEvent() {
        var that = this;
        document.onkeydown = function (e) {
            that.key = e.key;
            // console.log(1);
        }
    }
    getKey() {
        return this.key;
    }
    init() {
        this.bindKeyEvent();
    }
}