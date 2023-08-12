const url_autos = "https://japceibal.github.io/emercado-api/cats_products/101.json"
let products = []
var listContainer = document.getElementById("product-list-container")
getJSONData(url_autos).then((response) => {
    console.log(response.data.products)
    response.data.products.forEach(p => {
        let newElement = document.createElement('div')
        newElement.classList.add("container")
        newElement.innerHTML = `<h3>${p.name}</h3><p>${p.description}</p>`
        listContainer.appendChild(newElement)
    })
})




