// Arreglo de productos de HuertoHogar (datos según ficha de productos)
const productos = [
    { id: "FR001", nombre: "Manzanas Fuji", precio: 1200, unidad: "kilo", imagen: "../img/manzanas.jpg", categoria: "Frutas Frescas", descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres." },
    { id: "FR002", nombre: "Naranjas Valencia", precio: 1000, unidad: "kilo", imagen: "../img/naranjas.jpg", categoria: "Frutas Frescas", descripcion: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes." },
    { id: "FR003", nombre: "Plátanos Cavendish", precio: 800, unidad: "kilo", imagen: "../img/platanos.jpg", categoria: "Frutas Frescas", descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Ricos en potasio y vitaminas." },
    { id: "VR001", nombre: "Zanahorias Orgánicas", precio: 900, unidad: "kilo", imagen: "../img/zanahorias.jpg", categoria: "Verduras Orgánicas", descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra." },
    { id: "VR002", nombre: "Espinacas Frescas", precio: 700, unidad: "bolsa 500g", imagen: "../img/espinacas.jpg", categoria: "Verduras Orgánicas", descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas." },
    { id: "VR003", nombre: "Pimientos Tricolores", precio: 1500, unidad: "kilo", imagen: "../img/pimientos.jpg", categoria: "Verduras Orgánicas", descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes." },
    { id: "PO001", nombre: "Miel Orgánica", precio: 5000, unidad: "frasco 500g", imagen: "../img/miel.jpg", categoria: "Productos Orgánicos", descripcion: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable." },
    { id: "PO003", nombre: "Quinua Orgánica", precio: 3200, unidad: "bolsa 500g", imagen: "../img/quinua.jpg", categoria: "Productos Orgánicos", descripcion: "Quinua orgánica de alto valor nutricional, fuente completa de proteínas y libre de gluten." },
    { id: "PL001", nombre: "Leche Entera", precio: 1100, unidad: "litro", imagen: "../img/leche.jpg", categoria: "Productos Lácteos", descripcion: "Leche entera de granjas locales, rica en calcio y nutrientes esenciales para toda la familia." }
];

// Formatea números a pesos chilenos (ej: 1200 -> $1.200)
function formatearPrecio(numero) {
    return "$" + numero.toLocaleString("es-CL");
}

// Recorre el arreglo y genera el HTML de cada card de producto (usado en productos.html)
function mostrarProductos() {
    const contenedor = document.querySelector("#listaProductos");
    if (!contenedor) return; // si esta función se carga en otra página, no hace nada

    productos.forEach((producto) => {
        const card = document.createElement("article");
        card.classList.add("card-producto");

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p class="precio">${formatearPrecio(producto.precio)} / ${producto.unidad}</p>
            <button onclick="verDetalle('${producto.id}')">Ver detalle</button>
        `;

        contenedor.appendChild(card);
    });
}

// Redirige al detalle del producto, pasando el id por la URL
function verDetalle(id) {
    window.location.href = `detalle-producto.html?id=${id}`;
}

// Lee el parámetro "id" desde la URL actual (usado en detalle-producto.html)
function obtenerIdDesdeURL() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get("id");
}

// Busca el producto correspondiente y lo muestra en el detalle
function mostrarDetalleProducto() {
    const contenedor = document.querySelector("#detalleProducto");
    if (!contenedor) return; // si esta función se carga en otra página, no hace nada

    const id = obtenerIdDesdeURL();
    const producto = productos.find((p) => p.id === id);

    if (!producto) {
        contenedor.innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    contenedor.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-detalle">
        <div class="info-detalle">
            <h1>${producto.nombre}</h1>
            <p class="precio-detalle">${formatearPrecio(producto.precio)} / ${producto.unidad}</p>
            <p class="descripcion-detalle">${producto.descripcion}</p>

            <label for="cantidad">Cantidad:</label>
            <select id="cantidad">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <button id="btnAñadirCarrito">Añadir al carrito</button>
        </div>
    `;
}

// Ejecuta la función correspondiente según qué elemento exista en la página actual
mostrarProductos();
mostrarDetalleProducto();

// ---------- LÓGICA DEL CARRITO ----------

// Obtiene el carrito actual desde localStorage (o un arreglo vacío si no existe aún)
function obtenerCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Guarda el carrito actualizado en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Añade un producto al carrito (o suma la cantidad si ya existe)
function añadirAlCarrito(idProducto, cantidad) {
    const producto = productos.find((p) => p.id === idProducto);
    if (!producto) return;

    const carrito = obtenerCarrito();
    const itemExistente = carrito.find((item) => item.id === idProducto);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            unidad: producto.unidad,
            cantidad: cantidad
        });
    }

    guardarCarrito(carrito);
    alert(`${producto.nombre} añadido al carrito`);
}

// Conecta el botón "Añadir al carrito" cuando existe en la página (detalle-producto.html)
function inicializarBotonCarrito() {
    const boton = document.querySelector("#btnAñadirCarrito");
    if (!boton) return;

    boton.addEventListener("click", () => {
        const id = obtenerIdDesdeURL();
        const cantidad = parseInt(document.querySelector("#cantidad").value);
        añadirAlCarrito(id, cantidad);
    });
}

inicializarBotonCarrito();