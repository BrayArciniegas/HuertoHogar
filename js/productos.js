/* ---------- DATOS DE PRODUCTOS ---------- */

const productosIniciales = [
    {
        id: "FR001",
        nombre: "Manzanas Fuji",
        precio: 1200,
        stock: 150,
        unidad: "kilo",
        categoria: "Frutas",
        imagen: "manzanas.jpg",
        descripcion: "Manzanas Fuji frescas, dulces y crujientes."
    },
    {
        id: "FR002",
        nombre: "Naranjas Valencia",
        precio: 1000,
        stock: 200,
        unidad: "kilo",
        categoria: "Frutas",
        imagen: "naranjas.jpg",
        descripcion: "Naranjas Valencia frescas y jugosas."
    },
    {
        id: "FR003",
        nombre: "Plátanos Cavendish",
        precio: 800,
        stock: 250,
        unidad: "kilo",
        categoria: "Frutas",
        imagen: "platanos.jpg",
        descripcion: "Plátanos Cavendish frescos y de excelente calidad."
    },
    {
        id: "VR001",
        nombre: "Zanahorias Orgánicas",
        precio: 900,
        stock: 100,
        unidad: "kilo",
        categoria: "Verduras",
        imagen: "zanahorias.jpg",
        descripcion: "Zanahorias orgánicas cultivadas de forma natural."
    },
    {
        id: "VR002",
        nombre: "Espinacas Frescas",
        precio: 700,
        stock: 80,
        unidad: "bolsa 500g",
        categoria: "Verduras",
        imagen: "espinacas.jpg",
        descripcion: "Espinacas frescas, ideales para ensaladas y preparaciones."
    },
    {
        id: "VR003",
        nombre: "Pimientos Tricolores",
        precio: 1500,
        stock: 120,
        unidad: "kilo",
        categoria: "Verduras",
        imagen: "pimientos.jpg",
        descripcion: "Pimientos rojos, verdes y amarillos frescos."
    },
    {
        id: "PO001",
        nombre: "Miel Orgánica",
        precio: 5000,
        stock: 50,
        unidad: "frasco 500g",
        categoria: "Productos Orgánicos",
        imagen: "miel.jpg",
        descripcion: "Miel orgánica natural de excelente calidad."
    },
    {
        id: "PO003",
        nombre: "Quinua Orgánica",
        precio: 3200,
        stock: 90,
        unidad: "bolsa 500g",
        categoria: "Productos Orgánicos",
        imagen: "quinua.jpg",
        descripcion: "Quinua orgánica, nutritiva y de excelente calidad."
    },
    {
        id: "PL001",
        nombre: "Leche Entera",
        precio: 1100,
        stock: 300,
        unidad: "litro",
        categoria: "Lácteos",
        imagen: "leche.jpg",
        descripcion: "Leche entera fresca."
    }
];


/* ---------- LOCALSTORAGE ---------- */

const CLAVE_PRODUCTOS = "productosHuertoHogar";


function obtenerProductos() {

    const guardados =
        localStorage.getItem(CLAVE_PRODUCTOS);

    if (guardados) {
        return JSON.parse(guardados);
    }

    localStorage.setItem(
        CLAVE_PRODUCTOS,
        JSON.stringify(productosIniciales)
    );

    return JSON.parse(
        JSON.stringify(productosIniciales)
    );
}


/*
 * Esta variable será utilizada por las páginas
 * públicas y por el administrador.
 */
let productos = obtenerProductos();


function actualizarProductos() {

    productos = obtenerProductos();

}


function guardarProductos(listaProductos) {

    localStorage.setItem(
        CLAVE_PRODUCTOS,
        JSON.stringify(listaProductos)
    );

    productos = listaProductos;

}


/* ---------- UNIDAD DE VENTA ---------- */

// Convierte la unidad del producto ("kilo", "bolsa 500g", "litro", etc.)
// en la palabra a mostrar junto a la cantidad, en singular o plural.
function textoUnidad(unidad, cantidad) {

    const palabraBase = (unidad || "unidad").split(" ")[0];

    if (cantidad === 1) {
        return palabraBase;
    }

    const ultimaLetra = palabraBase.slice(-1).toLowerCase();
    const esVocal = "aeiouáéíóú".includes(ultimaLetra);

    return palabraBase + (esVocal ? "s" : "es");
}


/* ---------- IMAGEN DEL PRODUCTO ---------- */

// Las imágenes subidas desde el admin quedan como data URL (base64);
// las del catálogo original son solo el nombre del archivo en img/.
function resolverImagenProducto(nombreImagen) {

    if (!nombreImagen) {
        return "../img/placeholder.svg";
    }

    if (nombreImagen.startsWith("data:") || nombreImagen.startsWith("http")) {
        return nombreImagen;
    }

    return `../img/${nombreImagen}`;
}


/* ---------- FORMATO DE PRECIO ---------- */

function formatearPrecio(precio) {

    return "$" + Number(precio).toLocaleString("es-CL");
}


/* ---------- MOSTRAR PRODUCTOS ---------- */

function mostrarProductos() {

    const lista =
        document.getElementById("listaProductos");

    if (!lista) {
        return;
    }

    actualizarProductos();

    lista.innerHTML = "";

    if (productos.length === 0) {

        lista.innerHTML = `
            <p>No hay productos disponibles.</p>
        `;

        return;
    }


    productos.forEach(producto => {

        const tarjeta =
            document.createElement("div");

        tarjeta.className = "producto-card";

        tarjeta.innerHTML = `

            <img
                src="${resolverImagenProducto(producto.imagen)}"
                alt="${producto.nombre}"
                onerror="this.src='../img/placeholder.svg'"
            >

            <h3>${producto.nombre}</h3>

            <p class="precio">
                ${formatearPrecio(producto.precio)}
            </p>

            <p>
                ${producto.unidad || ""}
            </p>

            <button
                type="button"
                onclick="verDetalle('${producto.id}')">
                Ver producto
            </button>

            <button
                type="button"
                onclick="agregarAlCarrito('${producto.id}')">
                Agregar al carrito
            </button>

        `;

        lista.appendChild(tarjeta);

    });
}


/* ---------- VER DETALLE ---------- */

function verDetalle(id) {

    window.location.href =
        `detalle-producto.html?id=${id}`;

}


/* ---------- OBTENER ID DESDE URL ---------- */

function obtenerIdDesdeURL() {

    const parametros =
        new URLSearchParams(window.location.search);

    return parametros.get("id");

}


/* ---------- MOSTRAR DETALLE DEL PRODUCTO ---------- */

function mostrarDetalleProducto() {

    const contenedor =
        document.getElementById("detalleProducto");

    if (!contenedor) {
        return;
    }

    actualizarProductos();

    const id =
        obtenerIdDesdeURL();

    const producto =
        productos.find(
            producto => producto.id === id
        );


    if (!producto) {

        contenedor.innerHTML = `
            <p>Producto no encontrado.</p>
        `;

        return;
    }


    contenedor.innerHTML = `

        <div class="detalle-imagen">

            <img
                src="${resolverImagenProducto(producto.imagen)}"
                alt="${producto.nombre}"
                onerror="this.src='../img/placeholder.svg'"
            >

        </div>


        <div class="detalle-info">

            <h1>${producto.nombre}</h1>

            <p class="precio">
                ${formatearPrecio(producto.precio)}
            </p>

            <p>
                ${producto.descripcion || ""}
            </p>

            <p>
                <strong>Categoría:</strong>
                ${producto.categoria}
            </p>

            <p>
                <strong>Unidad:</strong>
                ${producto.unidad || ""}
            </p>

            <p>
                <strong>Stock disponible:</strong>
                ${producto.stock}
            </p>


            <label for="cantidadProducto">
                Cantidad:
            </label>

            <select id="cantidadProducto">

                <option value="1">1 ${textoUnidad(producto.unidad, 1)}</option>
                <option value="2">2 ${textoUnidad(producto.unidad, 2)}</option>
                <option value="3">3 ${textoUnidad(producto.unidad, 3)}</option>
                <option value="4">4 ${textoUnidad(producto.unidad, 4)}</option>
                <option value="5">5 ${textoUnidad(producto.unidad, 5)}</option>

            </select>


            <button
                type="button"
                onclick="agregarProductoDetalle('${producto.id}')">
                Agregar al carrito
            </button>

            <p id="mensajeCarrito"></p>

        </div>
    `;
}


/* ---------- CARRITO ---------- */

function obtenerCarrito() {

    return JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

}


function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


// Muestra el mensaje flotante de #mensajeCarrito y lo oculta a los 3 segundos
function mostrarMensajeCarrito(texto) {

    const mensaje = document.getElementById("mensajeCarrito");

    if (!mensaje) {
        alert(texto);
        return;
    }

    mensaje.textContent = texto;
    mensaje.style.display = "block";

    setTimeout(function () {
        mensaje.style.display = "none";
    }, 3000);
}


/* ---------- AGREGAR AL CARRITO ---------- */

function agregarAlCarrito(id) {

    actualizarProductos();

    const producto =
        productos.find(
            producto => producto.id === id
        );

    if (!producto) {
        return;
    }


    const carrito =
        obtenerCarrito();


    const productoCarrito =
        carrito.find(
            item => item.id === id
        );


    if (productoCarrito) {

        productoCarrito.cantidad++;

    } else {

        carrito.push({

            id: producto.id,

            nombre: producto.nombre,

            precio: producto.precio,

            imagen: producto.imagen,

            unidad: producto.unidad,

            cantidad: 1

        });

    }


    guardarCarrito(carrito);


    mostrarMensajeCarrito("Producto agregado al carrito 🌱");

}


/* ---------- AGREGAR DESDE DETALLE ---------- */

function agregarProductoDetalle(id) {

    const cantidad =
        Number(
            document.getElementById(
                "cantidadProducto"
            ).value
        );


    actualizarProductos();

    const producto =
        productos.find(
            producto => producto.id === id
        );


    if (!producto) {
        return;
    }


    if (cantidad > producto.stock) {

        mostrarMensajeCarrito("No hay suficiente stock disponible.");

        return;
    }


    const carrito =
        obtenerCarrito();


    const productoCarrito =
        carrito.find(
            item => item.id === id
        );


    if (productoCarrito) {

        productoCarrito.cantidad += cantidad;

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

    mostrarMensajeCarrito("Producto agregado al carrito 🌱");

}


/* ---------- INICIALIZAR ---------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        mostrarProductos();

        mostrarDetalleProducto();

    }
);