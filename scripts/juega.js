document.addEventListener("DOMContentLoaded", function(){
  updateHomeBackground();
  updateNavbar();




// JUEGO 1: ROMPE BOLAS

var juego_popup = document.getElementById("bolas-game-popup");
var juego_btn = document.getElementById("btn-juego1");
var cerrar_juego = document.getElementById("cerrar-juego");
var terminar_juego = document.getElementById("terminar-juego");

if (juego_btn) {
  juego_btn.onclick = function () {
    juego_popup.style.display = "block";
  };
}

if (cerrar_juego) {
  cerrar_juego.onclick = function () {
    juego_popup.style.display = "none";
  };
}

var empezar_juego = document.getElementById("empezar-juego");
if (empezar_juego) {
  empezar_juego.onclick = function () {
    iniciarRompeBolas();
  };
}

if (terminar_juego) {
  terminar_juego.onclick = function () {
    
    alert("Juego terminado. Bolas explotadas: " + puntos);
    puntos = 0; // Reinicia puntos solo al finalizar manualmente
    document.getElementById("puntos").innerHTML = puntos;
    juego_popup.style.display = "none";
    bolas.forEach(function (bola) {
      bola.style.display = "none";
    });
  };
}

// FUNCIÓN PARA EMPEZAR EL JUEGO
function iniciarRompeBolas() {
  var juego_popup = document.getElementById("bolas-game-popup");
  var puntos = 0;
  var tiempo = 90;
  var velocidadCaida = 15; // Velocidad de caída
  var numbolas = 3; // Número de círculos simultáneos
  var bolas = [];
  var imgPath = "../images/bola.png";
  
  // Crear los círculos dinámicamente
  for (let i = 0; i < numbolas; i++) {
    let bola = document.createElement("img");
    bola.src = imgPath;
    bola.className = "bola";
    bola.style.width = "50px";
    bola.style.height = "50px";
    bola.style.padding = "1.5rem";
    bola.style.position = "absolute";
    bola.style.backgroundColor = "transparent";
    bola.style.borderRadius = "90%";
    bola.style.cursor = "pointer"; // Asegura que sea clicable
    juego_popup.appendChild(bola);
    resetbolaPosition(bola);
    bolas.push(bola);

    // Agregar evento click a cada círculo
    bola.onclick = function () {
      puntos++;
      document.getElementById("puntos").innerHTML = puntos;
      resetbolaPosition(bola);
    };
  }

  // Configuración inicial del círculo
  function resetbolaPosition(bola) {
    bola.style.top = "0px";
    var x = Math.random() * (juego_popup.clientWidth - bola.offsetWidth);
    bola.style.left = x + "px";
  }

  // Función para mover los círculos hacia abajo
  function moverbolas() {
    bolas.forEach(function (bola) {
      var currentTop = parseFloat(bola.style.top);
      var newTop = currentTop + velocidadCaida; // Velocidad de caída

      // Si el círculo llega al fondo, reinicia la posición
      if (newTop > juego_popup.clientHeight - bola.offsetHeight) {
        resetbolaPosition(bola);
      } else {
        bola.style.top = newTop + "px";
      }
    });
  }

  // Temporizador del juego
  var intervaloMovimiento = setInterval(moverbolas, 50); // Actualiza cada 50 ms
  var intervaloTiempo = setInterval(function () {
    tiempo--;
    document.getElementById("tiempo").innerHTML = tiempo;
    var terminar_juego = document.getElementById("terminar-juego");

    if (tiempo === 0) {
      clearInterval(intervaloMovimiento);
      clearInterval(intervaloTiempo);
      bolas.forEach(function (bola) {
        bola.style.display = "none";
      });
      alert("Juego terminado. Bolas explotadas: " + puntos);
    }

    // Si el usuario clica en TERMINAR
    if (terminar_juego) {
      terminar_juego.onclick = function () {
        clearInterval(intervaloMovimiento);
        clearInterval(intervaloTiempo);

        tiempo = 90;
        document.getElementById("tiempo").innerHTML = tiempo;

        alert("Juego terminado. Bolas explotadas: " + puntos);
        puntos = 0; // Reinicia puntos solo al finalizar manualmente
        document.getElementById("puntos").innerHTML = puntos;
        juego_popup.style.display = "none";
        bolas.forEach(function (bola) {
          bola.style.display = "none";
        });
      };
    }
  }, 1000);
}

// JUEGO 2: ADIVINA EL REGALO
// Obtener referencias a los elementos del DOM
var juego2_popup = document.getElementById("regalo-game");
var juego_btn2 = document.getElementById("btn-juego2");
var empezar_juego2 = document.getElementById("empezar-juego-regalo");
var terminar_juego2 = document.getElementById("terminar-juego-regalo");



if (juego_btn2) {
  juego_btn2.onclick = function () {
    juego2_popup.style.display = "block";
  };
}

if (empezar_juego2) {
  empezar_juego2.onclick = function () {
    iniciarAdivinaRegalo();
  };
}


// Función principal del juego
function iniciarAdivinaRegalo() {
  var puntos = 0;
  var tiempo = 60;
  var regalos = [
    { nombre: "bicicleta", imagen: "../images/OBJETO1.png" },
    { nombre: "oso de peluche", imagen: "../images/OBJETO2.png" },
    { nombre: "maleta", imagen: "../images/OBJETO3.png" },
    { nombre: "guitarra", imagen: "../images/OBJETO4.png" },
    { nombre: "maceta", imagen: "../images/OBJETO5.png" },
    { nombre: "cuchara de madera", imagen: "../images/OBJETO6.png" },
    { nombre: "sarten", imagen: "../images/OBJETO7.jpg" },
    { nombre: "gato", imagen: "../images/OBJETO8.jpeg" },
    { nombre: "taladro", imagen: "../images/OBJETO9.jpeg" },
    { nombre: "váter", imagen: "../images/OBJETO10.jpg" },
    { nombre: "zapatos", imagen: "../images/OBJETO11.jpg" },
    { nombre: "moto", imagen: "../images/OBJETO12.jpg"},
    { nombre: "pablo", imagen: "../images/pablo.jpg"}
  
  ];

  var regaloActual = null;
  var tiempoIntervalo;

  if (terminar_juego2) {
    terminar_juego2.onclick = function () {
      finalizarJuego();
    };
  }

  function seleccionarRegalo() {
    regaloActual = regalos[Math.floor(Math.random() * regalos.length)];
    var imagenRegalo = document.getElementById("regalo-imagen");

    if (!imagenRegalo) {
      imagenRegalo = document.createElement("img");
      imagenRegalo.id = "regalo-imagen";
      imagenRegalo.style.width = "150px";
      imagenRegalo.style.height = "150px";
      imagenRegalo.style.display = "block";
      imagenRegalo.style.margin = "20px auto";

      var popupContent = document.querySelector(".popup-content-juego2");
      popupContent.insertBefore(imagenRegalo, popupContent.children[3]);
    }

    imagenRegalo.src = regaloActual.imagen;
  }

  function actualizarTiempo() {
    tiempo--;
    document.getElementById("tiempo-regalo").innerHTML = tiempo;

    if (tiempo === 0) {
      finalizarJuego();
    }
  }

  function validarRespuesta() {
    var respuesta = document.getElementById("guess-input").value.trim().toLowerCase();

    if (respuesta === regaloActual.nombre) {
      puntos++;
      document.getElementById("puntos-regalo").innerHTML = puntos;
    }

    document.getElementById("guess-input").value = "";
    seleccionarRegalo();
  }

  function finalizarJuego() {
    clearInterval(tiempoIntervalo);
    alert("Juego terminado. Puntos: " + puntos);
    juego2_popup.style.display = "none";
    document.getElementById("puntos-regalo").innerHTML = 0;
    document.getElementById("tiempo-regalo").innerHTML = 60;
  }

  // Inicia el juego
  puntos = 0;
  tiempo = 60;
  document.getElementById("puntos-regalo").innerHTML = puntos;
  document.getElementById("tiempo-regalo").innerHTML = tiempo;
  seleccionarRegalo();

  tiempoIntervalo = setInterval(actualizarTiempo, 1000);

  var submitGuess = document.getElementById("submit-guess");
  if (submitGuess) {
    submitGuess.onclick = function () {
      validarRespuesta();
    };
  }
}
}
);