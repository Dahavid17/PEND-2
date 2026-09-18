const video = document.querySelector("#camera");
const botao = document.querySelector("#botao");
const canvas = document.querySelector("#canvas");
const foto = document.querySelector("#foto");

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
})
.then(function(stream) {
    video.srcObject = stream;
})
.catch(function(error) {
    console.log("Não foi possível acessar a câmera.", error);
});

botao.addEventListener("click", function() {
    if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.log("A câmera ainda não está pronta.");
        return;
    }

    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;

    const contexto = canvas.getContext("2d");

    contexto.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    foto.src = canvas.toDataURL("image/png");
});