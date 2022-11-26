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
                showCosto();
                costoDeEnvio();
                total();
            }
        })
    });

// INFO del producto que será agregado
function showCartInfo() {
    unidad = producto.articles[0].unitCost;

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
        subTotal= unidad*document.getElementById("cantArticulo").value;
        document.getElementById("subtotal").innerHTML = producto.articles[0].currency +" "+subTotal;
        document.getElementById("sumSubtotal").innerHTML= producto.articles[0].currency +" "+subTotal;
} 

function showCosto(){
    costo=`
  
        <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-sm">
        <div>
            <h6 class="my-0">Subtotal</h6>
            <small class="text-muted"></small>
        </div>
        <span class="text-muted" id="sumSubtotal">$</span>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-sm">
        <div>
            <h6 class="my-0">Costo de envío</h6>
            <small class="text-muted"></small>
        </div>
        <span class="text-muted"id="costo">$</span>
        </li>
        <li class="list-group-item d-flex justify-content-between lh-sm">
        <div>
            <h6 class="my-0">Total</h6>
            <small class="text-muted"></small>
        </div>
        <span class="text-muted" id="total">$</span>
        </li>
        </ul>
  `
  document.getElementById('costos').innerHTML= costo;
  }
  
  //costo de envio y total
    function costoDeEnvio(){
    
    if(document.getElementById("premium").checked)
        {
        costoEnvio=subTotal*0.15
        document.getElementById("costo").innerHTML=producto.articles[0].currency +" "+ costoEnvio;
        }
    if(document.getElementById("express").checked)
        {
        costoEnvio=subTotal*0.07
        document.getElementById("costo").innerHTML=producto.articles[0].currency +" "+ costoEnvio;
        }

    if(document.getElementById("standard").checked)
    {
        costoEnvio=subTotal*0.05
        document.getElementById("costo").innerHTML=producto.articles[0].currency+" "+ costoEnvio;
    }
    total();
    }

   function total(){
     return document.getElementById("total").innerHTML=subTotal+costoEnvio;
    }
  
  //OCULTAR TRANSFERENCIA
  
  document.getElementById("tarjetaDeCrédito").addEventListener("change",function(){
  
    document.getElementById("inputNumeroDeTarjeta").disabled = false;
    document.getElementById("inputCodSeguridad").disabled = false;
    document.getElementById("inputVencimiento").disabled = false;
    document.getElementById("inputCuenta").disabled = true;
  
  });
  
  //OCULTAR TARJETA
  
  document.getElementById("transferencia").addEventListener("change",function(){
  
    document.getElementById("inputNumeroDeTarjeta").disabled = true;
    document.getElementById("inputCodSeguridad").disabled = true;
    document.getElementById("inputVencimiento").disabled = true;
    document.getElementById("inputCuenta").disabled = false;
  
  });
  
  //VALIDACIÓN MODAL

  function validarCampos(){
  
    let tarjeta=document.getElementById("tarjetaDeCrédito");
    let cuenta=document.getElementById("transferencia");
    let inputCant= document.getElementById("cantArticulo").value;
    let valid = true

    if(!tarjeta.checked&&!cuenta.checked ){
      document.getElementById("buttonFormaDePago").classList.add("link-danger");
      document.getElementById("smallSeleccionado").innerHTML="No se ha seleccionado";
      valid=false
     }
     else
     {
       document.getElementById("buttonFormaDePago").classList.remove("link-danger");
       document.getElementById("smallSeleccionado").innerHTML="Se ha seleccionado forma de pago";
     }

    if(inputCant.value<=0)
    {
    inputCant.setCustomValidity(".is-invalid")
    }
    return valid;
  }
  
  
  function validarCostoEnvio(){
    let premium = document.getElementById("premium")
    let express = document.getElementById("express")
    let standard = document.getElementById("standard")

    if(!premium.checked && !express.checked && !standard.checked){
      premium.setCustomValidity("#invalid-feedback")
      express.setCustomValidity("#invalid-feedback")
      standard.setCustomValidity("#invalid-feedback")
      valid=false
     }
     else
     {
      premium.setCustomValidity("")
      express.setCustomValidity("")
      standard.setCustomValidity("")
     }
}
  
  function validación() {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()&&!validarCampos()&&!validarCostoEnvio()){
            event.preventDefault();
            event.stopPropagation();
          }
          document.body.classList.add('was-validated');
          form.classList.add('was-validated');
        },
         false)
      })
      validarCostoEnvio()
      validarCampos()
      alerta()
  };
  
 function alerta(){
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  
  const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }
  
  const alertTrigger = document.getElementById("btnFinalizar")
  
  if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
      alert('Finalizó su compra con éxito!', 'success')
  })}}
  
  