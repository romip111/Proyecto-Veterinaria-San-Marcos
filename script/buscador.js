document.addEventListener(
    "DOMContentLoaded",
    function () {
        const searchInput =
            document.getElementById("searchInput");

        const searchButton =
            document.getElementById("searchButton");

        const searchSuggestions =
            document.getElementById("searchSuggestions");

        if (
            !searchInput ||
            !searchButton ||
            !searchSuggestions
        ) {
            return;
        }

        const opciones = [
            {
                nombre: "Ir a la tienda",
                descripcion: "Ver productos para tu mascota",
                tipo: "Tienda",
                url: "#tienda"
            },
            {
                nombre: "Milpro 2.5 mg",
                descripcion: "Antiparasitario para perros y gatos",
                tipo: "Producto",
                url: "#tienda"
            },
            {
                nombre: "Shampoo Medicado FLT",
                descripcion: "Shampoo para perros y gatos",
                tipo: "Producto",
                url: "#tienda"
            },
            {
                nombre: "Alimento para conejos Puki",
                descripcion: "Alimento balanceado de 1 kg",
                tipo: "Producto",
                url: "#tienda"
            },
            {
                nombre: "Ver servicios",
                descripcion: "Conoce nuestros servicios veterinarios",
                tipo: "Servicios",
                url: "#servicios"
            },
            {
                nombre: "Consulta General",
                descripcion: "Evaluación médica veterinaria",
                tipo: "Servicio",
                url: "#servicios"
            },
            {
                nombre: "Vacunación y Desparasitación",
                descripcion: "Protección y prevención para tu mascota",
                tipo: "Servicio",
                url: "#servicios"
            },
            {
                nombre: "Cirugía Menor",
                descripcion: "Procedimientos veterinarios",
                tipo: "Servicio",
                url: "#servicios"
            },
            {
                nombre: "Agendar cita",
                descripcion: "Reserva una atención veterinaria",
                tipo: "Cita",
                url: "solicitar_cita.html"
            },
            {
                nombre: "Mis citas",
                descripcion: "Revisa tus citas veterinarias",
                tipo: "Página",
                url: "mis_citas.html"
            },
            {
                nombre: "Contactarnos",
                descripcion: "Envíanos un mensaje",
                tipo: "Contacto",
                url: "contactanos.html"
            },
            {
                nombre: "Acerca de nosotros",
                descripcion: "Conoce más sobre Veterinaria San Marcos",
                tipo: "Página",
                url: "acerca_de.html"
            },
            {
                nombre: "Ver ubicación",
                descripcion: "Encuentra nuestra veterinaria",
                tipo: "Ubicación",
                url: "#ubicacion"
            }
        ];

        const recomendaciones = [
            {
                nombre: "🛒 Ir a la tienda",
                descripcion: "Ver productos para tu mascota",
                tipo: "Tienda",
                url: "#tienda"
            },
            {
                nombre: "🩺 Ver servicios",
                descripcion: "Conoce nuestros servicios veterinarios",
                tipo: "Servicios",
                url: "#servicios"
            },
            {
                nombre: "📅 Agendar cita",
                descripcion: "Reserva una atención veterinaria",
                tipo: "Cita",
                url: "solicitar_cita.html"
            },
            {
                nombre: "📍 Ver ubicación",
                descripcion: "Encuentra nuestra veterinaria",
                tipo: "Ubicación",
                url: "#ubicacion"
            },
            {
                nombre: "✉️ Contactarnos",
                descripcion: "Envíanos un mensaje",
                tipo: "Contacto",
                url: "contactanos.html"
            }
        ];

        function normalizarTexto(texto) {
            return texto
                .toLowerCase()
                .normalize("NFD")
                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                );
        }

        function crearSugerencia(opcion) {
            const elemento =
                document.createElement("button");

            elemento.type = "button";

            elemento.className =
                "search-suggestion-item";

            elemento.innerHTML = `
                <span class="search-suggestion-info">
                    <strong>
                        ${opcion.nombre}
                    </strong>

                    <small>
                        ${opcion.descripcion}
                    </small>
                </span>

                <span class="search-suggestion-type">
                    ${opcion.tipo}
                </span>
            `;

            elemento.addEventListener(
                "click",
                function () {
                    irAResultado(opcion.url);
                }
            );

            return elemento;
        }

        function mostrarRecomendaciones() {
            searchSuggestions.innerHTML = "";

            recomendaciones.forEach(
                function (opcion) {
                    searchSuggestions.appendChild(
                        crearSugerencia(opcion)
                    );
                }
            );

            searchSuggestions.classList.add(
                "active"
            );
        }

        function buscar() {
            const textoOriginal =
                searchInput.value.trim();

            const texto =
                normalizarTexto(textoOriginal);

            searchSuggestions.innerHTML = "";

            if (texto === "") {
                mostrarRecomendaciones();
                return;
            }

            const resultados =
                opciones.filter(
                    function (opcion) {
                        const contenido =
                            normalizarTexto(
                                opcion.nombre +
                                " " +
                                opcion.descripcion +
                                " " +
                                opcion.tipo
                            );

                        return contenido.includes(
                            texto
                        );
                    }
                );

            if (resultados.length === 0) {
                const sinResultados =
                    document.createElement("div");

                sinResultados.className =
                    "search-no-results";

                sinResultados.textContent =
                    `No encontramos resultados para "${textoOriginal}".`;

                searchSuggestions.appendChild(
                    sinResultados
                );

                searchSuggestions.classList.add(
                    "active"
                );

                return;
            }

            resultados.forEach(
                function (opcion) {
                    searchSuggestions.appendChild(
                        crearSugerencia(opcion)
                    );
                }
            );

            searchSuggestions.classList.add(
                "active"
            );
        }

        function irAResultado(url) {
            searchSuggestions.classList.remove(
                "active"
            );

            searchInput.value = "";

            if (url.startsWith("#")) {
                const elemento =
                    document.querySelector(url);

                if (elemento) {
                    elemento.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

                return;
            }

            window.location.href = url;
        }

        function buscarPrimerResultado() {
            const textoOriginal =
                searchInput.value.trim();

            const texto =
                normalizarTexto(textoOriginal);

            if (texto === "") {
                mostrarRecomendaciones();
                return;
            }

            const resultado =
                opciones.find(
                    function (opcion) {
                        const contenido =
                            normalizarTexto(
                                opcion.nombre +
                                " " +
                                opcion.descripcion +
                                " " +
                                opcion.tipo
                            );

                        return contenido.includes(
                            texto
                        );
                    }
                );

            if (resultado) {
                irAResultado(resultado.url);
            } else {
                buscar();
            }
        }

        searchInput.addEventListener(
            "focus",
            function () {
                if (
                    searchInput.value.trim() === ""
                ) {
                    mostrarRecomendaciones();
                } else {
                    buscar();
                }
            }
        );

        searchInput.addEventListener(
            "click",
            function () {
                if (
                    searchInput.value.trim() === ""
                ) {
                    mostrarRecomendaciones();
                }
            }
        );

        searchInput.addEventListener(
            "input",
            buscar
        );

        searchInput.addEventListener(
            "keydown",
            function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();

                    buscarPrimerResultado();
                }

                if (event.key === "Escape") {
                    searchSuggestions.classList.remove(
                        "active"
                    );

                    searchInput.blur();
                }
            }
        );

        searchButton.addEventListener(
            "click",
            function () {
                if (
                    searchInput.value.trim() === ""
                ) {
                    mostrarRecomendaciones();
                } else {
                    buscarPrimerResultado();
                }
            }
        );

        document.addEventListener(
            "click",
            function (event) {
                if (
                    !event.target.closest(
                        ".search-box"
                    )
                ) {
                    searchSuggestions.classList.remove(
                        "active"
                    );
                }
            }
        );
    }
);