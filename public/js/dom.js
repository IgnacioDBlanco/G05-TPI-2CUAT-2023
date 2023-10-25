async function fetchLogin(data){
  try {
    const response = await fetch("/login", {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result)
    
      if (result.success == false) {
        swal({
          title: "Datos incorrectos",
          icon: "warning",
          button: "Ok!",
        });
      } 
      else if (result.success == true) {
        if(result.admin == true){
          location.href ='/admin';
        }
        else {
          location.href ='/salas';
      }}

  } catch (error) {
    console.error("Error:", error);
  }
}

function login() {
  let user = document.getElementById("userId").value
  let pass = document.getElementById("passwordId").value

  let object = {
      user: user,
      pass: pass
  }

  if(object.user != "" && object.pass != ""){
    fetchLogin(object)
    
  }
  else{
    swal({
      title: "No ingreso ningun dato",
      button: "Ok!",
    });
  }
}


function goToHome() {
  location.href ='/home';
}

function botonVolver() {
  location.href = '/inicio'
}

async function fetchBannearJson(data){
  try {
    const response = await fetch("/bannear", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result)
    
      if (result.bannear == false) {
        swal({
          title: "No existe el usuario",
          icon: "warning",
          button: "Ok!",
        });
      } 
      else if (result.bannear == true) {
        swal({
          title: "Usuario banneado correctamente",
          icon: "success",
          button: "Ok!",
        });

  }}
  catch (error) {
    console.error("Error:", error);
  }
}


function bannearUser() {
  let mail = document.getElementById("mail_ban").value

  let data = {
     mail:mail
  }

  if(data.mail != ""){
    fetchBannearJson(data) 
  }
  else{
    swal({
      title: "No ingreso ningun mail",
      button: "Ok!",
    });
  }
}
/*
async function sendMessageJson(data){
  try {
    const response = await fetch("/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result)
    
      if (result.success == false) {
        swal({
          title: "Ingrese algo",
          icon: "warning",
          button: "Ok!",
        });
      } 
      else if (result.success == true) {
        console.log("enviado")
        document.getElementById("input_message").innerHTML += `
        <div class="chat2">
          <h1 class="chat">${data.message}</h1>
      </div>
      `
      }
      } catch (error) {
    console.error("Error:", error);
  }
}
function sendMessage(){
  let message = document.getElementById("message").value
  FuncionPrueba(message)
  let data = {
    message:message
}
if(data.message != ""){
  sendMessageJson(data)
}
}
*/
async function fetchCrearSala(data){
  try {
    const response = await fetch("/crear_sala", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if(result.sala.length>0){
      document.getElementById("salas").innerHTML = `
      <div onclick="goToRoom()" class="menu" id="sala">
        <div class="lateralizquierdo">
      </div>
      <div>
          <h2 class="yellowtext">Sala de "${data.sala}"</h2>
      </div>
  </div>
      `
    }
    console.log("Success:", result)
  } catch (error) {
    console.error("Error:", error);
  }
}

function crearSala(){
  let sala = document.getElementById("nombre_sala").value
  let data = {
    sala:sala
  }
  if (data.sala != "") {
    fetchCrearSala(data)
  }
}

function goToRoom(){
  location.href = '/truco_online';
}

function iralogin(){
  location.href ='/login';
}

function iraregistro(){
  location.href ='/register';
}

function iraAnotador(){
  location.href ='/anotador';
}