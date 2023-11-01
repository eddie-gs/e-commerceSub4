document.getElementById("sesion").addEventListener("click", () => logout());

//Traemos los valores de los campos del formulario de perfil
const nombre1 = getElementById("nombre1").value;
const nombre2 = getElementById("nombre2").value;
const apellido1 = getElementById("apellido1").value;
const apellido2 = getElementById("apellido2").value;
const numero = getElementById("numero").value;

//Creamos un objeto que contenga los datos del usuario
const datosUsuario = {
    nombre1 : nombre1,
    nombre2 : nombre2,
    apellido1 : apellido1,
    apellido2 : apellido2,
    email : sessionStorage.getItem("usuario"),
    numero : numero,
    imagenPerfil : localStorage.getItem("imagenPerfil")
};

//Almacenar datos en localstorage del perfil
function guardarCambios(datos) {
    const datosGuardados = JSON.parse(localStorage.getItem("perfil")) || [];

    datosGuardados.push(datos);

    localStorage.setItem("perfil", JSON.stringify(datosGuardados));
}

//Validacion de los campos del perfil
(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          
          guardarCambios(datosUsuario)
          form.classList.add('was-validated')
        }, false)
      })
  })()
