
document.addEventListener("DOMContentLoaded", function() {
    updateHomeBackground();
    updateNavbar();
    
    var reservar = document.getElementsByClassName("btn-reservar");
    var popup_reserva = document.getElementById("popup-reserva-modo-padres");
    var popup_pagar = document.getElementById("popup-pago-modo-padres");
    if (reservar.length > 0) {
        reservar[0].onclick = function(event) {
            event.preventDefault();
            var modoPadres = JSON.parse(localStorage.getItem("modoPadres"));
            if (!modoPadres) {
                alert("Debes activar el modo padres para acceder a esta función");
                return;
            }
            else{

                popup_reserva.style.display = "block";
                var confirmar_reserva = document.getElementById("confirmar-reservar");
                var usuariologueado = JSON.parse(localStorage.getItem("usuariologueado"));
                var useremail = usuariologueado.email;
                confirmar_reserva.onclick = function(event) {
                    event.preventDefault();
                    var nombre = document.getElementById("nombre-reserva").value;
                    var apellidos = document.getElementById("apellidos-reserva").value;
                    var email = document.getElementById("email-reserva").value;
                    var telefono = document.getElementById("telefono-reserva").value;
                    var fecha = document.getElementById("fecha-reserva").value;
                    var experienciareserva= document.getElementById("experiencia-reserva").value;
                    if (nombre === "" || apellidos === "" || email === "" || telefono === "" || fecha === "" || experienciareserva === "") {
                        alert("Por favor, rellena todos los campos");
                        return;
                    }
                    if(email!==useremail){
                        alert("El email no coincide con el registrado");
                        
                      }
                
                    popup_reserva.style.display = "none";
                    popup_pagar.style.display = "block";
                }
                
               
                var cancelar_reserva = document.getElementById("reserva-cancel");
                cancelar_reserva.onclick = function(event){
                    event.preventDefault();
                    popup_reserva.style.display = "none";
                }
                
                var pagar = document.getElementById("pagar");
                pagar.onclick = function(event){
                    event.preventDefault();
                    var tarjeta = document.getElementById("tarjeta-reserva").value;
                    var cvv = document.getElementById("cvv-reserva").value;
                    var fecha_vencimiento = document.getElementById("caducidad-reserva").value;
                    if (tarjeta === "" || cvv === "" || fecha_vencimiento === "") {
                        alert("Por favor, rellena todos los campos");
                        return;
                    }
                    alert("Pago realizado con éxito");
                    popup_pagar.style.display = "none";
                    
                    var usuariologueado = JSON.parse(localStorage.getItem("usuariologueado"));
                    var username = usuariologueado.username;
                    var experiencia = document.getElementById("experiencia-reserva").value;

                    var experienciaData = {
                        username: username,
                        experiencia: experiencia
                    };
                    // Guardar la experiencia en localStorage
                    var experiencias = JSON.parse(localStorage.getItem("experiencias")) || [];
                    experiencias.push(experienciaData);
                    localStorage.setItem("experiencias", JSON.stringify(experiencias));
                }
                var cancelar_pago = document.getElementById("pago-cancel");
                cancelar_pago.onclick = function(){
                    popup_pagar.style.display = "none";
                };
                
            }

            
        }
    }
    
 // Mostrar el popup de "Mis experiencias"
 var misExperienciasBtn = document.getElementById("MIS_EXPERIENCIAS_BTN");
 var misExperienciasPopup = document.getElementById("misexperiencias-popup");
 misExperienciasBtn.onclick = function() {
     
     cargarExperiencias();
 }

 // Cargar y mostrar las experiencias almacenadas
 function cargarExperiencias() {
     var experienciasContainer = document.getElementById("experiencias_container");

     experienciasContainer.innerHTML = ""; // Limpiar el contenedor
     var experiencias = JSON.parse(localStorage.getItem("experiencias")) || [];
     var usuariologueado = JSON.parse(localStorage.getItem("usuariologueado"));
     var misExperiencias = experiencias.filter(experiencia => experiencia.username === usuariologueado.username);
     if (misExperiencias.length === 0) {
         alert("No tienes experiencias guardadas");
         return;
     }
     else{
        misExperienciasPopup.style.display = "block";
  
        misExperiencias.forEach(experienciaData => {
         var experienciaDiv = document.createElement("div");
         experienciaDiv.className = "experiencia col-12 col-s-8";
         experienciaDiv.innerHTML = `
             <div class="contenido-experiencia">
                 <div class="texto" draggable="true">
                     <p>Usuario: ${experienciaData.username}</p>
                     <p>Experiencia: ${experienciaData.experiencia}</p>
                     <button class="borrar-experiencia">BORRAR</button>
                     <button id="dejar-resena-btn">Dejar una reseña</button>
                     
                 </div>
             </div>
         `;
         experienciasContainer.appendChild(experienciaDiv);
     });
 }
}

// Borrar experiencias
var experienciasContainer = document.getElementById("experiencias_container");
experienciasContainer.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("borrar-experiencia")) {
        var experienciaDiv = event.target.closest(".experiencia"); // Encuentra el div que contiene la experiencia
        if (confirm("¿Estás seguro de que quieres eliminar la experiencia?")) {
            var experiencias = JSON.parse(localStorage.getItem("experiencias")) || [];
            var username = experienciaDiv.querySelector("p:nth-child(1)").textContent.split(": ")[1];
            var experiencia = experienciaDiv.querySelector("p:nth-child(2)").textContent.split(": ")[1];
            var index = experiencias.findIndex(exp => exp.username === username && exp.experiencia === experiencia);
            if (index !== -1) {
                experiencias.splice(index, 1); // Elimina la experiencia del array
                localStorage.setItem("experiencias", JSON.stringify(experiencias)); // Guarda el array actualizado
                experienciasContainer.removeChild(experienciaDiv); // Elimina la experiencia del DOM
            }
                
        }
    }
});

// Cerrar el popup de "Mis experiencias"
var closeExperiencias = document.getElementById("close-experiencias");
if (closeExperiencias) {
   closeExperiencias.onclick = function() {
       misExperienciasPopup.style.display = "none";
   }
 }



// Mostrar el popup de "Dejar una reseña"
var experienciasContainer = document.getElementById("experiencias_container");
experienciasContainer.addEventListener("click", function(event) {
    if (event.target && event.target.id === "dejar-resena-btn") {
        var dejarResenaPopup = document.getElementById("dejar-resena-popup");
        dejarResenaPopup.style.display = "block";
    }
});

// Cerrar el popup de "Dejar una reseña"
var closeResena = document.getElementById("close-resena");
if (closeResena) {
    closeResena.onclick = function() {
        var dejarResenaPopup = document.getElementById("dejar-resena-popup");
        dejarResenaPopup.style.display = "none";
    }
}

var closeReserva= document.getElementById("close-reserva");
if (closeReserva) {
    closeReserva.onclick = function() {
        var reserva_Popup = document.getElementById("popup-reserva-modo-padres");
        reserva_Popup.style.display = "none";
    }
}

// Guardar la reseña en localStorage
var resenaForm = document.getElementById("resena-form");
var dejarResenaPopup = document.getElementById("dejar-resena-popup");
if (resenaForm) {
    resenaForm.onsubmit = function(event) {
        event.preventDefault();
        var puntuacion = document.getElementById("puntuacion").value;
        var comentario = document.getElementById("comentario").value;
        var experiencia = document.getElementById("experiencia").value;
        var usuariologueado = JSON.parse(localStorage.getItem("usuariologueado"));
        var username = usuariologueado.username;
        var resenaData = {
            username: username,
            puntuacion: puntuacion,
            comentario: comentario,
            experiencia: experiencia
        };

        // Guardar la reseña en localStorage
        var resenas = JSON.parse(localStorage.getItem("resenas")) || [];
        resenas.push(resenaData);
        localStorage.setItem("resenas", JSON.stringify(resenas));

        alert("Reseña guardada");
        dejarResenaPopup.style.display = "none";
    }
}

// Mostrar el popup de "Mis reseñas"
var misresenasBtn = document.getElementById("MIS_RESENAS_BTN");
var misresenasPopup = document.getElementById("misresenas-popup");
misresenasBtn.onclick = function() {
    
    cargarResenas();
}

// Cargar y mostrar las experiencias almacenadas
function cargarResenas() {
    var resenasContainer = document.getElementById("resenas_container");

    resenasContainer.innerHTML = ""; // Limpiar el contenedor
    var resenas = JSON.parse(localStorage.getItem("resenas")) || [];
    var usuariologueado = JSON.parse(localStorage.getItem("usuariologueado"));
    var resenas = resenas.filter(resena => resena.username === usuariologueado.username);
    if (resenas.length === 0) {
        alert("No tienes ninguna reseña publicada. Puedes dejar una reseña en la sección 'Dejar una reseña', dentro de 'Mis experiencias'");
        return;
    }
    else{
       misresenasPopup.style.display = "block";
 
       resenas.forEach(function(resenaData) {
        var resenaDiv = document.createElement("div");
        resenaDiv.className = "resena col-12 col-s-8";
        resenaDiv.innerHTML = `
            <div class="contenido-experiencia">
                <div class="texto" draggable="true">
                    <p>Experiencia: ${resenaData.experiencia}</p>
                    <p>Puntuación: ${resenaData.puntuacion}</p>
                    <p>Comentario: ${resenaData.comentario}</p>
                    <button class="borrar-resena">BORRAR</button>
                </div>
            </div>
        `;
        resenasContainer.appendChild(resenaDiv);
    });
}
}


// Borrar reseñas
var resenasContainer = document.getElementById("resenas_container");
resenasContainer.addEventListener("click", function(event) {
    if (event.target && event.target.classList.contains("borrar-resena")) {
        var resenaDiv = event.target.closest(".resena"); // Encuentra el div que contiene la reseña
        if (confirm("¿Estás seguro de que quieres eliminar la reseña?")) {
            var resenas = JSON.parse(localStorage.getItem("resenas")) || [];
            var comentario = resenaDiv.querySelector("p:nth-child(3)").textContent.replace("Comentario: ", "");
            var index = resenas.findIndex(resena => resena.comentario === comentario);
            if (index !== -1) {
                resenas.splice(index, 1); // Elimina la reseña del array
                localStorage.setItem("resenas", JSON.stringify(resenas)); // Guarda el array actualizado
                resenasContainer.removeChild(resenaDiv); // Elimina la reseña del DOM
            }
        }
    }
});



// Cerrar el popup de "Mis reseñas"
var closeResenas = document.getElementById("close-resenas");
if (closeResenas) {
  closeResenas.onclick = function() {
      misresenasPopup.style.display = "none";
  }
}





});