let nombre =  document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let segundoNombre = document.getElementById("segundoNombre");
let segundoApellido = document.getElementById("segundoApellido");
let tel = document.getElementById("tel");
let email = document.getElementById("email");

document.addEventListener("DOMContentLoaded", () => {
    userLogin();
});

//Verifica que esté logeado.
function userLogin(){
    if(localStorage.getItem("email") !== null){
        mostrarPerfil();
    };
};

function validate() {
    'use strict'

    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()){
            event.preventDefault()
            event.stopPropagation()
        }

            form.classList.add('was-validated')
        }, false
        )
        })
};

function guardarPerfil() {
    localStorage.setItem("nombre", nombre.value);
    localStorage.setItem("segundoNombre", segundoNombre.value);
    localStorage.setItem('email', email);
    localStorage.setItem("apellido", apellido.value);
    localStorage.setItem("segundoApellido", segundoApellido.value);
    localStorage.setItem("tel", tel.value);
}

function mostrarPerfil(){
    email.value = localStorage.getItem("email")
    nombre.value = localStorage.getItem("nombre")
    segundoNombre.value = localStorage.getItem("segundoNombre")
    apellido.value = localStorage.getItem("apellido")
    segundoApellido.value = localStorage.getItem("segundoApellido")
    tel.value = localStorage.getItem("tel")
}