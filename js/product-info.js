// constantes y variables
const idProdSeleccionado = localStorage.getItem('prodID');
const urlProdDetails = `https://japceibal.github.io/emercado-api/products/${idProdSeleccionado}.json`;
const urlComents = `https://japceibal.github.io/emercado-api/products_comments/${idProdSeleccionado}.json`;

let ProdDetails = document.getElementById('product-details-container');
let containerRelatedProducts = document.getElementById("contenedor-relacionados");

//Plantilla html para el producto
const ProdDetailsToHtml = (elem) => {
  return `<div class="container mt-5 mb-5">
  <div class="row d-flex justify-content-center">
      <div class="card">
          <div class="row">
              <div class="col-md-6">
                  <div class="images p-3">
                      <div class="text-center p-4"> <img id="main-image" src="${elem.images[0]}" width="250" /> </div>
                      <div class="thumbnail text-center"> <img onclick="change_image(this)" src="${elem.images[1]}" width="70"> <img onclick="change_image(this)" src="${elem.images[2]}" width="70"> <img onclick="change_image(this)" src="${elem.images[3]}" width="70"></div>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="product p-4">
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="d-flex align-items-center"> <i class="fa fa-long-arrow-left"></i></div> <i class="fa fa-shopping-cart text-muted"></i>
                      </div>
                      <div class="mt-4 mb-3"> <span class="text-uppercase text-muted brand">${elem.category}</span>
                          <h5 class="text-uppercase">${elem.name}</h5>
                          <div class="price d-flex flex-row align-items-center"><span class="act-price">${elem.currency}</span> 
                              <div class="ml-2"> <span>${elem.cost}</span> </div> 
                          </div> 
                          <div class="d-flex flex-row small"> <span>${elem.soldCount} Vendidos</span></div>
                      </div>
                      <p class="about">${elem.description}</p>
                      <div class="cart mt-4 align-items-center"> <button class="btn btn-danger text-uppercase mr-2 px-4">Agregar al carrito</button> <i class="fa fa-heart text-muted"></i> <i class="fa fa-share-alt text-muted"></i> </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>`
};

//Plantilla para los productos relacionados
const relatedProductsToHtml = (elem) => {
  
  return `<div class="album py-5 bg-light">
    <div class="container" data-id="${elem.id}">
        <div class="row">
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm custom-card cursor-active">
              <img class="bd-placeholder-img card-img-top" src="${elem.image}"
                alt="Imgagen representativa de la categoría ${elem.name}">
              <h3 class="m-3">${elem.name}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>`
};


//Función para cambiar entre imagenes del producto
function change_image(image){

    var container = document.getElementById("main-image");

   container.src = image.src;
};

// Función para otorgarle eventos a ciertas acciones del cursor cuando se interactúe con las estrellas
document.addEventListener("DOMContentLoaded", function(event) {
  for (let a = 0; a < estrellasInput.length; a++) {
    estrellasInput[a].addEventListener('mouseover',()=>{
      actualizarInputEstrellas(estrellasInput[a].dataset.value)
    })
    estrellasInput[a].addEventListener('click',()=>{
      selectedRating = estrellasInput[a].dataset.value
    })
    estrellasInput[a].addEventListener('mouseout',()=>{
      actualizarInputEstrellas(selectedRating)
    })
  }
});

//Redirige a la pagina que muestra la infromacion del producto seleccionado
function redirigirAInfoProducto(idProducto) {
  localStorage.setItem("prodID", idProducto );
   window.location.href = "product-info.html";
 };
 
//Obtengo los datos del producto, los paso a la plantilla  y lo cargo al html tanto la información del producto como los productos relacionados. Tambien creamos un evento click para cada producto relacionado que va a redirgir a la página de product-info. 

getJSONData(urlProdDetails).then((response) => {
  productDetailsData = response;
  ProdDetails.innerHTML = ProdDetailsToHtml(productDetailsData.data);
  
  let relatedPro = productDetailsData.data.relatedProducts 

   containerRelatedProducts.innerHTML += `<h3> Productos relacionados</h3>`

   relatedPro.forEach(function(element) {
    const relatedProductHtml = relatedProductsToHtml(element);
    containerRelatedProducts.innerHTML += relatedProductHtml;
  
    let relatedProductElement = containerRelatedProducts.querySelector(`[data-id="${element.id}"]`);
    relatedProductElement.addEventListener("click", function() {
      redirigirAInfoProducto(element.id);
    });
  });

});



const contenedor = document.getElementById('comentarios');
//Obtengo los comentarios de la api, los paso a la plantilla HTML y los agrego al html
getJSONData(urlComents).then((response) => {
    comentarios = response;
    contenedor.innerHTML = '<h3>Comentarios<h3>';
    console.log(comentarios);
    comentarios.data.forEach(coment => {
    contenedor.innerHTML += `
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex flex-start">
                <div class="w-100">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h6 class="text-primary mb-0">
                      ${coment.user}
                      <span class="text-dark ms-2">${getEstrellasHTML(coment.score)}</span>
                    </h6>
                    <p class="mb-0">${coment.dateTime.split(" ")[0]}</p>
                  </div>
                  <div class="d-flex align-items-center">
                    ${coment.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        `;
    });
})

//Obtiene la cantidad de estrellas de un comentario desde la API
function getEstrellasHTML(puntos){
    respuesta = ""
    for (let index = 1; index < 6; index++) {
        if (index<=puntos) {
            respuesta += `<span class="fa fa-star checked"></span>`
        } else {
            respuesta += `<span class="fa fa-star"></span>`
        }
    }
    return respuesta;
};


const botonAgregar = document.getElementById("agregar");
const botonLimpiar = document.getElementById("limpiar");
const lista = document.getElementById("comentarios");
const input = document.getElementById("item");
let estrellasInput = document.getElementById('rating-control-container').getElementsByClassName('fa-star')
let selectedRating = 0

//
const actualizarInputEstrellas = (rating) => {
  const mensajes = ['Horrible','Malo','Mas o menos','Buen producto', 'Un elissir']
  for (let i = 0; i < estrellasInput.length; i++) {
    if(estrellasInput[i].dataset.value <= rating){
      estrellasInput[i].classList.add('checked')
    }else{
      estrellasInput[i].classList.remove('checked')
    }
  }
  document.getElementById('rating-control-message').innerText = rating>=1 ? mensajes[rating-1] : ""
}


botonAgregar.addEventListener("click",() => {
    
    if (input.value != "") {    
        if (window.sessionStorage.getItem("text") == null) {
            valoresActuales = ""
        } else {
            valoresActuales = window.sessionStorage.getItem("text");
        }
        a_guardar = input.value
        estrellasTotales = getEstrellasHTML(selectedRating)
        window.sessionStorage.setItem("text", valoresActuales + a_guardar + estrellasTotales)
        contenedor.innerHTML += `
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex flex-start">
              <div class="w-100">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 class="text-primary mb-0">
                    ${sessionStorage.getItem("usuario")}
                    <span class="text-dark ms-2">${estrellasTotales}</span>
                  </h6>
                  <p class="mb-0">${new Date().toISOString().split("T")[0]}</p>
                </div>
                <div class="d-flex align-items-center">
                  ${input.value}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      `
        input.value = "";
    };
});

lista.innerHTML = sessionStorage.getItem("text");


