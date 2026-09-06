// Genera las filas de la tabla de productos en el panel admin
function mostrarTablaProductos() {
    const tbody = document.querySelector("#tablaProductos tbody");
    if (!tbody) return;

    productos.forEach((producto) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>${producto.categoria}</td>
            <td>${formatearPrecio(producto.precio)}</td>
            <td>150</td>
            <td><a href="editar-producto.html?id=${producto.id}">Editar</a></td>
        `;

        tbody.appendChild(fila);
    });
}

mostrarTablaProductos();