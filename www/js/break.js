/**
 * !------------------------------------ TECLAS PERMITIDAS PARA JUGAR */

const keyz = { ArrowLeft: false, ArrowRight: false };
/**
 * !---------------------------------------------------------TABLERO */
const game = {
    grid: 60,
    ani: "",
};
const ball = {
    x: game.grid * 7,
    y: game.grid * 5,
    w: game.grid / 5,
    h: game.grid / 5,
    color: "green",
    dx: 6,
    dy: 5,
};
// * Creo un plano fisico de 2 Dimensiones y lo prepengo en el DOM

const canvas = document.createElement("canvas");
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
    console.log(e);
    const val = e.clientX - canvas.offsetLeft;
    //* Si el raton está dentro del canvas
    if (val > player.w && val < canvas.width) {
        player.x = val - player.w;
    }
});

/* *
! ----------------------------------------------------------- DIBUJO */
game.ani = requestAnimationFrame(draw);

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
    if (ball.x > canvas.width || ball.x < 0) {
        ball.dx *= -1;
    }
    if (ball.y > canvas.height || ball.y < 0) {
        ball.dy *= -1;
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function drawBall() {
    ctx.beginPath();
    ctx.rect(ball.x, ball.y, ball.w, ball.h);
    ctx.strokeStyle = 'white'
    ctx.stroke();

    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = ball.color;
    let align = ball.w / 2
    ctx.arc(ball.x + align, ball.y + align, ball.w / 2, 0, Math.PI * 2)
    ctx.fill();
}

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // * Cada vez que dibujamos, hay que borrar la pantalla anterior
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //* En el contexto, dibujamos un rectangulo que recibe los datos del objeto player
    playerMovement();
    ballMovement();
    drawPlayer();
    drawBall();

    game.animation = requestAnimationFrame(draw);
}