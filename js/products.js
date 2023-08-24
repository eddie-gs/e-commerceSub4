const idCatSeleccionado = localStorage.getItem('catID');
const urlActualizada = `https://japceibal.github.io/emercado-api/cats_products/${idCatSeleccionado}.json`


var productData = []
var listContainer = document.getElementById("product-list-container")
const convertToHtmlElem = (p) =>{
    return `<div class="list-group-item list-group-item-action">
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
}
getJSONData(urlActualizada).then((response) => {
    productData = response
    productData.data.products.forEach(p => {
        let newElement = document.createElement('div')
        newElement.classList.add("container")
        newElement.innerHTML = convertToHtmlElem(p)
        listContainer.appendChild(newElement)
    })
    document.getElementById('products-subtitle').innerHTML = `Veras aqui todos los productos de la categoria <strong>${productData.data.catName}</strong>`
})


document.getElementById("searchInput").addEventListener("input",(e)=>{
    //console.log(document.getElementById("searchInput").value)
    listContainer.innerHTML = ""
    searchTerm = document.getElementById("searchInput").value.toUpperCase()
    productData.data.products.forEach(p => {
        if (p.name.toUpperCase().includes(searchTerm)) {
            let newElement = document.createElement('div')
            newElement.classList.add("container")
            newElement.style.opacity = 0
            newElement.style.transition = "opacity 0.5s"
            newElement.innerHTML = convertToHtmlElem(p)
            listContainer.appendChild(newElement)
        }
    })
    if(listContainer.childNodes.length <= 0){
        let newElement = document.createElement('h3')
        newElement.style.opacity = 0
        newElement.style.transition = "opacity 0.5s"
        newElement.innerText = `No se hallaron productos con nombre ${searchTerm}`
        listContainer.appendChild(newElement)
    }
    listContainer.childNodes.forEach((n)=>{
        setTimeout(()=>{
            console.log(n)
            n.style.opacity = 1    
        },300)
    }) 
})



