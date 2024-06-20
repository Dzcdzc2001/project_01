import { GamePlay } from "./GamePlay";
import { Player } from "./Actor";

export class Food extends Player {
    constructor() {
        super();
        this.name = "food";
        this.food = {};

    }
    makeFood(map, player) {
        var that = this;
        this.food = new Crat("red");
        this.food.setPosition(parseInt(Math.random() * map.width / 100) * 100, parseInt(Math.random() * map.height / 100) * 100);
        map.borderEle.appendChild(this.food.ele);
        this.position.x = parseInt(getComputedStyle(this.food.ele).left);
        this.position.y = parseInt(getComputedStyle(this.food.ele).top);
        // console.log(this.food.ele)
        while (fn(player)) {
            this.food.setPosition(parseInt(Math.random() * map.width / 100) * 100, parseInt(Math.random() * map.height / 100) * 100);
            map.borderEle.appendChild(this.food.ele);
            this.position.x = parseInt(getComputedStyle(this.food.ele).left);
            this.position.y = parseInt(getComputedStyle(this.food.ele).top);
        }
        

        function fn(player) {
            return player.snake.some((item, key) => {
                // console.log(1) 
                // console.log(player.position.x == parseInt(getComputedStyle(item).left) && this.position.y == parseInt(getComputedStyle(item).top))
                return that.position.x == parseInt(getComputedStyle(item).left) && that.position.y == parseInt(getComputedStyle(item).top)
            })
        }
    }
}