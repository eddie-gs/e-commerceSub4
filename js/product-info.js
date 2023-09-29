const idProdSeleccionado = localStorage.getItem('prodID');
const urlProdDetails = `https://japceibal.github.io/emercado-api/products/${idProdSeleccionado}.json`;
const urlComents = `https://japceibal.github.io/emercado-api/products_comments/${idProdSeleccionado}.json`;

let ProdDetails = document.getElementById('product-details-container');


const createCarrousel = (elem) => {
  let imageList = elem.images
  let firstImage = imageList.shift()
  console.log([...Array(imageList.length).keys()])
  return `<div id="carouselExampleIndicators" class="carousel slide carousel-fade " data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              ${[...Array(imageList.length).keys()].map((i) => `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i+1}" aria-label="Slide ${i+2}"></button>`
              ).join('\n')}
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${firstImage}" class="d-block w-100" alt="...">
              </div>
              ${imageList.map((i) => `<div class="carousel-item">
                                          <img src="${i}" class="d-block w-100" alt="...">
                                      </div>`
              ).join('\n')}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>`
}

//plantilla html para el producto
const ProdDetailsToHtml = (elem) => {
  //${elem.images[0]}
  //console.log(createCarrousel(elem))
  return `<div class="container mt-5 mb-5">
  <div class="row d-flex justify-content-center">
      <div class="card">
          <div class="row">
              <div class="col-lg-12">
                  ${createCarrousel(elem)}
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
}

//funcion para cambiar entre imagenes del producto
function change_image(image){

    var container = document.getElementById("main-image");

   container.src = image.src;
}
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

//obtengo los datos del producto, los paso a la plantilla y lo cargo al html
getJSONData(urlProdDetails).then((response) => {
  productDetailsData = response;
  //console.log(createCarrousel(productDetailsData.data))
  ProdDetails.innerHTML += ProdDetailsToHtml(productDetailsData.data);
  /* let newElement = document.createElement('div');
  newElement.classList.add("container");
  newElement.innerHTML = ProdDetailsToHtml(productDetailsData.data);
  ProdDetails.appendChild(newElement); */
});

const contenedor = document.getElementById('comentarios');

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


function getEstrellasHTML(puntos){
    respuesta = ""
    for (let index = 1; index < 6; index++) {
        if (index<=puntos) {
            respuesta += `<span class="fa fa-star checked"></span>`
        } else {
            respuesta += `<span class="fa fa-star"></span>`
        }
    }
    return respuesta
}

const botonAgregar = document.getElementById("agregar");
const botonLimpiar = document.getElementById("limpiar");
const lista = document.getElementById("comentarios");
const input = document.getElementById("item");
let estrellasInput = document.getElementById('rating-control-container').getElementsByClassName('fa-star')
let selectedRating = 0

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