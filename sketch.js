let rectX = 20;
let rectY = 20;
let rectSpeedX = 0;
let rectSpeedY = 2;
let isDragging = false;

function setup() {
  createCanvas(1500, 810);
}

function draw() {
  background(220);
  fill(0);
  rect(rectX, rectY, 100, 100);

  // Update rectangle position
  if (!isDragging) {
    let gravity = 1;
    let drag = 1;
    let wind = 0;
    let up = createVector(0, 0);

    rectSpeedX *= drag; // Apply drag
    rectSpeedY += gravity; // Apply gravity
    rectSpeedY *= drag; // Apply drag

    rectSpeedX += wind; // Apply wind

    rectSpeedY += up.dot(createVector(rectSpeedX, rectSpeedY)) * -0.1; // Apply upward acceleration due to movement

    rectX += rectSpeedX;
    rectY += rectSpeedY;


    // Bounce off edges
    if (rectX < 0 || rectX > width - 100) {
      rectSpeedX *= -1;
    }
    if (rectY < 0 || rectY > height - 100) {
      rectSpeedY *= -1;
    }
  }
}

function mousePressed() {
  if (mouseX > rectX && mouseX < rectX + 100 && mouseY > rectY && mouseY < rectY + 100) {
    isDragging = true;
  }
}

function mouseDragged() {
  if (isDragging) {
    rectX = mouseX - 50;
    rectY = mouseY - 50;
  }
}

function mouseReleased() {
  isDragging = false;
}