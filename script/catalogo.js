const productosGrid =
    document.querySelector(
        ".productos-grid"
    );

const productosAdmin =
    JSON.parse(
        localStorage.getItem(
            "productos"
        )
    ) || [];

function formatearPrecioCatalogo(
    precio
) {
    return new Intl.NumberFormat(
        "es-CL",
        {
            style:
                "currency",

            currency:
                "CLP",

            minimumFractionDigits:
                0
        }
    ).format(
        precio
    );
}

if (productosGrid) {
    const productosTienda =
        productosAdmin.filter(
            function (item) {
                return (
                    item.tipo ===
                        "producto" &&
                    item.activo !==
                        false
                );
            }
        );

    productosTienda.forEach(
        function (producto) {
            const contenedor =
                document.createElement(
                    "div"
                );

            contenedor.className =
                "producto producto-administrativo";

            const imagenProducto =
                producto.imagen ||
                "assets/img/af0b5c1a02edd66e8cf9aa0a86a5b760.gif";

            const tieneStock =
                Number(
                    producto.stockActual
                ) > 0;

            contenedor.innerHTML = `
                <div class="card producto-card">
                    <img
                        src="${imagenProducto}"
                        class="card-img-top"
                        alt="${producto.nombre}"
                    >

                    <div class="card-body">
                        <span class="badge bg-primary mb-2">
                            ${producto.categoria}
                        </span>

                        <h5 class="card-title">
                            ${producto.nombre}
                        </h5>

                        <p class="card-text">
                            ${
                                producto.descripcion ||
                                "Producto disponible en Veterinaria San Marcos."
                            }
                        </p>

                        <p class="precio">
                            <span class="corazon">
                                ♥
                            </span>

                            ${formatearPrecioCatalogo(
                                producto.precio
                            )}
                        </p>

                        ${
                            tieneStock
                                ? `
                                    <button
                                        class="btn btn-primary btn-agregar"
                                        type="button"
                                        data-id="${producto.codigo}"
                                        data-nombre="${producto.nombre}"
                                        data-precio="${producto.precio}"
                                        data-imagen="${imagenProducto}"
                                    >
                                        Agregar al carrito
                                    </button>
                                `
                                : `
                                    <button
                                        class="btn btn-primary"
                                        type="button"
                                        disabled
                                    >
                                        Sin stock
                                    </button>
                                `
                        }
                    </div>
                </div>
            `;

            productosGrid.appendChild(
                contenedor
            );
        }
    );
}