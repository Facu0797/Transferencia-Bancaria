import validarCantidad from "./validaciones/validarCantidad";
import validarNombre from "./validaciones/validarNombre";
import validarPasoActual from "./validarPasoActual";
import pasarSiguienteValidacion from "./siguientePaso";
import validarCorreo from "./validaciones/validarCorreo";


const formulario = document.querySelector("#formulario");
const btnFormulario = formulario.querySelector("#formulario__btn");


//reiniciando scroll al reiniciar la pagina
formulario.querySelector(".formulario__body").scroll = 0;

// Comprobar los campos de formulario cuando el usuario escribe.
formulario.addEventListener("keyup", (e) => {
    if (e.target.tagName === "INPUT") {
        if (e.target.id === "cantidad") {
            validarCantidad();
        } else if (e.target.id === "nombre-receptor") {
            validarNombre();
        } else if (e.target.id === "correo-receptor") {
            validarCorreo();
        }
    }
})

btnFormulario.addEventListener("click", (e) => {
    e.preventDefault()

    // Validamos el paso actual.
    const pasoActual = document.querySelector(".linea-pasos__paso-check--active").closest(".linea-pasos__paso").dataset.paso;

    if (pasoActual === "cantidad") {
        if (validarCantidad()) {
            validarPasoActual("cantidad");
            pasarSiguienteValidacion();
        }
    } else if (pasoActual === "datos"){
        if (validarNombre() && validarCorreo()) {
            validarPasoActual("datos");
            pasarSiguienteValidacion();
        }
    } else if (pasoActual === "metodo"){
        validarPasoActual("metodo");

        //formatear moneda
        const opciones = {style: "currency", currency: "EUR"};
        const formatearMoneda = new Intl.NumberFormat("es-ES", opciones);

        //Reemplazar dinamicamente los valores de la confiramcion
        formulario.querySelector("[data-valor='cantidad'] span").innerText = formatearMoneda.format(formulario.cantidad.value);

        formulario.querySelector("[data-valor=nombre-receptor] span").innerText = formulario["nombre-receptor"].value;

        formulario.querySelector("[data-valor=correo-receptor] span").innerText = formulario["correo-receptor"].value;

        formulario.querySelector("[data-valor=metodo] span").innerText = formulario.metodo.value;

        //cambiamos el boton siguiente a "Transferir"
        btnFormulario.querySelector("span").innerText = "Transferir";

        // Desabilitamos el boton
        btnFormulario.classList.add("formulario__btn--disabled");

        // cambiamos el icono de la flacha por el del banco
        btnFormulario.querySelector("[data-icono='siguiente']").classList.remove("formulario__btn-contenedor-icono--active");
        btnFormulario.querySelector("[data-icono='banco']").classList.add("formulario__btn-contenedor-icono--active");
        
        pasarSiguienteValidacion();

        setTimeout(() => {
            btnFormulario.classList.remove("formulario__btn--disabled");
        },4000)
    } else if (pasoActual === "confirmacion" && !btnFormulario.matches(".formulario__btn--disabled")) {
        // Aqui se haria una peticion al servidor, una redireccion, etc.

        // Cambiamos el texto del btn a 'Transferir'
        btnFormulario.querySelector("span").innerText = "Transfiriendo";
        // Agregamos la clase que deshabilita el boton.
        btnFormulario.classList.add("formulario__btn--disabled");

        setTimeout(() => {
            // Luego de 4 segundos ocultamos el formulario y agregamos la clase de la alerta.
            formulario.classList.add("formulario--hidden");
            document.querySelector("#alerta").classList.add("alerta--active");
        },4000)
    }
})



