const formCita = document.getElementById("formCita");

const tipoUsuario =
    localStorage.getItem("tipoUsuario");

const usuarioActual =
    JSON.parse(
        localStorage.getItem("usuarioActual")
    );

if (
    tipoUsuario !== "cliente" ||
    !usuarioActual
) {
    alert(
        "Debes iniciar sesión como cliente para solicitar una cita."
    );

    window.location.href =
        "inicio_sesion.html";
}

if (usuarioActual) {
    const nombreCompleto =
        (
            (usuarioActual.nombre || "") +
            " " +
            (usuarioActual.apellidos || "")
        ).trim();

    document.getElementById(
        "nombreTutor"
    ).value = nombreCompleto;

    document.getElementById(
        "correo"
    ).value =
        usuarioActual.correo || "";

    document.getElementById(
        "telefono"
    ).value =
        usuarioActual.telefono || "";

    document.getElementById(
        "rut"
    ).value =
        usuarioActual.run || "";
}

const fechaCita =
    document.getElementById("fechaCita");

const hoy = new Date();

const anio =
    hoy.getFullYear();

const mes =
    String(
        hoy.getMonth() + 1
    ).padStart(2, "0");

const dia =
    String(
        hoy.getDate()
    ).padStart(2, "0");

const fechaMinima =
    anio + "-" + mes + "-" + dia;

fechaCita.min =
    fechaMinima;

function generarCodigoCita(citas) {
    let numeroMayor = 0;

    citas.forEach(function (cita) {
        if (cita.codigo) {
            const numero =
                parseInt(
                    cita.codigo.replace(
                        "CITA-",
                        ""
                    )
                );

            if (
                !isNaN(numero) &&
                numero > numeroMayor
            ) {
                numeroMayor = numero;
            }
        }
    });

    const nuevoNumero =
        numeroMayor + 1;

    return (
        "CITA-" +
        String(
            nuevoNumero
        ).padStart(3, "0")
    );
}

function obtenerTextoSelect(id) {
    const select =
        document.getElementById(id);

    return select.options[
        select.selectedIndex
    ].text;
}

formCita.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const nombreTutor =
            document
                .getElementById(
                    "nombreTutor"
                )
                .value
                .trim();

        const rut =
            document
                .getElementById(
                    "rut"
                )
                .value
                .trim();

        const telefono =
            document
                .getElementById(
                    "telefono"
                )
                .value
                .trim();

        const correo =
            document
                .getElementById(
                    "correo"
                )
                .value
                .trim()
                .toLowerCase();

        const nombreMascota =
            document
                .getElementById(
                    "nombreMascota"
                )
                .value
                .trim();

        const especie =
            obtenerTextoSelect(
                "especie"
            );

        const raza =
            document
                .getElementById(
                    "raza"
                )
                .value
                .trim();

        const fechaNacimiento =
            document
                .getElementById(
                    "fechaNacimiento"
                )
                .value;

        const sexo =
            obtenerTextoSelect(
                "sexo"
            );

        const esterilizadoSelect =
            document.getElementById(
                "esterilizado"
            );

        let esterilizado =
            "No informado";

        if (
            esterilizadoSelect.value !== ""
        ) {
            esterilizado =
                obtenerTextoSelect(
                    "esterilizado"
                );
        }

        const motivo =
            obtenerTextoSelect(
                "motivo"
            );

        const descripcion =
            document
                .getElementById(
                    "descripcion"
                )
                .value
                .trim();

        const veterinarioSelect =
            document.getElementById(
                "veterinario"
            );

        let veterinario =
            "Sin preferencia";

        if (
            veterinarioSelect.value !== ""
        ) {
            veterinario =
                obtenerTextoSelect(
                    "veterinario"
                );
        }

        const fecha =
            document
                .getElementById(
                    "fechaCita"
                )
                .value;

        const hora =
            document
                .getElementById(
                    "horaCita"
                )
                .value;

        if (
            fecha <
            fechaMinima
        ) {
            alert(
                "No puedes seleccionar una fecha anterior a hoy."
            );

            return;
        }

        const citas =
            JSON.parse(
                localStorage.getItem(
                    "citas"
                )
            ) || [];

        const horarioOcupado =
            citas.find(
                function (cita) {
                    return (
                        cita.fecha === fecha &&
                        cita.hora === hora
                    );
                }
            );

        if (horarioOcupado) {
            alert(
                "Ese horario ya tiene una cita registrada. Selecciona otra hora."
            );

            return;
        }

        const codigo =
            generarCodigoCita(citas);

        const nuevaCita = {
            codigo:
                codigo,

            usuarioCorreo:
                usuarioActual.correo,

            cliente:
                nombreTutor,

            rut:
                rut,

            telefono:
                telefono,

            correo:
                correo,

            mascota:
                nombreMascota,

            especie:
                especie,

            raza:
                raza,

            fechaNacimiento:
                fechaNacimiento,

            sexo:
                sexo,

            esterilizado:
                esterilizado,

            servicio:
                motivo,

            descripcion:
                descripcion,

            veterinario:
                veterinario,

            fecha:
                fecha,

            hora:
                hora,

            estado:
                "Pendiente de Confirmación"
        };

        citas.push(
            nuevaCita
        );

        localStorage.setItem(
            "citas",
            JSON.stringify(
                citas
            )
        );

        alert(
            "Cita solicitada correctamente.\n\n" +
            "Código: " +
            nuevaCita.codigo +
            "\n" +
            "Tutor: " +
            nuevaCita.cliente +
            "\n" +
            "Mascota: " +
            nuevaCita.mascota +
            "\n" +
            "Servicio: " +
            nuevaCita.servicio +
            "\n" +
            "Fecha: " +
            nuevaCita.fecha +
            "\n" +
            "Hora: " +
            nuevaCita.hora +
            "\n" +
            "Estado: " +
            nuevaCita.estado
        );

        formCita.reset();

        const nombreCompleto =
            (
                (usuarioActual.nombre || "") +
                " " +
                (usuarioActual.apellidos || "")
            ).trim();

        document.getElementById(
            "nombreTutor"
        ).value =
            nombreCompleto;

        document.getElementById(
            "correo"
        ).value =
            usuarioActual.correo || "";

        document.getElementById(
            "telefono"
        ).value =
            usuarioActual.telefono || "";

        document.getElementById(
            "rut"
        ).value =
            usuarioActual.run || "";
    }
);