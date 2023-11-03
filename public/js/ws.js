const IP = "ws://localhost:3000";
const socket = io(IP);
let envie = -1
socket.on("connect", () => {
});

function mandarMensaje(mensaje) {
    mensaje = document.getElementById("mensaje").value
    if (envie == -1) {
    socket.emit("incoming-message", { data: mensaje });
    document.getElementById("chat").innerHTML += `
    <div class="chat2">
      <h1 class="chat"> ${mensaje}</h1>
    </div>
    `    
    envie = 1
    }};
socket.on("server-message", data => { 
    if (envie == -1) {
        document.getElementById("chat").innerHTML += `
            <div class="chat1">
              <h1 class="chat">${data.mensaje.data}</h1>
          </div>
          `
          envie = 1
    }
    envie=-1
});

let indiceJugador2 = -1

socket.on("movimiento-oponente", data => {
    console.log(data)
    if (data.user != localStorage.getItem("user")) {
        //Jugar la carta
    }
 });

 socket.on("cartas-mias", data => {
    console.log(data.data.data, "cartas mias") 
 });


function unirmeSala() {
    console.log("ME UNI")
    socket.emit('unirme-room', {user: localStorage.getItem("user")}); 
}


function enviarMovimiento(indice) {
    socket.emit('movimiento',{user: localStorage.getItem("user"), carta:indice})
}


/*
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