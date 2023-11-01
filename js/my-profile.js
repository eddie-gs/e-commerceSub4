document.getElementById("sesion").addEventListener("click", () => logout());

document.addEventListener("DOMContentLoaded", () => {
    let emailUsuario = sessionStorage.getItem("usuario") //toma el email del usuario ingresado 
    document.getElementById("email").value = emailUsuario //le asigna al input el email del usario como valor 
})