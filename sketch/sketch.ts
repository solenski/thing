const circle_diameter = 800;
const number_of_lines = 50;
const lines: { start_x: number; start_y: number; end_x: number; end_y: number; }[] = []
let background_color: p5.Color;
let foreground_color: p5.Color;
let animation_angle = 0;
let animation_index = 0;
let random_point_in_the_circle: { x: number, y: number };
let isBackgroundDrawn = false;


function setup() {
  background_color = color("#f4f5f6");
  foreground_color = color("#c399de")
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER).noFill().frameRate(30);
  background(background_color);
  random_point_in_the_circle = {
    x: random(-1 * circle_diameter / 4, circle_diameter / 4),
    y: random(-1 * circle_diameter / 4, circle_diameter / 4)
  }

  translate(width / 2, height / 2);
  for (let angle = 0; angle <= 2 * PI; angle += PI / 36) {
    const l =
    {
      start_x: random_point_in_the_circle.x,
      start_y: random_point_in_the_circle.y,
      end_x: Math.cos(angle) * circle_diameter / 2,
      end_y: Math.sin(angle) * circle_diameter / 2
    }
    lines.push(l)
  }
}

function drawRotatedByMidpoint(l: { end_x: number; start_x: number; end_y: number; start_y: number; }, angle: number) {
  push()
  const midpoint = {
    x: (l.end_x + l.start_x) / 2,
    y: (l.end_y + l.start_y) / 2
  }
  translate(midpoint.x, midpoint.y)
  rotate(animation_angle)
  line(l.start_x - midpoint.x, l.start_y - midpoint.y, l.end_x - midpoint.x, l.end_y - midpoint.y);
  pop()
}


function draw() {
  translate(width / 2, height / 2);
  stroke(foreground_color)
  circle(0, 0, circle_diameter)
  point(random_point_in_the_circle.x, random_point_in_the_circle.y, 1)
  if (isBackgroundDrawn) {
    animateRotation();
  } else {
    drawBackground();
  }
}

function animateRotation() {
  background(background_color);
  circle(0, 0, circle_diameter);
  point(random_point_in_the_circle.x, random_point_in_the_circle.y, 1);
  lines.forEach(l => {
    drawRotatedByMidpoint(l, animation_angle);
    if (animation_angle <= PI / 2)
      animation_angle = lerp(animation_angle, PI / 2, 0.001);
  });
}

function drawBackground() {
  const l = lines[animation_index]
  if (l) {
    line(l.start_x, l.start_y, l.end_x, l.end_y);
    animation_index++;
  }
  else {
    animation_index = 0;
    isBackgroundDrawn = true;
  }
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
