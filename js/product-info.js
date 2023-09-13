const idProdSeleccionado = localStorage.getItem('prodID');
const urlProdDetails = `https://japceibal.github.io/emercado-api/products/${idProdSeleccionado}.json`;

let ProdDetails = document.getElementById('product-details-container');

//plantilla html para el producto
const ProdDetailsToHtml = (elem) => {
return `<div class="container mt-5 mb-5">
    <div class="row d-flex justify-content-center">
        <div class="col-md-10">
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
                                <div class="d-flex align-items-center"> <i class="fa fa-long-arrow-left"></i> <span class="ml-1">Back</span> </div> <i class="fa fa-shopping-cart text-muted"></i>
                            </div>
                            <div class="mt-4 mb-3"> <span class="text-uppercase text-muted brand">${elem.category}</span>
                                <h5 class="text-uppercase">${elem.name}</h5>
                                <div class="price d-flex flex-row align-items-center"><span class="act-price">${elem.currency}</span> 
                                    <div class="ml-2"> <span>${elem.cost}</span> </div> 
                                </div> 
                                <div class="d-flex flex-row small"> <span>${elem.soldCount}Vendidos</span></div>
                            </div>
                            <p class="about">${elem.description}</p>
                            <div class="cart mt-4 align-items-center"> <button class="btn btn-danger text-uppercase mr-2 px-4">Add to cart</button> <i class="fa fa-heart text-muted"></i> <i class="fa fa-share-alt text-muted"></i> </div>
                        </div>
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

});

//obtengo los datos del producto, los paso a la plantilla y lo cargo al html
getJSONData(urlProdDetails).then((response) => {
    productDetailsData = response;
    let newElement = document.createElement('div');
    newElement.classList.add("container");
    newElement.innerHTML = ProdDetailsToHtml(productDetailsData.data);
    ProdDetails.appendChild(newElement);
});
