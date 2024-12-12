document.addEventListener("DOMContentLoaded", function() {
    updateHomeBackground();
    updateNavbar();


    
    //Funcionalidad de rsgistro
    var register_popup = document.getElementById("popup-registro");
    var register_btn = document.getElementById("REGISTER");
    var closeSpan = document.getElementsByClassName("close")[0];
    
    register_btn.onclick = function() {
      register_popup.style.display = "block";
    }
    
    closeSpan.onclick = function() {
      register_popup.style.display = "none";
    }
    
    window.onclick = function(event) {
      if (event.target == register_popup) {
        register_popup.style.display = "none";
      }
    }
    
    
    //Manejamos el formulario de registro
    
    document.getElementById("aceptar-registro").onclick = function() {
      var username = document.getElementById("username-register").value;
      var password = document.getElementById("password-register").value;
      var confirm_password = document.getElementById("confirm-password").value;
      var email = document.getElementById("email-register").value;
      var ciudad = document.getElementById("ciudad-register").value;
      var pais = document.getElementById("pais-register").value;
      var hijos = document.getElementById("hijos-register").value;
      //Validamos los campos
      if (username.lenght <3){
        alert("El nombre de usuario debe tener al menos 3 caracteres");
        return;
      }
    
      var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    
      if (!passwordRegex.test(password)){
        alert("La contraseña debe tener al menos 12 caracteres, una mayúscula, una minúscula, un número y un caracter especial");
        return;
      }
    
      if (password !== confirm_password){
        alert("Las contraseñas no coinciden");
        return;
      }
      if (email === "") {
        alert("El correo electrónico es obligatorio");
        return;
    }
    
    if (ciudad === "") {
        alert("La ciudad es obligatoria");
        return;
    }
    
    if (pais === "") {
        alert("El país es obligatorio");
        return;
    }
    
    if (hijos === "") {
        alert("El número de hijos es obligatorio");
        return;
    }
      if (ciudad.length <3){
        alert("La ciudad debe tener al menos 3 caracteres");
        return;
      }
      if (pais.length <3){
        alert("El país debe tener al menos 3 caracteres");
        return;
      }
    
      //Guardamos los datos en el local storage
    
      var userData = {
        username: username,
        password: password,
        email: email,
        ciudad: ciudad,
        pais: pais,
        hijos: hijos
    
      };
      var users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      alert("Registro exitoso");
      register_popup.style.display = "none";
    }
    
    //Funcionalidad de inicio de sesión
    
    var sign_in_popup = document.getElementById("popup-inicio");
    var sign_in_btn = document.getElementById("SIGN_IN");
    var closeSpan = document.getElementsByClassName("close")[0];
    var boton_register = document.getElementById("REGISTER");
    var icono_perfil = document.getElementById("icono-perfil")
    var mi_perfil = document.getElementById("PERFIL");
    var mis_cartas = document.getElementById("MIS_CARTAS");
    var cerrar_sesion = document.getElementById("cerrar_sesion");
    var modo_padres = document.getElementById("modo_padres");


    //En caso de que el usuario pulse  el botón de iniciar sesión, mostramos el popup de inicio de sesión
    sign_in_btn.onclick = function() {
      sign_in_popup.style.display = "block";
      sign_in_btn.style.display = "none";
      boton_register.style.display = "none";
    }
    
    closeSpan.onclick = function() {
      sign_in_popup.style.display = "none";
      sign_in_btn.style.display = "block";
      boton_register.style.display = "block";
    }
    
   
    //Manejamos el botón de cancelar inicio
    var cancelar_inicio = document.getElementById("login-cancel");
    
    if(cancelar_inicio){
      cancelar_inicio.onclick = function(){
        sign_in_popup.style.display = "none";
        sign_in_btn.style.display = "block";
        boton_register.style.display = "block";
      }
    }
    //Si pulsa aceptar, se comprueban y almacenan los datos de inicio de sesión
    var iniciar_sesion = document.getElementById("entrar");
    
    if(iniciar_sesion){
      iniciar_sesion.onclick = function(event){
        event.preventDefault();
        var username = document.getElementById("username-login").value;
        var password = document.getElementById("password-login").value;
    
        var users = JSON.parse(localStorage.getItem("users")) || [];
        var user = users.find(user => user.username === username && user.password === password);
        
    
        if (user){
          alert("Inicio de sesión exitoso");
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
          localStorage.setItem('usuariologueado', JSON.stringify(user));
          sign_in_popup.style.display = "none";
          //Llamamos a la función de actualización de la barra de navegación
          updateNavbar();
          
          
    
        } else {
          alert("Nombre de usuario o contraseña incorrectos");
        }
      }
    
    }
    //Manejamos el botón de cancelar el registro
    var cancelar_registro = document.getElementById("register-cancel");
    
    if(cancelar_registro){
      cancelar_registro.onclick = function(){
        if (confirm("¿Estás seguro de que quieres cancelar?")){
        register_popup.style.display = "none";
        }
      }
    }
    

    


    
// Manejamos el botón de limpiar campos
document.getElementById("limpiar-registro").onclick = function(){
    if (confirm("¿Estás seguro de que quieres limpiar los campos?")){
      document.getElementById("username-register").value = "";
      document.getElementById("password-register").value = "";
      document.getElementById("confirm-password").value = "";
      document.getElementById("email-register").value = "";
      document.getElementById("ciudad-register").value = "";
      document.getElementById("pais-register").value = "";
      document.getElementById("hijos-register").value = "";
    }
  }
  
  //Mostramos campos adicionales para los hijos
  document.getElementById("hijos-register").onchange = function(){
    var hijos_info = document.getElementById("hijos_info");
    hijos_info.innerHTML = "";
    var numHijos = document.getElementById("hijos-register").value;
    for (var i = 0; i < numHijos; i++){
      hijos_info.innerHTML += `
              <label for="hijo-nombre-${i}">Nombre del hijo ${i + 1}:</label>
              <input type="text" id="hijo-nombre-${i}" name="hijo-nombre-${i}" required minlength="3">
              <label for="hijo-edad-${i}">Edad del hijo ${i + 1}:</label>
              <input type="number" id="hijo-edad-${i}" name="hijo-edad-${i}" required min="0">
              <label for="hijo-juguetes-${i}">Juguetes favoritos del hijo ${i + 1}:</label>
              <input type="text" id="hijo-juguetes-${i}" name="hijo-juguetes-${i}">
          `;
      }
    }


if (icono_perfil){
  icono_perfil.onclick = function(){
    mostrarMenuPerfil();
  }
}
// Mostrar el menú del perfil
function mostrarMenuPerfil() {
  var menu = document.getElementById('menu-perfil');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  }
  
// Manejamos el botón de mi perfil

var pop_up_perfil = document.getElementById("miperfil-popup");

mi_perfil.onclick = function(){
  pop_up_perfil.style.display = "block";
  var userData = JSON.parse(localStorage.getItem("users")) || [];
  var usuariologueado = JSON.parse(localStorage.getItem("usuariologueado"));
  var userData = userData.find(user => user.username === usuariologueado.username);
  document.getElementById("username-perfil").value = userData.username;
  document.getElementById("password-perfil").value = userData.password;
  document.getElementById("email-perfil").value = userData.email;
  document.getElementById("ciudad-perfil").value = userData.ciudad;
  document.getElementById("pais-perfil").value = userData.pais;
  document.getElementById("genero-perfil").value = userData.genero;

}

//Si hemos modificado el perfil, guardamos los cambios
var guardar_perfil = document.getElementById("guardar-perfil");



  guardar_perfil.onclick = function(){
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    
    var username = document.getElementById("username-perfil").value;
    var password = document.getElementById("password-perfil").value;
    if (!passwordRegex.test(password)){
      alert("La contraseña debe tener al menos 12 caracteres, una mayúscula, una minúscula, un número y un caracter especial");
      return;
    }


    var email = document.getElementById("email-perfil").value;
    var ciudad = document.getElementById("ciudad-perfil").value;
    var pais = document.getElementById("pais-perfil").value;
    var genero = document.getElementById("genero-perfil").value;

    
      if (username.length < 3){
        alert("El nombre de usuario debe tener al menos 3 caracteres");
        return;
      }
      if (email === "") {
        alert("El correo electrónico es obligatorio");
        return;
    }
    
    if (ciudad === "") {
        alert("La ciudad es obligatoria");
        return;
    }
    
    if (pais === "") {
        alert("El país es obligatorio");
        return;
    }
    
    
      if (ciudad.length <3){
        alert("La ciudad debe tener al menos 3 caracteres");
        return;
      }
      if (pais.length <3){
        alert("El país debe tener al menos 3 caracteres");
        return;
      }
      var userDataOld = JSON.parse(localStorage.getItem("usuariologueado"));
      var users = JSON.parse(localStorage.getItem("users")) || [];
      var user = users.find(user => user.username === userDataOld.username);
      
      
      user.username = username;
      user.password = password;
      user.email = email;
      user.ciudad = ciudad;
      user.pais = pais;
      user.genero = genero;
     
      users.push(user);
    
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("usuariologueado", JSON.stringify(user));
      alert("Perfil actualizado");
  }





//Manejamos el botón de cerrar sesión
var cerrar_sesion = document.getElementById("cerrar_sesion");
cerrar_sesion.onclick = function(){
  if (confirm("¿Estás seguro de que quieres cerrar sesión?")){
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.setItem("modoPadres", JSON.stringify(false));
    localStorage.setItem("usuariologueado", JSON.stringify(null));
    sign_in_btn.style.display = "block";
    //llamar a la función de actualización de la barra de navegación
    updateNavbar();
    updateHomeBackground();
    
  }
}






//Ver cartas enviadas
var pop_up_cartas = document.getElementById("miscartas-popup");
var cerrar_cartas = document.getElementById("close-cartas");
var cartasContainer = document.getElementById("cartas_container");

mis_cartas.onclick = function() {
  cartasContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar las cartas
  var cartasData = JSON.parse(localStorage.getItem("cartas")) || [];

  var usuariologueado = JSON.parse(localStorage.getItem("usuariologueado"));
  var MisCartas = cartasData.filter(carta => carta.email === usuariologueado.email);

  if (MisCartas.length === 0) {
    alert("Todavía no has escrito ninguna carta. ¡DATE PRISA!");
  } else {

   
      MisCartas.forEach(carta => {
        var cartaDiv = document.createElement("div");
        cartaDiv.className = "cartas col-12 col-s-8";
        cartaDiv.innerHTML = `
          <div class="contenido-cartas">
            <div class="texto" draggable="true">
              <p>Nombre: ${carta.nombre}</p>
              <p>Ciudad: ${carta.ciudad}</p>
              <p>País: ${carta.pais}</p>
              <p>${carta.carta}</p>
              <button class="borrar-carta">BORRAR</button>
            </div>
          </div>
        `;
        cartasContainer.appendChild(cartaDiv);
      });
      pop_up_cartas.style.display = "block";
      activarDragAndDrop();
    
    }
    
  }
if (cerrar_cartas) {
  cerrar_cartas.onclick = function() {
    pop_up_cartas.style.display = "none";
  }
}
//Borrar cartas
cartasContainer.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("borrar-carta")) {
        var cartaDiv = event.target.closest(".cartas"); // Encuentra el div que contiene la carta
          if (confirm("¿Estás seguro de que quieres eliminar la carta?")){
            var cartasData = JSON.parse(localStorage.getItem("cartas")) || [];
            var cartaTexto = cartaDiv.querySelector("p").textContent;
            var usuariologueado = JSON.parse(localStorage.getItem("usuariologueado"));
            var carta = cartasData.find(carta => carta.carta === cartaTexto);
            var index = cartasData.indexOf(carta);
            cartasData.splice(index, 1);
            cartasContainer.removeChild(cartaDiv); // Elimina la carta del DOM
            localStorage.setItem("cartas", JSON.stringify(cartasData));
            var cartas = JSON.parse(localStorage.getItem("cartas")) || [];
            var ncartas = cartas.find(carta => carta.email === usuariologueado.email);
            if (ncartas === undefined){
              alert("Has eliminado todas tus cartas");
              pop_up_cartas.style.display = "none";
            }
          }
        
    }
});

//FUNCIÓN PARA EL DRAG AND DROP DE LAS CARTAS
function activarDragAndDrop() {
  const cards = document.querySelectorAll('.cartas');
  const container = document.getElementById('cartas_container');
  let draggedElement = null; 

  //PARA CADA CARTA SE INICIA EL DRAG START (cuando el usuario empieza a arrastrar la carta)
  cards.forEach(card => {
    card.addEventListener('dragstart', () => {
      draggedElement = card;
      card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
      draggedElement = null;
      card.classList.remove('dragging');
    });
  });

  
  //Evento para poder mover la carta y actualizar su posición en el Container
  container.addEventListener('dragover', (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto

    const afterElement = getDragAfterElement(container, e.clientX);
    if (afterElement == null) {
      container.appendChild(draggedElement);
    } else {
      container.insertBefore(draggedElement, afterElement);
    }
  });

  //Función que encuentra la posición más cercana donde se debe colocar la carta (Drop)
  function getDragAfterElement(container, x) {
    const draggableElements = [...container.querySelectorAll('.cartas:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}





//Funcionalidad de modo padres
var modo_padres = document.getElementById("MODO_PADRES");
var popup_padres = document.getElementById("popup-modo_padres");
var close_padres = document.getElementById("close-padres");
modo_padres.onclick = function() {
  popup_padres.style.display = "block";

}

if (close_padres){
  close_padres.onclick = function(){
    popup_padres.style.display = "none";
  }
}
// Manejamos el botón de cancelar inicio
var cancelar_modo_padres = document.getElementById("modo_padres-cancel");

if (cancelar_modo_padres) {
  cancelar_modo_padres.onclick = function() {
    popup_padres.style.display = "none";
  }
}

// Manejamos el botón de entrar en modo padres
var entrar_modo_padres = document.getElementById("entrar-padres");

if (entrar_modo_padres) {
  entrar_modo_padres.onclick = function(event) {
    event.preventDefault();
    var username = document.getElementById("username-padres").value;
    var password = document.getElementById("password-padres").value;

    var users = JSON.parse(localStorage.getItem("users")) || [];
    var user = users.find(user => user.username === username && user.password === password);

    if (user) {
      alert("Modo padres activado");
      localStorage.setItem('modoPadres', JSON.stringify(true));
      popup_padres.style.display = "none";
      // Llama a la función updateHomeImage para actualizar la imagen del home
      updateHomeBackground();
      updateNavbar();
    } else {
      alert("Nombre de usuario o contraseña incorrectos");
    }
  }
}

//Manejamos el botón de modo niños
var modo_ninos = document.getElementById("MODO_NINOS");
modo_ninos.onclick = function(){
  localStorage.setItem("modoPadres", JSON.stringify(false));
  updateHomeBackground();
  updateNavbar();}




}
);