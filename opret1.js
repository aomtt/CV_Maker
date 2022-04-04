var cnv;
let img;
let imgWidth;
let imgHeight;
let rx;
let ry;
let sizeX;
let sizeY;
let tempx;
let tempy;
let bb;
let cc;
let cc2;
let pg;
let nu = "null";


function preload() {
    img = loadImage("selena.jpg");
}

// Centering canvas
function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function setup() {

    bb = false;
    cc = 4;
    cc2 = 4;
    imgWidth = img.width;
    imgHeight = img.height;
    sizeX = 200;
    sizeY = 200;
    tempx = imgWidth / 2;
    tempy = imgHeight / 2;
    cnv = createCanvas(imgWidth, imgHeight);
    centerCanvas();

    button = createButton("Udskær billede")
    button.mouseClicked(snapImage);
    button.center();
    button.size(150, 30);
}

function draw() {
    image(img, 0, 0);
    rectMode(CENTER);
    rx = imgWidth / 2;
    ry = imgHeight / 2;



    // The stroke ic changed to zero to remove the intial crop ROI.
    strokeWeight(cc);
    stroke(255);

    rect(rx, ry, sizeX, sizeY); // Original crop ROI
    button.position(windowWidth / 2 - 75, windowHeight / 2 + imgHeight / 2);

    if (button.mouseIsPressed == true) {
        console.log("true");
    }

    // If mouse is pressed then remove old ROI and then create new ROI based on mouse location
    if (mouseIsPressed == true && (mouseX > 0 & mouseX < imgWidth & mouseY > 0 & mouseY < imgHeight)) { //Here we also check if mouse is inside image window. This way the ROI will not move with you when you click on the buttton.
        strokeWeight(4);
        noFill();
        rect(mouseX, mouseY, sizeX, sizeY);
        // Here we store the last known position of the ROI before mouse is realeased
        tempx = mouseX;
        tempy = mouseY;
        cc = 0;
    } else {
        // If mouse is not pressed then we print A ROI to the last known position of the mouse.
        strokeWeight(cc2);
        noFill();
        rect(tempx, tempy, sizeX, sizeY);
    }


    function windowResized() {
        centerCanvas();
    }
}

/// Add these lines below sketch to prevent scrolling on mobile
function touchMoved() {
    // do some stuff
    return false;
}

function snapImage() {
    cc2 = 0;
    finalx = tempx;
    finaly = tempy;
    cc = 0;

    console.log(windowWidth);
    console.log(windowHeight);

    let arr = img.get(finalx - 100, finaly - 100, sizeX, sizeY);
    arr.save("arr", "png");
}
