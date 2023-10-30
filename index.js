
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


app.get('/', function(req, res){
    console.log(req.query); 
    res.render('inicio', null); 
});

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
    res.render('inicio', null);
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

app.get('/inicio', function(req, res){
    res.render('inicio', null);
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
});



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
*/

