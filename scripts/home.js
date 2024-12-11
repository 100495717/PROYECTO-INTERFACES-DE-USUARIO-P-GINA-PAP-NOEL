document.addEventListener("DOMContentLoaded", function(){

    //Función para el contador de la cuenta atrás
    function updateCountdown(){
      const targetDate = new Date("2024-12-24T23:59:59").getTime();
      const hoy = new Date().getTime();
      const diff = targetDate - hoy;
    
      const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diff % (1000 * 60)) / 1000);
    
      document.getElementById("cuentaatras").innerHTML = dias + "d " + horas + "h " + minutos + "m " + segundos + "s ";
    
      if (diff < 0) {
        document.getElementById("cuentaatras").innerHTML = "FELIZ NAVIDAD";
      }
    }
    
    const interval = setInterval(updateCountdown, 1000);
    
    updateHomeBackground();
    updateNavbar();
});