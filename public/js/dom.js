async function fetchLogin(data){
  try {
    const response = await fetch("/login", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    //En result obtengo la respuesta
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

//Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
function login() {
  //Leo los datos del input
  let user = document.getElementById("userId").value
  let pass = document.getElementById("passwordId").value

  //Creo un objeto de forma instantanea
  let object = {
      user: user,
      pass: pass
  }

  //data es el objeto que le paso al back
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

