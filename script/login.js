const formLogin =
    document.getElementById("formLogin");

formLogin.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const correo =
            document
                .getElementById("correo")
                .value
                .trim()
                .toLowerCase();

        const contrasena =
            document
                .getElementById("contrasena")
                .value;

        const adminCorreo =
            "admin@sanmarcos.cl";

        const adminContrasena =
            "admin123";

        if (
            correo === "" ||
            contrasena === ""
        ) {
            alert(
                "Debes completar el correo y la contraseña."
            );

            return;
        }

        if (
            correo === adminCorreo &&
            contrasena === adminContrasena
        ) {
            localStorage.setItem(
                "tipoUsuario",
                "admin"
            );

            localStorage.removeItem(
                "usuarioActual"
            );

            window.location.href =
                "admin_dashboard.html";

            return;
        }

        const correoPermitido =
            /^[A-Za-z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

        if (
            !correoPermitido.test(
                correo
            )
        ) {
            alert(
                "El correo debe pertenecer a @duoc.cl, @profesor.duoc.cl o @gmail.com."
            );

            return;
        }

        if (
            contrasena.length < 4 ||
            contrasena.length > 10
        ) {
            alert(
                "La contraseña debe tener entre 4 y 10 caracteres."
            );

            return;
        }

        let usuarios = [];

        try {
            usuarios =
                JSON.parse(
                    localStorage.getItem(
                        "usuarios"
                    )
                ) || [];
        } catch (error) {
            usuarios = [];
        }

        const usuarioEncontrado =
            usuarios.find(
                function (usuario) {
                    return (
                        String(
                            usuario.correo || ""
                        )
                            .trim()
                            .toLowerCase()
                        === correo
                        &&
                        String(
                            usuario.contrasena || ""
                        )
                        === contrasena
                    );
                }
            );

        if (!usuarioEncontrado) {
            alert(
                "Correo o contraseña incorrectos."
            );

            return;
        }

        if (
            usuarioEncontrado.activo === false
        ) {
            alert(
                "Tu cuenta se encuentra desactivada. Contacta al administrador."
            );

            return;
        }

        if (
            !usuarioEncontrado.tipo
        ) {
            usuarioEncontrado.tipo =
                "cliente";
        }

        const runUsuario =
            usuarioEncontrado.run ||
            usuarioEncontrado.rut ||
            "";

        if (runUsuario) {
            usuarioEncontrado.run =
                runUsuario;

            usuarioEncontrado.rut =
                runUsuario;
        }

        localStorage.setItem(
            "tipoUsuario",
            usuarioEncontrado.tipo
        );

        localStorage.setItem(
            "usuarioActual",
            JSON.stringify(
                usuarioEncontrado
            )
        );

        const nombreUsuario =
            usuarioEncontrado.nombre ||
            "Usuario";

        alert(
            "Bienvenido/a " +
            nombreUsuario
        );

        if (
            usuarioEncontrado.tipo ===
            "admin"
        ) {
            window.location.href =
                "admin_dashboard.html";
        } else {
            window.location.href =
                "index.html";
        }
    }
);