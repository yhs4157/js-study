const canvas = document.querySelector('canvas'); 

const ctx = document.getContext('2d'); 
// 2d 그림을 그릴 것이다. 

const width = canvas.width = window.innerWidth; 
const height = canvas.width = window.innerHeight; 

function random(min, max) {
    const num = Math.floor(Math.random() *  ( max - min + 1)) + min; 
    return num; 
}

function Ball(x, y, valX, valY, color, size) {
    this.x = x; 
    this.y = y; 
    this.valX = valX; 
    this.valY = valY; 
    this.color = color; 
    this.size = size; 
}

Ball.prototype.draw = function() {
    ctx.beginPath(); 
    ctx.fillStyle = this.color; 
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); 
    ctx.fill(); 
}

Ball.prototype.update = function() {
    if((this.x + this.size) >= width) {
        this.velX = -(this.velX); 
    }

    if((this.x - this.size) <= 0) {
        this.velX = -(this.velX); 
    }

    if((this.y + this.size) >= height) {
        this.velY = -(this.velY); 
    }

    if((this.y - this.size) <= 0) {
        this.velY = -(this.velY); 
    }

    this.x += this.velX; 
    this.y += this.velY; 
}

let balls = []; 

while(balls.length <25) {
    let size = random(10, 20); 
    let ball = new ball(
        random(0 + size, width - size), 
        random(0 + size, height - size),
        random(-7, 7), 
        random(-7, 7), 
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size 
    );
    balls.push(ball); 
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; 
    ctx.fillRect(0, 0, width, height); 

    for(let i = 0; i < balls.length; i++) {
        balls[i].draw(); 
        balls[i].update(); 
    }
    requestAnimationFrame(loop); 
}

loop(); 