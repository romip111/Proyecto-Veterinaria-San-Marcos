(function () {
    const productosIniciales = [
        {
            codigo: "SM001",
            tipo: "producto",
            nombre:
                "Milpro 2.5 mg - Antiparasitario para Perros y Gatos",
            categoria:
                "Medicamentos y Suplementos",
            imagen:
                "assets/img/milpro-2.png",
            precio:
                15000,
            stockActual:
                10,
            stockCritico:
                3,
            descripcion:
                "Milpro es un medicamento antiparasitario que ayuda a eliminar y prevenir infestaciones de parásitos internos en perros y gatos. Contiene praziquantel y milbemicina oxima, que actúan contra una amplia gama de parásitos intestinales.",
            activo:
                true
        },
        {
            codigo: "SM002",
            tipo: "producto",
            nombre:
                "FLT 150 ML SHAMPOO MEDICADO PERROS Y GATOS",
            categoria:
                "Higiene y Cuidado",
            imagen:
                "assets/img/pixelcut-export-57612.png",
            precio:
                12000,
            stockActual:
                15,
            stockCritico:
                5,
            descripcion:
                "FLT es un shampoo medicado diseñado para perros y gatos, formulado para tratar afecciones de la piel como dermatitis, alergias y problemas de caspa. Contiene ingredientes activos que ayudan a aliviar la irritación y mantener la piel saludable.",
            activo:
                true
        },
        {
            codigo: "SM003",
            tipo: "producto",
            nombre:
                "Alimento para conejos Puki 1 kg",
            categoria:
                "Alimentos",
            imagen:
                "assets/img/Alimento-para-conejos-Puki-1-kg.jpg",
            precio:
                8000,
            stockActual:
                20,
            stockCritico:
                5,
            descripcion:
                "Puki es un alimento balanceado para conejos, formulado con ingredientes de alta calidad que proporcionan los nutrientes esenciales para mantener la salud y vitalidad de tu mascota. Contiene fibras, vitaminas y minerales necesarios para su desarrollo.",
            activo:
                true
        }
    ];

    let productos =
        JSON.parse(
            localStorage.getItem(
                "productos"
            )
        ) || [];

    let huboCambios = false;

    productosIniciales.forEach(
        function (productoInicial) {
            const existe =
                productos.some(
                    function (producto) {
                        return (
                            String(
                                producto.codigo
                            ) ===
                            String(
                                productoInicial.codigo
                            )
                        );
                    }
                );

            if (!existe) {
                productos.push(
                    productoInicial
                );

                huboCambios = true;
            }
        }
    );

    if (
        huboCambios ||
        !localStorage.getItem(
            "productos"
        )
    ) {
        localStorage.setItem(
            "productos",
            JSON.stringify(
                productos
            )
        );
    }
})();