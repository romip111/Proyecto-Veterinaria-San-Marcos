(function () {
    const enlaceSesion =
        document.querySelector(".iniciar-sesion");

    const enlaceSesionMovil =
        document.querySelector(".iniciar-sesion-movil");

    const menuMisCitas =
        document.getElementById("menuMisCitas");

    const menuMiPerfil =
        document.getElementById("menuMiPerfil");

    const tipoUsuarioSesion =
        localStorage.getItem("tipoUsuario");

    let usuarioActualSesion = null;

    try {
        usuarioActualSesion =
            JSON.parse(
                localStorage.getItem("usuarioActual")
            );
    } catch (error) {
        usuarioActualSesion = null;
    }

    if (menuMisCitas) {
        if (
            tipoUsuarioSesion === "cliente" &&
            usuarioActualSesion
        ) {
            menuMisCitas.style.display =
                "list-item";
        } else {
            menuMisCitas.style.display =
                "none";
        }
    }

    if (menuMiPerfil) {
        if (
            tipoUsuarioSesion === "cliente" &&
            usuarioActualSesion
        ) {
            menuMiPerfil.style.display =
                "list-item";
        } else {
            menuMiPerfil.style.display =
                "none";
        }
    }

    if (
        tipoUsuarioSesion === "cliente" &&
        usuarioActualSesion
    ) {
        let primerNombre = "Usuario";

        if (usuarioActualSesion.nombre) {
            primerNombre =
                usuarioActualSesion.nombre
                    .trim()
                    .split(" ")[0];
        }

        if (enlaceSesion) {
            enlaceSesion.textContent =
                "👤 Hola, " + primerNombre;

            enlaceSesion.href = "#";

            enlaceSesion.classList.add(
                "usuario-logueado"
            );

            enlaceSesion.addEventListener(
                "click",
                cerrarSesion
            );
        }

        if (enlaceSesionMovil) {
            enlaceSesionMovil.textContent =
                "👤 Hola, " + primerNombre;

            enlaceSesionMovil.href = "#";

            enlaceSesionMovil.addEventListener(
                "click",
                cerrarSesion
            );
        }
    } else {
        if (enlaceSesion) {
            enlaceSesion.textContent =
                "👤 Iniciar sesión";

            enlaceSesion.href =
                "inicio_sesion.html";

            enlaceSesion.classList.remove(
                "usuario-logueado"
            );
        }

        if (enlaceSesionMovil) {
            enlaceSesionMovil.textContent =
                "👤 Iniciar sesión";

            enlaceSesionMovil.href =
                "inicio_sesion.html";
        }
    }

    function cerrarSesion(event) {
        event.preventDefault();

        const confirmar =
            confirm(
                "¿Quieres cerrar sesión?"
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

        alert(
            "Sesión cerrada correctamente."
        );

        window.location.href =
            "index.html";
    }
})();