
document.addEventListener("DOMContentLoaded", function() {
    updateHomeBackground();
    updateNavbar();
    const popupVideollamada = document.getElementById("popup-videollamada-modo-padres");
    const closeVideollamada = document.getElementById("close-videollamada");
    
    const videoContainer = document.getElementById("video-container");
    const videoElement = document.getElementById("papa-noel-video");
    const videoSource = document.getElementById("video-source");

const videos = [
    "../videos/video_1.mp4",
    "../videos/video2.mp4",
    "../videos/video3.mp4",
    "../videos/video4.mp4",
    
    // Añade más URLs de vídeos aquí
];
function getRandomVideo() {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
}

document.getElementById("boton_videollamada").onclick = function() {
    var modoPadres = JSON.parse(localStorage.getItem("modoPadres"));
    if (!modoPadres) {
        alert("Debes activar el modo padres para acceder a esta función");
        return;
    }
    popupVideollamada.style.display = "block";
    const randomVideo = getRandomVideo();
        videoSource.src = randomVideo;
        videoElement.load();
        videoElement.play();
        videoContainer.style.display = "block";
}

closeVideollamada.onclick = function() {
    popupVideollamada.style.display = "none";
    videoContainer.style.display = "none";
    videoElement.pause();
}




window.onclick = function(event) {
    if (event.target == popupVideollamada) {
        popupVideollamada.style.display = "none";
        videoContainer.style.display = "none";
        videoElement.pause();
    }
}
});