const formRegistro =
    document.getElementById("formRegistro");

const regionSelect =
    document.getElementById("region");

const comunaSelect =
    document.getElementById("comuna");

const inputContrasena =
    document.getElementById("contrasena");

const mensajeContrasena =
    document.getElementById("mensajeContrasena");

const comunasPorRegion = {
    arica: [
        "Arica",
        "Camarones",
        "Putre",
        "General Lagos"
    ],

    tarapaca: [
        "Iquique",
        "Alto Hospicio",
        "Pozo Almonte",
        "Pica"
    ],

    antofagasta: [
        "Antofagasta",
        "Calama",
        "Tocopilla",
        "Mejillones"
    ],

    atacama: [
        "Copiapó",
        "Caldera",
        "Vallenar",
        "Chañaral"
    ],

    coquimbo: [
        "La Serena",
        "Coquimbo",
        "Ovalle",
        "Illapel"
    ],

    valparaiso: [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana",
        "Concón",
        "San Antonio"
    ],

    metropolitana: [
        "Santiago",
        "Providencia",
        "Las Condes",
        "Maipú",
        "Puente Alto",
        "La Florida",
        "Ñuñoa"
    ],

    ohiggins: [
        "Rancagua",
        "Machalí",
        "San Fernando",
        "Rengo",
        "Graneros",
        "Requínoa"
    ],

    maule: [
        "Talca",
        "Curicó",
        "Linares",
        "Cauquenes"
    ],

    nuble: [
        "Chillán",
        "Chillán Viejo",
        "Bulnes",
        "San Carlos"
    ],

    biobio: [
        "Concepción",
        "Talcahuano",
        "Los Ángeles",
        "San Pedro de la Paz",
        "Coronel"
    ],

    araucania: [
        "Temuco",
        "Padre Las Casas",
        "Villarrica",
        "Pucón",
        "Angol"
    ],

    rios: [
        "Valdivia",
        "La Unión",
        "Río Bueno",
        "Panguipulli"
    ],

    lagos: [
        "Puerto Montt",
        "Osorno",
        "Puerto Varas",
        "Castro",
        "Ancud"
    ],

    aysen: [
        "Coyhaique",
        "Aysén",
        "Chile Chico",
        "Cochrane"
    ],

    magallanes: [
        "Punta Arenas",
        "Puerto Natales",
        "Porvenir",
        "Cabo de Hornos"
    ]
};

regionSelect.addEventListener(
    "change",
    function () {
        const regionSeleccionada =
            regionSelect.value;

        comunaSelect.innerHTML = "";

        if (regionSeleccionada === "") {
            comunaSelect.innerHTML =
                '<option value="">Primero selecciona una región</option>';

            comunaSelect.disabled = true;

            return;
        }

        comunaSelect.disabled = false;

        const opcionInicial =
            document.createElement("option");

        opcionInicial.value = "";

        opcionInicial.textContent =
            "Selecciona una comuna";

        comunaSelect.appendChild(
            opcionInicial
        );

        const comunas =
            comunasPorRegion[
                regionSeleccionada
            ];

        comunas.forEach(
            function (comuna) {
                const opcion =
                    document.createElement(
                        "option"
                    );

                opcion.value =
                    comuna;

                opcion.textContent =
                    comuna;

                comunaSelect.appendChild(
                    opcion
                );
            }
        );
    }
);

function validarRun(run) {
    const regexRun = /^\d{7,9}$/;

    return regexRun.test(run);
}

function validarCorreo(correo) {
    const correoPermitido =
        /^[A-Za-z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

    return correoPermitido.test(
        correo
    );
}

function validarContrasena(contrasena) {
    const regexContrasena =
        /^(?=.*[A-Z])(?=.*\d).{5,10}$/;

    return regexContrasena.test(
        contrasena
    );
}

function marcarError(campo) {
    campo.style.borderColor =
        "red";

    campo.style.boxShadow =
        "0 0 0 2px rgba(255, 0, 0, 0.10)";
}

function limpiarError(campo) {
    campo.style.borderColor = "";
    campo.style.boxShadow = "";
}

const camposFormulario =
    document.querySelectorAll(
        "#formRegistro input, #formRegistro select"
    );

camposFormulario.forEach(
    function (campo) {
        campo.addEventListener(
            "input",
            function () {
                limpiarError(
                    campo
                );
            }
        );
    }
);

inputContrasena.addEventListener(
    "input",
    function () {
        const contrasena =
            inputContrasena.value;

        if (contrasena === "") {
            mensajeContrasena.classList.remove(
                "error"
            );

            return;
        }

        if (!validarContrasena(contrasena)) {
            mensajeContrasena.classList.add(
                "error"
            );
        } else {
            mensajeContrasena.classList.remove(
                "error"
            );
        }
    }
);

formRegistro.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const run =
            document
                .getElementById("run")
                .value
                .trim();

        const nombre =
            document
                .getElementById("nombre")
                .value
                .trim();

        const apellidos =
            document
                .getElementById("apellidos")
                .value
                .trim();

        const correo =
            document
                .getElementById("correo")
                .value
                .trim()
                .toLowerCase();

        const telefono =
            document
                .getElementById("telefono")
                .value
                .trim();

        const region =
            regionSelect.value;

        const comuna =
            comunaSelect.value;

        const direccion =
            document
                .getElementById("direccion")
                .value
                .trim();

        const contrasena =
            document
                .getElementById("contrasena")
                .value;

        const confirmarContrasena =
            document
                .getElementById(
                    "confirmar-contrasena"
                )
                .value;

        if (!validarRun(run)) {
            marcarError(
                document.getElementById(
                    "run"
                )
            );

            alert(
                "El RUN ingresado no es válido. Debe contener entre 7 y 9 dígitos, sin puntos ni guión."
            );

            return;
        }

        if (!validarCorreo(correo)) {
            marcarError(
                document.getElementById(
                    "correo"
                )
            );

            alert(
                "El correo debe pertenecer a @duoc.cl, @profesor.duoc.cl o @gmail.com."
            );

            return;
        }

        if (region === "") {
            marcarError(
                regionSelect
            );

            alert(
                "Debes seleccionar una región."
            );

            return;
        }

        if (comuna === "") {
            marcarError(
                comunaSelect
            );

            alert(
                "Debes seleccionar una comuna."
            );

            return;
        }

        if (!validarContrasena(contrasena)) {
            marcarError(
                inputContrasena
            );

            mensajeContrasena.classList.add(
                "error"
            );

            return;
        }

        mensajeContrasena.classList.remove(
            "error"
        );

        if (
            contrasena !==
            confirmarContrasena
        ) {
            marcarError(
                document.getElementById(
                    "confirmar-contrasena"
                )
            );

            alert(
                "Las contraseñas no coinciden."
            );

            return;
        }

        const usuariosGuardados =
            JSON.parse(
                localStorage.getItem(
                    "usuarios"
                )
            ) || [];

        const correoExistente =
            usuariosGuardados.find(
                function (usuario) {
                    return (
                        usuario.correo ===
                        correo
                    );
                }
            );

        if (correoExistente) {
            marcarError(
                document.getElementById(
                    "correo"
                )
            );

            alert(
                "Ya existe una cuenta registrada con ese correo."
            );

            return;
        }

        const runExistente =
            usuariosGuardados.find(
                function (usuario) {
                    return (
                        usuario.run ===
                        run
                    );
                }
            );

        if (runExistente) {
            marcarError(
                document.getElementById(
                    "run"
                )
            );

            alert(
                "Ya existe una cuenta registrada con ese RUN."
            );

            return;
        }

        const nuevoUsuario = {
            run:
                run,

            nombre:
                nombre,

            apellidos:
                apellidos,

            correo:
                correo,

            telefono:
                telefono,

            region:
                region,

            comuna:
                comuna,

            direccion:
                direccion,

            contrasena:
                contrasena,

            tipo:
                "cliente"
        };

        usuariosGuardados.push(
            nuevoUsuario
        );

        localStorage.setItem(
            "usuarios",
            JSON.stringify(
                usuariosGuardados
            )
        );

        alert(
            "Cuenta creada correctamente."
        );

        window.location.href =
            "inicio_sesion.html";
    }
);