document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".banner-slide");
    const indicadores = document.querySelectorAll(".indicator");

    if (slides.length === 0 || indicadores.length === 0) {
        return;
    }

    let slideActual = 0;
    let intervalo;

    function mostrarSlide(numero) {
        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        indicadores.forEach(function (indicador) {
            indicador.classList.remove("active");
        });

        slides[numero].classList.add("active");
        indicadores[numero].classList.add("active");

        slideActual = numero;
    }

    function siguienteSlide() {
        let siguiente = slideActual + 1;

        if (siguiente >= slides.length) {
            siguiente = 0;
        }

        mostrarSlide(siguiente);
    }

    function iniciarCarrusel() {
        intervalo = setInterval(function () {
            siguienteSlide();
        }, 5000);
    }

    function reiniciarCarrusel() {
        clearInterval(intervalo);
        iniciarCarrusel();
    }

    indicadores.forEach(function (indicador, indice) {
        indicador.addEventListener("click", function () {
            mostrarSlide(indice);
            reiniciarCarrusel();
        });
    });

    mostrarSlide(0);
    iniciarCarrusel();
});