const tipoUsuarioMisCitas =
    localStorage.getItem(
        "tipoUsuario"
    );

const usuarioActualMisCitas =
    JSON.parse(
        localStorage.getItem(
            "usuarioActual"
        )
    );

if (
    tipoUsuarioMisCitas !== "cliente" ||
    !usuarioActualMisCitas
) {
    alert(
        "Debes iniciar sesión para ver tus citas."
    );

    window.location.href =
        "inicio_sesion.html";
}

const todasLasCitas =
    JSON.parse(
        localStorage.getItem(
            "citas"
        )
    ) || [];

const misCitas =
    todasLasCitas.filter(
        function (cita) {
            return (
                cita.usuarioCorreo ===
                usuarioActualMisCitas.correo
            );
        }
    );

const tablaMisCitas =
    document.getElementById(
        "tablaMisCitas"
    );

const totalMisCitas =
    document.getElementById(
        "totalMisCitas"
    );

const totalPendientes =
    document.getElementById(
        "totalPendientes"
    );

const totalConfirmadas =
    document.getElementById(
        "totalConfirmadas"
    );

const totalRechazadas =
    document.getElementById(
        "totalRechazadas"
    );

function obtenerEstadoCita(cita) {
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

function actualizarResumenMisCitas() {
    totalMisCitas.textContent =
        misCitas.length;

    const pendientes =
        misCitas.filter(
            function (cita) {
                return (
                    obtenerEstadoCita(cita) ===
                    "Pendiente"
                );
            }
        );

    const confirmadas =
        misCitas.filter(
            function (cita) {
                return (
                    obtenerEstadoCita(cita) ===
                    "Confirmada"
                );
            }
        );

    const rechazadas =
        misCitas.filter(
            function (cita) {
                return (
                    obtenerEstadoCita(cita) ===
                    "Rechazada"
                );
            }
        );

    totalPendientes.textContent =
        pendientes.length;

    totalConfirmadas.textContent =
        confirmadas.length;

    totalRechazadas.textContent =
        rechazadas.length;
}

function obtenerClaseEstado(estado) {
    if (
        estado === "Confirmada"
    ) {
        return "estado-cita-confirmada";
    }

    if (
        estado === "Rechazada"
    ) {
        return "estado-cita-rechazada";
    }

    return "estado-cita-pendiente";
}

function obtenerTextoEstado(estado) {
    if (
        estado === "Confirmada"
    ) {
        return "Confirmada";
    }

    if (
        estado === "Rechazada"
    ) {
        return "Rechazada";
    }

    return "Pendiente de Confirmación";
}

function ordenarMisCitas() {
    misCitas.sort(
        function (a, b) {
            const fechaA =
                new Date(
                    a.fecha +
                    "T" +
                    a.hora
                );

            const fechaB =
                new Date(
                    b.fecha +
                    "T" +
                    b.hora
                );

            return (
                fechaB -
                fechaA
            );
        }
    );
}

function mostrarMisCitas() {
    tablaMisCitas.innerHTML =
        "";

    actualizarResumenMisCitas();
    ordenarMisCitas();

    if (misCitas.length === 0) {
        tablaMisCitas.innerHTML = `
            <tr>
                <td
                    colspan="7"
                    class="sin-citas-cliente"
                >
                    Todavía no tienes citas registradas.

                    <br>

                    Puedes solicitar una desde
                    "Solicitar Cita".
                </td>
            </tr>
        `;

        return;
    }

    misCitas.forEach(
        function (cita) {
            const fila =
                document.createElement(
                    "tr"
                );

            const estado =
                obtenerEstadoCita(
                    cita
                );

            const claseEstado =
                obtenerClaseEstado(
                    estado
                );

            const textoEstado =
                obtenerTextoEstado(
                    estado
                );

            fila.innerHTML = `
                <td>
                    ${cita.codigo || "-"}
                </td>

                <td>
                    ${cita.mascota || "-"}
                </td>

                <td>
                    ${cita.servicio || "-"}
                </td>

                <td>
                    ${cita.fecha || "-"}
                </td>

                <td>
                    ${cita.hora || "-"}
                </td>

                <td>
                    ${cita.veterinario || "Sin asignar"}
                </td>

                <td>
                    <span class="${claseEstado}">
                        ${textoEstado}
                    </span>
                </td>
            `;

            tablaMisCitas.appendChild(
                fila
            );
        }
    );
}

mostrarMisCitas();