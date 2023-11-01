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

