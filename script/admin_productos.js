const tipoUsuario = localStorage.getItem("tipoUsuario");

if (tipoUsuario !== "admin") {
    alert("Debes iniciar sesión como administrador.");
    window.location.href = "inicio_sesion.html";
}

let productos =
    JSON.parse(localStorage.getItem("productos")) || [];

let codigoEditando = null;

const formProducto =
    document.getElementById("formProducto");

const codigoInput =
    document.getElementById("codigo");

const tipoInput =
    document.getElementById("tipo");

const nombreInput =
    document.getElementById("nombre");

const categoriaInput =
    document.getElementById("categoria");

const imagenInput =
    document.getElementById("imagen");

const precioInput =
    document.getElementById("precio");

const stockActualInput =
    document.getElementById("stockActual");

const stockCriticoInput =
    document.getElementById("stockCritico");

const descripcionInput =
    document.getElementById("descripcion");

const tablaProductos =
    document.getElementById("tablaProductos");

const tituloFormulario =
    document.getElementById("tituloFormulario");

const btnGuardar =
    document.getElementById("btnGuardar");

const btnCancelar =
    document.getElementById("btnCancelar");

const campoStockActual =
    document.getElementById("campoStockActual");

const campoStockCritico =
    document.getElementById("campoStockCritico");

const alertaStock =
    document.getElementById("alertaStock");

const totalItems =
    document.getElementById("totalItems");

const totalProductos =
    document.getElementById("totalProductos");

const totalServicios =
    document.getElementById("totalServicios");

const totalCriticos =
    document.getElementById("totalCriticos");

function guardarProductos() {
    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0
        }
    ).format(precio);
}

function actualizarCamposStock() {
    const tipo = tipoInput.value;

    if (tipo === "servicio") {
        campoStockActual.style.display =
            "none";

        campoStockCritico.style.display =
            "none";

        stockActualInput.value = 0;
        stockCriticoInput.value = 0;
    } else {
        campoStockActual.style.display =
            "flex";

        campoStockCritico.style.display =
            "flex";
    }
}

function actualizarResumen() {
    totalItems.textContent =
        productos.length;

    const listaProductos =
        productos.filter(
            function (item) {
                return (
                    item.tipo === "producto"
                );
            }
        );

    const listaServicios =
        productos.filter(
            function (item) {
                return (
                    item.tipo === "servicio"
                );
            }
        );

    const productosCriticos =
        productos.filter(
            function (item) {
                return (
                    item.tipo === "producto" &&
                    Number(item.stockActual) <=
                    Number(item.stockCritico)
                );
            }
        );

    totalProductos.textContent =
        listaProductos.length;

    totalServicios.textContent =
        listaServicios.length;

    totalCriticos.textContent =
        productosCriticos.length;

    if (productosCriticos.length > 0) {
        alertaStock.style.display =
            "block";
    } else {
        alertaStock.style.display =
            "none";
    }
}

function mostrarProductos() {
    tablaProductos.innerHTML = "";

    actualizarResumen();

    if (productos.length === 0) {
        tablaProductos.innerHTML = `
            <tr>
                <td colspan="9">
                    No hay productos o servicios registrados.
                </td>
            </tr>
        `;

        return;
    }

    productos.forEach(
        function (item) {
            const fila =
                document.createElement("tr");

            let stockActual = "-";
            let stockCritico = "-";
            let estadoTexto = "Disponible";
            let claseEstado = "stock-normal";

            if (item.tipo === "producto") {
                stockActual =
                    item.stockActual;

                stockCritico =
                    item.stockCritico;

                if (
                    Number(item.stockActual) <=
                    Number(item.stockCritico)
                ) {
                    estadoTexto =
                        "Stock crítico";

                    claseEstado =
                        "stock-critico";

                    fila.classList.add(
                        "fila-stock-critico"
                    );
                } else {
                    estadoTexto =
                        "Stock normal";
                }
            }

            if (item.tipo === "servicio") {
                estadoTexto =
                    "Servicio";

                claseEstado =
                    "estado-servicio";
            }

            fila.innerHTML = `
                <td>
                    ${item.codigo}
                </td>

                <td>
                    ${item.tipo === "producto"
                    ? "Producto"
                    : "Servicio"
                }
                </td>

                <td>
                    ${item.nombre}
                </td>

                <td>
                    ${item.categoria}
                </td>

                <td>
                    ${formatearPrecio(item.precio)}
                </td>

                <td>
                    ${stockActual}
                </td>

                <td>
                    ${stockCritico}
                </td>

                <td>
                    <span class="${claseEstado}">
                        ${estadoTexto}
                    </span>
                </td>

                <td class="acciones-producto">
                    <button
                        class="btn-editar-producto"
                        onclick="editarProducto('${item.codigo}')"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-eliminar-producto"
                        onclick="eliminarProducto('${item.codigo}')"
                    >
                        Eliminar
                    </button>
                </td>
            `;

            tablaProductos.appendChild(
                fila
            );
        }
    );
}

function validarFormulario() {
    const codigo =
        codigoInput.value
            .trim()
            .toUpperCase();

    const tipo =
        tipoInput.value;

    const nombre =
        nombreInput.value.trim();

    const categoria =
        categoriaInput.value.trim();

    const precio =
        Number(precioInput.value);

    const stockActual =
        Number(stockActualInput.value);

    const stockCritico =
        Number(stockCriticoInput.value);

    if (codigo.length < 3) {
        alert(
            "El código debe tener al menos 3 caracteres."
        );

        codigoInput.focus();

        return false;
    }

    if (tipo === "") {
        alert(
            "Debes seleccionar si es producto o servicio."
        );

        tipoInput.focus();

        return false;
    }

    if (nombre === "") {
        alert(
            "Debes ingresar un nombre."
        );

        nombreInput.focus();

        return false;
    }

    if (categoria === "") {
        alert(
            "Debes ingresar una categoría."
        );

        categoriaInput.focus();

        return false;
    }

    if (
        precio < 0 ||
        isNaN(precio)
    ) {
        alert(
            "El precio debe ser mayor o igual a 0."
        );

        precioInput.focus();

        return false;
    }

    if (tipo === "producto") {
        if (
            stockActual < 0 ||
            isNaN(stockActual)
        ) {
            alert(
                "El stock actual debe ser mayor o igual a 0."
            );

            stockActualInput.focus();

            return false;
        }

        if (
            stockCritico < 0 ||
            isNaN(stockCritico)
        ) {
            alert(
                "El stock crítico debe ser mayor o igual a 0."
            );

            stockCriticoInput.focus();

            return false;
        }
    }

    const codigoExiste =
        productos.some(
            function (item) {
                return (
                    item.codigo === codigo &&
                    item.codigo !== codigoEditando
                );
            }
        );

    if (codigoExiste) {
        alert(
            "Ya existe un producto o servicio con ese código."
        );

        codigoInput.focus();

        return false;
    }

    return true;
}

formProducto.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const nuevoItem = {
            codigo:
                codigoInput.value
                    .trim()
                    .toUpperCase(),

            tipo:
                tipoInput.value,

            nombre:
                nombreInput.value
                    .trim(),

            categoria:
                categoriaInput.value
                    .trim(),

            imagen:
                imagenInput.value
                    .trim(),

            precio:
                Number(
                    precioInput.value
                ),

            stockActual:
                tipoInput.value === "producto"
                    ? Number(
                        stockActualInput.value
                    )
                    : 0,

            stockCritico:
                tipoInput.value === "producto"
                    ? Number(
                        stockCriticoInput.value
                    )
                    : 0,

            descripcion:
                descripcionInput.value
                    .trim(),

            activo:
                true
        };

        if (codigoEditando === null) {
            productos.push(
                nuevoItem
            );

            alert(
                "Producto o servicio agregado correctamente."
            );
        } else {
            const indice =
                productos.findIndex(
                    function (item) {
                        return (
                            item.codigo ===
                            codigoEditando
                        );
                    }
                );

            if (indice !== -1) {
                productos[indice] =
                    nuevoItem;
            }

            alert(
                "Producto o servicio actualizado correctamente."
            );
        }

        guardarProductos();
        limpiarFormulario();
        mostrarProductos();
    }
);

function editarProducto(codigo) {
    const item =
        productos.find(
            function (producto) {
                return (
                    producto.codigo ===
                    codigo
                );
            }
        );

    if (!item) {
        return;
    }

    codigoEditando =
        item.codigo;

    codigoInput.value =
        item.codigo;

    tipoInput.value =
        item.tipo;

    nombreInput.value =
        item.nombre;

    categoriaInput.value =
        item.categoria;

    imagenInput.value =
        item.imagen || "";

    precioInput.value =
        item.precio;

    stockActualInput.value =
        item.stockActual;

    stockCriticoInput.value =
        item.stockCritico;

    descripcionInput.value =
        item.descripcion || "";

    actualizarCamposStock();

    tituloFormulario.textContent =
        "Editar producto o servicio";

    btnGuardar.textContent =
        "Guardar cambios";

    btnCancelar.style.display =
        "inline-block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function eliminarProducto(codigo) {
    const item =
        productos.find(
            function (producto) {
                return (
                    producto.codigo ===
                    codigo
                );
            }
        );

    if (!item) {
        return;
    }

    const confirmar =
        confirm(
            "¿Deseas eliminar \"" +
            item.nombre +
            "\"?"
        );

    if (!confirmar) {
        return;
    }

    productos =
        productos.filter(
            function (producto) {
                return (
                    producto.codigo !==
                    codigo
                );
            }
        );

    guardarProductos();
    mostrarProductos();

    alert(
        "Producto o servicio eliminado correctamente."
    );
}

function limpiarFormulario() {
    formProducto.reset();

    codigoEditando = null;

    stockActualInput.value = 0;
    stockCriticoInput.value = 0;

    tituloFormulario.textContent =
        "Agregar producto o servicio";

    btnGuardar.textContent =
        "Guardar";

    btnCancelar.style.display =
        "none";

    actualizarCamposStock();
}

btnCancelar.addEventListener(
    "click",
    function () {
        limpiarFormulario();
    }
);

tipoInput.addEventListener(
    "change",
    function () {
        actualizarCamposStock();
    }
);

const cerrarSesion =
    document.getElementById(
        "cerrarSesion"
    );

cerrarSesion.addEventListener(
    "click",
    function (event) {
        event.preventDefault();

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
);

btnCancelar.style.display =
    "none";

actualizarCamposStock();

mostrarProductos();