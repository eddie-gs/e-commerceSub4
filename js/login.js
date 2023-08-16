document.addEventListener("DOMContentLoaded", function() {
    const email = document.getElementById("correo");
    const password = document.getElementById("password");
    const recuerda = document.getElementById("recuerdame");
    const logBtn = document.getElementById("regBtn");

    logBtn.addEventListener("click", function(event) {
        event.preventDefault()
        const ema = email.value;
        const contra = password.value === '';
        const rec = recuerda.checked;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (ema === '' || !emailPattern.test(ema) || contra) {
            showAlertError();
        } else {
            if (rec) {
                iniciarSesion();
            } else {
                window.location.href = "index.html";
            }
        }
    });

    function iniciarSesion (){
        sessionStorage.setItem("usuario", email);
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("sesionIniciada", "true");
      
        console.log("Sesión iniciada correctamente.");

        window.location.href = "index.html";
      }

      if (sessionStorage.getItem("sesionIniciada") === "true") {
        const usuarioActual = sessionStorage.getItem("usuario");
        console.log("Sesión iniciada para el usuario: " + usuarioActual);
        window.location.href = "index.html";
      } else {
        console.log("Sesión no iniciada.");
      }
      

});

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
} 