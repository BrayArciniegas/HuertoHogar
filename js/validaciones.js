/* ---------- DATOS GENERALES ---------- */

const dominiosPermitidos = [
    "@duoc.cl",
    "@profesor.duoc.cl",
    "@gmail.com"
];

function correoValido(email) {
    return dominiosPermitidos.some((dominio) =>
        email.endsWith(dominio)
    );
}


/* ---------- REGIONES Y COMUNAS ---------- */

const regiones = {
    "Región Metropolitana": [
        "Santiago",
        "Maipú",
        "Puente Alto",
        "Las Condes"
    ],

    "Región de Valparaíso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "Villa Alemana"
    ],

    "Región del Biobío": [
        "Concepción",
        "Talcahuano",
        "Chillán",
        "Los Ángeles"
    ],

    "Región de La Araucanía": [
        "Temuco",
        "Villarrica",
        "Pucón",
        "Angol"
    ],

    "Región de Los Lagos": [
        "Puerto Montt",
        "Osorno",
        "Castro",
        "Ancud"
    ]
};


/* ---------- CARGAR REGIONES Y COMUNAS ---------- */

const region = document.getElementById("region");
const comuna = document.getElementById("comuna");

if (region && comuna) {

    Object.keys(regiones).forEach((nombreRegion) => {

        const opcion = document.createElement("option");

        opcion.value = nombreRegion;
        opcion.textContent = nombreRegion;

        region.appendChild(opcion);
    });

    region.addEventListener("change", function () {

        comuna.innerHTML =
            '<option value="">Seleccione una comuna</option>';

        const comunasRegion = regiones[region.value];

        if (comunasRegion) {

            comunasRegion.forEach((nombreComuna) => {

                const opcion = document.createElement("option");

                opcion.value = nombreComuna;
                opcion.textContent = nombreComuna;

                comuna.appendChild(opcion);
            });
        }
    });
}


/* ---------- VALIDAR RUN CHILENO ---------- */

function runValido(run) {

    run = run.toUpperCase().replace(/\s/g, "");

    // No permite puntos ni guion
    if (run.includes(".") || run.includes("-")) {
        return false;
    }

    // Debe tener entre 7 y 9 caracteres
    if (run.length < 7 || run.length > 9) {
        return false;
    }

    // Formato: números + dígito verificador
    if (!/^\d{6,8}[0-9K]$/.test(run)) {
        return false;
    }

    const cuerpo = run.slice(0, -1);
    const digitoVerificador = run.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma += parseInt(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resto = 11 - (suma % 11);

    let dvEsperado;

    if (resto === 11) {
        dvEsperado = "0";
    } else if (resto === 10) {
        dvEsperado = "K";
    } else {
        dvEsperado = resto.toString();
    }

    return digitoVerificador === dvEsperado;
}


/* ---------- VALIDACIÓN REGISTRO ---------- */

const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {

    const mensajeError =
        document.getElementById("mensajeError");

    const mensajeExito =
        document.getElementById("mensajeExito");

    formRegistro.addEventListener("submit", function (event) {

        event.preventDefault();

        const nombre =
            document.getElementById("nombre").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const direccion =
            document.getElementById("direccion").value.trim();

        const regionRegistro =
            document.getElementById("region").value;

        const comunaRegistro =
            document.getElementById("comuna").value;

        const password =
            document.getElementById("password").value;

        const confirmarPassword =
            document.getElementById("confirmarPassword").value;

        mensajeError.textContent = "";
        mensajeExito.textContent = "";
        mensajeExito.style.display = "none";


        if (nombre === "") {

            mensajeError.textContent =
                "El nombre es obligatorio.";

        } else if (nombre.length > 50) {

            mensajeError.textContent =
                "El nombre no puede superar los 50 caracteres.";

        } else if (email === "") {

            mensajeError.textContent =
                "El correo electrónico es obligatorio.";

        } else if (email.length > 100) {

            mensajeError.textContent =
                "El correo no puede superar los 100 caracteres.";

        } else if (!correoValido(email)) {

            mensajeError.textContent =
                "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";

        } else if (direccion === "") {

            mensajeError.textContent =
                "La dirección es obligatoria.";

        } else if (direccion.length > 300) {

            mensajeError.textContent =
                "La dirección no puede superar los 300 caracteres.";

        } else if (regionRegistro === "") {

            mensajeError.textContent =
                "Debes seleccionar una región.";

        } else if (comunaRegistro === "") {

            mensajeError.textContent =
                "Debes seleccionar una comuna.";

        } else if (
            password.length < 4 ||
            password.length > 10
        ) {

            mensajeError.textContent =
                "La contraseña debe tener entre 4 y 10 caracteres.";

        } else if (password !== confirmarPassword) {

            mensajeError.textContent =
                "Las contraseñas no coinciden.";

        } else {

            mensajeExito.textContent =
                "¡Cuenta creada correctamente! 🌱";

            mensajeExito.style.display = "block";

            formRegistro.reset();

            if (comuna) {
                comuna.innerHTML =
                    '<option value="">Seleccione una comuna</option>';
            }

            setTimeout(function () {
                mensajeExito.style.display = "none";
            }, 3000);
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

    formLogin.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailLogin =
            document.getElementById("emailLogin").value.trim();

        const passwordLogin =
            document.getElementById("passwordLogin").value;

        mensajeErrorLogin.textContent = "";
        mensajeExitoLogin.textContent = "";
        mensajeExitoLogin.style.display = "none";


        if (emailLogin === "") {

            mensajeErrorLogin.textContent =
                "El correo electrónico es obligatorio.";

        } else if (emailLogin.length > 100) {

            mensajeErrorLogin.textContent =
                "El correo no puede superar los 100 caracteres.";

        } else if (!correoValido(emailLogin)) {

            mensajeErrorLogin.textContent =
                "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";

        } else if (
            passwordLogin.length < 4 ||
            passwordLogin.length > 10
        ) {

            mensajeErrorLogin.textContent =
                "La contraseña debe tener entre 4 y 10 caracteres.";

        } else {

            mensajeExitoLogin.textContent =
                "¡Inicio de sesión correcto! 🌿";

            mensajeExitoLogin.style.display = "block";

            formLogin.reset();

            setTimeout(function () {
                mensajeExitoLogin.style.display = "none";
            }, 3000);
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

    formContacto.addEventListener("submit", function (event) {

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
        mensajeExitoContacto.style.display = "none";


        if (nombreContacto === "") {

            mensajeErrorContacto.textContent =
                "El nombre es obligatorio.";

        } else if (nombreContacto.length > 100) {

            mensajeErrorContacto.textContent =
                "El nombre no puede superar los 100 caracteres.";

        } else if (emailContacto === "") {

            mensajeErrorContacto.textContent =
                "El correo electrónico es obligatorio.";

        } else if (emailContacto.length > 100) {

            mensajeErrorContacto.textContent =
                "El correo no puede superar los 100 caracteres.";

        } else if (!correoValido(emailContacto)) {

            mensajeErrorContacto.textContent =
                "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";

        } else if (asunto.length < 3) {

            mensajeErrorContacto.textContent =
                "El asunto debe tener al menos 3 caracteres.";

        } else if (mensaje === "") {

            mensajeErrorContacto.textContent =
                "El mensaje es obligatorio.";

        } else if (mensaje.length > 500) {

            mensajeErrorContacto.textContent =
                "El mensaje no puede superar los 500 caracteres.";

        } else {

            mensajeExitoContacto.textContent =
                "¡Tu mensaje fue enviado correctamente! 🌱";

            mensajeExitoContacto.style.display = "block";

            formContacto.reset();

            setTimeout(function () {
                mensajeExitoContacto.style.display = "none";
            }, 3000);
        }
    });
}


/* ---------- VALIDACIÓN NUEVO USUARIO ADMIN ---------- */

const formUsuario = document.getElementById("formUsuario");

if (formUsuario) {

    const mensajeUsuario =
        document.getElementById("mensajeUsuario");

    formUsuario.addEventListener("submit", function (event) {

        event.preventDefault();

        const run =
            document.getElementById("run").value.trim().toUpperCase();

        const nombreUsuario =
            document.getElementById("nombre").value.trim();

        const apellidos =
            document.getElementById("apellidos").value.trim();

        const emailUsuario =
            document.getElementById("email").value.trim();

        const fechaNacimientoElemento =
            document.getElementById("fechaNacimiento");

        const fechaNacimiento =
            fechaNacimientoElemento
                ? fechaNacimientoElemento.value
                : "";

        const direccionUsuario =
            document.getElementById("direccion").value.trim();

        const tipoUsuario =
            document.getElementById("tipoUsuario").value;

        const regionUsuario =
            document.getElementById("region").value;

        const comunaUsuario =
            document.getElementById("comuna").value;


        mensajeUsuario.textContent = "";
        mensajeUsuario.style.color = "#c0392b";


        /* ---------- VALIDACIONES ---------- */

        if (run === "") {

            mensajeUsuario.textContent =
                "El RUN es obligatorio.";

            return;

        }

        if (!runValido(run)) {

            mensajeUsuario.textContent =
                "El RUN ingresado no es válido.";

            return;

        }

        if (nombreUsuario === "") {

            mensajeUsuario.textContent =
                "El nombre es obligatorio.";

            return;

        }

        if (nombreUsuario.length > 50) {

            mensajeUsuario.textContent =
                "El nombre no puede superar los 50 caracteres.";

            return;

        }

        if (apellidos === "") {

            mensajeUsuario.textContent =
                "Los apellidos son obligatorios.";

            return;

        }

        if (apellidos.length > 100) {

            mensajeUsuario.textContent =
                "Los apellidos no pueden superar los 100 caracteres.";

            return;

        }

        if (emailUsuario === "") {

            mensajeUsuario.textContent =
                "El correo electrónico es obligatorio.";

            return;

        }

        if (emailUsuario.length > 100) {

            mensajeUsuario.textContent =
                "El correo no puede superar los 100 caracteres.";

            return;

        }

        if (!correoValido(emailUsuario)) {

            mensajeUsuario.textContent =
                "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";

            return;

        }

        if (tipoUsuario === "") {

            mensajeUsuario.textContent =
                "Debe seleccionar un tipo de usuario.";

            return;

        }

        if (regionUsuario === "") {

            mensajeUsuario.textContent =
                "Debe seleccionar una región.";

            return;

        }

        if (comunaUsuario === "") {

            mensajeUsuario.textContent =
                "Debe seleccionar una comuna.";

            return;

        }

        if (direccionUsuario === "") {

            mensajeUsuario.textContent =
                "La dirección es obligatoria.";

            return;

        }

        if (direccionUsuario.length > 300) {

            mensajeUsuario.textContent =
                "La dirección no puede superar los 300 caracteres.";

            return;

        }


        /* ---------- CREAR USUARIO ---------- */

        const nuevoUsuario = {

            run: run,

            nombre: nombreUsuario,

            apellidos: apellidos,

            email: emailUsuario,

            fechaNacimiento: fechaNacimiento,

            tipo: tipoUsuario,

            region: regionUsuario,

            comuna: comunaUsuario,

            direccion: direccionUsuario

        };


        /* ---------- OBTENER USUARIOS GUARDADOS ---------- */

        const usuariosGuardados =
            JSON.parse(
                localStorage.getItem("usuariosHuertoHogar")
            ) || [];


        /* ---------- EVITAR RUN DUPLICADO ---------- */

        const runExiste =
            usuariosGuardados.some(
                usuario =>
                    usuario.run &&
                    usuario.run.toUpperCase() === run
            );


        if (runExiste) {

            mensajeUsuario.textContent =
                "Ya existe un usuario registrado con ese RUN.";

            return;

        }


        /* ---------- GUARDAR ---------- */

        usuariosGuardados.push(nuevoUsuario);

        localStorage.setItem(
            "usuariosHuertoHogar",
            JSON.stringify(usuariosGuardados)
        );


        /* ---------- CONFIRMACIÓN ---------- */

        mensajeUsuario.style.color = "#2E8B57";

        mensajeUsuario.textContent =
            "¡Usuario creado correctamente! 🌱";


        /* ---------- LIMPIAR ---------- */

        formUsuario.reset();

        if (comuna) {

            comuna.innerHTML =
                '<option value="">Seleccione una comuna</option>';

        }

    });
}