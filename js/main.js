//Global Vars
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

//DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photoButton');
const clearButton = document.getElementById('clearButton');
const photoFilter = document.getElementById('photoFilter');

//Get Media Stream
navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then((stream) => {
        // Link to the video source
        video.srcObject = stream;
        video.play();
    })
    .catch((error) => console.log(error));