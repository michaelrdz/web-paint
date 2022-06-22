var teclas = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
};

var brushSize = 3;
var color = "black";

document.addEventListener("keyup", dibujarTeclado);
var cuadro = document.getElementById("canvasArea");
cuadro.addEventListener("mousedown", ubicaMouse);
cuadro.addEventListener("mousemove", dibujaMouse);
cuadro.addEventListener("mouseup", detieneMouse);
cuadro.addEventListener("mouseleave", detieneMouse);

var coord = cuadro.getBoundingClientRect();

var papel = cuadro.getContext("2d");
var x = 0;
var y = 0;
var mouseActivo = 0;

//dibujarLinea(color, 149, 149, 151, 151, papel); 

function ubicaMouse(evento){
    mouseActivo = 1;
    x = evento.clientX -coord.left;
    y = evento.clientY -coord.top;
    console.log("mouse en: "+x+", "+y);
}

function dibujaMouse(evento){
    var posActualX = evento.clientX-coord.left;
    var posActualY = evento.clientY-coord.top;
    if(mouseActivo == 0) 
    {
        x = posActualX;
        y = posActualY;
    }
    else 
    {
        dibujarLinea(posActualX, posActualY);
        console.log("pintando en: "+ posActualX+", "+posActualY);
        x = posActualX;
        y = posActualY;
    }
}

function detieneMouse(evento){
    x =0;
    y = 0;
    mouseActivo = 0;
}


function dibujarTeclado(evento) {
    var movimiento = 10;
    switch(evento.keyCode) {
        case teclas.LEFT:
            dibujarLinea(x, y, x - movimiento, y);
            x = x - movimiento;
            break; 
        case teclas.UP:
            dibujarLinea(x, y, x, y - movimiento);
            y = y - movimiento;
            break; 
        case teclas.RIGHT:
            dibujarLinea(x, y, x + movimiento, y);
            x = x + movimiento;
            break;
        case teclas.DOWN:
            dibujarLinea(x, y, x, y + movimiento);
            y = y + movimiento;
            break;
        default: 
            console.log("otra tecla");
    }
}

function dibujarLinea(xFinal, yFinal) {
    papel.beginPath();
    papel.strokeStyle = color;
    papel.lineWidth = brushSize;
    papel.moveTo(x, y);
    console.log("move to: "+xFinal+", "+yFinal);
    papel.lineTo(xFinal, yFinal);
    papel.stroke();
    papel.closePath();
}

function changeBrushSize(newSize) {
    brushSize = newSize;
}

function cahngePaintColor(newColor){
    color = newColor;
}

function saveCanvas() {
    var opcion = confirm("¿Deseas guardar tu imagen localmente?");
    if (opcion == true) {
        const link = document.createElement('a');
        link.download = 'tulienzo.png';
        link.href = cuadro.toDataURL();
        link.click();
        link.delete;
	}    
}

function clearCanvas() {
    var opcion = confirm("¿Estas segurx de eliminar tu dibujo?");
    if (opcion == true) {
        papel.clearRect(0, 0, cuadro.width, cuadro.height);    
	}
}