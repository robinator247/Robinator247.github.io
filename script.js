function clearCanvas () {
    context.clearRect(0, 0, 300, 300);
}

function neutralEyes () {
    context.beginPath();
        context.arc(100, 100, 5, 0, Math.PI*2, true);
    context.stroke();
    context.beginPath();
        context.arc(200, 100, 5, 0, Math.PI*2,true);
    context.stroke();
}

function neutralMouth () {
    context.beginPath();
        context.moveTo(75, 200);
        context.lineTo(225, 200);
    context.stroke();
}

function happyEyes () {
    context.beginPath();
        context.moveTo(95, 105);
        context.lineTo(100, 95);
        context.lineTo(105, 105);
        context.moveTo(195, 105);
        context.lineTo(200, 95);
        context.lineTo(205, 105);
    context.stroke();
}

function happyMouth () {
    context.beginPath();
        context.arc(150, 150, 100, Math.PI/4, 3 * Math.PI/4);
    context.stroke();
}

function neutralFace () {
    neutralEyes();
    neutralMouth();
}

function happyFace () {
    clearCanvas();
    happyMouth();
    happyEyes();
}

var canvas = document.getElementById("canvas");

if (canvas.getContext) {
    var context = canvas.getContext("2d");
    context.strokeStyle = "rgb(0,0,0)";
    context.lineWidth = "3";
    neutralFace();
    happy.addEventListener('click', happyFace, false);
}
else {
    window.alert("Canvas does not exist")
}