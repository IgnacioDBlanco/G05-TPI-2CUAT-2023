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
          location.href ='/home';
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
          title: "no existe el usuario",
          icon: "warning",
          button: "Ok!",
        });
      } 
      else if (result.bannear == true) {
        swal({
          title: "usuario banneado correctamente",
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
