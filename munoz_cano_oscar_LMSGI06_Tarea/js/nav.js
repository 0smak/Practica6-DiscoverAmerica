"use strict"

/**
 * Muestra el navbar responsive o lo oculta
 */
const toggleNavbar = () => {
    const nav = document.getElementById("nav-responsive");
    const i = document.getElementById("toggleNavbar"); 

    if(nav.className.includes("hide")) {
        nav.className = "";
        i.className = "fas fa-times";
    } else {
        nav.className = "hide";
        i.className = "fas fa-bars";
    }
}