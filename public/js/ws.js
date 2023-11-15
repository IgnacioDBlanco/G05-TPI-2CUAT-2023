const IP = "ws://localhost:3000";
const socket = io(IP);
let envie = -1
let envieCartas = -1
socket.on("connect", () => {
});

function mandarMensaje(mensaje) {
    mensaje = document.getElementById("mensaje").value
    if (envie == -1) {
    socket.emit("incoming-message", { data: mensaje });
    document.getElementById("chat").innerHTML += `
    <div class="chat2">
      <h1 class="chatderecha"> ${mensaje}</h1>
    </div>
    `    
    envie = 1
    }};
socket.on("server-message", data => { 
    if (envie == -1) {
        document.getElementById("chat").innerHTML += `
            <div class="chat1">
              <h1 class="chatizquierda">${data.mensaje.data}</h1>
          </div>
          `
          envie = 1
    }
    document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
    envie=-1
});

let indiceJugador2 = -1

socket.on("movimiento-oponente", data => {
    console.log(data)
    if (data.user != localStorage.getItem("user")) {
        //Jugar la carta
    }
 });


 socket.on("mandar-cartas", data => {
    console.log(data)
    if (localStorage.getItem("user") == data.yo) { //Soy el jugador1        
    }
    else{ //Soy el 2
        console.log(data.jugador2)
        sayCartasEnMano(data.jugador2)
    }
 });


 /*socket.on("cartas-mias", data => {
    if (envieCartas == -1) {
       // console.log("cartas mias", data.data.data) // le tiene que llegar solo a el rival
        document.getElementsByClassName("player-cards")[1].hidden = false
    }
    envieCartas = -1

    /*jugador2.cartas = data.data.data
    jugador2.cartasEnMano = data.data.data
    console.log(jugador1.cartas, "j1")
    console.log(jugador2.cartas, "j2 nashe")
    // estan mezcladas las cartas de j1 con j2. Las cartas de j2 en los dos juegos es la misma pero no  

});
*/

function unirmeSala() {
    socket.emit('unirme-room', {user: localStorage.getItem("user")}); 
}


function enviarMovimiento(indice) {
    socket.emit('movimiento',{user: localStorage.getItem("user"), carta:indice})
}

/*function enviarCartas(cartas) {
    socket.emit("cartas-rival", { data: cartas});
    envieCartas = 1
    
}


socket con fede
api: pedido http haces un pedido y el servidor te responde termina ahi la conexion
socket esta todo el tiempo conectado esperando recibir info 
hasta que te desconectes

socket.emit = emitir mensajes puede hacerlo el back como el front
manda un evento con lo que tiene que pasar si pasa eso se activa
el socket on con el mismo evento

socket on se "une" a ese evento, esta pendiente a ese evento 
y interpreta el mensaje

todos los eventos tienen que estar encerrados en el io.on que es de configuracion de conectarse a servidor
*/

sayCartasEnMano = function (jugador) { // poruqe le pone prototype?
    var html = '';
    console.log(jugador.cartasEnMano)
    for (var i = 0; i < jugador.cartasEnMano.length; i++) {
        if (jugador.cartasEnMano[i] !== undefined) {
            //html += '<li class="naipe naipe-boca-abajo"></li>'; que lo mire tolo
            if (!jugador.esHumano) { // mostras las cartas boca abajo?
                html += '<li class="naipe naipe-boca-abajo"></li>';
            } else {
                var estilo = ' style="background-position: ' + getCSS(jugador.cartasEnMano[i]) + ';"';
                html += '<li><a href="#" class="naipe naipe-humano"  data-naipe-index="' + i + '" ' + estilo + '></a></li>';
            }
        }
    }
    if (jugador.esHumano) {
        $('#player-one').find('.player-cards').html(html);
        //document.getElementsByClassName("player-cards")[1].hidden = true
    } else {
        $('#player-two').find('.player-cards').html(html);
    }
}