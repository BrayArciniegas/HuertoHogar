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


// Elimina un producto del arreglo
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

    const indice = productos.findIndex((p) => p.id === id);

    if (indice !== -1) {
        productos.splice(indice, 1);
        mostrarTablaProductos();
    }
}


mostrarTablaProductos();