(function () {
    const tipoUsuario =
        localStorage.getItem("tipoUsuario");

    if (tipoUsuario !== "admin") {
        alert(
            "Debes iniciar sesión como administrador."
        );

        window.location.href =
            "inicio_sesion.html";

        return;
    }

    let usuarios =
        JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

    let indiceEditando = null;

    const tablaUsuarios =
        document.getElementById(
            "tablaUsuarios"
        );

    const totalUsuarios =
        document.getElementById(
            "totalUsuarios"
        );

    const usuariosActivos =
        document.getElementById(
            "usuariosActivos"
        );

    const usuariosInactivos =
        document.getElementById(
            "usuariosInactivos"
        );

    const buscarUsuario =
        document.getElementById(
            "buscarUsuario"
        );

    const cerrarSesion =
        document.getElementById(
            "cerrarSesion"
        );

    const modalUsuarioFondo =
        document.getElementById(
            "modalUsuarioFondo"
        );

    const formEditarUsuario =
        document.getElementById(
            "formEditarUsuario"
        );

    const cancelarEdicion =
        document.getElementById(
            "cancelarEdicion"
        );

    const editarRun =
        document.getElementById(
            "editarRun"
        );

    const editarNombre =
        document.getElementById(
            "editarNombre"
        );

    const editarApellidos =
        document.getElementById(
            "editarApellidos"
        );

    const editarCorreo =
        document.getElementById(
            "editarCorreo"
        );

    const editarTelefono =
        document.getElementById(
            "editarTelefono"
        );

    const editarRol =
        document.getElementById(
            "editarRol"
        );

    const editarRegion =
        document.getElementById(
            "editarRegion"
        );

    const editarComuna =
        document.getElementById(
            "editarComuna"
        );

    const editarDireccion =
        document.getElementById(
            "editarDireccion"
        );

    usuarios =
        usuarios.map(
            function (usuario) {
                if (
                    typeof usuario.activo ===
                    "undefined"
                ) {
                    usuario.activo = true;
                }

                if (!usuario.tipo) {
                    usuario.tipo =
                        "cliente";
                }

                return usuario;
            }
        );

    guardarUsuarios();

    function guardarUsuarios() {
        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );
    }

    function texto(valor) {
        if (
            valor === null ||
            typeof valor === "undefined" ||
            String(valor).trim() === ""
        ) {
            return "-";
        }

        return String(valor);
    }

    function actualizarResumen() {
        const activos =
            usuarios.filter(
                function (usuario) {
                    return (
                        usuario.activo !== false
                    );
                }
            ).length;

        const inactivos =
            usuarios.filter(
                function (usuario) {
                    return (
                        usuario.activo === false
                    );
                }
            ).length;

        totalUsuarios.textContent =
            usuarios.length;

        usuariosActivos.textContent =
            activos;

        usuariosInactivos.textContent =
            inactivos;
    }

    function renderizarUsuarios(filtro) {
        tablaUsuarios.innerHTML = "";

        const textoFiltro =
            (filtro || "")
                .trim()
                .toLowerCase();

        const usuariosFiltrados =
            usuarios
                .map(
                    function (
                        usuario,
                        indice
                    ) {
                        return {
                            usuario:
                                usuario,

                            indice:
                                indice
                        };
                    }
                )
                .filter(
                    function (item) {
                        if (!textoFiltro) {
                            return true;
                        }

                        const usuario =
                            item.usuario;

                        const contenido = [
                            usuario.run,
                            usuario.nombre,
                            usuario.apellidos,
                            usuario.correo,
                            usuario.telefono,
                            usuario.region,
                            usuario.comuna,
                            usuario.tipo
                        ]
                            .join(" ")
                            .toLowerCase();

                        return contenido.includes(
                            textoFiltro
                        );
                    }
                );

        if (
            usuariosFiltrados.length === 0
        ) {
            tablaUsuarios.innerHTML = `
                <tr>
                    <td
                        colspan="8"
                        class="usuario-vacio"
                    >
                        No se encontraron usuarios.
                    </td>
                </tr>
            `;

            actualizarResumen();

            return;
        }

        usuariosFiltrados.forEach(
            function (item) {
                const usuario =
                    item.usuario;

                const indice =
                    item.indice;

                const fila =
                    document.createElement(
                        "tr"
                    );

                const estadoActivo =
                    usuario.activo !== false;

                const ubicacion = [
                    usuario.comuna,
                    usuario.region
                ]
                    .filter(Boolean)
                    .join(", ") || "-";

                fila.innerHTML = `
                    <td>
                        ${texto(usuario.run)}
                    </td>

                    <td>
                        ${texto(usuario.nombre)}
                        ${texto(
                    usuario.apellidos
                ) === "-"
                        ? ""
                        : texto(
                            usuario.apellidos
                        )
                    }
                    </td>

                    <td>
                        ${texto(usuario.correo)}
                    </td>

                    <td>
                        ${texto(usuario.telefono)}
                    </td>

                    <td>
                        ${ubicacion}
                    </td>

                    <td>
                        ${usuario.tipo ===
                        "admin"
                        ? "Administrador"
                        : "Cliente"
                    }
                    </td>

                    <td>
                        <span
                            class="
                                estado-usuario
                                ${estadoActivo
                        ? "estado-activo"
                        : "estado-inactivo"
                    }
                            "
                        >
                            ${estadoActivo
                        ? "Activo"
                        : "Inactivo"
                    }
                        </span>
                    </td>

                    <td>
                        <div
                            class="acciones-usuario"
                        >
                            <button
                                type="button"
                                class="btn-editar-usuario"
                                data-accion="editar"
                                data-indice="${indice}"
                            >
                                Editar
                            </button>

                            <button
                                type="button"
                                class="btn-estado-usuario"
                                data-accion="estado"
                                data-indice="${indice}"
                            >
                                ${estadoActivo
                        ? "Desactivar"
                        : "Activar"
                    }
                            </button>

                            <button
                                type="button"
                                class="btn-eliminar-usuario"
                                data-accion="eliminar"
                                data-indice="${indice}"
                            >
                                Eliminar
                            </button>
                        </div>
                    </td>
                `;

                tablaUsuarios.appendChild(
                    fila
                );
            }
        );

        actualizarResumen();
    }

    function abrirEdicion(indice) {
        const usuario =
            usuarios[indice];

        if (!usuario) {
            return;
        }

        indiceEditando =
            indice;

        editarRun.value =
            usuario.run || "";

        editarNombre.value =
            usuario.nombre || "";

        editarApellidos.value =
            usuario.apellidos || "";

        editarCorreo.value =
            usuario.correo || "";

        editarTelefono.value =
            usuario.telefono || "";

        editarRol.value =
            usuario.tipo || "cliente";

        editarRegion.value =
            usuario.region || "";

        editarComuna.value =
            usuario.comuna || "";

        editarDireccion.value =
            usuario.direccion || "";

        modalUsuarioFondo
            .classList
            .add("activo");
    }

    function cerrarModal() {
        indiceEditando = null;

        formEditarUsuario.reset();

        modalUsuarioFondo
            .classList
            .remove("activo");
    }

    function correoPermitido(correo) {
        const expresion =
            /^[A-Za-z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

        return expresion.test(
            correo
        );
    }

    formEditarUsuario.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            if (
                indiceEditando === null
            ) {
                return;
            }

            const correoNuevo =
                editarCorreo.value
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
                usuarios.some(
                    function (
                        usuario,
                        indice
                    ) {
                        return (
                            indice !==
                            indiceEditando &&

                            String(
                                usuario.correo || ""
                            )
                                .toLowerCase() ===
                            correoNuevo
                        );
                    }
                );

            if (correoDuplicado) {
                alert(
                    "Ya existe otro usuario con ese correo."
                );

                return;
            }

            const usuario =
                usuarios[
                indiceEditando
                ];

            usuario.nombre =
                editarNombre.value
                    .trim();

            usuario.apellidos =
                editarApellidos.value
                    .trim();

            usuario.correo =
                correoNuevo;

            usuario.telefono =
                editarTelefono.value
                    .trim();

            usuario.tipo =
                editarRol.value;

            usuario.region =
                editarRegion.value
                    .trim();

            usuario.comuna =
                editarComuna.value
                    .trim();

            usuario.direccion =
                editarDireccion.value
                    .trim();

            guardarUsuarios();

            renderizarUsuarios(
                buscarUsuario.value
            );

            cerrarModal();

            alert(
                "Usuario actualizado correctamente."
            );
        }
    );

    tablaUsuarios.addEventListener(
        "click",
        function (event) {
            const boton =
                event.target.closest(
                    "button[data-accion]"
                );

            if (!boton) {
                return;
            }

            const accion =
                boton.dataset.accion;

            const indice =
                Number(
                    boton.dataset.indice
                );

            const usuario =
                usuarios[indice];

            if (!usuario) {
                return;
            }

            if (
                accion === "editar"
            ) {
                abrirEdicion(
                    indice
                );

                return;
            }

            if (
                accion === "estado"
            ) {
                usuario.activo =
                    usuario.activo === false;

                guardarUsuarios();

                renderizarUsuarios(
                    buscarUsuario.value
                );

                return;
            }

            if (
                accion === "eliminar"
            ) {
                const confirmar =
                    confirm(
                        "¿Seguro que quieres eliminar a " +
                        (
                            usuario.nombre ||
                            "este usuario"
                        ) +
                        "?"
                    );

                if (!confirmar) {
                    return;
                }

                usuarios.splice(
                    indice,
                    1
                );

                guardarUsuarios();

                renderizarUsuarios(
                    buscarUsuario.value
                );
            }
        }
    );

    buscarUsuario.addEventListener(
        "input",
        function () {
            renderizarUsuarios(
                buscarUsuario.value
            );
        }
    );

    cancelarEdicion.addEventListener(
        "click",
        cerrarModal
    );

    modalUsuarioFondo.addEventListener(
        "click",
        function (event) {
            if (
                event.target ===
                modalUsuarioFondo
            ) {
                cerrarModal();
            }
        }
    );

    cerrarSesion.addEventListener(
        "click",
        function () {
            const confirmar =
                confirm(
                    "¿Quieres cerrar la sesión de administrador?"
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
                "index.html";
        }
    );

    renderizarUsuarios();
})();