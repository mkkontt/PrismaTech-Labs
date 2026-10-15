// Bienvenida al sistema

document.addEventListener("DOMContentLoaded", function () {
    console.log("Sistema PrismaTech Labs cargado correctamente.");

    alert("¡Bienvenido a PrismaTech Labs!");

    iniciarReloj();
    detectarServicio();
    detectarBotones();
    validarFormulario();
});

// Reloj dinámico en formato de 12 horas
function iniciarReloj() {
    const header = document.querySelector("header");
    if (!header) return;

    let reloj = document.getElementById("reloj");

    if (!reloj) {
        reloj = document.createElement("p");
        reloj.id = "reloj";
        header.appendChild(reloj);
    }

    function actualizarHora() {
        const ahora = new Date();

        let horas = ahora.getHours();
        const minutos = String(ahora.getMinutes()).padStart(2, "0");
        const segundos = String(ahora.getSeconds()).padStart(2, "0");
        const periodo = horas >= 12 ? "PM" : "AM";

        horas = horas % 12 || 12;
        const horaFormato = String(horas).padStart(2, "0");

        reloj.textContent = `Hora actual: ${horaFormato}:${minutos}:${segundos} ${periodo}`;
    }

    actualizarHora();
    setInterval(actualizarHora, 1000);
}

// Detectar cuando se selecciona un servicio

function detectarServicio() {
    const servicio = document.querySelector("select");

    if (!servicio) return;

    servicio.addEventListener("change", function () {
        if (this.value !== "") {
            console.log("Servicio seleccionado:", this.value);
        }
    });
}

// Detectar eventos del mouse en los botones

function detectarBotones() {
    const botones = document.querySelectorAll("button");

    botones.forEach(function (boton) {
        boton.addEventListener("mouseover", function () {
            console.log("Mouse sobre el botón:", this.textContent.trim());
        });

        boton.addEventListener("mouseleave", function () {
            console.log("Mouse fuera del botón:", this.textContent.trim());
        });
    });
}

// Validar los campos del formulario

function validarFormulario() {
    const formulario = document.querySelector("form");

    if (!formulario) return;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const campos = formulario.querySelectorAll(
            "input, select, textarea"
        );

        let formularioValido = true;

        // Comprobar que ningún campo esté vacío
        campos.forEach(function (campo) {
            if (campo.value.trim() === "") {
                formularioValido = false;
                campo.style.borderColor = "red";
            } else {
                campo.style.borderColor = "";
            }
        });

        if (!formularioValido) {
            alert("Por favor, completa todos los campos del formulario.");
            return;
        }

        // Obtener la información del formulario
        const datosFormulario = {};

        campos.forEach(function (campo) {
            const clave = campo.name || campo.id;

            if (clave) {
                datosFormulario[clave] = campo.value.trim();
            }
        });

        // Guardar la información en localStorage
        try {
            const registros = JSON.parse(
                localStorage.getItem("contactosPrismaTech") || "[]"
            );

            registros.push({
                ...datosFormulario,
                fechaRegistro: new Date().toISOString()
            });

            localStorage.setItem(
                "contactosPrismaTech",
                JSON.stringify(registros)
            );
        } catch (error) {
            console.error("No se pudo guardar la información:", error);
            alert("No fue posible guardar los datos en este navegador.");
            return;
        }

        // Confirmación interactiva
        alert("¡Formulario registrado con éxito! Gracias por contactar a PrismaTech Labs.");

        formulario.reset();
        campos.forEach(function (campo) {
            campo.style.borderColor = "";
        });

        console.log("Formulario guardado correctamente:", datosFormulario);
    });
}
