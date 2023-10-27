const IP = "ws://localhost:3000";
const socket = io(IP);
let envie = -1

socket.on("connect", () => {
    console.log("Me conecté a WS");
});

function mandarMensaje(mensaje) {
    let mensaje = document.getElementById("mensaje").value
    envie = 1
    socket.emit("incoming-message", { mensaje: mensaje });
    enviarMensaje(mensaje)
}
function enviarMensaje(mensaje){
    let mensaje = document.getElementById("mensaje").value
    document.getElementById("chat").innerHTML += `
    <div class="chat2">
      <h1 class="chat">${mensaje}</h1>
    </div>
    `    
}

function unirmeSala() {
    socket.emit('unirme-room', {data: 'mi-sala'} ); // Envía un evento para unirse a la sala
}

socket.on('evento-en-sala', (mensaje) => {
    console.log(`Mensaje en la sala: ${mensaje}`);
  });

socket.on("server-message", data => {
    console.log("Me llego del servidor", data);
    if (envie == -1) {
        document.getElementById("input_message").innerHTML += `
            <div class="chat1">
              <h1 class="chat">${data.mensaje}</h1>
          </div>
          `
    }
    envie = -1
});


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