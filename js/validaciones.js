export function valida(input) {
    const tipodeInput = input.dataset.tipo;
    //input.dataset.tipo obtiene todos los data pero el .tipo le da el enfoque a cual es
    if(validadores[tipodeInput]) {
        validadores[tipodeInput](input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
    else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipodeInput, input);
    }
}

const tipoDeError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "este campo no puede estar vacio",
    },
    email: {
        valueMissing: "este campo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "al menos 6 caracteres, maximo 12, debe tener una letra minuscula, una letra mayuscula, un numero y un caracter especial",
    },
    nacimiento: {
        valueMissing: "este campo no puede estar vacio",
        customError: "debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el formato requerido es XXXXXXXXXX 10 numeros",
    },
    direccion: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "la direccion debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "la ciudad debe contener entre 10 a 40 caracteres",
    },
    estado: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el estado debe contener entre 10 a 40 caracteres",
    },
}

const validadores = {
    nacimiento: (input) => validarNacimietno(input),
};

function mostrarMensajeDeError(tipodeInput, input) {
    let mensaje = "";
    tipoDeError.forEach((error) => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipodeInput][error];
        }
    });
    return mensaje;
}

function validarNacimietno(input) {
    const fechaCliente = new Date(input.value);
    let mens = "";
    if(!mayorEdad(fechaCliente)) {
        mens = "debes tener al menos 18 años de edad";
    }
    mayorEdad(fechaCliente);

    input.setCustomValidity(mens);
    //setCustomValidity mensaje q aparecera en el input 
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());

    return diferenciaFecha <= fechaActual;
}


/* const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
    //blur evento que sirve cuando no tiene el foco
   validarNacimietno(evento.target);
   //console.log(evento.target);
});

function validarNacimietno(input) {
    const fechaCliente = new Date(input.value);
    let mens = "";
    if (!mayorEdad(fechaCliente)) {
        mens = "debes tener al menos 18 años de edad";
    }
    mayorEdad(fechaCliente);

    input.setCustomValidity(mens);
    //setCustomValidity mensaje q aparecera en el input 
}

function mayorEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());

    return diferenciaFecha <= fechaActual;
} */