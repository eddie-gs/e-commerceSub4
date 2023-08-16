document.addEventListener("DOMContentLoaded", function() {
    const email = document.getElementById("correo");
    const password = document.getElementById("password");
    const recuerda = document.getElementById("recuerdame");
    const logBtn = document.getElementById("regBtn");

    logBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        const ema = email.value;
        const contra = password.value === '';
        const rec = recuerda.checked;

        // Expresión regular para verificar el formato de correo electrónico
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
});

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
} 

function iniciarSesion() {
    // Crear una cookie de sesión
    const nombreUsuario = correo.value; // Cambia esto al nombre del usuario
    const fechaExpiracion = new Date();
    fechaExpiracion.setTime(fechaExpiracion.getTime() + (30 * 60 * 1000)); // Caduca en 30 minutos

    document.cookie = `usuario=${nombreUsuario}; expires=${fechaExpiracion.toUTCString()}; path=/`;

    // Redirigir a la página principal u otra ubicación después del inicio de sesión
    window.location.href = "index.html";
}




