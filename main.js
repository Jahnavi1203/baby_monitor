video = "";
status1 = "";
objects = [];
song = "";


function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

 

function start(){
    objectDetector = ml5.objectDetector('cocossd', modlLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects"; 
}

function modlLoaded(){
    console.log("Model is Loaded");
    status1 = true;
    objectDetector.detect(video, gotResult);
    document.getElementById("heading")
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results); 
    objects = results;  
}

function draw(){
    image(video, 0, 0, 380, 380);
    song = loadSound('ringing_old_phone.mp3');
    if(status1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++){
            
            document.getElementById("number_objects").innerHTML = "Number of Objects detected are: " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == person){
                document.getElementById("status").innerHTML = "Status: Baby Detected";
                song.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Status: Baby Not Detecded";
                song.play();
            }
        }

        if(objects.length < 0){
            document.getElementById("status").innerHTML = "Status: Baby not Detected";
            song.play();
        }
    }
}
