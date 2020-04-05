"use strict";

const imagesAmount = 8; // numero de imagenes de cuba
const path = './img/cuba'; // ruta del archivo

/**
 * Cambia la imagen de Cuba
 * @param {boolean} forward forward == true, muestra la siguiente foto, si es false, la anterior 
 */
const changeImage = (forward) => {
    const img = document.getElementById('cuba-img');
    let n = getValue();
    forward ? ++n : --n;
    if(n<1)
        n = imagesAmount;
    if(n>imagesAmount)
        n = 1;
    img.setAttribute('src', path+n+'.jpg');
    img.setAttribute('data-n', n)
}

const getValue = () => document.getElementById('cuba-img').dataset.n;
