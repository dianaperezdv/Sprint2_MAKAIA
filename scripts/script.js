import { videos } from "../data/data.js"


//Imprimir cards
const printVideos = (listaVideos, container) => {
    container.innerHTML = '';
    listaVideos.forEach(video => {
    const article = document.createElement('article');
    article.classList.add('main_videos');
    article.innerHTML = `
    <figure class="card_video">
    <img src=${video.miniatura} alt="miniatura video" class="video_miniatura" id=${video.id}>
        </figure>
        <h4 class="video_titulo">${video.titulo}</h4>
        <h5 class="video_canal">${video.canal}</h5>
        <h6 class="video_views">${video.views}</h6>
    `
    container.appendChild(article);
});
};


//Data en Sesión
const main = document.querySelector('.main');
const contenedorVideos = document.getElementById('contenedorVideos');
let videosGuardados = sessionStorage.getItem("videosGuardados")
    ? JSON.parse(sessionStorage.getItem("videosGuardados"))
    : [];
document.addEventListener("DOMContentLoaded", () => {
    if (videosGuardados.length === 0) {
    sessionStorage.setItem("videosGuardados", JSON.stringify(videos));
    videosGuardados = JSON.parse(sessionStorage.getItem("videosGuardados"));
    }
    printVideos(videosGuardados, contenedorVideos);
})



//Filtros
const botonAll = document.getElementById('all');
const botonPeliculas = document.getElementById('peliculas');
const botonMusica = document.getElementById('musica');
const botonConferencia = document.getElementById('conferencia');

const botonesFiltros = [botonAll, botonPeliculas, botonMusica, botonConferencia];

botonesFiltros.forEach(button => {

    button.addEventListener("click",(event) =>{
    let videosFiltrados = [];
    if(button.id === "all") {
        videosFiltrados = videosGuardados;
    }
    else {
        videosFiltrados = videosGuardados.filter(video => video.categoria === button.id);
    }
    printVideos(videosFiltrados, contenedorVideos);
    });
});


document.addEventListener("click", (event) => {

    const { target } = event;
    if(target.classList.contains("video_miniatura")){
        sessionStorage.setItem("videoPlayer", JSON.stringify(target.id));
        window.location.href = "../paginas/reproductor.html";
    }
    });