document.addEventListener("DOMContentLoaded", function(){
    updateHomeBackground();
    updateNavbar();

    function moverPapanoel() {
        const mapa = document.getElementById('mapa');
        const papanoel = document.getElementById('papanoel');
      
        // Dimensiones del contenedor y del grupo
        const mapaWidth = mapa.clientWidth;
        const mapaHeight = mapa.clientHeight;
        const papanoelWidth = papanoel.offsetWidth;
        const papanoelHeight = papanoel.offsetHeight;
      
        // Calcular posiciones aleatorias dentro del contenedor
        const nuevaPosX = Math.random() * (mapaWidth - papanoelWidth);
        const nuevaPosY = Math.random() * (mapaHeight - papanoelHeight);
      
        // Actualizar posición del contenedor de la imagen y el texto
        papanoel.style.transform = `translate(${nuevaPosX}px, ${nuevaPosY}px)`;
    }
      
      // Configurar el intervalo para mover el contenedor de Papá Noel (imagen y texto)
      setInterval(() => {
        moverPapanoel();
      }, 1500);

    const frases = [
      "¡Ho, ho, ho! ¡Bien hecho, me has encontrado!",
        "¡Feliz Navidad y próspero Año Nuevo!",
        "¡Sigue buscando, Papá Noel está cerca!",
        "¡Ho, ho, ho! ¡Sigue así!",
        "¡Papá Noel te desea unas felices fiestas!"
    ];

    // Función para seleccionar una frase aleatoria
    function obtenerFraseAleatoria() {
      const indiceAleatorio = Math.floor(Math.random() * frases.length);
      return frases[indiceAleatorio];
  }

  // Función para mostrar la frase aleatoria en el pop-up
  function mostrarFraseAleatoria() {
      const popupContent = document.querySelector('#popup-mapa .popup-content h2');
      popupContent.textContent = obtenerFraseAleatoria();
  }

  
  //Funcionalidad de mostrar pop-up mapa
  var popup_mapa = document.getElementById("popup-mapa");
  var closeSpan = document.getElementsByClassName("close")[0];
  var chincheta = document.getElementById("chincheta");

  chincheta.onclick = function() {
    popup_mapa.style.display = "block";
    mostrarFraseAleatoria();
  }

  closeSpan.onclick = function() {
    popup_mapa.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == popup_mapa) {
      popup_mapa.style.display = "none";
    }
  }

   });