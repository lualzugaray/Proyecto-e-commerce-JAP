// realiza la solicitud para obtener la información de dicho producto

let productCode = window.localStorage.getItem("productID");
let productInfoUrl = PRODUCT_INFO_URL + productCode + EXT_TYPE; //info de los comentarios
let productCommentUrl = PRODUCT_INFO_COMMENTS_URL + productCode + EXT_TYPE; //comentarios

function setProductId(product_id) {
  localStorage.setItem("productID", product_id);
  window.location.href = "product-info.html";
}

async function showProductInfo() {
  function mostrarDatos(prodID, text) {
    const dato = document.getElementById(prodID);
    dato.innerText = text;
  }

  function imagenesProductos(imagenes) {
    const foto = document.getElementById("photo-gallery"); //imagenes

    for (let img_src of imagenes) {
      foto.innerHTML += `
           <a class="list-group-item list-group-item-action d-flex justify-content-between align-items-center w-25">
           <img src="${img_src}" alt="" class="img-fluid">
           </a>`; //muestra las imagenes
    }
  }

  function prodRel(productos) {
    const prod = document.getElementById("productosRel"); //productosRelacionados

    for (let prodRela of productos) {
      prod.innerHTML += `
            <div onclick="setProductId(${prodRela.id})" class="col-3" style="margin-right: 7%">
            <img src="` + prodRela.image + `" alt="product image" class="img-thumbnail">
            <label for="img">`+ prodRela.name +`</label>
           </div>
           `; 
    }
  }

  const json = await getJSONData(productInfoUrl); //info del json
  const infoProducto = json.data;

  mostrarDatos("prod-name", infoProducto.name);
  mostrarDatos("prod-cat", infoProducto.category);
  mostrarDatos(
    "prod-price",
    infoProducto.currency + " " + infoProducto.cost
  );
  mostrarDatos("prod-sold", infoProducto.soldCount);
  mostrarDatos("prod-des", infoProducto.description);

  imagenesProductos(infoProducto.images);
  prodRel(infoProducto.relatedProducts);
}

async function showProductComment() {
  function puntuacionEstrellas(estrellas) {
    const valoresValidos = [0, 1, 2, 3, 4, 5];
    const esValido = valoresValidos.some((value) => value === estrellas);
    let textoMostrado = "";

    if (esValido) {
      for (let star = 1; star <= 5; star++) {
        if (star <= estrellas) {
          textoMostrado += `<span class="fa fa-star checked" id= "estrella"></span>`;
        } else {
          textoMostrado += `<span class="fa fa-star"></span>`;
        }
      }
    } else {
      textoMostrado = `<span class="text-danger">No es valido</span>`;
    }

    return textoMostrado;
  }

  function showComment() {
    document.getElementById("comment-num").innerText = prodComentarios.length;
    for (let comment of prodComentarios) {
      comentarios.innerHTML += `
            <li class="list-group-item">
              <p><span class="fw-bold">${comment.user}</span> - <span>${
        comment.dateTime
      }</span> - <span>${puntuacionEstrellas(comment.score)}</span></p>
              <p>${comment.description}</p>
            </li>`;
    }
  }

  const json = await getJSONData(productCommentUrl); 
  const prodComentarios = json.data;
  const comentarios = document.getElementById("prod-comment");

  if (prodComentarios.length > 0) {
    showComment();
  } else {
    comentarios.innerHTML = `<h4 class="text-muted text-center">Sin comentarios aun.</h4>`;
  }
}

showProductInfo();
showProductComment();
