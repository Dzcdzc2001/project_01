import { GamePlay } from "./GamePlay";
import { Player } from "./Actor";

export class Snake extends Player {
    constructor(length = 3, color = "green", speedrate = 1) {
        super();
        this.name = "snake";
        this.snake = [];
        this.length = length;
        this.color = color;
        this.axis = "left";
        this.dir = 1;
        this.speedrate = speedrate;
        this.timer = "";
        this.collisonInf = { isCrash: false, collider: {} }
    }
    init(map, food) {
        var pown;
        for (let i = 0; i < this.length; i++) {
            pown = new Crat(this.color);
            pown.setPosition(100 * i, 0);
            this.positionList.unshift(pown.position);
            this.snake.unshift(pown.ele);
            map.borderEle.appendChild(pown.ele);
        }
        // console.log(map)
        // console.log(this.snake)
        this.position.x = parseInt(getComputedStyle(this.snake[0]).left);
        this.position.y = parseInt(getComputedStyle(this.snake[0]).top);
        // console.log(this.position)
        // this.tick(playerController, map);
        // this.tick(map,food);
    }

    collison(map, food) {
        console.log(this.position.x, this.position.y, food.position.x, food.position.y)
        if (this.position.x < 0 || this.position.x > map.width - 100 || this.position.y < 0 || this.position.y > map.height - 100) {
            this.collisonInf.isCrash = true;
            this.collisonInf.collider = map;
        } else if (this.position.x == food.position.x && this.position.y == food.position.y) {
            console.log("food")
            this.collisonInf.isCrash = true;
            this.collisonInf.collider = food;
        } else if (fn(this)) {
            // console.log(2)
            this.collisonInf.isCrash = true;
            this.collisonInf.collider = this;
        } else {
            this.collisonInf.isCrash = false;
            this.collisonInf.collider = { name: "none" };
        }
        function fn(player) {
            return player.snake.some((item, key) => {
                // console.log(1)
                if (key > 0) {
                    // console.log(player.position.x == parseInt(getComputedStyle(item).left) && this.position.y == parseInt(getComputedStyle(item).top))
                    return player.position.x == parseInt(getComputedStyle(item).left) && player.position.y == parseInt(getComputedStyle(item).top)
                }
                return false;
            })
        }
    }
    tick() { }
}