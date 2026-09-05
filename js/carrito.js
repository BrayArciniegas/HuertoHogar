// Formatea números a pesos chilenos (reutilizamos la misma lógica de productos.js)
function formatearPrecioCarrito(numero) {
    return "$" + numero.toLocaleString("es-CL");
}

// Dibuja todos los productos guardados en localStorage dentro de #listaCarrito
function mostrarCarrito() {
    const contenedor = document.querySelector("#listaCarrito");
    if (!contenedor) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        actualizarTotal();
        return;
    }

    contenedor.innerHTML = "";

    carrito.forEach((item) => {
        const fila = document.createElement("div");
        fila.classList.add("item-carrito");

        fila.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="item-info">
                <h3>${item.nombre}</h3>
                <p>${formatearPrecioCarrito(item.precio)} / ${item.unidad}</p>
            </div>
            <div class="item-cantidad">
                <button onclick="cambiarCantidad('${item.id}', -1)">−</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad('${item.id}', 1)">+</button>
            </div>
            <p class="item-subtotal">${formatearPrecioCarrito(item.precio * item.cantidad)}</p>
            <button class="btn-eliminar" onclick="eliminarDelCarrito('${item.id}')">🗑️</button>
        `;

        contenedor.appendChild(fila);
    });

    actualizarTotal();
}

// Suma o resta 1 a la cantidad de un producto (elimina si llega a 0)
function cambiarCantidad(id, cambio) {
    const carrito = obtenerCarrito();
    const item = carrito.find((p) => p.id === id);
    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }

    guardarCarrito(carrito);
    mostrarCarrito();
}

// Elimina un producto completo del carrito
function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter((p) => p.id !== id);
    guardarCarrito(carrito);
    mostrarCarrito();
}

// Calcula y muestra el total general del carrito
function actualizarTotal() {
    const carrito = obtenerCarrito();
    const total = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);
    document.querySelector("#totalCarrito").textContent = formatearPrecioCarrito(total);
}

// Vacía todo el carrito
function inicializarBotonVaciar() {
    const boton = document.querySelector("#btnVaciarCarrito");
    if (!boton) return;

    boton.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        mostrarCarrito();
    });
}

mostrarCarrito();
inicializarBotonVaciar();