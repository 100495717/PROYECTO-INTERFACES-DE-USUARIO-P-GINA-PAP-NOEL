function updateHomeBackground() {
    var modoPadres = JSON.parse(localStorage.getItem("modoPadres"));
    var inicioSection = document.querySelector(".Inicio");
    var botonPadres = document.getElementById("EMPEZAR_PADRES");
    var botonNinos = document.getElementById("EMPEZAR_NINOS");

    if (inicioSection) {
        if (modoPadres) {
            inicioSection.classList.add("modo-padres");
            botonPadres.style.display = "block";
            botonNinos.style.display = "none";
            updateNavbar();
        } else {
            
            inicioSection.classList.remove("modo-padres");
            botonNinos.style.display = "block";
            botonPadres.style.display = "none";
            updateNavbar();
        }
    } 
}

document.addEventListener("DOMContentLoaded", function() {
    updateHomeBackground();
    updateNavbar();
    window.updateNavbar = updateNavbar;


    // Llamar a la función de actualización al cargar la página
    updateNavbar();
});
