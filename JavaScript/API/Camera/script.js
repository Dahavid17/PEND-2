navigator.mediaDevices.getUserMedia({
        video: true, audio: true
    })
.then(function(stream) {
    const video = document.querySelector("#camera");
    video.srcObject = stream;
})
.catch(function(error) {
    console.log("Nao foi possivel acessar a camera." , error);
});