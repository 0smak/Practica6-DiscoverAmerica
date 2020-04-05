"use strict";

let rate = Number.MIN_SAFE_INTEGER;

/**
 * Esta funcion se ejecuta al cargar index.html en bucle
 * Va mostrando/ocultando el texto que contiene el nombre de una ciudad/pais
 * mediante un bucle infinito (cada iteracción del bucle for tarda 6 segundos)
 */
const changeText = async () => {
    for(;;) {
        let places = document.getElementsByClassName('place');
        for(let i = 0; i< places.length; i++) {
            places[i].style.display = `flex`
            await delay(6000);
            places[i].style.display = `none`
        }
    }
}

/**
 * Esta función contiene un bucle infinito que modifica el src del background del header
 * mediante un bucle for que itera sobre el numero de imagenes de fondo que tengo en mi carpeta ../img
 * La iteracción de cada bucle for dura 6 segundos (5 segundos + 1 segundo de transición)
 */
const changeBackground = async () => {
    const bg = document.getElementById('header').querySelector('#bg');
    for(;;) {
        for (let i = 0; i < 4; i++) {
            const bgClone = bg.cloneNode(true);
            bg.parentNode.appendChild(bgClone);
            bgClone.setAttribute('id','bgClone');
            bgClone.setAttribute('src', `./img/bg${i}.jpg`);
            bgClone.style.opacity = 1;
            await delay(1000);
            bg.setAttribute('src', `./img/bg${i}.jpg`);
            bgClone.remove();
            await delay(5000);
        }
    }

}

/**
 * Comprueba el numero introducido en el sorteo si es numero y si esta comprendido
 * entre 1 y 10, si es asi, le muestra que ha participado, en caso contrario
 * se le muestra al usuario un mensaje de error
 * @param {event} e 
 */
const submitNumber = async e => {
    e.preventDefault();
    const input = document.getElementById('draw-number');
    const n = input.value;
    if(isNaN(n) || (!isNaN(n) && (n<1 || n > 10))){
        const err = document.getElementById('draw-err');
        err.className = err.className.replace('hide', 'err');
        if(isNaN(n))
            err.innerHTML = `<div>${n} no es un número</div>`;
        else
            err.innerHTML = `<div>El número debe estar comprendido entre 1 y 10</div>`
        await delay(2000);
        err.style.opacity = 0;
        await delay(500);
        err.style.opacity = 1;
        err.innerHTML = ``;
        err.className = err.className.replace('err', 'hide');
    } else if(!isNaN(n) && n.length > 0 && n > 0 && n <= 10) {
        const success = document.getElementById('draw-err');
        const formComp = success.parentNode.querySelector('form');
        const text = success.parentNode.querySelector('.text');
        const plane = document.getElementById('plane');
        formComp.style.transform = 'scale(0)';
        await delay(500);
        text.style.transform = 'scale(0)';
        await delay(500);
        plane.className = plane.className.replace("hide", "");
        success.className = success.className.replace('hide','success');
        await delay(3000);
        plane.className += " hide";
        success.innerHTML = `<div>Su participación ha quedado registrada</div>
        <div>${n}</div>`;
    }
}

/**
 * Esta funcion maneja el click a los botones de radio, transformando su valor a estrellas aplicando clases para cambiar estilos
 * tambien se utiliza para resetear el color de las estrellas al quitar el hover en las estrellas (sin clickarlas)
 * @param {event} e 
 * @param {Number} n 
 */
const handleRatingClick = (e, n = -1) => {
    const starsIcon = document.getElementById('stars-rating').querySelectorAll('label > i');
    if(n==-1)
        rate = Number.parseInt(e.target.value);
    else
        rate = n
    for (let i = 0; i < starsIcon.length; i++) {
        starsIcon[i].className = i < rate ? 'fas fa-star' : 'far fa-star';
    }
}

/**
 * Maneja el hover a las estrellas, añadiendo opacidad segun diversas condiciones para hacerlo más usable
 * por ejemplo, si la puntuacion anterior es menor y donde tienes el foco de hover es un numero mayor, se añade opacidad solo a las nuevas no a las antiguas
 * en el caso contrario se añade opacidad a las estrellas que quieres eliminar
 * @param {event} e 
 */
const handleRatingHover = (e) => {
    const rateHover = Number.parseInt(e.target.dataset.value);
    const starsIcon = document.getElementById('stars-rating').querySelectorAll('label > i');
    for (let i = 0; i < starsIcon.length; i++) {
        starsIcon[i].className = (i < rateHover ) 
            ? ((i >= rate) ? 'fas fa-star hover' : 'fas fa-star')
            : ((i < rate) ? 'fas fa-star hover' : 'far fa-star');
    }
}

/**
 * Maneja cuando sales del hover en las estrellas, si existe puntuacion se le vuelve a poner el color a las estrellas segun la puntuacion
 * si aun no se ha clickado se le añade el valor de 0
 */
const handleRatingMouseout = () => {
    handleRatingClick(null, rate === Number.MIN_SAFE_INTEGER ? 0 : rate);
}

/**
 * Maneja el formulario de contacto, añade animacion y muestra mensaje
 * @param {event} e 
 */
const submitContact = async e => {
    e.preventDefault();
    const name = e.target.querySelector('input[name="name"]');
    const submitted = document.getElementById('submitted');
    submitted.className = "";
    await delay(10);
    submitted.style.height = "100%";
    await delay(350);
    submitted.innerHTML = `<div>Gracias por contactar, ${name.value}</div>`
}

/**
 * funcion que retorna una promesa que se cumple tras "N" milisegundos
 * @param {Number} ms 
 */
const delay = ms => new Promise(r => setTimeout(r, ms));

/**
 * Al cargar el body llamamos a las funciones que cambian el texto del header, el fondo, las preguntas del index
 * y el control de las estrellas del formulario
 */
window.onload = () => {
    changeText();
    changeBackground();
    initQuestions();
    const stars = document.getElementById('stars-rating').querySelectorAll('input[name="rating-radio"]');
    const starsIcon = document.getElementById('stars-rating').querySelectorAll('label > i');
    for(const s of stars)
        s.addEventListener("click", handleRatingClick);
    for(const s of starsIcon){
        s.addEventListener("mouseover", handleRatingHover);
        s.addEventListener("mouseout", handleRatingMouseout);
    }
}