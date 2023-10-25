const IP = "ws://localhost:3000";
const socket = io(IP);
let envie = -1

socket.on("connect", () => {
    console.log("Me conecté a WS");
});

function FuncionPrueba(mensaje) {
    envie = 1
    socket.emit("incoming-message", { mensaje: mensaje });
}

function sumarmeAChat(contacto) {
    socket.emit("unirme-room", { contacto: contacto });
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