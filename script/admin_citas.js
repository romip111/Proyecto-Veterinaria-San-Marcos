(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const tipoUsuario = localStorage.getItem("tipoUsuario");

        if (tipoUsuario !== "admin") {
            alert("Debes iniciar sesión como administrador.");
            window.location.href = "inicio_sesion.html";
            return;
        }

        const tablaCitas = document.getElementById("tablaCitas");
        const totalCitas = document.getElementById("totalCitas");
        const totalPendientes = document.getElementById("totalPendientes");
        const totalConfirmadas = document.getElementById("totalConfirmadas");
        const totalRechazadas = document.getElementById("totalRechazadas");
        const cerrarSesion = document.getElementById("cerrarSesion");

        function obtenerCitas() {
            try {
                const datos = JSON.parse(localStorage.getItem("citas"));

                return Array.isArray(datos)
                    ? datos
                    : [];
            } catch (error) {
                console.error(
                    "Error al cargar las citas:",
                    error
                );

                return [];
            }
        }

        let citas = obtenerCitas();

        function guardarCitas() {
            localStorage.setItem(
                "citas",
                JSON.stringify(citas)
            );
        }

        function obtenerEstado(cita) {
            const estado =
                cita.estado ||
                cita.status ||
                "Pendiente";

            const estadoTexto =
                String(estado)
                    .trim()
                    .toLowerCase();

            if (
                estadoTexto === "confirmada" ||
                estadoTexto === "confirmado"
            ) {
                return "Confirmada";
            }

            if (
                estadoTexto === "rechazada" ||
                estadoTexto === "rechazado"
            ) {
                return "Rechazada";
            }

            return "Pendiente";
        }

        function obtenerClaseEstado(estado) {
            if (estado === "Confirmada") {
                return "estado-confirmada";
            }

            if (estado === "Rechazada") {
                return "estado-rechazada";
            }

            return "estado-pendiente";
        }

        function escaparHTML(valor) {
            return String(valor ?? "")
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll("'", "&#039;");
        }

        function obtenerCodigo(cita) {
            return (
                cita.codigo ||
                cita.id ||
                "-"
            );
        }

        function obtenerFecha(cita) {
            return (
                cita.fecha ||
                "-"
            );
        }

        function obtenerHora(cita) {
            return (
                cita.hora ||
                "-"
            );
        }

        function obtenerMascota(cita) {
            return (
                cita.nombreMascota ||
                cita.mascota ||
                "-"
            );
        }

        function obtenerTutor(cita) {
            return (
                cita.nombreTutor ||
                cita.tutor ||
                cita.cliente ||
                cita.nombre ||
                "-"
            );
        }

        function obtenerServicio(cita) {
            return (
                cita.servicio ||
                cita.nombreServicio ||
                cita.tipoServicio ||
                "-"
            );
        }

        function actualizarResumen() {
            let pendientes = 0;
            let confirmadas = 0;
            let rechazadas = 0;

            citas.forEach(function (cita) {
                const estado = obtenerEstado(cita);

                if (estado === "Confirmada") {
                    confirmadas++;
                } else if (
                    estado === "Rechazada"
                ) {
                    rechazadas++;
                } else {
                    pendientes++;
                }
            });

            if (totalCitas) {
                totalCitas.textContent =
                    citas.length;
            }

            if (totalPendientes) {
                totalPendientes.textContent =
                    pendientes;
            }

            if (totalConfirmadas) {
                totalConfirmadas.textContent =
                    confirmadas;
            }

            if (totalRechazadas) {
                totalRechazadas.textContent =
                    rechazadas;
            }
        }

        function ordenarCitas(lista) {
            return [...lista].sort(
                function (a, b) {
                    const fechaA =
                        `${a.fecha || ""} ${a.hora || ""}`;

                    const fechaB =
                        `${b.fecha || ""} ${b.hora || ""}`;

                    return fechaB.localeCompare(
                        fechaA
                    );
                }
            );
        }

        function generarAcciones(
            cita,
            indice
        ) {
            const estado =
                obtenerEstado(cita);

            let botones = "";

            if (estado !== "Confirmada") {
                botones += `
                    <button
                        type="button"
                        class="btn-confirmar-cita"
                        data-indice="${indice}"
                        data-accion="confirmar">
                        Confirmar
                    </button>
                `;
            }

            if (estado !== "Rechazada") {
                botones += `
                    <button
                        type="button"
                        class="btn-rechazar-cita"
                        data-indice="${indice}"
                        data-accion="rechazar">
                        Rechazar
                    </button>
                `;
            }

            if (estado !== "Pendiente") {
                botones += `
                    <button
                        type="button"
                        class="btn-pendiente-cita"
                        data-indice="${indice}"
                        data-accion="pendiente">
                        Pendiente
                    </button>
                `;
            }

            return botones;
        }

        function mostrarCitas() {
            if (!tablaCitas) {
                return;
            }

            tablaCitas.innerHTML = "";

            if (citas.length === 0) {
                tablaCitas.innerHTML = `
                    <tr>
                        <td
                            colspan="8"
                            style="
                                text-align: center;
                                padding: 30px;
                                color: #777;
                            ">
                            No hay citas registradas.
                        </td>
                    </tr>
                `;

                actualizarResumen();
                return;
            }

            const citasOrdenadas =
                ordenarCitas(citas);

            citasOrdenadas.forEach(
                function (cita) {
                    const indiceReal =
                        citas.indexOf(cita);

                    const codigo =
                        obtenerCodigo(cita);

                    const fecha =
                        obtenerFecha(cita);

                    const hora =
                        obtenerHora(cita);

                    const mascota =
                        obtenerMascota(cita);

                    const tutor =
                        obtenerTutor(cita);

                    const servicio =
                        obtenerServicio(cita);

                    const estado =
                        obtenerEstado(cita);

                    const fila =
                        document.createElement("tr");

                    fila.innerHTML = `
                        <td>
                            ${escaparHTML(codigo)}
                        </td>

                        <td>
                            ${escaparHTML(fecha)}
                        </td>

                        <td>
                            ${escaparHTML(hora)}
                        </td>

                        <td>
                            ${escaparHTML(mascota)}
                        </td>

                        <td>
                            ${escaparHTML(tutor)}
                        </td>

                        <td>
                            ${escaparHTML(servicio)}
                        </td>

                        <td>
                            <span
                                class="
                                    estado-cita
                                    ${obtenerClaseEstado(
                        estado
                    )}
                                ">
                                ${escaparHTML(estado)}
                            </span>
                        </td>

                        <td>
                            <div class="acciones-cita">
                                ${generarAcciones(
                        cita,
                        indiceReal
                    )}
                            </div>
                        </td>
                    `;

                    tablaCitas.appendChild(
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
                indice >= citas.length
            ) {
                return;
            }

            citas[indice].estado =
                nuevoEstado;

            guardarCitas();
            mostrarCitas();
        }

        if (tablaCitas) {
            tablaCitas.addEventListener(
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

                    if (accion === "confirmar") {
                        const confirmar =
                            confirm(
                                "¿Confirmar esta cita?"
                            );

                        if (!confirmar) {
                            return;
                        }

                        cambiarEstado(
                            indice,
                            "Confirmada"
                        );
                    }

                    if (accion === "rechazar") {
                        const confirmar =
                            confirm(
                                "¿Rechazar esta cita?"
                            );

                        if (!confirmar) {
                            return;
                        }

                        cambiarEstado(
                            indice,
                            "Rechazada"
                        );
                    }

                    if (accion === "pendiente") {
                        const confirmar =
                            confirm(
                                "¿Volver esta cita a pendiente?"
                            );

                        if (!confirmar) {
                            return;
                        }

                        cambiarEstado(
                            indice,
                            "Pendiente"
                        );
                    }
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

        mostrarCitas();
    });
})();