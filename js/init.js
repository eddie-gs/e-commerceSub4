const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded", ()=> {
  document.getElementById("saludo-usuario").innerHTML = sessionStorage.getItem("usuario")
})

//Función para cerrar sesion
function logout(){
  sessionStorage.removeItem("usuario");
  sessionStorage.removeItem("sesionIniciada");
  sessionStorage.removeItem("sesionRecordada");
  sessionStorage.removeItem("password");
}

//DarkMode function
function darkMode() {
  let toggleIcon = document.getElementById("toggleButtonIcon")
  document.body.classList.toggle("darkmode");
  toggleIcon.classList.toggle("fa-moon")
  toggleIcon.classList.toggle("fa-sun")

  const modoOscuro = document.body.classList.contains("darkmode");

  localStorage.setItem('modoOscuro', modoOscuro);
};

window.addEventListener('load', () => {
  const modoOscuroGuardado = localStorage.getItem('modoOscuro');

  if (modoOscuroGuardado === 'true') {
    darkMode();
  }
});

// Darkmode Togglebutton
document.getElementById("toggleButton").addEventListener("click", () => {
  darkMode();
});

document.getElementById("perfil").addEventListener("click", () => {
  if(sessionStorage.getItem("sesionIniciada") === "true") {
    window.location.href = "my-profile.html"
  } else {
    window.location.href = "login.html"
  }
})

console.log(sessionStorage.getItem("sesionIniciada"))