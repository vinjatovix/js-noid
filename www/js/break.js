/* Creo un plano fisico de 2 Dimensiones */
const canvas = document.createElement('canvas');

const ctx = canvas.getContext('2d');
/* Se lo chanto al DOM */
document.body.prepend(canvas);
/* Declaro las dimensiones del tablero */
const game = { grid: 40 };

canvas.setAttribute('width', game.grid * 15);
canvas.setAttribute('height', game.grid * 10);
/* Le doy un estilo css al tablero */
canvas.style.border = '1px solid black';