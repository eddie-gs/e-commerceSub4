document.getElementById("sesion").addEventListener("click", () => logout());

const datosGuardados = localStorage.getItem("perfil") !== null ?  JSON.parse(localStorage.getItem("perfil")) : {};
let datosUsuario = {};

//Almacenar datos en localstorage del perfil
function guardarCambios(datos) {
  console.log(datos);
  localStorage.setItem("perfil", JSON.stringify(datos));
}

document.addEventListener("DOMContentLoaded", () => {
  let emailUsuario = sessionStorage.getItem("usuario"); //toma el email del usuario ingresado
  if(datosGuardados != {} && datosGuardados.email != emailUsuario){ //vacia el objeto del localstorage si el mail distinto al que esta logueado
    datosGuardados = {}
    localStorage.setItem("perfil", JSON.stringify(datosGuardados));
  }else if(datosGuardados != {}){ //Si es el mail logueado y hay datos guardados actualizamos el value de los campos
    document.getElementById("nombre1").value = datosGuardados.nombre1
    document.getElementById("nombre2").value = datosGuardados.nombre2 
    document.getElementById("apellido1").value = datosGuardados.apellido1;
    document.getElementById("apellido2").value = datosGuardados.apellido2;
    document.getElementById("numero").value = datosGuardados.numero;
  }
  document.getElementById("email").value = emailUsuario; //le asigna al input el email del usario como valor

  console.log(datosGuardados);
});
  //Validacion de los campos del perfil
(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
  console.log(forms)
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener("submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }else{
          //Traemos los valores de los campos del formulario de perfil
          const nombre1 = document.getElementById("nombre1").value;
          const nombre2 = document.getElementById("nombre2").value;
          const apellido1 = document.getElementById("apellido1").value;
          const apellido2 = document.getElementById("apellido2").value;
          const numero = document.getElementById("numero").value;
          //Creamos un objeto que contenga los datos del usuario
          datosUsuario = {
            nombre1: nombre1,
            nombre2: nombre2,
            apellido1: apellido1,
            apellido2: apellido2,
            email: sessionStorage.getItem("usuario"),
            numero: numero,
            imagenPerfil: localStorage.getItem("imagenPerfil"),
          };
          console.log(datosUsuario)
          guardarCambios(datosUsuario);
        }
        form.classList.add("was-validated");
      },
      false);
  });
})();

