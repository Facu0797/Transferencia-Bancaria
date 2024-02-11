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



}

export default pasarSiguienteValidacion;