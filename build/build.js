var circle_diameter = 800;
var number_of_lines = 50;
var lines = [];
var background_color;
var foreground_color;
var animation_angle = 0;
var animation_index = 0;
var random_point_in_the_circle;
var isBackgroundDrawn = false;
function setup() {
    background_color = color("#f4f5f6");
    foreground_color = color("#c399de");
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER).noFill().frameRate(30);
    background(background_color);
    random_point_in_the_circle = {
        x: random(-1 * circle_diameter / 4, circle_diameter / 4),
        y: random(-1 * circle_diameter / 4, circle_diameter / 4)
    };
    translate(width / 2, height / 2);
    for (var angle = 0; angle <= 2 * PI; angle += PI / 36) {
        var l = {
            start_x: random_point_in_the_circle.x,
            start_y: random_point_in_the_circle.y,
            end_x: Math.cos(angle) * circle_diameter / 2,
            end_y: Math.sin(angle) * circle_diameter / 2
        };
        lines.push(l);
    }
}
function drawRotatedByMidpoint(l, angle) {
    push();
    var midpoint = {
        x: (l.end_x + l.start_x) / 2,
        y: (l.end_y + l.start_y) / 2
    };
    translate(midpoint.x, midpoint.y);
    rotate(animation_angle);
    line(l.start_x - midpoint.x, l.start_y - midpoint.y, l.end_x - midpoint.x, l.end_y - midpoint.y);
    pop();
}
function draw() {
    translate(width / 2, height / 2);
    stroke(foreground_color);
    circle(0, 0, circle_diameter);
    point(random_point_in_the_circle.x, random_point_in_the_circle.y, 1);
    if (isBackgroundDrawn) {
        animateRotation();
    }
    else {
        drawBackground();
    }
}
function animateRotation() {
    background(background_color);
    circle(0, 0, circle_diameter);
    point(random_point_in_the_circle.x, random_point_in_the_circle.y, 1);
    lines.forEach(function (l) {
        drawRotatedByMidpoint(l, animation_angle);
        if (animation_angle <= PI / 2)
            animation_angle = lerp(animation_angle, PI / 2, 0.001);
    });
}
function drawBackground() {
    var l = lines[animation_index];
    if (l) {
        line(l.start_x, l.start_y, l.end_x, l.end_y);
        animation_index++;
    }
    else {
        animation_index = 0;
        isBackgroundDrawn = true;
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=../sketch/sketch/build.js.map