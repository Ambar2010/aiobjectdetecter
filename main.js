video = "";
status = "";
objects = [];
object_name = "";

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
    object_name = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
 
}
function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}
function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "") {
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++) 
        {
            
            document.getElementById("status").innerHTML = "Status : Object Detected";
      

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object_name) {
                document.getElementById("number_of_objects").innerHTML = object_name + " Found";
                var synth = window.speechSynthesis;
                speak_data = object_name + "Found";
                var utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
                video_webcamLiveView.stop();
            }
            else {
                document.getElementById("number_of_objects").innerHTML = object_name + " Not Found";
               
            }
            
        }
    }
}

