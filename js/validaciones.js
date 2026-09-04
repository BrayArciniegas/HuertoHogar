const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {

    const mensajeError = document.getElementById("mensajeError");
    const mensajeExito = document.getElementById("mensajeExito");

    formRegistro.addEventListener("submit", function(event) {

        event.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmarPassword = document.getElementById("confirmarPassword").value;

        mensajeError.textContent = "";
        mensajeExito.textContent = "";

        if (nombre.length < 3) {
            mensajeError.textContent = "Ingresa un nombre válido.";

        } else if (email === "") {
            mensajeError.textContent = "Ingresa tu correo electrónico.";

        } else if (password.length < 6) {
            mensajeError.textContent =
                "La contraseña debe tener al menos 6 caracteres.";

        } else if (password !== confirmarPassword) {
            mensajeError.textContent =
                "Las contraseñas no coinciden.";

        } else {
            mensajeExito.textContent =
                "¡Cuenta creada correctamente!";

            formRegistro.reset();
        }

    });

}


/* ---------- VALIDACIÓN LOGIN ---------- */

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    const mensajeErrorLogin =
        document.getElementById("mensajeErrorLogin");

    const mensajeExitoLogin =
        document.getElementById("mensajeExitoLogin");

    formLogin.addEventListener("submit", function(event) {

        event.preventDefault();

        const emailLogin =
            document.getElementById("emailLogin").value.trim();

        const passwordLogin =
            document.getElementById("passwordLogin").value;

        mensajeErrorLogin.textContent = "";
        mensajeExitoLogin.textContent = "";

        if (emailLogin === "") {
            mensajeErrorLogin.textContent =
                "Ingresa tu correo electrónico.";

        } else if (passwordLogin.length < 6) {
            mensajeErrorLogin.textContent =
                "La contraseña debe tener al menos 6 caracteres.";

        } else {
            mensajeExitoLogin.textContent =
                "¡Inicio de sesión correcto!";

            formLogin.reset();
        }

    });

}


/* ---------- VALIDACIÓN CONTACTO ---------- */

const formContacto = document.getElementById("formContacto");

if (formContacto) {

    const mensajeErrorContacto =
        document.getElementById("mensajeErrorContacto");

    const mensajeExitoContacto =
        document.getElementById("mensajeExitoContacto");

    formContacto.addEventListener("submit", function(event) {

        event.preventDefault();

        const nombreContacto =
            document.getElementById("nombreContacto").value.trim();

        const emailContacto =
            document.getElementById("emailContacto").value.trim();

        const asunto =
            document.getElementById("asunto").value.trim();

        const mensaje =
            document.getElementById("mensaje").value.trim();

        mensajeErrorContacto.textContent = "";
        mensajeExitoContacto.textContent = "";

        if (nombreContacto.length < 3) {
            mensajeErrorContacto.textContent =
                "Ingresa un nombre válido.";

        } else if (emailContacto === "") {
            mensajeErrorContacto.textContent =
                "Ingresa tu correo electrónico.";

        } else if (asunto.length < 3) {
            mensajeErrorContacto.textContent =
                "El asunto debe tener al menos 3 caracteres.";

        } else if (mensaje.length < 10) {
            mensajeErrorContacto.textContent =
                "El mensaje debe tener al menos 10 caracteres.";

        } else {
            mensajeExitoContacto.textContent =
                "¡Tu mensaje fue enviado correctamente!";

            formContacto.reset();
        }

    });

}