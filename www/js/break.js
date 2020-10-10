/**
 * !------------------------------------ TECLAS PERMITIDAS PARA JUGAR */

const keyz = { ArrowLeft: false, ArrowRight: false };
/**
 * !---------------------------------------------------------TABLERO */
// * Creo un plano fisico de 2 Dimensiones y lo prepengo en el DOM

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.prepend(canvas);

// * Declaro las dimensiones del tablero y le doy un borde

const game = { grid: 60 };
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

/**
 * ! ------------------------------------------------------   JUGADOR */
//*  Declaro la posicion y dimensiones del jugador, asi como un color
const player = {
    x: game.grid * 7,
    y: game.grid * 9,
    w: game.grid * 2,
    h: game.grid / 2,
    color: "red",
};

/* *
! ----------------------------------------------------------- DIBUJO */
draw();


function draw() {
    //* En el contexto, dibujamos un rectangulo que recibe los datos del objeto player
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.w, player.h);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}