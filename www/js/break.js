/**
 * !------------------------------------ TECLAS PERMITIDAS PARA JUGAR */

const keyz = { ArrowLeft: false, ArrowRight: false };
/**
 * !---------------------------------------------------------TABLERO */
const game = {
    grid: 60,
    ani: "",
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
    color: "red",
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

/* *
! ----------------------------------------------------------- DIBUJO */
game.ani = requestAnimationFrame(draw);


//* con esta funcion actualizamos la posicion del jugador
function movement() {
    if (keyz.ArrowLeft) {
        player.x -= player.speed;
    }
    if (keyz.ArrowRight) {
        player.x += player.speed;
    }
}

function draw() {
    // * Cada vez que dibujamos, hay que borrar la pantalla anterior
    ctx.clearRect(0, 0, canvas.width, canvas.height)
        //* En el contexto, dibujamos un rectangulo que recibe los datos del objeto player
    movement();
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
    game.animation = requestAnimationFrame(draw);
}