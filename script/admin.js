document.addEventListener("DOMContentLoaded", function () {
    const tipoUsuario = localStorage.getItem("tipoUsuario");

    if (tipoUsuario !== "admin") {
        window.location.href = "inicio_sesion.html";
        return;
    }

    function obtenerLista(nombre) {
        try {
            const datos = JSON.parse(localStorage.getItem(nombre));
            return Array.isArray(datos) ? datos : [];
        } catch (error) {
            console.error(
                `Error al leer ${nombre}:`,
                error
            );

            return [];
        }
    }

    const citas = obtenerLista("citas");
    const usuarios = obtenerLista("usuarios");
    const productos = obtenerLista("productos");

    const totalCitas = document.getElementById("totalCitas");
    const totalUsuarios = document.getElementById("totalUsuarios");
    const totalProductos = document.getElementById("totalProductos");

    if (totalCitas) {
        totalCitas.textContent = citas.length;
    }

    if (totalUsuarios) {
        totalUsuarios.textContent = usuarios.length;
    }

    if (totalProductos) {
        totalProductos.textContent = productos.length;
    }

    const tablaCitas = document.getElementById("tablaCitas");

    function obtenerFechaCita(cita) {
        if (!cita.fecha) {
            return 0;
        }

        const hora = cita.hora || "00:00";

        const fechaHora = new Date(
            `${cita.fecha}T${hora}`
        );

        if (isNaN(fechaHora.getTime())) {
            return 0;
        }

        return fechaHora.getTime();
    }

    function obtenerEstado(cita) {
        const estado =
            cita.estado ||
            cita.status ||
            "Pendiente";

        return String(estado);
    }

    function claseEstado(estado) {
        const estadoNormalizado =
            estado.toLowerCase();

        if (
            estadoNormalizado.includes("confirm")
        ) {
            return "estado-confirmada";
        }

        if (
            estadoNormalizado.includes("rechaz")
        ) {
            return "estado-rechazada";
        }

        return "estado-pendiente";
    }

    function mostrarUltimasCitas() {
        if (!tablaCitas) {
            return;
        }

        tablaCitas.innerHTML = "";

        if (citas.length === 0) {
            tablaCitas.innerHTML = `
                <tr>
                    <td
                        colspan="6"
                        class="dashboard-vacio"
                    >
                        No hay citas registradas.
                    </td>
                </tr>
            `;

            return;
        }

        const citasOrdenadas = [...citas];

        citasOrdenadas.sort(function (a, b) {
            return (
                obtenerFechaCita(b) -
                obtenerFechaCita(a)
            );
        });

        const ultimasCitas =
            citasOrdenadas.slice(0, 5);

        ultimasCitas.forEach(function (cita) {
            const fila =
                document.createElement("tr");

            const codigo =
                cita.codigo ||
                cita.id ||
                "-";

            const cliente =
                cita.nombreTutor ||
                cita.tutor ||
                cita.nombre ||
                cita.cliente ||
                "-";

            const mascota =
                cita.nombreMascota ||
                cita.mascota ||
                "-";

            const fecha =
                cita.fecha ||
                "-";

            const hora =
                cita.hora ||
                "-";

            const estado =
                obtenerEstado(cita);

            fila.innerHTML = `
                <td>
                    ${codigo}
                </td>

                <td>
                    ${cliente}
                </td>

                <td>
                    ${mascota}
                </td>

                <td>
                    ${fecha}
                </td>

                <td>
                    ${hora}
                </td>

                <td>
                    <span
                        class="
                            estado-cita
                            ${claseEstado(estado)}
                        "
                    >
                        ${estado}
                    </span>
                </td>
            `;

            tablaCitas.appendChild(fila);
        });
    }

    mostrarUltimasCitas();

    const cerrarSesion =
        document.getElementById("cerrarSesion");

    if (cerrarSesion) {
        cerrarSesion.addEventListener(
            "click",
            function () {
                const confirmar = confirm(
                    "¿Deseas cerrar sesión?"
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
});