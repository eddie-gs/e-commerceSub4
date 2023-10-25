const urlActualizada = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
const tableBody = document.getElementById("elementos");
var listContainer = document.getElementById("product-cart");
let inputCantidad = document.getElementById("inputCantidad");
let cart = localStorage.getItem("cart") !== null ? JSON.parse(localStorage.getItem("cart")) : [];

function getSubtotal (cantidad, costo) {
  return cantidad * costo
};

//Función para actualizar el subtotal dependiendo de la cantidad que ingrese el usuario.
function updateSubtotal(inputElement, id) {
  const cantidad = parseInt(inputElement.value);
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].count = cantidad
    }   
  }
  localStorage.setItem("cart",JSON.stringify(cart))
  refreshCartItems()
};

function refreshCartItems(){
  tableBody.innerHTML = ''
  cart.forEach((p)=>{
    let newRow = document.createElement('tr');
    newRow.innerHTML = convertToHtmlElem(p);
    tableBody.appendChild(newRow);
  })
}

function removeItemFromCart(id){
  let prodInCart = cart.filter((elem) => elem.id === id)
  if (prodInCart.length > 0) {
    if (prodInCart[0].count <= 1) {
      cart = cart.filter((elem) => elem.id !== id)
    }else{
      cart.forEach(p => {
        if (p.id === id) {
            p.count -= 1 //De ser asi lo buscamos por id y solo aumentamos la cantidad
        }
      })
    }
  }
  localStorage.setItem("cart",JSON.stringify(cart))
  refreshCartItems()
}

const convertToHtmlElem = (p) => {  

    return `<tr onclick="setProdID(${p.id})">
              <td><img src="${p.image}" alt="${p.name}" width=100px ></td>
              <td class="text-center">${p.name}</td>
              <td class="text-center">${p.currency} ${p.unitCost}</td>
              <td class="text-center"><input type="number" class="inputCantidad" value="${p.count}" onchange="updateSubtotal(this, ${p.id})"></td>
              <td class="text-center" style="font-weight: bold;"> ${p.currency} <span class="subtotal">${p.unitCost * p.count}</span></td>
              <td class="text-center"><button class="btn btn-outline-danger btn-lg" type="button" onclick="removeItemFromCart(${p.id})" title="Remover articulo del carrito"><i class="fa-regular fa-trash-can fa-lg"></i></button></td
            </tr>`;
  };

const envioPremium = document.getElementById("premium");
const envioExpress = document.getElementById("express");
const envioStandard = document.getElementById("standard");

function getSubtotalGeneral () {

};

function getCostoEnvio (subtotalGeneral) {
  if (envioPremium.checked){
    console.log(hola);
    console.log(subtotalGeneral * 0.15)
  }
};

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(urlActualizada).then((response) => {
    try {
      productData = response
      console.log(productData);
      productData.data.articles.forEach(fetchedProd => {
        if (cart.filter((elem) => elem.id === fetchedProd.id).length > 0) { //chequeo si el producto ya esta en el carrito
          cart.forEach(p => {
              if (p.id === fetchedProd.id) {
                  p.count += fetchedProd.count //De ser asi lo buscamos por id y solo aumentamos la cantidad
              }
          })
        }else{
          cart.push(fetchedProd);
        }
      });

      refreshCartItems()

      getCostoEnvio(25);


    } catch (error) {
      console.log("no catch",error);
    }
  })

});



document.getElementById("sesion").addEventListener("click", () => logout());

var numTarj = document.getElementById("NumTarjeta");
var codSeg = document.getElementById("CodSeguridad");
var venc = document.getElementById("vencimiento");
var cuenta = document.getElementById("NumCuenta");


document.getElementById("credito").addEventListener("click", function(e) {
  cuenta.disabled = true;
  numTarj.disabled = false;
  codSeg.disabled = false;
  venc.disabled = false;
})
document.getElementById("transferencia").addEventListener("click", function(e) {
  numTarj.disabled = true;
  codSeg.disabled = true;
  venc.disabled = true;
  cuenta.disabled = false;
})
