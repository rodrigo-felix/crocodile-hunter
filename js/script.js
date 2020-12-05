let canvas = document.getElementById('area');
let ctx = canvas.getContext('2d');

const gameArea = {
    frames: 0,
    level: 1,
    speed: 2,
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
        let startCroc = Math.random() * (0 );
        gameArea.crocs.push(new Croc(coluna1, 0));
        gameArea.crocs.push(new Croc(coluna2, 0));
        gameArea.crocs.push(new Croc(coluna3, 0));
        gameArea.crocs.push(new Croc(coluna4, 0));
    }
}
//criar variavel depois da coluna4 com o math.random entre 0 e -200

function moveCrocs(){
    gameArea.crocs.forEach(croc => {
        croc.draw();
        croc.move();              
    });
}

function updateArea() {
    gameArea.frames += 1
    clearArea();
    background.draw();
    createCrocs();
    moveCrocs()
}

gameArea.start()


//     drawCroc(30, speed1, 50, 50, 'green');
//     drawCroc(120, speed1, 50, 50, 'green');
//     drawCroc(210, speed1, 50, 50, 'green');
//     drawCroc(300, speed1, 50, 50, 'green');

//     requestAnimationFrame(updateArea);
// }


// ROUND > LEVEL 

// let round1 = 0;
// let round2 = 1;
// let round3 = 2;
// let round4 = 3;

// let level1 = 1;
// let level2 = 1;
// let level3 = 1;
// let level4 = 1;

// let speed1 = 0;
// let speed2 = 0;
// let speed3 = 0;
// let speed4 = 0;