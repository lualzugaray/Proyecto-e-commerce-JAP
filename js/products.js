let categoriesArray = [];
let minCount = undefined;
let maxCount = undefined;

//id del producto
function setProductId(product_id) {
  localStorage.setItem("productID", product_id);
  window.location.href = "product-info.html";
}
//entrega 3

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){
    let minimo = document.getElementById("rangeFilterCountMin").value; 
    let maximo = document.getElementById("rangeFilterCountMax").value;
  
    if (array == undefined) {
      array = categoriesArray;
    }
  
    if (maximo == 0 || maximo == undefined) {
      maximo = 1000000000000;
    }
  
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];
            if (category.cost >= minimo && category.cost <= maximo) {
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action" onclick="setProductId(${category.id})">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                            <h4>`+ category.name +`</h4> 
                            <p> `+ category.description +`</p> 
                            </div>
                            <small class="text-muted">` + category.cost + category.currency +` costo</small> 
                            <small class="text-muted">` + category.soldCount + ` artículos</small> 
                            </div>

                    </div>
                </div>
            </div>
            `
            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
            }
        }
    }


function ordenASC() {
    categoriesArray.sort((a, b) => {
      if (a.cost > b.cost) {
        return 1;
      }
      if (a.cost < b.cost) {
        return -1;
      } else {
        return 0;
      }
    });
  
    showCategoriesList();
  }
  
  function ordenDES() {
    categoriesArray.sort((a, b) => {
      if (a.cost < b.cost) {
        return 1;
      }
      if (a.cost > b.cost) {
        return -1;
      } else {
        return 0;
      }
    });
  
    showCategoriesList();
  }
  
  function ordenREL() {
    categoriesArray.sort((a, b) => {
      if (a.soldCount < b.soldCount) {
        return 1;
      }
      if (a.soldCount > b.soldCount) {
        return -1;
      } else {
        return 0;
      }
    });
  
    showCategoriesList();
  }
  
  //codigo nuevo
  let catID = localStorage.getItem('catID')
  document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(LIST_URL+catID+'.json').then(function (resultObj) {
      //obtiene la info del json
      if (resultObj.status === "ok") {
        categoriesArray = resultObj.data.products;
        showCategoriesList(categoriesArray);
      }
    });
    document.getElementById("clear").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
      
        showCategoriesList();
      });
      
      document.getElementById("asc").addEventListener("click", () => {
        ordenASC();
      });
      
      document.getElementById("des").addEventListener("click", () => {
        ordenDES();
      });
      
      document.getElementById("rel").addEventListener("click", () => {
        ordenREL();
      });
    
      document.getElementById("rangeFilterCount").addEventListener("click", function(){

        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
    
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
    
        showCategoriesList();
        }); 
  });
  