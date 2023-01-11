const form = document.querySelector("form");

let videosGuardados = sessionStorage.getItem("videosGuardados")
    ? JSON.parse(sessionStorage.getItem("videosGuardados"))
    : [];

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const valuesForm = Object.values(form);
    //Creamos un objeto con la información del formulario
    const newVideoInfo = {};
    newVideoInfo.id = videosGuardados.length + 1;
    valuesForm.forEach((valueInput) => {
        if (valueInput.id) {
            newVideoInfo[valueInput.id] = valueInput.value;
            }
});
    for(const key in newVideoInfo) {
        const infoNuevo = newVideoInfo[key];

        if(!infoNuevo) {
        alert("No ha diligenciado todo el formulario")
        return
    }
}
    //Agrego el video nuevo a la API
    //newVideo.id = videos.length + 1;
    videosGuardados.push(newVideoInfo);
    console.log(newVideoInfo);
//Actualizo la sesión
    sessionStorage.setItem("videosGuardados", JSON.stringify(videosGuardados));
    console.log(videosGuardados)
//Limpio cada campo del formulaio
    valuesForm.forEach(input => {
        if (input.id) {
            input.value = "";
        }
        })
        alert("Video agregado correctamente");
});

