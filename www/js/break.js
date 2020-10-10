/**
 * !------------------------------------ TECLAS PERMITIDAS PARA JUGAR */

const keyz = { ArrowLeft: false, ArrowRight: false };
/**
 * !---------------------------------------------------------TABLERO */
const game = {
    grid: 60,
    ani: "",
    bricks: [],
    num: 48,
};
const ball = {
    x: game.grid * 7,
    y: game.grid * 5,
    w: game.grid / 5,
    h: game.grid / 5,
    color: "gold",
    dx: 12,
    dy: 8,
};
// * Creo un plano fisico de 2 Dimensiones y lo prepengo en el DOM

const canvas = document.createElement("canvas");
canvas.style.background = "black";
const ctx = canvas.getContext("2d");
document.body.prepend(canvas);

/**
 * ! ------------------------------------------------------   JUGADOR */
const player = {
    x: game.grid * 7,
    y: game.grid * 9,
    w: game.grid * 2,
    h: game.grid / 2,
    color: "rebeccapurple",
    speed: 9,
};

/**
 * ! ------------------------------------------------------CREO EL TABLERO */
canvas.setAttribute("width", game.grid * 15);
canvas.setAttribute("height", game.grid * 10);
canvas.style.border = "1px solid black";

// * Añado una escucha para la entrada de teclado

document.addEventListener("keydown", (e) => {
    /* console.log(e.code); */

    // * cuando se pulsada este en el objeto keyz la declaramos como verdadera
    if (e.code in keyz) {
        keyz[e.code] = true;
    }
    console.log(keyz);
});
document.addEventListener("keyup", (e) => {
    //* cuando se despulsada este en el objeto keyz la declaramos como falsa
    if (e.code in keyz) {
        keyz[e.code] = false;
    }
    console.log(keyz);
});
canvas.addEventListener("mousemove", (e) => {
    //* movimiento del raton dentro del canvas
    /*     console.log(e);
     */
    const val = e.clientX - canvas.offsetLeft;
    //* Si el raton está dentro del canvas
    if (val > player.w && val < canvas.width) {
        player.x = val - player.w;
    }
});

/* *
! ----------------------------------------------------------- DIBUJO */
game.ani = requestAnimationFrame(draw);
startGame();

function startGame() {
    let buffer = 10;
    let width = game.grid;
    let height = game.grid / 2;
    let totalAcross = Math.floor((canvas.width - game.grid) / (width + buffer));
    let xPos = game.grid / 2;
    let yPos = 0;
    console.log(totalAcross);
    for (let i = 0; i < game.num; i++) {
        if (i % totalAcross == 0) {
            yPos += height + buffer;
            xPos = height;
        }
        createBrick(xPos, yPos, width, height);
        xPos += width + buffer;
    }
}

function createBrick(xPos, yPos, width, height) {
    let randomColor = "#" + Math.random().toString(16).substr(-6);
    game.bricks.push({
        x: xPos,
        y: yPos,
        w: width,
        h: height,
        c: randomColor,
    });
}

function collDetection(obj1, obj2) {
    const xAxis = obj1.x < obj2.x + obj2.w && obj1.x + obj1.w > obj2.x;
    const yAxis = obj1.y < obj2.y + obj2.h && obj1.y + obj1.h > obj2.y;
    const val = xAxis && yAxis;
    return val;
}

function draw() {
    // * Cada vez que dibujamos, hay que borrar la pantalla anterior
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //* En el contexto, dibujamos un rectangulo que recibe los datos del objeto player
    playerMovement();
    ballMovement();
    drawPlayer();
    drawBall();
    //* Dibujamos los ladrillos
    game.bricks.forEach((brick, index) => {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = brick.c;
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        if (collDetection(brick, ball)) {
            game.bricks.splice(index, 1);
            ball.dy *= -1;
        }
    });
    if (collDetection(player, ball)) {
        ball.dy *= -1;
        let val1 = ball.x + ball.w / 2 - player.x;
        let val2 = val1 - player.w / 2;
        let val3 = Math.ceil(val2 / (player.w / 10));
        ball.dx = val3;
    }

    game.animation = requestAnimationFrame(draw);
}
//* con esta funcion actualizamos la posicion del jugador
function playerMovement() {
    if (keyz.ArrowLeft) {
        player.x -= player.speed;
    }
    if (keyz.ArrowRight) {
        player.x += player.speed;
    }
}
//* Lo mismo con la bola
function ballMovement() {
    if (ball.x >= canvas.width || ball.x < 0) {
        ball.dx *= -1;
    }
    if (ball.y >= canvas.height || ball.y < 0) {
        ball.dy *= -1;
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//* Dibujamos la bola
function drawBall() {
    ctx.beginPath();
    ctx.rect(ball.x, ball.y, ball.w, ball.h);
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = ball.color;
    let align = ball.w / 2;
    ctx.arc(ball.x + align, ball.y + align, ball.w / 2, 0, Math.PI * 2);
    ctx.fill();
}

//* dibujamos al jugador
function drawPlayer() {
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}