'use strict';

const formulario$3 = document.querySelector("#formulario");

const validarCantidad = () => {

    // Aceptamos cualquier digito (0-9), y un punto con decimales (opcional)
    const expRegCantidad = /^\d+(\.\d+)?$/;
    const inputCantidad = formulario$3.cantidad;

    if (expRegCantidad.test(inputCantidad.value)) {
        inputCantidad.classList.remove("formulario__input--error");
        return true;
    } else {
        inputCantidad.classList.add("formulario__input--error");
        return false;   
    }

};

const formulario$2 = document.querySelector("#formulario");

const validarNombre = () => {

    const expRegNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    const inputNombre = formulario$2["nombre-receptor"];

    if (expRegNombre.test(inputNombre.value)) {
        inputNombre.classList.remove("formulario__input--error");
        return true;
    } else {
        inputNombre.classList.add("formulario__input--error");
        return false;   
    }

};

const validarPasoActual = (paso) => {
    document.querySelector(`#linea-pasos [data-paso="${paso}"] span`).classList.add("linea-pasos__paso-check--checked");

};

const pasarSiguienteValidacion = () => {
    
    const pasos = [...document.querySelectorAll(".linea-pasos__paso")];
    const pasoActivo = document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');

    //obtenemos el index del paso activo
    const indexPasoActual = pasos.indexOf(pasoActivo);

    if (indexPasoActual < pasos.length -1) {

        // eliminamos la clase del paso ativo
        pasoActivo.querySelector("span").classList.remove("linea-pasos__paso-check--active");

        // Ponemos la clase de paso acivo al siguiente elemento
        pasos[indexPasoActual + 1].querySelector("span").classList.add("linea-pasos__paso-check--active");

        const id = pasos[indexPasoActual + 1].dataset.paso;
        document.querySelector(`.formulario__body [data-paso="${id}"]`).scrollIntoView({
            inline: "start",
            behavior: "smooth",
        });
       
    }



};

const validarCorreo = () => {
	// Expresion regular para validar un correo.
	const expRegCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	// Obtenemos los inputs
	const inputCorreo = formulario['correo-receptor'];

	// Comprobamos que el nombre y correo sean correctos.
	if (!expRegCorreo.test(inputCorreo.value)) {
		inputCorreo.classList.add('formulario__input--error');
		return false;
	} else {
		inputCorreo.classList.remove('formulario__input--error');
		return true;
	}
};

const formulario$1 = document.querySelector("#formulario");
const btnFormulario = formulario$1.querySelector("#formulario__btn");


//reiniciando scroll al reiniciar la pagina
formulario$1.querySelector(".formulario__body").scroll = 0;

// Comprobar los campos de formulario cuando el usuario escribe.
formulario$1.addEventListener("keyup", (e) => {
    if (e.target.tagName === "INPUT") {
        if (e.target.id === "cantidad") {
            validarCantidad();
        } else if (e.target.id === "nombre-receptor") {
            validarNombre();
        } else if (e.target.id === "correo-receptor") {
            validarCorreo();
        }
    }
});

btnFormulario.addEventListener("click", (e) => {
    e.preventDefault();

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
        formulario$1.querySelector("[data-valor='cantidad'] span").innerText = formatearMoneda.format(formulario$1.cantidad.value);

        formulario$1.querySelector("[data-valor=nombre-receptor] span").innerText = formulario$1["nombre-receptor"].value;

        formulario$1.querySelector("[data-valor=correo-receptor] span").innerText = formulario$1["correo-receptor"].value;

        formulario$1.querySelector("[data-valor=metodo] span").innerText = formulario$1.metodo.value;

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
        },4000);
    } else if (pasoActual === "confirmacion" && !btnFormulario.matches(".formulario__btn--disabled")) {
        // Aqui se haria una peticion al servidor, una redireccion, etc.

        // Cambiamos el texto del btn a 'Transferir'
        btnFormulario.querySelector("span").innerText = "Transfiriendo";
        // Agregamos la clase que deshabilita el boton.
        btnFormulario.classList.add("formulario__btn--disabled");

        setTimeout(() => {
            // Luego de 4 segundos ocultamos el formulario y agregamos la clase de la alerta.
            formulario$1.classList.add("formulario--hidden");
            document.querySelector("#alerta").classList.add("alerta--active");
        },4000);
    }
});

const linea = document.querySelector(".linea-pasos");

linea.addEventListener("click", (e) => {
     // Validamos que el click sea en un paso
   if(!e.target.closest(".linea-pasos__paso")) {
        return ;
   }

   const pasoActual = document.querySelector(".linea-pasos__paso-check--active").closest(".linea-pasos__paso").dataset.paso;
   // Validamos el paso actual
   if (pasoActual === "cantidad") {
       if (!validarCantidad()) {
            return;
       }
   } else if (pasoActual === "datos") {
        if (!validarNombre() || !validarCorreo()) {
            return;
        }
   }

   // Obtenemos el paso al que queremos navegar
   const pasoANavegar = e.target.closest(".linea-pasos__paso");

   // Comprobamos si el paso tiene el icono de validacion.
   // Solo podemos dar click a los pasos que tienen el icono de validacion
   if (pasoANavegar.querySelector(".linea-pasos__paso-check--checked")) {
     const pasoActual = linea.querySelector(".linea-pasos__paso-check--active");
     pasoActual.classList.remove("linea-pasos__paso-check--active");

     // Obtenemos el identificador del paso al que queremos navegar
     const identificador = pasoANavegar.dataset.paso;

     // Agregamos la clase active al nuevo paso
     linea.querySelector(`[data-paso="${identificador}"] span`).classList.add("linea-pasos__paso-check--active");

     // Navegamos al paso
     document.querySelector(`.formulario__body [data-paso="${identificador}"]`).scrollIntoView({
          inline: "start",
          behavior: "smooth",
     });

     // Intercambiamos el texto de transferir a siguiente
     const btnFormulario = document.querySelector("#formulario__btn");
     btnFormulario.querySelector("span").innerText = "Siguiente";

     // Quitamos el icono del banco y agregamos el de seguiente.
     btnFormulario.querySelector("[data-icono='banco']").classList.remove("formulario__btn-contenedor-icono--active");
     btnFormulario.querySelector("[data-icono='siguiente']").classList.add("formulario__btn-contenedor-icono--active");

     // Quitamos la clase que desabilita el boton cuando se hace una transferencia.
     btnFormulario.classList.remove("formulario__btn--disabled");
   }

    
});
//# sourceMappingURL=bundle.js.map
