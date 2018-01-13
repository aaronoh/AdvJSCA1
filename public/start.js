
function setup() {
    let cnv = createCanvas(900,700);
    cnv.parent('sketch-holder');

}

function draw() {
    background(40)
    var canvas = document.getElementById("defaultCanvas0");
    var ctx = canvas.getContext("2d");
    ctx.font = "50px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Space Invaders", width / 2 - 160, height / 2 - 100);
    ctx.fillText("Click to Begin!", width / 2 - 150, height / 2);
}
