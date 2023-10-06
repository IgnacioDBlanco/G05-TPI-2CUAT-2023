
/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias
const express = require('express'); //Para el manejo del servidor Web
const exphbs  = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session');
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
} = require("firebase/auth");
const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});


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
  const authService = require("./authservice");

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

app.get('/', function(req, res)
{
    //Petición GET con URL = "/", lease, página principal
    console.log(req.query); //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('inicio', null); //Renderizo página "login" sin pasar ningún objeto a Handlebars
});
let id = -1
app.post('/register', async function(req, res){

    console.log("Soy un pedido POST", req.body);
    let user_exists = await (MySQL.realizarQuery(`select usuario from usuarios WHERE usuario = "${req.body.user}"`))
    id = req.body.email
    console.log(user_exists)
    const { email, password } = req.body;

    try {
        await authService.registerUser(auth, { email, password });
        res.render("register", {
          //message: "Registro exitoso. Puedes iniciar sesión ahora.",
        });
      } catch (error) {
        console.error("Error en el registro:", error);
        res.render("register", {
          message: "Error en el registro: " + error.message,
        });
    }
});
    /*if (user_exists.length == 0) {
        console.log(await (MySQL.realizarQuery("select * from usuarios")))
        await MySQL.realizarQuery(`insert into usuarios (usuario,contraseña,administrador) values ("${req.body.user}","${req.body.pass}", 0)`)
        res.render('home', {usuario:req.body.email}); 
    /*if (user_exists.length == 0) {
        console.log(await (MySQL.realizarQuery("select * from usuarios")))
        await MySQL.realizarQuery(`insert into usuarios (usuario,contraseña,administrador) values ("${req.body.user}","${req.body.pass}", 0)`)
        res.render('home', {usuario:req.body.email}); 
app.put('/login', async function(req, res){
    console.log("Soy un pedido PUT", req.body);  
    let response = await MySQL.realizarQuery(`SELECT * FROM users WHERE user = "${req.body.user}" AND password = "${req.body.pass}"`)
    id = req.body.user
    if (response.length > 0) {
        if(req.body.user =="n"){
            res.send({success:true, admin:true})            
        }
        else if (req.body.usuario!="n")
        res.send({success: true, admin:false})    
    }
    else{
        res.send({success:false})   
    }});
*/
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

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const userCredential = await authService.loginUser(auth, {
        email,
        password,
      });
      // Aquí puedes redirigir al usuario a la página que desees después del inicio de sesión exitoso
      res.redirect("/home");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      res.render("login", {
        message: "Error en el inicio de sesión: " + error.message,
      });
    }
  });
