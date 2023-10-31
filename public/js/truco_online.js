/** ACCESS_KEY = 17e37d155baf026cabad4d2fe2ab0912
 * 
 * https://weatherstack.com/documentation
 * 
 * 
 */

unirmeSala()

socket.on("usuario-unido", data => {
    console.log("Se unio anashe", data.user);
    if (data.user != localStorage.getItem("user")) {
    //if (data.user != "") {
        socket.emit('arranca-partida', data)
        console.log("arrancaaaa")
        /*Naipe ()
        Naipe.prototype.getCSS
        Naipe.prototype.getNombre
        maso = _rondaActual.generarBaraja();
        Ronda.prototype.iniciar
     */   
    }
});


