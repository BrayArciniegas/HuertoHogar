const CLAVE_USUARIOS = "usuariosHuertoHogar";


function obtenerUsuarios() {
    const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS);

    if (usuariosGuardados) {
        return JSON.parse(usuariosGuardados);
    }

    return [];
}


function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}


function mostrarTablaUsuarios() {

    const tbody = document.querySelector("#tablaUsuarios");

    if (!tbody) {
        return;
    }

    const usuarios = obtenerUsuarios();

    tbody.innerHTML = "";

    if (usuarios.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8">No hay usuarios registrados.</td>
            </tr>
        `;
        return;
    }

    usuarios.forEach((usuario, indice) => {

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.run}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.email}</td>
            <td>${usuario.tipo}</td>
            <td>${usuario.region}</td>
            <td>${usuario.comuna}</td>
            <td>
                <button type="button" onclick="eliminarUsuario(${indice})">
                    Eliminar
                </button>
            </td>
        `;

        tbody.appendChild(fila);
    });
}


function eliminarUsuario(indice) {

    const usuarios = obtenerUsuarios();

    if (!confirm("¿Deseas eliminar este usuario?")) {
        return;
    }

    usuarios.splice(indice, 1);

    guardarUsuarios(usuarios);

    mostrarTablaUsuarios();
}


document.addEventListener("DOMContentLoaded", function () {
    mostrarTablaUsuarios();
});