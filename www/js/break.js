/**
 * !------------------------------------ TECLAS PERMITIDAS PARA JUGAR */

const keyz = { ArrowLeft: false, ArrowRight: false };
/**
 * !---------------------------------------------------------TABLERO */
const game = {
    grid: 60,
    animation: "",
    bricks: [],
    num: 48,
};
const ball = {
    coordinateX: game.grid * 7,
    coordinateY: game.grid * 5,
    width: game.grid / 5,
    height: game.grid / 5,
    color: "gold",
    speedX: 12,
    speedY: 8,
};
// * Creo un plano fisico de 2 Dimensiones y lo prepengo en el DOM

const canvas = document.createElement("canvas");
canvas.style.background = "black";
const contextDOM = canvas.getContext("2d");
document.body.prepend(canvas);

/**
 * ! ------------------------------------------------------   JUGADOR */
const player = {
    coordinateX: game.grid * 7,
    coordinateY: game.grid * 9,
    width: game.grid * 2,
    height: game.grid / 2,
    color: "rebeccapurple",
    speed: 9,
};

/**
 * ! ------------------------------------------------------CREO EL TABLERO */
canvas.setAttribute("width", game.grid * 15);
canvas.setAttribute("height", game.grid * 10);
canvas.style.border = "1px solid black";

// * Añado una escucha para la entrada de teclado

document.addEventListener("keydown", (event) => {
    /* console.log(e.code); */

    // * cuando se pulsa este, en el objeto keyz la declaramos como verdadera
    if (event.code in keyz) {
        keyz[event.code] = true;
    }
    console.log(keyz);
});
document.addEventListener("keyup", (event) => {
    //* cuando se despulsa este, en el objeto keyz la declaramos como falsa
    if (event.code in keyz) {
        keyz[event.code] = false;
    }
    console.log(keyz);
});
canvas.addEventListener("mousemove", (event) => {
    //* movimiento del raton dentro del canvas
    /*     console.log(e);
     */
    const mouseValue = event.clientX - canvas.offsetLeft;
    //* Si el raton está dentro del canvas
    if (mouseValue > player.width && mouseValue < canvas.width) {
        player.coordinateX = mouseValue - player.width;
    }
});

/* *
! ----------------------------------------------------------- DIBUJO */
game.animation = requestAnimationFrame(drawFrame);
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

function colisionDetection(obj1, obj2) {
    const xAxis = obj1.x < obj2.x + obj2.w && obj1.x + obj1.w > obj2.x;
    const yAxis = obj1.y < obj2.y + obj2.h && obj1.y + obj1.h > obj2.y;
    const val = xAxis && yAxis;
    return val;
}

function drawFrame() {
    // * Cada vez que dibujamos, hay que borrar la pantalla anterior
    contextDOM.clearRect(0, 0, canvas.width, canvas.height);
    //* En el contexto, dibujamos un rectangulo que recibe los datos del objeto player
    playerMovement();
    ballMovement();
    drawPlayer();
    drawBall();
    //* Dibujamos los ladrillos
    game.bricks.forEach((brick, index) => {
        contextDOM.beginPath();
        contextDOM.strokeStyle = "white";
        contextDOM.fillStyle = brick.c;
        contextDOM.rect(brick.x, brick.y, brick.w, brick.h);
        contextDOM.fill();
        contextDOM.stroke();
        contextDOM.closePath();
        if (colisionDetection(brick, ball)) {
            game.bricks.splice(index, 1);
            ball.speedY *= -1;
        }
    });
    if (colisionDetection(player, ball)) {
        ball.speedY *= -1;
        let val1 = ball.coordinateX + ball.width / 2 - player.coordinateX;
        let val2 = val1 - player.width / 2;
        let val3 = Math.ceil(val2 / (player.width / 10));
        ball.speedX = val3;
    }

    game.animation = requestAnimationFrame(drawFrame);
}
//* con esta funcion actualizamos la posicion del jugador
function playerMovement() {
    if (keyz.ArrowLeft) {
        player.coordinateX -= player.speed;
    }
    if (keyz.ArrowRight) {
        player.coordinateX += player.speed;
    }
}
//* Lo mismo con la bola
function ballMovement() {
    if (ball.coordinateX >= canvas.width || ball.coordinateX < 0) {
        ball.speedX *= -1;
    }
    if (ball.coordinateY >= canvas.height || ball.coordinateY < 0) {
        ball.speedY *= -1;
    }
    ball.coordinateX += ball.speedX;
    ball.coordinateY += ball.speedY;
}

//* Dibujamos la bola
function drawBall() {
    contextDOM.beginPath();
    contextDOM.rect(ball.coordinateX, ball.coordinateY, ball.width, ball.height);
    contextDOM.strokeStyle = "black";
    contextDOM.stroke();

    contextDOM.closePath();

    contextDOM.beginPath();
    contextDOM.fillStyle = ball.color;
    let align = ball.width / 2;
    contextDOM.arc(ball.coordinateX + align, ball.coordinateY + align, ball.width / 2, 0, Math.PI * 2);
    contextDOM.fill();
}

//* dibujamos al jugador
function drawPlayer() {
    contextDOM.beginPath();
    contextDOM.rect(player.coordinateX, player.coordinateY, player.width, player.height);
    contextDOM.fillStyle = player.color;
    contextDOM.fill();
    contextDOM.closePath();
}