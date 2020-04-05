"use strict";

/**
 * Muestra a los 10 segundos un anuncio
 */
const showAdvertisement = async () => {
    await delay(10000);
    const ad = document.getElementById('advertisement');
    ad.className = ad.className.replace("hide","");
} 