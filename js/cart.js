const urlActualizada = `https://japceibal.github.io/emercado-api/user_cart/25801.json`

var listContainer = document.getElementById("product-cart")

const convertToHtmlElem = (p) => {
    const subtotal = p.count * p.unitCost;

    return `<tr onclick="setProdID(${p.id})">
              <td><img src="${p.image}" alt="${p.name}" width= 100px ></td>
              <td class="text-center">${p.name}</td>
              <td class="text-center">${p.currency} ${p.unitCost}</td>
              <td class="text-center">${p.count}</td>
              <td class="text-center" style="font-weight: bold;">${p.currency} ${subtotal}</td>
            </tr>`;
  };

getJSONData(urlActualizada).then((response) => {
    try {
      productData = response
      console.log(productData);
      const tableBody = document.getElementById("elementos");
      productData.data.articles.forEach(p => {
        let newRow = document.createElement('tr');
        newRow.innerHTML = convertToHtmlElem(p);
        tableBody.appendChild(newRow);
      });
    } catch (error) {
      console.log("no catch",error);
    }
  })
  

document.getElementById("sesion").addEventListener("click", () => logout());