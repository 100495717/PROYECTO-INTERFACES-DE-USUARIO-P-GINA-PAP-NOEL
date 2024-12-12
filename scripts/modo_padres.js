function updateHomeBackground() {
    var modoPadres = JSON.parse(localStorage.getItem("modoPadres"));
    var inicioSection = document.querySelector(".Inicio");

    if (inicioSection) {
        if (modoPadres) {
            inicioSection.classList.add("modo-padres");
            updateNavbar();
        } else {
            
            inicioSection.classList.remove("modo-padres");
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
