

let audio0;
let mediaRecorder;


export const recorder1 = () => {
    navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream)
            mediaRecorder.addEventListener("dataavailable", function (event) {
                console.log(event.data)
                audio0 = new Audio(window.URL.createObjectURL(event.data));
                audio0.autoplay = true;
            });
        });
}


export const start1 = () => {
    console.log("startR" , mediaRecorder.state)
    if (mediaRecorder.state !== 'recording') {
        mediaRecorder.start();
    }
}

export const stop1 = () => {
    console.log("stopR", mediaRecorder.state)
    if (mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
}
