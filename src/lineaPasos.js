import validarCantidad from "./validaciones/validarCantidad";
import validarCorreo from "./validaciones/validarCorreo";
import validarNombre from "./validaciones/validarNombre";


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
     })

     // Intercambiamos el texto de transferir a siguiente
     const btnFormulario = document.querySelector("#formulario__btn");
     btnFormulario.querySelector("span").innerText = "Siguiente";

     // Quitamos el icono del banco y agregamos el de seguiente.
     btnFormulario.querySelector("[data-icono='banco']").classList.remove("formulario__btn-contenedor-icono--active");
     btnFormulario.querySelector("[data-icono='siguiente']").classList.add("formulario__btn-contenedor-icono--active");

     // Quitamos la clase que desabilita el boton cuando se hace una transferencia.
     btnFormulario.classList.remove("formulario__btn--disabled");
   }

    
})