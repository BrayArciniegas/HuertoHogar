// Autenticación del panel administrador (frontend: sin backend real todavía)
const CLAVE_SESION_ADMIN = "adminAutenticado";

const CREDENCIALES_ADMIN = {
    correo: "admin@duoc.cl",
    contrasena: "admin123"
};

function cerrarSesionAdmin() {
    sessionStorage.removeItem(CLAVE_SESION_ADMIN);
    window.location.href = "login.html";
}

// ---------- FORMULARIO DE LOGIN (admin/login.html) ----------
const formAdminLogin = document.getElementById("formAdminLogin");

if (formAdminLogin) {
    const mensajeErrorAdmin = document.getElementById("mensajeErrorAdmin");
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    formAdminLogin.addEventListener("submit", function (event) {
        event.preventDefault();

        const correo = document.getElementById("emailAdmin").value.trim();
        const contrasena = document.getElementById("passwordAdmin").value;
        const dominioValido = dominiosPermitidos.some((dominio) => correo.endsWith(dominio));

        mensajeErrorAdmin.textContent = "";

        if (correo === "" || correo.length > 100) {
            mensajeErrorAdmin.textContent = "Ingresa tu correo electrónico.";
        } else if (!dominioValido) {
            mensajeErrorAdmin.textContent = "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        } else if (contrasena.length < 4 || contrasena.length > 10) {
            mensajeErrorAdmin.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
        } else if (correo !== CREDENCIALES_ADMIN.correo || contrasena !== CREDENCIALES_ADMIN.contrasena) {
            mensajeErrorAdmin.textContent = "Correo o contraseña incorrectos.";
        } else {
            sessionStorage.setItem(CLAVE_SESION_ADMIN, "true");
            window.location.href = "index.html";
        }
    });
}
