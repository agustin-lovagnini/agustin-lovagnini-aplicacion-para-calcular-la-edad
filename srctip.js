const form = document.getElementById("form-fecha");

const inputDia = document.getElementById("dia");
const inputMes = document.getElementById("mes");
const inputAnio = document.getElementById("anio");

const resultadoAnios = document.getElementById("resultado-anios");
const resultadoMeses = document.getElementById("resultado-meses");
const resultadoDias = document.getElementById("resultado-dias");
const mensajeError = document.getElementById("mensaje-error");

function limitarNumeros(input, maxLength) {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, maxLength);
    });
}

limitarNumeros(inputDia, 2);
limitarNumeros(inputMes, 2);
limitarNumeros(inputAnio, 4);

function mostrarError(input, mensaje) {
    input.classList.add("border-red-500");
    const errorIndividual = input.parentElement.querySelector(".error-individual");
    if (errorIndividual) {
        errorIndividual.textContent = mensaje;
    }
    mensajeError.textContent = mensaje;
}

function limpiarErrores() {
    inputDia.classList.remove("border-red-500");
    inputMes.classList.remove("border-red-500");
    inputAnio.classList.remove("border-red-500");
    document.querySelectorAll(".error-individual").forEach(error => {
        error.textContent = "";
    });
    mensajeError.textContent = "";
}

// Escuchamos el evento submit
form.addEventListener("submit", function (event) {
    event.preventDefault(); // evita que se recargue la página

    limpiarErrores();

    const dia = Number(inputDia.value);
    const mes = Number(inputMes.value);
    const anio = Number(inputAnio.value);

    if (!dia) {
        mostrarError(inputDia, "Ingresá el día");
        return;
    }

    if (!mes) {
        mostrarError(inputMes, "Ingresá el mes");
        return;
    }

    if (!anio) {
        mostrarError(inputAnio, "Ingresá el año");
        return;
    }

    if (dia < 1 || dia > 31) {
        mostrarError(inputDia, "El día debe estar entre 1 y 31");
        return;
    }

    if (mes < 1 || mes > 12) {
        mostrarError(inputMes, "El mes debe estar entre 1 y 12");
        return;
    }

    if (anio < 1900) {
        mostrarError(inputAnio, "Ingresá un año válido");
        return;
    }

    const fechaNacimiento = new Date(anio, mes - 1, dia);
    const hoy = new Date();

    if (fechaNacimiento > hoy) {
        mostrarError(inputAnio, "La fecha no puede ser futura");
        return;
    }

    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();

    const anioNac = fechaNacimiento.getFullYear();
    const mesNac = fechaNacimiento.getMonth();
    const diaNac = fechaNacimiento.getDate();

    let anios = anioActual - anioNac;
    let meses = mesActual - mesNac;
    let dias = diaActual - diaNac;

    if (dias < 0) {
        meses--;
        const ultimoDiaMesAnterior = new Date(anioActual, mesActual, 0).getDate();
        dias += ultimoDiaMesAnterior;
    }

    if (meses < 0) {
        anios--;
        meses += 12;
    }

    resultadoAnios.textContent = anios;
    resultadoMeses.textContent = meses;
    resultadoDias.textContent = dias;

});


