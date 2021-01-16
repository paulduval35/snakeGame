const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");

cvs.width = 400;
cvs.height = 400;

let frames = 0;

let foodEaten = true;

const direction = {
    current: 0,
    left: 1,
    right: 2,
    up: 3,
    down: 4,
}

document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 37:
            if(direction.current != direction.left && direction.current != direction.right) {
                direction.current = direction.left
                //console.log(direction.current)
            }
            break;
        case 38:
            if(direction.current != direction.up && direction.current != direction.down) {
                direction.current = direction.up
                //console.log(direction.current)
            }
            break;
        case 39:
            if(direction.current != direction.right && direction.current != direction.left) {
                direction.current = direction.right
                //console.log(direction.current)
            }
            break;
        case 40:
            if(direction.current != direction.down && direction.current != direction.up) {
                direction.current = direction.down
                //console.log(direction.current)
            }
            break;
        default:
            console.log("Please use keyboard arrows")
    }

});


const food = {
    x: cvs.width/4,
    y: cvs.height/4,
    r: 10,
    draw: function() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath()
    }
};


const snake = {
    r: 10,
    position: [{x: cvs.width/2,
                y: cvs.height/2}],  
    velocity: 20,

    draw: function() {
        ctx.fillStyle = "black";
        for(i = 0; i < this.position.length; i++) {
            let p = this.position[i]
            ctx.beginPath()
            ctx.arc(p.x, p.y, this.r, 0, 2*Math.PI)
            ctx.fill()
            ctx.closePath()
        }
    },

    update: function() {
        if(frames % 6 == 0) {

            if(this.position[0].x > cvs.width) this.position[0].x = this.r;
            if(this.position[0].x < 0) this.position[0].x = cvs.width - this.r;
            if(this.position[0].y > cvs.height) this.position[0].y = this.r;
            if(this.position[0].y < 0) this.position[0].y = cvs.height - this.r;

            for(let i = this.position.length - 1; i > 0; i--){

                if(this.position[0].x == this.position[i].x && this.position[0].y == this.position[i].y && this.position.length > 2) {
                    this.position.splice(1);
                    break;
                }

                this.position[i].x = this.position[i-1].x;
                this.position[i].y = this.position[i-1].y;

                
            }

            if(direction.current == direction.right) this.position[0].x += this.velocity;
            if(direction.current == direction.left) this.position[0].x -= this.velocity;
            if(direction.current == direction.up) this.position[0].y -= this.velocity;
            if(direction.current == direction.down) this.position[0].y += this.velocity;
            
            if(getDistance(food.x, food.y, this.position[0].x, this.position[0].y) < 2*this.r) {
                food.x = Math.random()*cvs.width;
                food.y = Math.random()*cvs.height;

                this.position.push({
                    x: this.position[this.position.length-1].x, 
                    y: this.position[this.position.length-1].y
                });
            }
            
        }
    }

};

function getDistance (foodX, foodY, snakeX, snakeY) {
    let distanceX = foodX - snakeX;
    let distanceY = foodY - snakeY;

     return Math.sqrt(Math.pow(distanceX, 2) + (Math.pow(distanceY, 2))); 
}


function main() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    snake.update();
    snake.draw();
    food.draw();
    frames ++;
    requestAnimationFrame(main);
}

requestAnimationFrame(main);