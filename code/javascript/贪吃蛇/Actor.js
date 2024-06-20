import { GamePlay } from "./GamePlay";
export class Actor extends GamePlay {
    constructor() {
        super();
        this.name = "Actor";
        this.entity = document.createElement("div");
        this.transform = { position: { x: 0, y: 0 }, rotate: 0, scale: 1 };
    }
    init() { }
    collison() { }//碰撞
    tick() { }//帧更新
    creat() {

    }
    destroy() { }//销毁
    setTransform(x = 0, y = 0, rotate = 0, scale = 1) {
        // { position: { x: 0, y: 0 }, rotate: 0, scale: 1 }
        this.transform.position.x = x;
        this.transform.position.y = y;
        this.transform.rotate = rotate;
        this.transform.scale = scale;

    }
    getTransform() {

    }
    refresh() {
        this.transform.position.x= getComputedStyle(this.entity).left;
        this.transform.position.y= getComputedStyle(this.entity).top;
        
    }
    // getPosition() {
    //     return this.position;
    // }
    // setPosition(position_X, position_Y) {
    //     this.position.x = position_X;
    //     this.position.y = position_Y;
    // }
}