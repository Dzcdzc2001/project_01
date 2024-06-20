import { GamePlay } from "./GamePlay";




export class Game extends GamePlay {
    static instence;
    constructor() {
        super();
        if (!Game.instence) {
            Game.instence = this;
        } else {
            return Game.instence;
        }
        this.timer = "";
        this.map = new Map();
        this.player = new Snake();
        this.playerController = new PlayerController();
        this.food = new Food();
        this.score = {};
        this.point = 0;
        this.gameoverText = "GAME OVER";
    }
    init() {
        this.playerController.init();
        this.map.init();
        this.player.init(this.map, this.food);
        this.food.makeFood(this.map, this.player);
        this.tick();
        this.scoreInit();
    }
    tick() {
        var that = this;
        this.timer = setInterval(() => {
            that.collison();
            that.move();
        }, 500)
    }
    eat() {
        if (this.player.collisonInf.collider.name == "food") {
            console.log("eat")
            this.player.collisonInf.collider.food.ele.remove();
            this.food.makeFood(this.map, this.player);
            this.getScore();
        }
    }
    scoreInit() {
        this.score = new Crat("white");
        this.score.ele.style.backgroundColor = "rgba(255,255,255,0)";
        this.score.ele.style.color = "yellowgreen";
        this.score.ele.style.fontSize = "35px";
        this.score.ele.style.textWrap = "nowrap";
        this.map.borderEle.appendChild(this.score.ele);
        this.point = 0;
        this.score.ele.innerText = `得分：${this.point}`;
    }
    getScore() {
        this.point++;
        this.score.ele.innerText = `得分：${this.point}`;
    }
    gameOver() {
        var that = this;
        if (this.player.collisonInf.collider.name == "map" || this.player.collisonInf.collider.name == "snake") {
            // console.log(this.player.collisonInf.collider.name)
            clearInterval(this.timer);
            this.player.snake.forEach((item, key) => {
                // console.log(that.player.positionList)
                item.style.left = that.player.positionList[key].x + "px";
                item.style.top = that.player.positionList[key].y + "px";
            })
            var gameoverEle = document.createElement("div");
            gameoverEle.innerText = this.gameoverText;
            gameoverEle.className = "gameOver";
            gameoverEle.style.display = "block";
            this.map.borderEle.appendChild(gameoverEle);
        }
    }
    move() {
        switch (this.playerController.getKey()) {
            case "a":
                this.player.axis = "left";
                this.player.dir = -1;
                // console.log("a")
                break;
            case "d":
                this.player.axis = "left";
                this.player.dir = 1;
                break;
            case "w":
                this.player.axis = "top";
                this.player.dir = -1;
                break;
            case "s":
                this.player.axis = "top";
                this.player.dir = 1;
                break;
        }
        var that = this;
        // console.log(this.player.snake.length)
        // console.log(that.positionList.length)
        this.player.snake.forEach((item, key) => {
            // console.log(key)
            that.player.positionList[key].x = parseInt(getComputedStyle(item).left);
            that.player.positionList[key].y = parseInt(getComputedStyle(item).top);
        })
        this.player.snake[0].style[this.player.axis] = parseInt(getComputedStyle(this.player.snake[0])[this.player.axis]) + 100 * this.player.dir + "px";
        // console.log(this.snake[0].style[this.axis])
        var pown = new Crat(this.player.color);
        this.player.snake.splice(1, 0, pown.ele);
        pown.setPosition(this.player.position.x, this.player.position.y);
        // console.log(this.player.position.x,this.player.position.y)
        this.map.borderEle.appendChild(pown.ele);
        // console.log(this.map.borderEle)
        // console.log()
        this.player.position.x = parseInt(getComputedStyle(this.player.snake[0]).left);
        this.player.position.y = parseInt(getComputedStyle(this.player.snake[0]).top);

        this.player.collison(this.map, this.food)

        // console.log(this.player.collisonInf.collider.name);
        if (this.player.collisonInf.collider.name == "food") {
            this.player.positionList.unshift(pown.position);
            this.eat();
        } else {
            var tail = this.player.snake.pop();
            tail.remove();
            // console.log("re")
        }
        this.gameOver();
    }
}