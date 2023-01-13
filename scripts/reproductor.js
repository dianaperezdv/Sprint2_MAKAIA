import { videos } from "../data/data.js"

document.getElementById('reproductor').src="";

const main = document.querySelector('.main');

const contenedorVideos = document.getElementById('contenedorVideos');

const idVideoStr = sessionStorage.getItem("videoPlayer")
    ? JSON.parse(sessionStorage.getItem("videoPlayer"))
    : null;

const idVideo = idVideoStr
    ? parseInt(idVideoStr)
    : null;

const videosGuardados = sessionStorage.getItem('videosGuardados')
    ? JSON.parse(sessionStorage.getItem("videosGuardados"))
    : [];

const video = idVideo
    ? videosGuardados.find((vid) => vid.id === idVideo)
    : {};


//cambiar el texto
document.getElementById('reproductor').src=video.link;

const title = document.getElementById("reproductor_titulo");
title.innerHTML = video.titulo;

const informacion = document.getElementById("reproductor_views");
informacion.innerHTML = video.views;

const description = document.getElementById("reproductor_description");
description.innerHTML = video.description;


//Recomendaciones
const printVideos = (listaVideos, container) => {
    container.innerHTML = "";
    listaVideos.forEach(video => {
        const article = document.createElement('article');
        /*article.classList.add('main_videos');*/
        article.innerHTML = `
            <figure class="card_recomendados">
            <img src=${video.miniatura} alt="miniatura video" class="card_miniatura">
            </figure>
            <section class="info_videos_sug">
            <h5 class="card_title">${video.titulo}</h5>
            <h5 class="card_info">${video.canal}</h5>
            <h5 class="card_info">${video.views}</h5>
            </section>
            `
        container.appendChild(article);
    });
};

document.addEventListener('DOMContentLoaded',()=>{
    let videosGuardados = sessionStorage.getItem('videosGuardados')
        ? JSON.parse(sessionStorage.getItem("videosGuardados"))
        : [];
    if(videosGuardados.length === 0) {
        sessionStorage.setItem('videosGuardados', JSON.stringify(videos));
        videosGuardados = JSON.parse(sessionStorage.getItem('videosGuardados'));
    }

    printVideos(videosGuardados, contenedorVideos);
})



document.addEventListener("click", (event) => {
    const { target } = event;
    if(target.classList.contains("img-logo")){
    window.location.href = "../index.html";
    }
});
document.addEventListener("click",(event)=>{
    const {target} = event;
    if(target.classList.contains("card_miniatura")){
        sessionStorage.setItem("videoPlayer",JSON.stringify(target.id));
        window.location.href="../paginas/reproductor.html"
    }
});