let ghost;
let score = 0;
let best = 0;
let secondsLeft = 30;
let game = "start";
let startTime;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-wrap");
  textFont("Space Grotesk");
  moveGhost();
}

function draw() {
  background("#171b32");

  // Moon, stars, and graveyard.
  noStroke();
  fill("#e6eec6");
  circle(width * 0.78, height * 0.25, 70);
  fill("#d7ed9f");
  for (let i = 0; i < 20; i++) {
    circle((i * 97) % width, (i * 53) % (height * 0.65), 2);
  }
  fill("#202944");
  rect(0, height * 0.82, width, height * 0.18);
  for (let i = 0; i < 8; i++) {
    rect(i * width / 8 + 12, height * 0.75, 24, height * 0.1, 12, 12, 0, 0);
  }

  if (game === "start") {
    showMessage("GRAVEYARD SHIFT", "Catch ghosts! Golden ghosts are worth 3 points.", "CLICK TO START");
  }

  if (game === "play") {
    secondsLeft = 30 - floor((millis() - startTime) / 1000);
    if (secondsLeft <= 0) game = "over";
    if (frameCount % 60 === 0) moveGhost();

    drawGhost();
    fill("#f0efe7");
    textAlign(LEFT, TOP);
    textSize(20);
    text("Score: " + score, 24, 90);
    textAlign(RIGHT, TOP);
    text("Time: " + max(0, secondsLeft), width - 24, 90);
  }

  if (game === "over") {
    best = max(best, score);
    showMessage("SHIFT OVER", "You caught " + score + " ghosts", "CLICK TO PLAY AGAIN");
    let bestLabel = document.getElementById("best-score");
    if (bestLabel) bestLabel.textContent = nf(best, 3);
  }
}

function showMessage(title, subtitle, button) {
  fill("#f0efe7");
  textAlign(CENTER, CENTER);
  textSize(min(48, width / 10));
  text(title, width / 2, height / 2 - 45);
  fill("#d7ed9f");
  textSize(18);
  text(subtitle, width / 2, height / 2 + 5);
  textSize(14);
  text(button, width / 2, height / 2 + 55);
}

function moveGhost() {
  ghost = {
    x: random(40, width - 40),
    y: random(height * 0.3, height * 0.72),
    golden: random() < 0.2
  };
}

function drawGhost() {
  fill(ghost.golden ? "#ffd27a" : "#eff4dd");
  ellipse(ghost.x, ghost.y, 56, 56);
  triangle(ghost.x - 28, ghost.y + 10, ghost.x, ghost.y + 30, ghost.x + 28, ghost.y + 10);
  fill("#34374a");
  circle(ghost.x - 9, ghost.y - 3, 6);
  circle(ghost.x + 9, ghost.y - 3, 6);
}

function mousePressed() {
  if (game !== "play") {
    score = 0;
    secondsLeft = 30;
    startTime = millis();
    game = "play";
    moveGhost();
  } else if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score += ghost.golden ? 3 : 1;
    moveGhost();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
