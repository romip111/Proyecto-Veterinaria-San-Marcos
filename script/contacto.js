(function () {
    document.addEventListener(
        "DOMContentLoaded",
        function () {
            const formContacto =
                document.getElementById(
                    "formContacto"
                );

            const nombre =
                document.getElementById(
                    "nombre"
                );

            const correo =
                document.getElementById(
                    "correo"
                );

            const telefono =
                document.getElementById(
                    "telefono"
                );

            const asunto =
                document.getElementById(
                    "asunto"
                );

            const mensaje =
                document.getElementById(
                    "mensaje"
                );

            if (!formContacto) {
                return;
            }

            let usuarioActual = null;

            try {
                usuarioActual =
                    JSON.parse(
                        localStorage.getItem(
                            "usuarioActual"
                        )
                    );
            } catch (error) {
                usuarioActual = null;
            }

            if (usuarioActual) {
                if (usuarioActual.nombre) {
                    const nombreCompleto = [
                        usuarioActual.nombre,
                        usuarioActual.apellidos
                    ]
                        .filter(Boolean)
                        .join(" ");

                    nombre.value =
                        nombreCompleto;
                }

                if (usuarioActual.correo) {
                    correo.value =
                        usuarioActual.correo;
                }

                if (usuarioActual.telefono) {
                    telefono.value =
                        usuarioActual.telefono;
                }
            }

            function marcarError(campo) {
                campo.style.borderColor =
                    "#e74c3c";

                campo.style.boxShadow =
                    "0 0 0 2px rgba(231, 76, 60, 0.10)";
            }

            function limpiarError(campo) {
                campo.style.borderColor = "";
                campo.style.boxShadow = "";
            }

            const campos = [
                nombre,
                correo,
                telefono,
                asunto,
                mensaje
            ];

            campos.forEach(
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

            function validarCorreo(
                correoIngresado
            ) {
                const expresion =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                return expresion.test(
                    correoIngresado
                );
            }

            function validarTelefono(
                telefonoIngresado
            ) {
                if (
                    telefonoIngresado === ""
                ) {
                    return true;
                }

                const telefonoLimpio =
                    telefonoIngresado
                        .replace(/\s/g, "")
                        .replace(/-/g, "");

                const expresion =
                    /^(\+?56)?9\d{8}$/;

                return expresion.test(
                    telefonoLimpio
                );
            }

            formContacto.addEventListener(
                "submit",
                function (event) {
                    event.preventDefault();

                    const nombreValor =
                        nombre.value.trim();

                    const correoValor =
                        correo.value
                            .trim()
                            .toLowerCase();

                    const telefonoValor =
                        telefono.value.trim();

                    const asuntoValor =
                        asunto.value.trim();

                    const mensajeValor =
                        mensaje.value.trim();

                    if (
                        nombreValor === ""
                    ) {
                        marcarError(
                            nombre
                        );

                        alert(
                            "Debes ingresar tu nombre."
                        );

                        nombre.focus();

                        return;
                    }

                    if (
                        nombreValor.length < 2
                    ) {
                        marcarError(
                            nombre
                        );

                        alert(
                            "El nombre debe contener al menos 2 caracteres."
                        );

                        nombre.focus();

                        return;
                    }

                    if (
                        correoValor === ""
                    ) {
                        marcarError(
                            correo
                        );

                        alert(
                            "Debes ingresar tu correo electrónico."
                        );

                        correo.focus();

                        return;
                    }

                    if (
                        !validarCorreo(
                            correoValor
                        )
                    ) {
                        marcarError(
                            correo
                        );

                        alert(
                            "Debes ingresar un correo electrónico válido."
                        );

                        correo.focus();

                        return;
                    }

                    if (
                        !validarTelefono(
                            telefonoValor
                        )
                    ) {
                        marcarError(
                            telefono
                        );

                        alert(
                            "El teléfono ingresado no es válido. Ejemplo: +56 9 1234 5678."
                        );

                        telefono.focus();

                        return;
                    }

                    if (
                        asuntoValor === ""
                    ) {
                        marcarError(
                            asunto
                        );

                        alert(
                            "Debes ingresar un asunto."
                        );

                        asunto.focus();

                        return;
                    }

                    if (
                        asuntoValor.length < 3
                    ) {
                        marcarError(
                            asunto
                        );

                        alert(
                            "El asunto debe contener al menos 3 caracteres."
                        );

                        asunto.focus();

                        return;
                    }

                    if (
                        mensajeValor === ""
                    ) {
                        marcarError(
                            mensaje
                        );

                        alert(
                            "Debes escribir un mensaje."
                        );

                        mensaje.focus();

                        return;
                    }

                    if (
                        mensajeValor.length < 10
                    ) {
                        marcarError(
                            mensaje
                        );

                        alert(
                            "El mensaje debe contener al menos 10 caracteres."
                        );

                        mensaje.focus();

                        return;
                    }

                    let mensajesContacto = [];

                    try {
                        mensajesContacto =
                            JSON.parse(
                                localStorage.getItem(
                                    "mensajesContacto"
                                )
                            ) || [];
                    } catch (error) {
                        mensajesContacto = [];
                    }

                    const nuevoMensaje = {
                        id:
                            Date.now(),

                        nombre:
                            nombreValor,

                        correo:
                            correoValor,

                        telefono:
                            telefonoValor,

                        asunto:
                            asuntoValor,

                        mensaje:
                            mensajeValor,

                        fecha:
                            new Date()
                                .toLocaleString(
                                    "es-CL"
                                )
                    };

                    mensajesContacto.push(
                        nuevoMensaje
                    );

                    localStorage.setItem(
                        "mensajesContacto",
                        JSON.stringify(
                            mensajesContacto
                        )
                    );

                    alert(
                        "Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto."
                    );

                    formContacto.reset();

                    if (usuarioActual) {
                        if (usuarioActual.nombre) {
                            nombre.value = [
                                usuarioActual.nombre,
                                usuarioActual.apellidos
                            ]
                                .filter(Boolean)
                                .join(" ");
                        }

                        if (usuarioActual.correo) {
                            correo.value =
                                usuarioActual.correo;
                        }

                        if (usuarioActual.telefono) {
                            telefono.value =
                                usuarioActual.telefono;
                        }
                    }
                }
            );
        }
    );
})();