document.addEventListener("DOMContentLoaded", function() {
    const email = document.getElementById("correo");
    const password = document.getElementById("password");
    const recuerda = document.getElementById("recuerdame");
    const logBtn = document.getElementById("regBtn");

    if (sessionStorage.getItem("sesionRecordada") === "true" || sessionStorage.getItem("sesionIniciada") === "true") {
        const usuarioActual = sessionStorage.getItem("usuario");
        console.log("Sesión iniciada para el usuario: " + usuarioActual);
        window.location.href = "index.html";
      } else {
        console.log("Sesión no iniciada.");
    }

    //Función para control de los elementos al registarse
    logBtn.addEventListener("click", function(event) {
        event.preventDefault()
        const ema = email.value;
        const contra = password.value === '';
        const rec = recuerda.checked;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (ema === '' || contra) {
            showAlertErrorEmpty();
        } else if (!emailPattern.test(ema)) {
            showAlertErrorEmail()
        } else {
            datosLogin = {user: email.value, pass: password.value} //creamos el body con email y contraseña para pasar en la request
            fetch(LOGIN_TOKEN_URL, { //Fetch POST a /login para obtener el token
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosLogin)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud POST no fue exitosa');
                }
                return response.json();
            }).then((response)=>{ //Si el fetch fue exitoso iniciamos la sesion
                    if (response.token) {
                        sessionStorage.setItem("sesionIniciada", "true");
                        sessionStorage.setItem("usuario", email.value);
                        sessionStorage.setItem("token",response.token) //Almacenamos el token en el SessionStorage                    
                    }
                    if (rec) {
                        iniciarSesion();
                    } else {
                        window.location.href = "index.html";
                    }
            }).catch((err)=> console.log(err))
        }
    });

    //Función para iniciar sesion    
    function iniciarSesion (){
        sessionStorage.setItem("password", password);
        sessionStorage.setItem("sesionRecordada", "true");
      
        console.log("Sesión iniciada correctamente.");
        window.location.href = "index.html";
    }
});

function showAlertErrorEmpty() {
    document.getElementById("alert-danger").classList.add("show");
} 

function showAlertErrorEmail() {
    document.getElementById("alert-danger-mail").classList.add("show");
} 