video = "";
status = "";
object = "";

function preload() {
    
}


function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    video.loop();
    video.volume(1);
    video.rate(1);
}
function draw() {
    image(video, 0, 0, 480, 380);
}