let canvas = document.getElementById('area');
let ctx = canvas.getContext('2d');

const gameArea = {
    frames: 0,
    level: 1,
    speed: 5,
    crocs: [],
    score: 0,
    drawScore: function() {
        ctx.font = '18px tahoma';
        ctx.fillStyle = 'white';
        ctx.fillText(`Score ${this.score}`, 165, 650);
    },
    start: function (){
        this.interval = setInterval(updateArea, 20);
    }
};


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
});

canvas.addEventListener('mouseup', e => {
    x = 0;
    y = 0;
    isAttack = false;
});

function validationAttack(){
    gameArea.crocs.forEach(croc => {
        if (y >= croc.y && y <= croc.y+50 && x >= croc.x && x <= croc.x+50){
            gameArea.score += 10;
        }
    })
}

function updateArea() {
    gameArea.frames += 1
    clearArea();
    background.draw();
    createCrocs();
    moveCrocs();
    gameArea.drawScore();
    console.log(gameArea.score)
}

gameArea.start()