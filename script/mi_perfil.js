(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const tipoUsuarioPerfil =
            localStorage.getItem("tipoUsuario");

        let usuarioActualPerfil = null;

        try {
            usuarioActualPerfil =
                JSON.parse(
                    localStorage.getItem("usuarioActual")
                );
        } catch (error) {
            usuarioActualPerfil = null;
        }

        if (
            tipoUsuarioPerfil !== "cliente" ||
            !usuarioActualPerfil
        ) {
            alert(
                "Debes iniciar sesión para acceder a tu perfil."
            );

            window.location.href =
                "inicio_sesion.html";

            return;
        }

        const formMiPerfil =
            document.getElementById("formMiPerfil");

        const perfilRun =
            document.getElementById("perfilRun");

        const perfilNombre =
            document.getElementById("perfilNombre");

        const perfilApellidos =
            document.getElementById("perfilApellidos");

        const perfilCorreo =
            document.getElementById("perfilCorreo");

        const perfilTelefono =
            document.getElementById("perfilTelefono");

        const perfilRegion =
            document.getElementById("perfilRegion");

        const perfilComuna =
            document.getElementById("perfilComuna");

        const perfilDireccion =
            document.getElementById("perfilDireccion");

        const cancelarPerfil =
            document.getElementById("cancelarPerfil");

        if (
            !formMiPerfil ||
            !perfilRun ||
            !perfilNombre ||
            !perfilApellidos ||
            !perfilCorreo ||
            !perfilTelefono ||
            !perfilRegion ||
            !perfilComuna ||
            !perfilDireccion
        ) {
            console.error(
                "No se encontraron los campos de Mi Perfil."
            );

            return;
        }

        let usuariosPerfil = [];

        try {
            usuariosPerfil =
                JSON.parse(
                    localStorage.getItem("usuarios")
                ) || [];
        } catch (error) {
            usuariosPerfil = [];
        }

        function obtenerRun(usuario) {
            if (!usuario) {
                return "";
            }

            return (
                usuario.run ||
                usuario.rut ||
                ""
            );
        }

        let indiceUsuarioPerfil =
            usuariosPerfil.findIndex(
                function (usuario) {
                    return (
                        String(
                            usuario.correo || ""
                        )
                            .trim()
                            .toLowerCase() ===
                        String(
                            usuarioActualPerfil.correo || ""
                        )
                            .trim()
                            .toLowerCase()
                    );
                }
            );

        if (indiceUsuarioPerfil === -1) {
            const runActual =
                obtenerRun(
                    usuarioActualPerfil
                );

            if (runActual) {
                indiceUsuarioPerfil =
                    usuariosPerfil.findIndex(
                        function (usuario) {
                            const runGuardado =
                                obtenerRun(usuario);

                            return (
                                limpiarRun(runGuardado) ===
                                limpiarRun(runActual)
                            );
                        }
                    );
            }
        }

        function limpiarRun(run) {
            return String(run || "")
                .replace(/\./g, "")
                .replace(/-/g, "")
                .trim()
                .toLowerCase();
        }

        function obtenerDatosUsuario() {
            if (
                indiceUsuarioPerfil !== -1 &&
                usuariosPerfil[indiceUsuarioPerfil]
            ) {
                return usuariosPerfil[
                    indiceUsuarioPerfil
                ];
            }

            return usuarioActualPerfil;
        }

        function cargarFormulario() {
            const usuario =
                obtenerDatosUsuario();

            perfilRun.value =
                usuario.run ||
                usuario.rut ||
                "";

            perfilNombre.value =
                usuario.nombre ||
                usuario.nombres ||
                "";

            perfilApellidos.value =
                usuario.apellidos ||
                usuario.apellido ||
                "";

            perfilCorreo.value =
                usuario.correo ||
                usuario.email ||
                "";

            perfilTelefono.value =
                usuario.telefono ||
                usuario.fono ||
                "";

            perfilRegion.value =
                usuario.region ||
                "";

            perfilComuna.value =
                usuario.comuna ||
                "";

            perfilDireccion.value =
                usuario.direccion ||
                usuario.domicilio ||
                "";
        }

        cargarFormulario();

        function correoPermitido(correo) {
            const expresion =
                /^[A-Za-z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

            return expresion.test(
                correo
            );
        }

        formMiPerfil.addEventListener(
            "submit",
            function (event) {
                event.preventDefault();

                const correoNuevo =
                    perfilCorreo.value
                        .trim()
                        .toLowerCase();

                if (
                    !correoPermitido(
                        correoNuevo
                    )
                ) {
                    alert(
                        "El correo debe pertenecer a @duoc.cl, @profesor.duoc.cl o @gmail.com."
                    );

                    return;
                }

                const correoDuplicado =
                    usuariosPerfil.some(
                        function (
                            usuario,
                            indice
                        ) {
                            return (
                                indice !== indiceUsuarioPerfil &&
                                String(
                                    usuario.correo || ""
                                )
                                    .trim()
                                    .toLowerCase() ===
                                correoNuevo
                            );
                        }
                    );

                if (correoDuplicado) {
                    alert(
                        "Ya existe otra cuenta con ese correo."
                    );

                    return;
                }

                const runActual =
                    perfilRun.value.trim();

                const datosActualizados = {
                    ...usuarioActualPerfil,

                    nombre:
                        perfilNombre.value.trim(),

                    apellidos:
                        perfilApellidos.value.trim(),

                    correo:
                        correoNuevo,

                    telefono:
                        perfilTelefono.value.trim(),

                    region:
                        perfilRegion.value.trim(),

                    comuna:
                        perfilComuna.value.trim(),

                    direccion:
                        perfilDireccion.value.trim()
                };

                if (runActual) {
                    datosActualizados.run =
                        runActual;

                    datosActualizados.rut =
                        runActual;
                }

                if (
                    indiceUsuarioPerfil !== -1
                ) {
                    usuariosPerfil[
                        indiceUsuarioPerfil
                    ] = {
                        ...usuariosPerfil[
                            indiceUsuarioPerfil
                        ],

                        ...datosActualizados
                    };
                } else {
                    usuariosPerfil.push(
                        datosActualizados
                    );

                    indiceUsuarioPerfil =
                        usuariosPerfil.length - 1;
                }

                localStorage.setItem(
                    "usuarios",
                    JSON.stringify(
                        usuariosPerfil
                    )
                );

                usuarioActualPerfil = {
                    ...datosActualizados
                };

                localStorage.setItem(
                    "usuarioActual",
                    JSON.stringify(
                        usuarioActualPerfil
                    )
                );

                alert(
                    "Perfil actualizado correctamente."
                );

                window.location.reload();
            }
        );

        cancelarPerfil.addEventListener(
            "click",
            function () {
                cargarFormulario();
            }
        );
    });
})();