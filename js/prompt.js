"use strict";

let active = true; // esta activo el componente de preguntas?
let name = ""; // nombre del uusario;
let visited = false; //ha visitado america?


/**
 * Segun el parametro step recibido muestra y esconde una pregunta u otra
 * @param {Number} step nº de pregunta
 */
const showQuestions = step => {
    const q0 = document.getElementById('question-1');
    const q1 = document.getElementById('question-2');  
    if (step == 0) {
        q0.className = q0.className.replace(/hide/g,"flex");
        q1.className = q1.className.replace(/flex/g,"hide");
    } else {
        q0.className = q0.className.replace(/flex/g,"hide");
        q1.className = q1.className.replace(/hide/g,"flex");
    }
}

/**
 * comprueba si el componente input está vacio
 * @param {*} el 
 */
const isEmpty = el => {
    const val = el.value === undefined ? el.target.value : el.value;
    return (val.trim().length <= 0);
}

/**
 * llama al a funcion que muestra la primera pregunta (tu nombre) y contiene un "eventlistener" que detcta si se ha escrito algo para cambiar el color del icono de enviar del formulario
 */
const initQuestions = () => {
    showQuestions(0);
    if(active)
        document.getElementById('q-name').onkeyup = el => {
            const icon = document.getElementById('questions-container').querySelector('.inputbox > i');
            if(!isEmpty(el) && !icon.className.includes('active'))
                icon.className+=" active";
            else if(isEmpty(el))
                icon.className = icon.className.replace(/ active/g,"");
        };
}

/**
 * Cuando introduce el nombre y pulsa intro o al boton, comprueba si el input esta vacio, y si no le muestra la siguiente pregunta
 * @param {Event} e evento que detecta la pulsacion de intro, si este parametro no se envia se sobreescribe a false (esto ocurre si se llama a la funcion mediante el boton)
 */
const nextQuestion = (e = false) => {
    if(!e || (e && e.keyCode === 13)) {
        const input = document.getElementById('q-name');
        if(!isEmpty(input)){
            name = input.value;
            showQuestions(1);
        }
    }
}

/**
 * Guarda si ha visitado america y posteriormente llama a la funcion que muestra el mensaje al usuario
 * @param {boolean} answer si ha visitado america, answer es true, si no, false
 */
const finishQuestion = async answer => {
    visited = answer;
    active = false;
    const boxes = document.getElementById("questions-container").querySelectorAll('.box')
    boxes[1].classList+=" anim-disappear"
    await delay(350);
    for(let box of boxes)
        box.remove();
    showAlert();
}

/**
 * Muestra un mensaje de alerta (mostrando un div fixed en el body) con tu nombre y un mensaje personalizado
 * segun tu respuesta
 */
const showAlert = async () => {
    const msg = document.getElementById("questions-container").querySelector('.msg');
    msg.className = msg.className.replace(/ hide/g,"");
    msg.className += " anim-disappear-r-rev";
    msg.querySelector('#name').innerHTML = name;
    msg.querySelector('#custom-msg').innerHTML = visited ? 'bienvenido de nuevo' : 'estamos deseando conocerte';
    await delay(2000);
    msg.className = msg.className.replace(/ anim-disappear-r-rev/g,"");
    await delay(500);
    msg.className += ' anim-disappear-r';
    await delay(350);
    msg.remove();
    showAdvertisement(); //En 10 segundos tras completar las preguntas iniciales se mostrara publicidad;
    document.getElementById("questions-container").remove();

}