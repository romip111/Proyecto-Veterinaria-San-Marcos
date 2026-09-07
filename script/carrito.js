const botonCarrito =
    document.getElementById("botonCarrito");

const cerrarCarrito =
    document.getElementById("cerrarCarrito");

const carritoPanel =
    document.getElementById("carritoPanel");

const fondoCarrito =
    document.getElementById("fondoCarrito");

const carritoContenido =
    document.getElementById("carritoContenido");

const carritoTotal =
    document.getElementById("carritoTotal");

const contadorCarrito =
    document.getElementById("contadorCarrito");

const vaciarCarrito =
    document.getElementById("vaciarCarrito");

const finalizarCompra =
    document.getElementById("finalizarCompra");

let carrito =
    JSON.parse(
        localStorage.getItem(
            "carritoVeterinaria"
        )
    ) || [];

function formatoPrecio(precio) {
    return new Intl.NumberFormat(
        "es-CL",
        {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0
        }
    ).format(precio);
}

function obtenerProductosAdmin() {
    return JSON.parse(
        localStorage.getItem(
            "productos"
        )
    ) || [];
}

function obtenerProductoAdmin(id) {
    const productosAdmin =
        obtenerProductosAdmin();

    return productosAdmin.find(
        function (producto) {
            return (
                String(producto.codigo) ===
                String(id)
            );
        }
    );
}

function guardarCarrito() {
    localStorage.setItem(
        "carritoVeterinaria",
        JSON.stringify(carrito)
    );
}

function abrirCarrito() {
    if (
        !carritoPanel ||
        !fondoCarrito
    ) {
        return;
    }

    carritoPanel.classList.add(
        "abierto"
    );

    fondoCarrito.classList.add(
        "activo"
    );

    document.body.style.overflow =
        "hidden";
}

function cerrarPanelCarrito() {
    if (carritoPanel) {
        carritoPanel.classList.remove(
            "abierto"
        );
    }

    if (fondoCarrito) {
        fondoCarrito.classList.remove(
            "activo"
        );
    }

    document.body.style.overflow = "";
}

function agregarAlCarrito(producto) {
    const productoAdmin =
        obtenerProductoAdmin(
            producto.id
        );

    const existente =
        carrito.find(
            function (item) {
                return (
                    String(item.id) ===
                    String(producto.id)
                );
            }
        );

    if (productoAdmin) {
        if (
            productoAdmin.activo === false
        ) {
            alert(
                "Este producto ya no se encuentra disponible."
            );

            return false;
        }

        const stockDisponible =
            Number(
                productoAdmin.stockActual
            );

        const cantidadActual =
            existente
                ? existente.cantidad
                : 0;

        if (stockDisponible <= 0) {
            alert(
                "Este producto se encuentra sin stock."
            );

            return false;
        }

        if (
            cantidadActual >=
            stockDisponible
        ) {
            alert(
                "No puedes agregar más unidades. Solo quedan " +
                stockDisponible +
                " unidades disponibles."
            );

            return false;
        }
    }

    if (existente) {
        existente.cantidad++;

        if (
            existente.controlStock ===
            undefined
        ) {
            existente.controlStock =
                Boolean(productoAdmin);
        }
    } else {
        carrito.push({
            id:
                producto.id,

            nombre:
                producto.nombre,

            precio:
                producto.precio,

            imagen:
                producto.imagen,

            cantidad:
                1,

            controlStock:
                Boolean(productoAdmin)
        });
    }

    guardarCarrito();
    actualizarCarrito();

    return true;
}

function mostrarProductoAgregado(
    boton
) {
    if (!boton) {
        return;
    }

    const textoOriginal =
        boton.textContent;

    boton.classList.add(
        "agregado"
    );

    boton.textContent =
        "✓ Agregado";

    setTimeout(
        function () {
            boton.classList.remove(
                "agregado"
            );

            boton.textContent =
                textoOriginal;
        },
        1000
    );
}

function aumentarCantidad(id) {
    const producto =
        carrito.find(
            function (item) {
                return (
                    String(item.id) ===
                    String(id)
                );
            }
        );

    if (!producto) {
        return;
    }

    const productoAdmin =
        obtenerProductoAdmin(id);

    const controlaStock =
        producto.controlStock === true ||
        Boolean(productoAdmin);

    if (controlaStock) {
        if (!productoAdmin) {
            alert(
                "Este producto ya no se encuentra disponible."
            );

            return;
        }

        if (
            productoAdmin.activo === false
        ) {
            alert(
                "Este producto ya no se encuentra disponible."
            );

            return;
        }

        const stockDisponible =
            Number(
                productoAdmin.stockActual
            );

        if (
            producto.cantidad >=
            stockDisponible
        ) {
            alert(
                "Has alcanzado el stock disponible. Solo quedan " +
                stockDisponible +
                " unidades."
            );

            return;
        }

        producto.controlStock = true;
    }

    producto.cantidad++;

    guardarCarrito();
    actualizarCarrito();
}

function disminuirCantidad(id) {
    const producto =
        carrito.find(
            function (item) {
                return (
                    String(item.id) ===
                    String(id)
                );
            }
        );

    if (!producto) {
        return;
    }

    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        carrito =
            carrito.filter(
                function (item) {
                    return (
                        String(item.id) !==
                        String(id)
                    );
                }
            );
    }

    guardarCarrito();
    actualizarCarrito();
}

function eliminarProducto(id) {
    carrito =
        carrito.filter(
            function (item) {
                return (
                    String(item.id) !==
                    String(id)
                );
            }
        );

    guardarCarrito();
    actualizarCarrito();
}

function vaciarTodoElCarrito() {
    if (carrito.length === 0) {
        return;
    }

    const confirmar =
        confirm(
            "¿Estás seguro de que deseas vaciar el carrito?"
        );

    if (!confirmar) {
        return;
    }

    carrito = [];

    guardarCarrito();
    actualizarCarrito();
}

function actualizarCarrito() {
    if (
        !carritoContenido ||
        !carritoTotal ||
        !contadorCarrito
    ) {
        return;
    }

    carritoContenido.innerHTML = "";

    if (carrito.length === 0) {
        carritoContenido.innerHTML = `
            <div class="carrito-vacio">
                <span class="icono-vacio">
                    🛒
                </span>

                <p>
                    Tu carrito está vacío.
                </p>

                <p>
                    Agrega productos para comenzar tu compra.
                </p>
            </div>
        `;

        carritoTotal.textContent =
            "$0";

        contadorCarrito.textContent =
            "0";

        return;
    }

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(
        function (producto) {
            total +=
                Number(producto.precio) *
                producto.cantidad;

            cantidadTotal +=
                producto.cantidad;

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "item-carrito";

            const imagen =
                document.createElement(
                    "img"
                );

            imagen.className =
                "item-carrito-imagen";

            imagen.src =
                producto.imagen ||
                "assets/img/af0b5c1a02edd66e8cf9aa0a86a5b760.gif";

            imagen.alt =
                producto.nombre;

            const informacion =
                document.createElement(
                    "div"
                );

            informacion.className =
                "item-carrito-info";

            const nombre =
                document.createElement(
                    "div"
                );

            nombre.className =
                "item-carrito-nombre";

            nombre.textContent =
                producto.nombre;

            const precio =
                document.createElement(
                    "div"
                );

            precio.className =
                "item-carrito-precio";

            precio.textContent =
                formatoPrecio(
                    producto.precio
                );

            informacion.appendChild(
                nombre
            );

            informacion.appendChild(
                precio
            );

            const productoAdmin =
                obtenerProductoAdmin(
                    producto.id
                );

            if (productoAdmin) {
                producto.controlStock =
                    true;

                const stockInfo =
                    document.createElement(
                        "small"
                    );

                stockInfo.textContent =
                    "Stock disponible: " +
                    productoAdmin.stockActual;

                stockInfo.style.display =
                    "block";

                stockInfo.style.marginBottom =
                    "6px";

                stockInfo.style.color =
                    "#777";

                informacion.appendChild(
                    stockInfo
                );
            }

            const controles =
                document.createElement(
                    "div"
                );

            controles.className =
                "controles-cantidad";

            const botonMenos =
                document.createElement(
                    "button"
                );

            botonMenos.type =
                "button";

            botonMenos.className =
                "btn-cantidad";

            botonMenos.textContent =
                "−";

            botonMenos.addEventListener(
                "click",
                function () {
                    disminuirCantidad(
                        producto.id
                    );
                }
            );

            const cantidad =
                document.createElement(
                    "span"
                );

            cantidad.className =
                "cantidad";

            cantidad.textContent =
                producto.cantidad;

            const botonMas =
                document.createElement(
                    "button"
                );

            botonMas.type =
                "button";

            botonMas.className =
                "btn-cantidad";

            botonMas.textContent =
                "+";

            if (
                productoAdmin &&
                producto.cantidad >=
                Number(
                    productoAdmin.stockActual
                )
            ) {
                botonMas.disabled = true;

                botonMas.title =
                    "Stock máximo alcanzado";
            }

            botonMas.addEventListener(
                "click",
                function () {
                    aumentarCantidad(
                        producto.id
                    );
                }
            );

            const botonEliminar =
                document.createElement(
                    "button"
                );

            botonEliminar.type =
                "button";

            botonEliminar.className =
                "btn-eliminar";

            botonEliminar.textContent =
                "🗑";

            botonEliminar.title =
                "Eliminar producto";

            botonEliminar.addEventListener(
                "click",
                function () {
                    eliminarProducto(
                        producto.id
                    );
                }
            );

            controles.appendChild(
                botonMenos
            );

            controles.appendChild(
                cantidad
            );

            controles.appendChild(
                botonMas
            );

            controles.appendChild(
                botonEliminar
            );

            item.appendChild(
                imagen
            );

            item.appendChild(
                informacion
            );

            item.appendChild(
                controles
            );

            carritoContenido.appendChild(
                item
            );
        }
    );

    guardarCarrito();

    carritoTotal.textContent =
        formatoPrecio(total);

    contadorCarrito.textContent =
        cantidadTotal;
}

function validarStockCompra() {
    for (
        let i = 0;
        i < carrito.length;
        i++
    ) {
        const item =
            carrito[i];

        const productoAdmin =
            obtenerProductoAdmin(
                item.id
            );

        const controlaStock =
            item.controlStock === true ||
            Boolean(productoAdmin);

        if (!controlaStock) {
            continue;
        }

        if (!productoAdmin) {
            alert(
                "El producto \"" +
                item.nombre +
                "\" ya no se encuentra disponible."
            );

            return false;
        }

        if (
            productoAdmin.activo === false
        ) {
            alert(
                "El producto \"" +
                item.nombre +
                "\" ya no se encuentra disponible."
            );

            return false;
        }

        const stockDisponible =
            Number(
                productoAdmin.stockActual
            );

        if (
            stockDisponible <= 0
        ) {
            alert(
                "El producto \"" +
                item.nombre +
                "\" se encuentra sin stock."
            );

            return false;
        }

        if (
            item.cantidad >
            stockDisponible
        ) {
            alert(
                "No hay suficiente stock de \"" +
                item.nombre +
                "\".\n\n" +
                "Solicitado: " +
                item.cantidad +
                "\n" +
                "Disponible: " +
                stockDisponible
            );

            return false;
        }
    }

    return true;
}

function descontarStock() {
    const productosAdmin =
        obtenerProductosAdmin();

    carrito.forEach(
        function (itemCarrito) {
            const indice =
                productosAdmin.findIndex(
                    function (producto) {
                        return (
                            String(
                                producto.codigo
                            ) ===
                            String(
                                itemCarrito.id
                            )
                        );
                    }
                );

            if (indice === -1) {
                return;
            }

            if (
                productosAdmin[indice]
                    .tipo !== "producto"
            ) {
                return;
            }

            productosAdmin[indice]
                .stockActual =
                Math.max(
                    0,
                    Number(
                        productosAdmin[indice]
                            .stockActual
                    ) -
                    Number(
                        itemCarrito.cantidad
                    )
                );
        }
    );

    localStorage.setItem(
        "productos",
        JSON.stringify(
            productosAdmin
        )
    );
}

function finalizarPedido() {
    if (carrito.length === 0) {
        alert(
            "Tu carrito está vacío. Agrega productos antes de finalizar la compra."
        );

        return;
    }

    if (!validarStockCompra()) {
        actualizarCarrito();

        return;
    }

    let total = 0;

    let mensaje =
        "Resumen de compra:\n\n";

    carrito.forEach(
        function (producto) {
            const subtotal =
                Number(
                    producto.precio
                ) *
                producto.cantidad;

            total += subtotal;

            mensaje +=
                producto.nombre +
                " x" +
                producto.cantidad +
                " - " +
                formatoPrecio(
                    subtotal
                ) +
                "\n";
        }
    );

    mensaje +=
        "\nTOTAL: " +
        formatoPrecio(total);

    mensaje +=
        "\n\n¿Deseas confirmar la compra?";

    const confirmar =
        confirm(mensaje);

    if (!confirmar) {
        return;
    }

    descontarStock();

    carrito = [];

    guardarCarrito();
    actualizarCarrito();
    cerrarPanelCarrito();

    alert(
        "Compra realizada correctamente."
    );

    if (
        document.querySelector(
            ".productos-grid"
        )
    ) {
        window.location.reload();
    }
}

if (botonCarrito) {
    botonCarrito.addEventListener(
        "click",
        abrirCarrito
    );
}

if (cerrarCarrito) {
    cerrarCarrito.addEventListener(
        "click",
        cerrarPanelCarrito
    );
}

if (fondoCarrito) {
    fondoCarrito.addEventListener(
        "click",
        cerrarPanelCarrito
    );
}

if (vaciarCarrito) {
    vaciarCarrito.addEventListener(
        "click",
        vaciarTodoElCarrito
    );
}

if (finalizarCompra) {
    finalizarCompra.addEventListener(
        "click",
        finalizarPedido
    );
}

const botonesAgregar =
    document.querySelectorAll(
        ".btn-agregar"
    );

botonesAgregar.forEach(
    function (boton) {
        boton.addEventListener(
            "click",
            function () {
                const producto = {
                    id:
                        boton.dataset.id,

                    nombre:
                        boton.dataset.nombre,

                    precio:
                        Number(
                            boton.dataset.precio
                        ),

                    imagen:
                        boton.dataset.imagen
                };

                const agregado =
                    agregarAlCarrito(
                        producto
                    );

                if (agregado) {
                    mostrarProductoAgregado(
                        boton
                    );
                }
            }
        );
    }
);

actualizarCarrito();