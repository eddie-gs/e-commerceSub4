function obtenerObjetosDesdeTabla() {
       
    const filas = document.querySelectorAll('#tabla-carrito tbody tr');
    const objetos = [];
    filas.forEach( fila=> {
      const celda = fila.getElementsByTagName('td');
  
      const objeto = {
        id: celda.id,
        name: celda.name,
        count: celda.count,
        unitCost: celda.unitCost,
        currency: celda.currency,
      };
  
      objetos.push(objeto);
    });
  
    return objetos;
  }

document.addEventListener("DOMContentLoaded", () => {
    var tbody = document.getElementById('tabla-carrito').getElementsByTagName('tbody')[0];
    console.log(tbody)
    // Obtén todos los inputs dentro del tbody
    var inputsEnTbody = tbody.querySelectorAll('input');
    console.log(inputsEnTbody)
    // Agrega el evento a cada input
    inputsEnTbody.forEach(function (input) {
        console.log("hola entro al for each")
      input.addEventListener('input', function (event) {
        event.preventDefault()
        console.log("reconoce el evento")
        let reqOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obtenerObjetosDesdeTabla)
        }
        fetch("http://localhost:3000", reqOptions).then(
            (response)=>response.json()
            ).then((res)=>{
            console.log(res)    
        })
        .catch((err)=>{console.log(err)})
        console.log(obtenerObjetosDesdeTabla)
        
        console.log('Cambio en el input:', event.target.value);
      });
    });

    
})

/* 
document.addEventListener("DOMContentLoaded",()=>{
    const formDOM = document.getElementsByTagName('form')[0]
    const submitBtn = document.getElementById("submitBtn")


    formDOM.addEventListener("submit",(event)=>{
        event.preventDefault()
        //console.log(formDOM.elements)
        let objetos = {
            id: document.getElementById('nombre').value,
            name: document.getElementById('apellido').value,
            count: document.getElementsByClassName('inputCantidad').value,
            unitCost: document.getElementById('pais').value,
            currency: document.getElementById('ocupacion').value           
        }
        let reqOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        }
        console.log(reqOptions)
        fetch("http://localhost:3000", reqOptions).then(
            (response)=>response.json()
            ).then((res)=>{
            console.log(res)
            alert("Datos enviados con éxito")
        })
        .catch((err)=>{console.log(err)})
        console.log(datos)
    })
}) */