
const express = require('express'); //Para el manejo del servidor Web
const exphbs  = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos

const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  loginUser,
  GoogleAuthProvider,
} = require("firebase/auth");

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDERAutq7CQnhSGjsjdewoia1T3NEv_rA4",
    authDomain: "g05-tpi-2cuat-2023.firebaseapp.com",
    projectId: "g05-tpi-2cuat-2023",
    storageBucket: "g05-tpi-2cuat-2023.appspot.com",
    messagingSenderId: "873208984450",
    appId: "1:873208984450:web:307fac857d92c895dd159b"
  };
  
  const appFirebase = initializeApp(firebaseConfig);
  const auth = getAuth(appFirebase);
  
  // Importar AuthService
  const authService = require("./authService");
;

const session = require('express-session');
const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

const server = app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

const io = require('socket.io')(server);

const sessionMiddleware = session({
    secret: 'sararasthastka',
    resave: true,
    saveUninitialized: false,
});

app.use(sessionMiddleware);

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});


app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/


app.get('/',async function(req, res){
    /*data = await fetchClima();
    console.log(data)*/ 
    res.render('inicio' , /*{place:place,temp:temp}*/)
}); 
// fijarse el dom para ver lo del CORB
app.post('/register', async function(req, res){
    const { email, password } = req.body;
    try {
        await authService.registerUser(auth, { email, password });
        await MySQL.realizarQuery (`insert into usersProyect (mail,pass) values ("${req.body.email}","${req.body.password}")`)
        response = await MySQL.realizarQuery (`select id from usersProyect where mail = "${req.body.email}"`)
        req.session.id1 = response[0].id 
        req.session.mail = req.body.email
        console.log(req.session.id1)
        res.render("home");
    } catch (error) {
        console.error("Error en el registro:", error);
        res.render("register", {
          message: "Error en el registro: " + error.message,
        });
      }
});

app.put('/login', async function(req, res){
    console.log("login", req.body);  
    let response = await MySQL.realizarQuery(`SELECT * FROM usersProyect WHERE mail = "${req.body.user}" AND pass = "${req.body.pass}"`)
    if (response.length > 0) {
    let verifica = false
    const {email , password} = {email : req.body.user, password : req.body.pass}
    try {
      authService.loginUser(auth, { email, password });
      verifica = true
      req.session.id1 = response[0].id
      req.session.mail = response[0].mail
      console.log(req.session.id1)
      console.log(req.session.mail)
    } catch (error) {
      verifica = false
      console.log(error)
    }

    if (response.length > 0 && verifica) {
        if(req.body.user =="idblanco@pioix.edu.ar"){
            res.send({success:true, admin:true})            
        }
        else if (req.body.usuario!="idblanco@pioix.edu.ar"){
        res.send({success: true, admin:false})    
    }}
    else{
        res.send({success:false})   
    }}});

app.get('/register', function(req, res){
    console.log(req.query); 
    res.render('register', null);
   });
app.get('/admin', function(req, res){
    console.log(req.query); 
    res.render('admin', null);
   });
app.get('/home', function(req, res){
    res.render('home', null);
   });
app.get('/login', function(req, res){
    res.render('login', null);
});
app.get('/reglas', function(req, res){
    res.render('reglas', null);
});
app.get('/anotador', function(req, res){
    res.render('anotador', null);
});
app.get('/inicio', function(req, res){
   /* data =await fetchClima();
    console.log(data)*/
    fetchClima()
    res.render('inicio', {temp:temp}/*, {place:place, temp:temp}*/);
});
app.get('/truco_online', function(req, res){
    console.log(req.query); 
    res.render('truco_online', null); 
});
app.get('/reglas2', function(req, res){
    console.log(req.query); 
    res.render('reglas2', null); 
});
app.get('/reglas3', function(req, res){
    console.log(req.query); 
    res.render('reglas3', null); 
});




app.put('/bannear', async function(req, res){
    user_exists = await MySQL.realizarQuery(`select mail from usersProyect where mail = "${req.body.mail}"`)
    console.log(user_exists)
    if (user_exists.length > 0) {
        await MySQL.realizarQuery(`delete from usersProyect where mail = "${req.session.mail}"`)
        res.send({bannear:true});    
    }
    else{
        res.send({bannear:false});
    }
    
});

app.put('/eliminar_sala', async function(req, res){
    salas = await MySQL.realizarQuery(`select * from salas where id = "${req.body.sala}"`)
    console.log(salas)
    
    if (salas.length > 0) {
        await MySQL.realizarQuery(`delete from salas where id = "${req.body.sala}"`)
        res.send({bannear:true});    
    }
    else{
        res.send({bannear:false});
    }
    
});


app.post('/crear_sala', async function(req, res){
    await MySQL.realizarQuery(`insert into salas (name_sala) values ("${req.body.sala }")`)
    
    let select_sala = await MySQL.realizarQuery(`select name_sala from salas where name_sala = "${req.body.sala }"`)
    res.send({sala:select_sala[0].name_sala})    
});

app.post('/sala_seleccionada', async function(req, res){
    console.log(req.body.sala)
    req.session.sala = req.body.sala
    res.send({sala  : req.body.sala})    
});

app.get('/salas', async function(req, res){
    salas = await MySQL.realizarQuery(`select name_sala from salas`)
    console.log(salas)
    res.render('salas', {salas: salas})    
});


/*async function fetchClima()
    {
     try {
        const response = await fetch("http://api.weatherstack.com/current?access_key=17e37d155baf026cabad4d2fe2ab0912&query=Buenos%20Aires",{
         
        });
        const result = await response.json();
        temp="Temperatura = "+ result.current.temperature+"°C"
        place=result.location.name
        data = {place:place , temp:temp};
        return data
      } 
      catch (error) {
        console.error("Error:", error);
      }
    };*/

/*async function fetchClima()
    {
    try {
        const response = ("http://api.weatherstack.com/current?access_key=17e37d155baf026cabad4d2fe2ab0912&query=Buenos%20Aires",{
        });
        temp="Temperatura = "+ response.current.temperature+"°C"
        place=response.location.name
        data = {place:place , temp:temp};
        return data
      } 
      catch (error) {
        console.error("Error:", error);
      }
    };
*/
io.on("connection", (socket) => {
    const req = socket.request;
    socket.on('incoming-message', data => { 
        console.log(data)
        io.to(req.session.sala).emit("server-message", { mensaje: data }); // mandar mensaje a sala de un jugador a otro
    });
    socket.on('unirme-room', data => {
        console.log("Me uni a la sala: " , req.session.sala, " soy " , data.user)
        socket.join(req.session.sala)
        io.to(req.session.sala).emit("usuario-unido", { user: req.session.mail }); // mandar mensaje a sala de un jugador a otro
    });
    socket.on('movimiento', data => {
        console.log(data)
        io.to(req.session.sala).emit("movimiento-oponente", data)
    })
    
    socket.on('arranca-partida', c => {
        user = req.session.mail
        repartir = repartirCartas()
        io.to(req.session.sala).emit("arranco-partida", {data : user, repartir: repartir.j1.cartas, repartir2: repartir.j2.cartas})
        
    });
    socket.on("mando-cartas", data => {
        console.log(data.data)
        io.to(req.session.sala).emit("mandar-cartas", {jugador2:data.data, yo: req.session.mail})
     })
    
    /*socket.on('cartas-rival', data => {
        console.log("cartas mias", data)
        io.to(req.session.sala).emit("cartas-mias", {data : data})
        })*/
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Naipe(v, p, n, t) {
    this.valor = 0;
    this.puntosEnvido = 0;
    this.numero = 0;
    this.palo = '';
    if (v !== null && v !== undefined) {
        this.valor = v;
    }
    if (p !== null && p !== undefined) {
        this.puntosEnvido = p;
    }
    if (n !== null && n !== undefined) {
        this.numero = n;
    }
    if (t !== null && t !== undefined) {
        this.palo = t;
    }

}

function generarBaraja() {
    let baraja = new Array();
    baraja.push(new Naipe(14, 1, 1, 'Espada'));
    baraja.push(new Naipe(13, 1, 1, 'Basto'));
    baraja.push(new Naipe(12, 7, 7, 'Espada'));
    baraja.push(new Naipe(11, 7, 7, 'Oro'));
    baraja.push(new Naipe(10, 3, 3, 'Espada'));
    baraja.push(new Naipe(10, 3, 3, 'Basto'));
    baraja.push(new Naipe(10, 3, 3, 'Oro'));
    baraja.push(new Naipe(10, 3, 3, 'Copa'));
    baraja.push(new Naipe(9, 2, 2, 'Espada'));
    baraja.push(new Naipe(9, 2, 2, 'Basto'));
    baraja.push(new Naipe(9, 2, 2, 'Oro'));
    baraja.push(new Naipe(9, 2, 2, 'Copa'));
    baraja.push(new Naipe(8, 1, 1, 'Oro'));
    baraja.push(new Naipe(8, 1, 1, 'Copa'));
    baraja.push(new Naipe(7, 0, 12, 'Espada'));
    baraja.push(new Naipe(7, 0, 12, 'Basto'));
    baraja.push(new Naipe(7, 0, 12, 'Oro'));
    baraja.push(new Naipe(7, 0, 12, 'Copa'));
    baraja.push(new Naipe(6, 0, 11, 'Espada'));
    baraja.push(new Naipe(6, 0, 11, 'Basto'));
    baraja.push(new Naipe(6, 0, 11, 'Oro'));
    baraja.push(new Naipe(6, 0, 11, 'Copa'));
    baraja.push(new Naipe(5, 0, 10, 'Espada'));
    baraja.push(new Naipe(5, 0, 10, 'Basto'));
    baraja.push(new Naipe(5, 0, 10, 'Oro'));
    baraja.push(new Naipe(5, 0, 10, 'Copa'));
    baraja.push(new Naipe(4, 7, 7, 'Basto'));
    baraja.push(new Naipe(4, 7, 7, 'Copa'));
    baraja.push(new Naipe(3, 6, 6, 'Espada'));
    baraja.push(new Naipe(3, 6, 6, 'Basto'));
    baraja.push(new Naipe(3, 6, 6, 'Oro'));
    baraja.push(new Naipe(3, 6, 6, 'Copa'));
    baraja.push(new Naipe(2, 5, 5, 'Espada'));
    baraja.push(new Naipe(2, 5, 5, 'Basto'));
    baraja.push(new Naipe(2, 5, 5, 'Oro'));
    baraja.push(new Naipe(2, 5, 5, 'Copa'));
    baraja.push(new Naipe(1, 4, 4, 'Espada'));
    baraja.push(new Naipe(1, 4, 4, 'Basto'));
    baraja.push(new Naipe(1, 4, 4, 'Oro'));
    baraja.push(new Naipe(1, 4, 4, 'Copa'));
    //console.log(baraja)
    // baraja devuelve todas las cartas que no son usadas en esta mano, tanto mias como del j2
    // baraja agarra 3 push y los mete en un array (esa son tus cartas en mano)
    return baraja;
    
}

function repartirCartas() {
    let repartir = { j1: {}, j2: {}};

    repartir.j1.cartas = new Array();
    repartir.j1.cartasEnMano = new Array();
    repartir.j1.cartasJugadas = new Array();

    repartir.j2.cartas = new Array();
    repartir.j2.cartasEnMano = new Array();
    repartir.j2.cartasJugadas = new Array();

    var maso = generarBaraja();
    //console.log("maso", maso) // devuelve lo mismo que baraja
    //enviarCartas(j2.cartas)
    
    //console.log("mande a rival sus cartas", j2.cartas) // mando las cartas que le deberian aparecer
    
    for (var i = 1; i <= 6; i++) {
        var index = getRandomInt(0, (maso.length - 1));
        if (i % 2 === 0) {
            repartir.j2.cartas.push(maso[index]);
            repartir.j2.cartasEnMano.push(maso[index]);
            _rondaActual = this;
        } else {
            repartir.j1.cartas.push(maso[index]);
            repartir.j1.cartasEnMano.push(maso[index]);
        }
        maso.splice(index, 1);
        //console.log({data: (maso[index])})
        //console.log((maso[index]), "cartas") devuelve algo raro
        // lo pushea 6 veces y en cada una saca la carta que le da a un jugador
        // aca puedo hacer un emit a las 3 cartas pusheadas, para que al otro le lleguen las otras 3
        // nevesito encontrar donde se meten esas 3 cartas
    }
    console.log("CARTAS1", repartir, repartir.j1.cartas);
    return repartir;
}

/*
socket.on("arrancar-truco", data=> {
    io.to(req.session.sala).emit("usuario-unido", { user: req.session.mail }); 
});

*/





/*  TRUCOO
https://github.com/p4bl1t0/truco-argento/blob/master/js/truco.js

https://github.com/migueljimenop/trucosocket

el back elige a quien mandarlo el cliente siempre al servidor
el "incoming-message es como un endpoint que diferencia quien manda ese mensaje, el mensaje lo tengo que traer por dom con el id del input
y mandarlo del front al back con un socket emit, y en el back mandarlo a la sala que corresponde"
 
para mandar el mensaje lo selecciono con dom, lo mando con socket emit del front al back y
al mismo tiempo con el boton onclick de enviar imprime el mensaje del lado derecho. en el back con io.to lo 
mando al servidor que esta conectado el mensaje y desde el front con una funcion como esta imprimo el mensaje del otro lado(no hace falta sql)
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

CASOS DE USO: 
Diagramas de casos de uso:funcionalidades de software

Símbolos del diagrama:
ACTORES (se dibuja una persona), realiza distintas acciones
CASOS DE USO(CU y un Id dentro de un elipsis) y una funcionalidad del software (mercadolibre: Buscar Producto)

Flujo Principal: (buscar el producto y encontrarlo)
Flujo Alternativo: Buscar producto que no existe(ocurre un error)


<<Include>>
- - - - - - ->
es un caso de uso que si o si necesita otro caso de uso

<<Extend>>
- - - - - - - - - >
caso de uso que puede o no ser necesario, por ej caso de uso MP, Efectivo, tarjeta. Puedo usar cualquiera no necesito todo


   --------->
Herencia. Heredar funciones y agregar otras (Debito y Credito hereda de una clase TARJETA ) la flecha va hacia el genérico, TARJETA



Rectángulo grande se llama Dominio.
Actores por fuera del rectángulo
Verbos en INFINITIVO y luego la acción

DRAW.IO (lugar para hacer los diagramas)

*/

