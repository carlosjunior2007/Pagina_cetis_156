const boton = document.querySelector('.boton');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    descripcion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    comentario: /^[a-zA-ZÀ-ÿ\s,]{1,1000}$/,
};

let nombre, email, descripcion, comentario;

function validarCampo(expresion, valor) {
    return expresion.test(valor);
}

function limpiarFormularios() {
    nombre = '';
    email = '';
    descripcion = '';
    comentario = '';
    const inputs = document.querySelectorAll('.form input');

    inputs.forEach((input) => {
        input.value = "";
        const errorMensaje = input.parentNode.querySelector('.error-mensaje');
        if (errorMensaje) {
            errorMensaje.textContent = ''; // Limpiar mensajes de error al limpiar el formulario
        }
    });
    alert("Correo enviado con éxito");
}

function SendEmail(nombre, correo, asunto, comentario) {
    var parametros = {
        nombre: nombre,
        email: correo,
        subject: asunto,
        comentario: comentario,
    };

    emailjs.send('service_6pgqen9', 'template_n0ahuc2', parametros).then((res) => {
        if (res.status !== 200) {
            alert("Algo salió mal al enviar el formulario");
        } else {
            limpiarFormularios();
        }
    });
}

function error(input, mensaje) {
    const errorMensaje = input.parentNode.querySelector('.error-mensaje');
    input.parentNode.classList.add('error');
    alert(mensaje);
}

function validarFormulario() {
    const inputs = document.querySelectorAll('.form input');
    let isValid = true;

    inputs.forEach((input, index) => {
        input.parentNode.classList.remove('error');
        let valor = input.value.trim();

        switch (index) {
            case 0:
                if (!validarCampo(expresiones.nombre, valor)) {
                    error(input, 'Error en el campo Nombre. Favor de revisar.');
                    isValid = false;
                }
                nombre = valor;
                break;
            case 1:
                if (!validarCampo(expresiones.email, valor)) {
                    error(input, 'Error en el campo Email. Favor de revisar.');
                    isValid = false;
                }
                email = valor;
                break;
            case 2:
                if (!validarCampo(expresiones.descripcion, valor)) {
                    error(input, 'Error en el campo Descripción. Favor de revisar.');
                    isValid = false;
                }
                descripcion = valor;
                break;
            case 3:
                if (!validarCampo(expresiones.comentario, valor)) {
                    error(input, 'Error en el campo Comentario. Favor de revisar.');
                    isValid = false;
                }
                comentario = valor;
                break;
        }
    });

    return isValid;
}

boton.addEventListener('click', (e) => {
    e.preventDefault();

    if (validarFormulario()) {
        SendEmail(nombre, email, descripcion, comentario);
    }
});
