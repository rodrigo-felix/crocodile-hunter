let canvas = document.getElementById('area');
let ctx = canvas.getContext('2d');

const gameArea = {
    frames: 0,
    level: 1,
    speed: 5,
    crocs: [],
    start: function (){
        this.interval = setInterval(updateArea, 20);
    }
}

class Background {
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.land = 200
    }
    draw(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height-this.land);
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x, this.height-this.land, this.width, this.land)
    }
}

let background = new Background()

function clearArea () {
    ctx.clearRect(0, 0, 400, 700);
}

class Croc {

    constructor(posX, posY){
        this.x = posX
        this.y = posY
        this.width = 50
        this.height = 50
    }
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    move(){
        this.y = this.y + gameArea.speed
    }
}

function createCrocs(){
    if (gameArea.frames % 200 === 0){
        let coluna1 = 30;
        let coluna2 = 120;
        let coluna3 = 210;
        let coluna4 = 300;
        let startCroc = (min, max) => Math.floor(Math.random() * (max - min) + min);
        gameArea.crocs.push(new Croc(coluna1, startCroc(-250, 0)));
        gameArea.crocs.push(new Croc(coluna2, startCroc(-250, 0)));
        gameArea.crocs.push(new Croc(coluna3, startCroc(-250, 0)));
        gameArea.crocs.push(new Croc(coluna4, startCroc(-250, 0)));
    }
}

function moveCrocs(){
    gameArea.crocs.forEach(croc => {
        croc.draw();
        croc.move();              
    });
}

let isAttack = false;
let x = 0;
let y = 0;

canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    isAttack = true;
    validationAttack();
    console.log(score, y)
});

canvas.addEventListener('mouseup', e => {
    x = 0;
    y = 0;
    isAttack = false;
});

let score = 0

function validationAttack(){
    gameArea.crocs.forEach(croc => {
        if (y >= croc.y && y <= croc.y+50 && x >= croc.x && x <= croc.x+50){
            score += 10;
        }
    })
}

function updateArea() {
    gameArea.frames += 1
    clearArea();
    background.draw();
    createCrocs();
    moveCrocs()
}

gameArea.start()

// let level1 = 1;
// let level2 = 1;
// let level3 = 1;
// let level4 = 1;

// let speed1 = 0;
// let speed2 = 0;
// let speed3 = 0;
// let speed4 = 0;