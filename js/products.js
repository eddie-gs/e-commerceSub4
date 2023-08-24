const url_autos = "https://japceibal.github.io/emercado-api/cats_products/101.json"
/*let products = []
var listContainer = document.getElementById("product-list-container")
getJSONData(url_autos).then((response) => {
    document.getElementById('products-subtitle').innerHTML = `Veras aqui todos los productos de la categoria <strong>${response.data.catName}</strong>`
    console.log(response.data.products)
    response.data.products.forEach(p => {
        let newElement = document.createElement('div')
        newElement.classList.add("container")
        newElement.innerHTML = `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${p.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${p.name} - ${p.currency} ${p.cost}</h4> 
                        <p> ${p.description}</p> 
                        </div>
                        <small class="text-muted">${p.soldCount} vendidos</small>
                    </div>

                </div>
            </div>
        </div>`
        listContainer.appendChild(newElement)
    })
})*/

const ascendente = "up";
const descendente = "down";
const relevancia = "rel";

let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortElements(criteria, array){
    let result = [];
    if (criteria === ascendente)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === descendente){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === relevancia){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showProductList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let category = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${category.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${category.name} - ${category.currency} ${category.cost}</h4> 
                        <p> ${category.description}</p> 
                        </div>
                        <small class="text-muted">${category.soldCount} vendidos</small>
                    </div>

                </div>
            </div>
        </div>
            `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentProductsArray = categoriesArray;
    }

    currentProductsArray = sortElements(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductList();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(url_autos).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            showProductList()
            //sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("priceAsc").addEventListener("click", function(){
        sortAndShowProducts(ascendente);
    });

    document.getElementById("priceDesc").addEventListener("click", function(){
        sortAndShowProducts(descendente);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(relevancia);
    });

    document.getElementById("clearPriceFilter").addEventListener("click", function(){
        document.getElementById("priceFilterCountMin").value = "";
        document.getElementById("priceFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("priceFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("priceFilterCountMin").value;
        maxCount = document.getElementById("priceFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductList();
    });
});