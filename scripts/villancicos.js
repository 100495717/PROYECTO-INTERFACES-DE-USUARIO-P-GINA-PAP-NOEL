document.addEventListener("DOMContentLoaded", function(){
  
  updateHomeBackground();
  updateNavbar();



  // Update background image

  const imagen1 = document.getElementById("CANCIÓN 1");
  const imagen2 = document.getElementById("CANCIÓN 2");
  const imagen3 = document.getElementById("CANCIÓN 3");
  const imagen4 = document.getElementById("CANCIÓN 4");
  const imagen5 = document.getElementById("CANCIÓN 5");
  const imagen6 = document.getElementById("CANCIÓN 6");


  imagen1.onclick = function() {
    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (isLoggedIn === false){
      alert("Debes iniciar sesión para escuchar el villancico");
      return;
    }
    document.getElementById("cancion1").play();
    document.getElementById("cancion2").pause();
    document.getElementById("cancion3").pause();
    document.getElementById("cancion4").pause();
    document.getElementById("cancion5").pause();
    document.getElementById("cancion6").pause();
  }

  imagen2.onclick = function() {
    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (isLoggedIn === false){
      alert("Debes iniciar sesión para escuchar el villancico");
      return;
    }
    document.getElementById("cancion2").play();
    document.getElementById("cancion1").pause();
    document.getElementById("cancion3").pause();
    document.getElementById("cancion4").pause();
    document.getElementById("cancion5").pause();  
    document.getElementById("cancion6").pause();
  }

  imagen3.onclick = function() {
    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (isLoggedIn === false){
      alert("Debes iniciar sesión para escuchar el villancico");
      return;
    }
    document.getElementById("cancion3").play();
    document.getElementById("cancion1").pause();
    document.getElementById("cancion2").pause();
    document.getElementById("cancion4").pause();
    document.getElementById("cancion5").pause();
    document.getElementById("cancion6").pause();
  }

  imagen4.onclick = function() {
    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (isLoggedIn === false){
      alert("Debes iniciar sesión para escuchar el villancico");
      return;
    }
    document.getElementById("cancion4").play();
    document.getElementById("cancion1").pause();
    document.getElementById("cancion2").pause();
    document.getElementById("cancion3").pause();
    document.getElementById("cancion5").pause();
    document.getElementById("cancion6").pause();
  }

  imagen5.onclick = function() {
    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (isLoggedIn === false){
      alert("Debes iniciar sesión para escuchar el villancico");
      return;
    }
    document.getElementById("cancion5").play();
    document.getElementById("cancion1").pause();
    document.getElementById("cancion2").pause();
    document.getElementById("cancion3").pause();
    document.getElementById("cancion4").pause();
    document.getElementById("cancion6").pause();
  }

  imagen6.onclick = function() {
    var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (isLoggedIn === false){
      alert("Debes iniciar sesión para escuchar el villancico");
      return;
    }
    document.getElementById("cancion6").play();
    document.getElementById("cancion1").pause();
    document.getElementById("cancion2").pause();
    document.getElementById("cancion3").pause();
    document.getElementById("cancion4").pause();
    document.getElementById("cancion5").pause();
  }

  const STOP = document.getElementById("parar_musica");

  STOP.onclick = function() {
    document.getElementById("cancion1").pause();
    document.getElementById("cancion2").pause();
    document.getElementById("cancion3").pause();
    document.getElementById("cancion4").pause();
    document.getElementById("cancion5").pause();
    document.getElementById("cancion6").pause();
  }


});