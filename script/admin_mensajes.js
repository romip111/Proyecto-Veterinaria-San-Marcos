(function () {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const tipoUsuario =
                localStorage.getItem(
                    "tipoUsuario"
                );

            if (tipoUsuario !== "admin") {

                alert(
                    "Debes iniciar sesión como administrador."
                );

                window.location.href =
                    "inicio_sesion.html";

                return;
            }

            const tablaMensajes =
                document.getElementById(
                    "tablaMensajes"
                );

            const totalMensajes =
                document.getElementById(
                    "totalMensajes"
                );

            const totalNuevos =
                document.getElementById(
                    "totalNuevos"
                );

            const totalLeidos =
                document.getElementById(
                    "totalLeidos"
                );

            const totalRespondidos =
                document.getElementById(
                    "totalRespondidos"
                );

            const buscarMensaje =
                document.getElementById(
                    "buscarMensaje"
                );

            const cerrarSesion =
                document.getElementById(
                    "cerrarSesion"
                );

            function obtenerMensajes() {

                try {

                    const datos =
                        JSON.parse(
                            localStorage.getItem(
                                "mensajesContacto"
                            )
                        );

                    return Array.isArray(datos)
                        ? datos
                        : [];

                } catch (error) {

                    console.error(
                        "Error al cargar los mensajes:",
                        error
                    );

                    return [];
                }
            }

            let mensajes =
                obtenerMensajes();

            function guardarMensajes() {

                localStorage.setItem(
                    "mensajesContacto",
                    JSON.stringify(
                        mensajes
                    )
                );
            }

            function obtenerEstado(mensaje) {

                const estado =
                    mensaje.estado ||
                    "Nuevo";

                const estadoTexto =
                    String(estado)
                        .trim()
                        .toLowerCase();

                if (
                    estadoTexto ===
                    "respondido"
                ) {
                    return "Respondido";
                }

                if (
                    estadoTexto ===
                    "leído" ||
                    estadoTexto ===
                    "leido"
                ) {
                    return "Leído";
                }

                return "Nuevo";
            }

            function obtenerClaseEstado(
                estado
            ) {

                if (
                    estado ===
                    "Respondido"
                ) {
                    return "estado-respondido";
                }

                if (
                    estado ===
                    "Leído"
                ) {
                    return "estado-leido";
                }

                return "estado-nuevo";
            }

            function escaparHTML(valor) {

                return String(
                    valor ?? ""
                )
                    .replaceAll(
                        "&",
                        "&amp;"
                    )
                    .replaceAll(
                        "<",
                        "&lt;"
                    )
                    .replaceAll(
                        ">",
                        "&gt;"
                    )
                    .replaceAll(
                        '"',
                        "&quot;"
                    )
                    .replaceAll(
                        "'",
                        "&#039;"
                    );
            }

            function actualizarResumen() {

                let nuevos = 0;
                let leidos = 0;
                let respondidos = 0;

                mensajes.forEach(
                    function (mensaje) {

                        const estado =
                            obtenerEstado(
                                mensaje
                            );

                        if (
                            estado ===
                            "Nuevo"
                        ) {
                            nuevos++;
                        }

                        if (
                            estado ===
                            "Leído"
                        ) {
                            leidos++;
                        }

                        if (
                            estado ===
                            "Respondido"
                        ) {
                            respondidos++;
                        }
                    }
                );

                if (totalMensajes) {

                    totalMensajes.textContent =
                        mensajes.length;
                }

                if (totalNuevos) {

                    totalNuevos.textContent =
                        nuevos;
                }

                if (totalLeidos) {

                    totalLeidos.textContent =
                        leidos;
                }

                if (totalRespondidos) {

                    totalRespondidos.textContent =
                        respondidos;
                }
            }

            function generarAcciones(
                mensaje,
                indice
            ) {

                const estado =
                    obtenerEstado(
                        mensaje
                    );

                let botones = "";

                if (
                    estado !==
                    "Leído"
                ) {

                    botones += `
                        <button
                            type="button"
                            class="btn-leer-mensaje"
                            data-indice="${indice}"
                            data-accion="leido">
                            Marcar leído
                        </button>
                    `;
                }

                if (
                    estado !==
                    "Respondido"
                ) {

                    botones += `
                        <button
                            type="button"
                            class="btn-responder-mensaje"
                            data-indice="${indice}"
                            data-accion="respondido">
                            Respondido
                        </button>
                    `;
                }

                if (
                    estado !==
                    "Nuevo"
                ) {

                    botones += `
                        <button
                            type="button"
                            class="btn-nuevo-mensaje"
                            data-indice="${indice}"
                            data-accion="nuevo">
                            Nuevo
                        </button>
                    `;
                }

                botones += `
                    <button
                        type="button"
                        class="btn-eliminar-mensaje"
                        data-indice="${indice}"
                        data-accion="eliminar">
                        Eliminar
                    </button>
                `;

                return botones;
            }

            function mostrarMensajes(
                lista = mensajes
            ) {

                if (!tablaMensajes) {
                    return;
                }

                tablaMensajes.innerHTML =
                    "";

                if (
                    lista.length === 0
                ) {

                    tablaMensajes.innerHTML = `
                        <tr>
                            <td
                                colspan="7"
                                style="
                                    text-align: center;
                                    padding: 30px;
                                    color: #777;
                                "
                            >
                                No hay mensajes registrados.
                            </td>
                        </tr>
                    `;

                    actualizarResumen();

                    return;
                }

                lista.forEach(
                    function (mensaje) {

                        const indiceReal =
                            mensajes.indexOf(
                                mensaje
                            );

                        const nombre =
                            mensaje.nombre ||
                            mensaje.nombreCompleto ||
                            "-";

                        const correo =
                            mensaje.correo ||
                            mensaje.email ||
                            "-";

                        const telefono =
                            mensaje.telefono ||
                            "-";

                        const texto =
                            mensaje.mensaje ||
                            mensaje.descripcion ||
                            "-";

                        const fecha =
                            mensaje.fecha ||
                            mensaje.fechaEnvio ||
                            "-";

                        const estado =
                            obtenerEstado(
                                mensaje
                            );

                        const fila =
                            document.createElement(
                                "tr"
                            );

                        fila.innerHTML = `
                            <td>
                                ${escaparHTML(nombre)}
                            </td>

                            <td>
                                ${escaparHTML(correo)}
                            </td>

                            <td>
                                ${escaparHTML(telefono)}
                            </td>

                            <td class="mensaje-texto">
                                ${escaparHTML(texto)}
                            </td>

                            <td>
                                ${escaparHTML(fecha)}
                            </td>

                            <td>
                                <span
                                    class="
                                        estado-mensaje
                                        ${obtenerClaseEstado(
                                            estado
                                        )}
                                    "
                                >
                                    ${escaparHTML(estado)}
                                </span>
                            </td>

                            <td>
                                <div class="acciones-mensaje">
                                    ${generarAcciones(
                                        mensaje,
                                        indiceReal
                                    )}
                                </div>
                            </td>
                        `;

                        tablaMensajes.appendChild(
                            fila
                        );
                    }
                );

                actualizarResumen();
            }

            function cambiarEstado(
                indice,
                nuevoEstado
            ) {

                if (
                    indice < 0 ||
                    indice >= mensajes.length
                ) {
                    return;
                }

                mensajes[indice].estado =
                    nuevoEstado;

                guardarMensajes();

                mostrarMensajes();
            }

            function eliminarMensaje(
                indice
            ) {

                if (
                    indice < 0 ||
                    indice >= mensajes.length
                ) {
                    return;
                }

                const confirmar =
                    confirm(
                        "¿Deseas eliminar este mensaje?"
                    );

                if (!confirmar) {
                    return;
                }

                mensajes.splice(
                    indice,
                    1
                );

                guardarMensajes();

                mostrarMensajes();
            }

            if (tablaMensajes) {

                tablaMensajes.addEventListener(
                    "click",
                    function (event) {

                        const boton =
                            event.target.closest(
                                "button[data-accion]"
                            );

                        if (!boton) {
                            return;
                        }

                        const indice =
                            Number(
                                boton.dataset.indice
                            );

                        const accion =
                            boton.dataset.accion;

                        if (
                            accion ===
                            "leido"
                        ) {

                            cambiarEstado(
                                indice,
                                "Leído"
                            );
                        }

                        if (
                            accion ===
                            "respondido"
                        ) {

                            cambiarEstado(
                                indice,
                                "Respondido"
                            );
                        }

                        if (
                            accion ===
                            "nuevo"
                        ) {

                            cambiarEstado(
                                indice,
                                "Nuevo"
                            );
                        }

                        if (
                            accion ===
                            "eliminar"
                        ) {

                            eliminarMensaje(
                                indice
                            );
                        }
                    }
                );
            }

            if (buscarMensaje) {

                buscarMensaje.addEventListener(
                    "input",
                    function () {

                        const texto =
                            buscarMensaje.value
                                .trim()
                                .toLowerCase();

                        const filtrados =
                            mensajes.filter(
                                function (mensaje) {

                                    const contenido = `
                                        ${mensaje.nombre || ""}
                                        ${mensaje.nombreCompleto || ""}
                                        ${mensaje.correo || ""}
                                        ${mensaje.email || ""}
                                        ${mensaje.telefono || ""}
                                        ${mensaje.mensaje || ""}
                                        ${mensaje.descripcion || ""}
                                    `.toLowerCase();

                                    return contenido.includes(
                                        texto
                                    );
                                }
                            );

                        mostrarMensajes(
                            filtrados
                        );
                    }
                );
            }

            if (cerrarSesion) {

                cerrarSesion.addEventListener(
                    "click",
                    function () {

                        const confirmar =
                            confirm(
                                "¿Deseas cerrar la sesión de administrador?"
                            );

                        if (!confirmar) {
                            return;
                        }

                        localStorage.removeItem(
                            "tipoUsuario"
                        );

                        localStorage.removeItem(
                            "usuarioActual"
                        );

                        window.location.href =
                            "inicio_sesion.html";
                    }
                );
            }

            mostrarMensajes();
        }
    );

})();