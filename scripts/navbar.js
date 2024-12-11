// navbar.js

document.addEventListener("DOMContentLoaded", function () {
    // Elementos de la barra de navegación
    const signInBtn = document.getElementById("SIGN_IN");
    const registerBtn = document.getElementById("REGISTER");
    const perfilBtn = document.getElementById("PERFIL");
    const misCartasBtn = document.getElementById("MIS_CARTAS");
    const cerrarSesionBtn = document.getElementById("cerrar_sesion");
    const modo_padresBtn = document.getElementById("MODO_PADRES");
    const MisExperienciasBtn = document.getElementById("MIS_EXPERIENCIAS_BTN");
    const modoNinosbtn = document.getElementById("MODO_NINOS");
    const misresenasBtn = document.getElementById("MIS_RESENAS_BTN");
    var icono_perfil = document.getElementById("icono-perfil");
    var menu_perfil = document.getElementById("menu-perfil");


    // Actualizar la barra de navegación según el estado de sesión
    function updateNavbar() {
        var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
        var modoPadres = JSON.parse(localStorage.getItem("modoPadres"));
    
        if (signInBtn) signInBtn.style.display = isLoggedIn ? "none" : "block";
        if (registerBtn) registerBtn.style.display = isLoggedIn ? "none" : "block";
        if (perfilBtn) perfilBtn.style.display = isLoggedIn ? "block" : "none";
        if (misCartasBtn) misCartasBtn.style.display = isLoggedIn ? "block" : "none";
        if (cerrarSesionBtn) cerrarSesionBtn.style.display = isLoggedIn ? "block" : "none";
        if (icono_perfil) icono_perfil.style.display = isLoggedIn ? "block" : "none";
        
    
        if (isLoggedIn) {
            if (icono_perfil) icono_perfil.style.display = "block"; 
            if (modoPadres) {
                if (modo_padresBtn) modo_padresBtn.style.display = "none";
                if (MisExperienciasBtn) MisExperienciasBtn.style.display = "block";
                if (modoNinosbtn) modoNinosbtn.style.display = "block";
                if (misresenasBtn) misresenasBtn.style.display = "block";
                
            } else {
                if (modo_padresBtn) modo_padresBtn.style.display = "block";
                if (MisExperienciasBtn) MisExperienciasBtn.style.display = "none";
                if (modoNinosbtn) modoNinosbtn.style.display = "none";
                if (misresenasBtn) misresenasBtn.style.display = "none";
            }
        } else {
            if (modo_padresBtn) modo_padresBtn.style.display = "none";
            if (MisExperienciasBtn) MisExperienciasBtn.style.display = "none";
            if (modoNinosbtn) modoNinosbtn.style.display = "none";
            if (misresenasBtn) misresenasBtn.style.display = "none";
            
        }


        var iconoNavbar = document.getElementById("icono-navbar");
        var menuNavbar = document.getElementById("menu-navbar");
    
        if (iconoNavbar) {
            iconoNavbar.onclick = function () {
              menuNavbar.style.display = "block";
            };
          }
        
          document.onclick = function (event) {
            const isClickInsideNavbar = menuNavbar.contains(event.target) || iconoNavbar.contains(event.target);
            const isClickInsidePerfil = menu_perfil.contains(event.target) || icono_perfil.contains(event.target);
    
            if (!isClickInsideNavbar) {
                menuNavbar.style.display = "none";
            }
    
            if (!isClickInsidePerfil) {
                menu_perfil.style.display = "none";
            }
        };
    

    };
    

    window.updateNavbar = updateNavbar;


    // Llamar a la función de actualización al cargar la página
    updateNavbar();

    
});
