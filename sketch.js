let ghost;
let enemies = [];
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;

function setup() {
  createCanvas(480, 360);
  spawnGhost();
  spawnEnemies();
}

function draw() {
  background(26, 26, 46);
  textFont('Courier New');
  
  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(0, 255, 200);
    textSize(22);
    textStyle(BOLD);
    text('GHOST HUNT\nCatch Orange, Avoid RED!\nClick to start', width / 2, height / 2);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255, 80, 120);
    textSize(22);
    textStyle(BOLD);
    text('Game over\nScore: ' + score + '\nClick to retry', width / 2, height / 2);
    return;
  }

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }

  if (frameCount % spawnEvery === 0) {
    spawnGhost();
    if (frameCount % 120 === 0) spawnEnemies(); // enemies move slower
  }
  
  drawGhost(ghost.x, ghost.y);
  
  for (let e of enemies) {
    drawEnemy(e.x, e.y);
  }

  textAlign(LEFT, TOP);
  fill(255, 210, 80);
  textSize(18);
  textStyle(BOLD);
  text('Score: ' + score, 12, 10);
  
  textAlign(RIGHT, TOP);
  fill(180, 150, 255);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    spawnEnemies();
    return;
  }
  
  // Hit ghost = +1
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
    return;
  }
  
  // Hit ENEMY = -2 (my own enemy logic)
  for (let e of enemies) {
    if (dist(mouseX, mouseY, e.x, e.y) < 30) {
      score = max(0, score - 2);
      e.x = random(40, width - 40);
      e.y = random(40, height - 40);
    }
  }
}

function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}

// MY OWN ENEMY SYSTEM
function spawnEnemies() {
  enemies = [];
  for (let i = 0; i < 2; i++) {
    enemies.push({ x: random(40, width - 40), y: random(40, height - 40) });
  }
}

function drawGhost(x, y) {
  noStroke();
  fill(255, 170, 50); // orange ghost - good
  ellipse(x, y, 60, 60);
  fill(40, 10, 60);
  ellipse(x - 12, y - 5, 12, 12);
  ellipse(x + 12, y - 5, 12, 12);
  fill(40, 10, 60);
  ellipse(x, y + 10, 20, 8);
}

// MY OWN ENEMY DESIGN - Red demon with horns
function drawEnemy(x, y) {
  noStroke();
  fill(220, 20, 60); // crimson red
  ellipse(x, y, 55, 55);
  
  // horns
  fill(100, 0, 0);
  triangle(x - 15, y - 20, x - 20, y - 35, x - 5, y - 20);
  triangle(x + 15, y - 20, x + 20, y - 35, x + 5, y - 20);
  
  // angry eyes
  fill(0);
  ellipse(x - 10, y - 2, 10, 10);
  ellipse(x + 10, y - 2, 10, 10);
  fill(255, 0, 0);
  ellipse(x - 10, y - 2, 4, 4);
  ellipse(x + 10, y - 2, 4, 4);
  
  // angry mouth
  fill(0);
  rect(x - 12, y + 10, 24, 4);
}




  
