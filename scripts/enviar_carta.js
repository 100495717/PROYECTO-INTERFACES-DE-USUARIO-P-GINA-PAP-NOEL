document.addEventListener("DOMContentLoaded", function(){
  updateHomeBackground();
  updateNavbar();
//Guardar el envío de cartas
var enviar_carta = document.getElementById("enviar-carta");
if (enviar_carta){
    enviar_carta.onclick = function(event){
      event.preventDefault();
      var userData = JSON.parse(localStorage.getItem("users"));
      var usuariologueado = JSON.parse(localStorage.getItem("usuariologueado"));
      var user = userData.find(user => user.username === usuariologueado.username);
      var isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
      if (isLoggedIn === false){
        alert("Debes iniciar sesión para enviar una carta");
        return;
      }

      var nombre = document.getElementById("Nombre").value;
      var email = document.getElementById("email").value;
      var ciudad = document.getElementById("ciudad").value;
      var pais = document.getElementById("país").value;
      var carta = document.getElementById("carta").value;



      if(email!==user.email){
        alert("El email no coincide con el registrado");
        return;
      }



      

      
      var cartasData = {
        nombre: nombre,
        ciudad: ciudad,
        email: email,
        pais: pais,
        carta: carta,
      
      };
      var cartas = JSON.parse(localStorage.getItem("cartas")) || [];
      
      cartas.push(cartasData);
      localStorage.setItem("cartas", JSON.stringify(cartas));

      // Mostrar la carta en el contenedor de cartas
      var usuariologueado = JSON.parse(localStorage.getItem("usuariologueado")) || [];
      var cartas = JSON.parse(localStorage.getItem("cartas")) || [];
      var MisCartas = cartas.filter(carta => carta.email === usuariologueado.email);
      var cartasContainer = document.getElementById("cartas_container");
      var cartaDiv = document.createElement("div");

      cartaDiv.className = "cartas col-12 col-s-8";
      cartaDiv.innerHTML = `
            <div class="contenido-cartas">
                <div class="texto" draggable=True>
                    <p>${MisCartas.nombre}</p>
                    <p>Ciudad: ${MisCartas.ciudad}</p>
                    <p>País: ${MisCartas.pais}</p>
                    <p>${MisCartas.carta}</p>
                    <button class="borrar-carta">BORRAR</button>
                </div>
            </div>
      `;
      cartasContainer.appendChild(cartaDiv); // Añadir la nueva carta al contenedor


      alert("Carta enviada");
      document.getElementById("form-carta").reset();
      document.getElementById("contenido-carta").value = "";
    }
  }
});