// Genera las filas de la tabla de productos en el panel admin
function mostrarTablaProductos() {
    const tbody = document.querySelector("#tablaProductos tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    productos.forEach((producto) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${formatearPrecio(producto.precio)}</td>
            <td>${producto.stock}</td>
            <td>
                <a href="editar-producto.html?id=${producto.id}">
                    Editar
                </a>

                <button type="button" onclick="eliminarProducto('${producto.id}')">
                    Eliminar
                </button>
            </td>
        `;

        tbody.appendChild(fila);
    });
}


// Elimina un producto del arreglo y lo persiste en localStorage
function eliminarProducto(id) {

    const producto = productos.find((p) => p.id === id);

    if (!producto) {
        return;
    }

    const confirmar = confirm(
        `¿Seguro que deseas eliminar el producto "${producto.nombre}"?`
    );

    if (!confirmar) {
        return;
    }

    const listaActualizada = productos.filter((p) => p.id !== id);

    guardarProductos(listaActualizada);
    mostrarTablaProductos();
}


/* ---------- NUEVO / EDITAR PRODUCTO ---------- */

// El select de categoría del formulario usa valores en minúscula;
// el catálogo guarda el nombre de categoría legible (ej. "Productos Orgánicos").
const CATEGORIAS_PRODUCTO = {
    frutas: "Frutas",
    verduras: "Verduras",
    organicos: "Productos Orgánicos",
    lacteos: "Lácteos"
};

function obtenerClaveCategoria(textoCategoria) {
    return Object.keys(CATEGORIAS_PRODUCTO).find(
        (clave) => CATEGORIAS_PRODUCTO[clave] === textoCategoria
    );
}

function inicializarFormularioProducto() {
    const form = document.querySelector("#formProducto");
    if (!form) return;

    const mensajeProducto = document.querySelector("#mensajeProducto");
    const campoCodigo = document.querySelector("#codigo");
    const campoNombre = document.querySelector("#nombre");
    const campoDescripcion = document.querySelector("#descripcion");
    const campoPrecio = document.querySelector("#precio");
    const campoStock = document.querySelector("#stock");
    const campoStockCritico = document.querySelector("#stockCritico");
    const campoUnidad = document.querySelector("#unidad");
    const campoCategoria = document.querySelector("#categoria");
    const campoImagen = document.querySelector("#imagen");

    const idEdicion = obtenerIdDesdeURL();
    const productoExistente = idEdicion
        ? productos.find((p) => p.id === idEdicion)
        : null;
    const esEdicion = Boolean(productoExistente);

    // Precarga los datos del producto cuando estamos editando
    if (esEdicion) {
        campoCodigo.value = productoExistente.id;
        campoCodigo.disabled = true; // el código no se edita, es la llave del producto

        campoNombre.value = productoExistente.nombre;
        campoDescripcion.value = productoExistente.descripcion || "";
        campoPrecio.value = productoExistente.precio;
        campoStock.value = productoExistente.stock;
        campoStockCritico.value = productoExistente.stockCritico ?? "";
        campoUnidad.value = productoExistente.unidad || "";
        campoCategoria.value = obtenerClaveCategoria(productoExistente.categoria) || "";

        const imagenActualTexto = document.querySelector("#imagenActualTexto");
        if (imagenActualTexto) {
            imagenActualTexto.textContent = productoExistente.imagen
                ? `Imagen actual: ${productoExistente.imagen.startsWith("data:") ? "imagen subida" : productoExistente.imagen}`
                : "Este producto no tiene imagen.";
        }
    } else if (idEdicion) {
        // Llegaron con un ?id= que ya no existe (fue eliminado, por ejemplo)
        if (mensajeProducto) {
            mensajeProducto.style.color = "#c0392b";
            mensajeProducto.textContent = "El producto que intentas editar no existe.";
        }
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const codigo = campoCodigo.value.trim();
        const nombre = campoNombre.value.trim();
        const descripcion = campoDescripcion.value.trim();
        const precio = campoPrecio.value;
        const stock = campoStock.value;
        const stockCritico = campoStockCritico.value;
        const unidad = campoUnidad.value;
        const categoria = campoCategoria.value;

        if (mensajeProducto) {
            mensajeProducto.style.color = "#c0392b";
            mensajeProducto.textContent = "";
        }

        /* ---------- VALIDACIONES ---------- */

        if (codigo.length < 3) {
            if (mensajeProducto) mensajeProducto.textContent = "El código debe tener al menos 3 caracteres.";
            return;
        }

        if (!esEdicion && productos.some((p) => p.id.toUpperCase() === codigo.toUpperCase())) {
            if (mensajeProducto) mensajeProducto.textContent = "Ya existe un producto con ese código.";
            return;
        }

        if (nombre === "" || nombre.length > 100) {
            if (mensajeProducto) mensajeProducto.textContent = "El nombre es obligatorio y debe tener máximo 100 caracteres.";
            return;
        }

        if (descripcion.length > 500) {
            if (mensajeProducto) mensajeProducto.textContent = "La descripción no puede superar los 500 caracteres.";
            return;
        }

        if (precio === "" || Number(precio) < 0) {
            if (mensajeProducto) mensajeProducto.textContent = "El precio es obligatorio y no puede ser negativo.";
            return;
        }

        if (stock === "" || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
            if (mensajeProducto) mensajeProducto.textContent = "El stock es obligatorio, debe ser un entero mayor o igual a 0.";
            return;
        }

        if (stockCritico !== "" && (!Number.isInteger(Number(stockCritico)) || Number(stockCritico) < 0)) {
            if (mensajeProducto) mensajeProducto.textContent = "El stock crítico debe ser un entero mayor o igual a 0.";
            return;
        }

        if (unidad === "") {
            if (mensajeProducto) mensajeProducto.textContent = "Debes seleccionar una unidad de venta.";
            return;
        }

        if (categoria === "") {
            if (mensajeProducto) mensajeProducto.textContent = "Debes seleccionar una categoría.";
            return;
        }

        const archivoImagen = campoImagen.files && campoImagen.files[0];

        const guardarProducto = function (nombreImagen) {
            const productoGuardado = {
                id: esEdicion ? productoExistente.id : codigo,
                nombre: nombre,
                precio: Number(precio),
                stock: Number(stock),
                stockCritico: stockCritico === "" ? null : Number(stockCritico),
                unidad: unidad,
                categoria: CATEGORIAS_PRODUCTO[categoria],
                imagen: nombreImagen,
                descripcion: descripcion
            };

            let listaActualizada;

            if (esEdicion) {
                listaActualizada = productos.map((p) =>
                    p.id === productoExistente.id ? productoGuardado : p
                );
            } else {
                listaActualizada = [...productos, productoGuardado];
            }

            guardarProductos(listaActualizada);

            if (mensajeProducto) {
                mensajeProducto.style.color = "#2E8B57";
                mensajeProducto.textContent = esEdicion
                    ? "¡Producto actualizado correctamente! 🌱"
                    : "¡Producto guardado correctamente! 🌱";
            }

            if (esEdicion) {
                setTimeout(function () {
                    window.location.href = "productos.html";
                }, 900);
            } else {
                form.reset();
                mostrarTablaProductos();
            }
        };

        // Si el admin eligió una imagen nueva, se guarda como data URL
        // (no hay backend/servidor de archivos en esta etapa del proyecto).
        if (archivoImagen) {
            const lector = new FileReader();
            lector.onload = function () {
                guardarProducto(lector.result);
            };
            lector.readAsDataURL(archivoImagen);
        } else {
            const imagenActual = esEdicion ? productoExistente.imagen : "placeholder.svg";
            guardarProducto(imagenActual);
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarTablaProductos();
    inicializarFormularioProducto();
});
