// Copyright Robbie Thandi 2017

function clearCanvas () {
    context.clearRect(0, 0, 300, 300);
}

function randomInt(minimum, maximum) {
    // ceil and floor used to make it inclusive of minimum and maximum values respectively
    maximum = Math.floor(maximum);
    minimum = Math.ceil(minimum);
    return Math.random() * (1 + maximum - minimum) + minimum;
}

function getMouseXY(e) {
    var boundingRect = canvas.getBoundingClientRect();
    var offsetX = boundingRect.left;
    var offsetY = boundingRect.top;
    var w = (boundingRect.width-canvas.width)/2;
    var h = (boundingRect.height-canvas.height)/2;
    offsetX += w;
    offsetY += h;
// use clientX and clientY as getBoundingClientRect is used above
    var mx = Math.round(e.clientX-offsetX);
    var my = Math.round(e.clientY-offsetY);
    return {x: mx, y: my}; // return as an object
}
function checkChin(y) {
    return(y > 235 && y < 300)
}

function drawBeard(evt) {
    var mouse = getMouseXY(evt);
    if (checkChin(mouse.y)){
        for (i=0; i<500; i++){
            // Select random starting values
            var startX = randomInt(0, 300);
            var startY = randomInt(235, 300);
            // Select random finishing values
            var finishX = randomInt(startX - 20, startX + 20);
            // Goes from startY + 1 to startY + 20 to make sure they cannot be sideways
            var finishY = randomInt(startY + 1, startY + 20);
            context.beginPath();
                context.moveTo(startX, startY);
                context.lineTo(finishX, finishY);
            context.stroke();
        }
    }
}

function checkCircle(x, y, circleX, circleY, rad) {
    // check if click was in the circle
    return (Math.sqrt(Math.pow((x - circleX), 2) + Math.pow((y - circleY), 2)) < rad)
}

function wink (evt) {
    var mouse = getMouseXY(evt);
    // If current face has round eyes
    if (currentFace == "neutral" || currentFace == "frightened" || currentFace == "sad") {
        // If left eye was clicked
        if (checkCircle(mouse.x, mouse.y, 100, 100, 5)) {
            // Clear rectangle around the eye
            context.clearRect(90, 90, 20, 20);
            // Draw wink eye
            context.beginPath();
                context.moveTo(90, 97);
                context.lineTo(110, 103);
            context.stroke();
        }
        else if (checkCircle(mouse.x, mouse.y, 200, 100, 5)) {
            // Clear rectangle around the eye
            context.clearRect(190, 90, 20, 20);
            // Draw wink eye
            context.beginPath();
                context.moveTo(210, 97);
                context.lineTo(190, 103);
            context.stroke();
        }
    }
}

function scream (evt) {
    var mouse = getMouseXY(evt);
    // If current face is frightened
    if (currentFace == "frightened"){
        // If mouth was clicked
        if (checkCircle(mouse.x, mouse.y, 150, 190, 40)){
            // Instantiate audio object
            // Sound taken from freesoundeffects.com Licence available here: https://www.freesoundeffects.com/licence.php
            var audio = new Audio ("audio/scream.mp3");
            // play audio
            audio.play();
        }
    }
}
function neutralEyes () {
    context.beginPath();
    // draw first eye
        context.arc(100, 100, 5, 0, Math.PI*2, true);
    context.stroke();
    context.beginPath();
    // Draw second eye
        context.arc(200, 100, 5, 0, Math.PI*2,true);
    context.stroke();
}

function neutralMouth () {
    // Draw straight line from left to right
    context.beginPath();
        context.moveTo(75, 200);
        context.lineTo(225, 200);
    context.stroke();
}

function happyEyes () {
    context.beginPath();
        // Draw first eye
        context.moveTo(95, 105);
        context.lineTo(100, 95);
        context.lineTo(105, 105);
        // Draw second eye
        context.moveTo(195, 105);
        context.lineTo(200, 95);
        context.lineTo(205, 105);
    context.stroke();
}

function happyMouth () {
    // Draws circle on lower part of canvas
    context.beginPath();
        context.arc(150, 100, 100, Math.PI/4, 3 * Math.PI/4);
    context.stroke();
}

function angryEyes () {
    context.beginPath();
        // Draw first eye
        context.moveTo(95, 95);
        context.lineTo(105, 105);
        // Draw second eye
        context.moveTo(195, 105);
        context.lineTo(205, 95);
    context.stroke();
}

function angryMouth () {
    context.beginPath();
    // Draw squiggly line on lower section of canvas
        context.moveTo(75, 205);
        context.lineTo(85, 195);
        context.lineTo(95, 205);
        context.lineTo(105, 195);
        context.lineTo(115, 205);
        context.lineTo(125, 195);
        context.lineTo(135, 205);
        context.lineTo(145, 195);
        context.lineTo(155, 205);
        context.lineTo(165, 195);
        context.lineTo(175, 205);
        context.lineTo(185, 195);
        context.lineTo(195, 205);
        context.lineTo(205, 195);
        context.lineTo(215, 205);
    context.stroke();
}

function sadMouth () {
    // Draws upside down version of happy mouth
    context.beginPath();
        context.arc(150, 275, 100, 7 * Math.PI/4, 5 * Math.PI/4, true);
    context.stroke();
}

function frightenedMouth () {
    // Draws circle on lower section of canvas
    context.beginPath();
        context.arc(150, 190, 40, 0, Math.PI * 2,);
    context.stroke();
}

function neutralFace () {
    clearCanvas();
    neutralEyes();
    neutralMouth();
    currentFace = "neutral"
}

function happyFace () {
    clearCanvas();
    happyMouth();
    happyEyes();
    currentFace = "happy"
}

function angryFace () {
    clearCanvas();
    angryEyes();
    angryMouth();
    currentFace = "angry"
}

function sadFace () {
    clearCanvas();
    neutralEyes();
    sadMouth();
    currentFace = "sad"
}

function frightenedFace () {
    clearCanvas();
    neutralEyes();
    frightenedMouth();
    currentFace = "frightened"
}

var canvas = document.getElementById("canvas");

// Check that canvas exists
if (canvas.getContext) {
    var currentFace = "";
    var context = canvas.getContext("2d");
    // Set colour to black
    context.strokeStyle = "rgb(0,0,0)";
    context.lineWidth = "3";
    // Draw initial face
    neutralFace();
    // Add event listeners for each of the buttons
    happy.addEventListener('click', happyFace, false);
    angry.addEventListener('click', angryFace, false);
    sad.addEventListener('click', sadFace, false);
    frightened.addEventListener('click', frightenedFace, false);
    reset.addEventListener('click', neutralFace, false);
    // Add event listeners for each of the interactive canvas functions
    canvas.addEventListener('click', function (evt) {
        drawBeard(evt)
    }, false);
    canvas.addEventListener('click', function (evt) {
        wink(evt)
    }, false);
    canvas.addEventListener('click', function (evt) {
        scream(evt)
    }, false);
}
// If canvas does not exist alert user
else {
    window.alert("Canvas does not exist")
}