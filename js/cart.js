const URL = CART_INFO_URL + "25801" + EXT_TYPE;
let producto = {};
let unidad = 0;

// Peticion del fetch
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(URL)
    .then(function (resultObj) {
            if (resultObj.status === "ok") {
                producto = resultObj.data;
                showCartInfo();
            }
        })
    });

// INFO del producto que será agregado
function showCartInfo() {
    unidad = producto.articles[0].unitCost

    productoCarrito = `
          <tr>
            <th scope="row">
                <img class="img-thumbnail" width=150rem src="${producto.articles[0].image}"/>
            </th>
            <td>${producto.articles[0].name}</td>
            <td>${producto.articles[0].currency} ${unidad}</td>
            <td>
                <div class="form-group col">
                    <input type="number" value=1 id="cantArticulo" onchange="subtotal()">
                </div>
           </td>
            <td id="subtotal"><strong>${producto.articles[0].currency} ${unidad}</strong></td>
          </tr>
    `
document.getElementById("prod-carrito").innerHTML = productoCarrito;
}

// Calculo del subtotal
function subtotal() {
        let cantArtic = document.getElementById("cantArticulo")
        let currency = producto.articles[0].currency

        document.getElementById("subtotal").innerHTML = currency + " " + unidad * cantArtic.value
} 

