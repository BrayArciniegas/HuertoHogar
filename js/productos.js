// Arreglo de productos de HuertoHogar (datos según ficha de productos)
const productos = [
    { id: "FR001", nombre: "Manzanas Fuji", precio: 1200, unidad: "kilo", imagen: "../img/manzanas.jpg", categoria: "Frutas Frescas" },
    { id: "FR002", nombre: "Naranjas Valencia", precio: 1000, unidad: "kilo", imagen: "../img/naranjas.jpg", categoria: "Frutas Frescas" },
    { id: "FR003", nombre: "Plátanos Cavendish", precio: 800, unidad: "kilo", imagen: "../img/platanos.jpg", categoria: "Frutas Frescas" },
    { id: "VR001", nombre: "Zanahorias Orgánicas", precio: 900, unidad: "kilo", imagen: "../img/zanahorias.jpg", categoria: "Verduras Orgánicas" },
    { id: "VR002", nombre: "Espinacas Frescas", precio: 700, unidad: "bolsa 500g", imagen: "../img/espinacas.jpg", categoria: "Verduras Orgánicas" },
    { id: "VR003", nombre: "Pimientos Tricolores", precio: 1500, unidad: "kilo", imagen: "../img/pimientos.jpg", categoria: "Verduras Orgánicas" },
    { id: "PO001", nombre: "Miel Orgánica", precio: 5000, unidad: "frasco 500g", imagen: "../img/miel.jpg", categoria: "Productos Orgánicos" },
    { id: "PO003", nombre: "Quinua Orgánica", precio: 3200, unidad: "bolsa 500g", imagen: "../img/quinua.jpg", categoria: "Productos Orgánicos" },
    { id: "PL001", nombre: "Leche Entera", precio: 1100, unidad: "litro", imagen: "../img/leche.jpg", categoria: "Productos Lácteos" }
];

// Formatea números a pesos chilenos (ej: 1200 -> $1.200)
function formatearPrecio(numero) {
    return "$" + numero.toLocaleString("es-CL");
}

// Recorre el arreglo y genera el HTML de cada card de producto
function mostrarProductos() {
    const contenedor = document.querySelector("#listaProductos");

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

// Ejecuta la función apenas carga la página
mostrarProductos();