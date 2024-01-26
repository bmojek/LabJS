var canvas = document.getElementById("myCanvas");
var start = document.getElementById("startBtn");
var reset = document.getElementById("resetBtn");
var quantity = document.getElementById("ilosc");
var ctx = canvas.getContext("2d");
var numBalls = 50;
var ballDistance = 100;
var balls = [];
var interval = null;
var mouse = { x: 0, y: 0 };
var repulsionForce = -2; // Siła odpychania

function createBalls() {
  for (var i = 0; i < numBalls; i++) {
    balls.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      radius: 10,
    });
  }
}

function draw() {
  quantity.innerHTML = `Ilość kulek: ${balls.length}`;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < balls.length; i++) {
    var ball = balls[i];
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.dy = -ball.dy;
    }

    //odpychanie
    var distanceToMouse = Math.sqrt(
      Math.pow(ball.x - mouse.x, 2) + Math.pow(ball.y - mouse.y, 2)
    );

    if (distanceToMouse < ball.radius) {
      var angle = Math.atan2(ball.y - mouse.y, ball.x - mouse.x);

      var repulsionX = Math.cos(angle) * repulsionForce;
      var repulsionY = Math.sin(angle) * repulsionForce;
      ball.dx += repulsionX;
      ball.dy += repulsionY;
    }

    for (var j = i + 1; j < balls.length; j++) {
      var distance = Math.sqrt(
        Math.pow(balls[i].x - balls[j].x, 2) +
          Math.pow(balls[i].y - balls[j].y, 2)
      );
      if (distance < ballDistance) {
        ctx.beginPath();
        ctx.moveTo(balls[i].x, balls[i].y);
        ctx.lineTo(balls[j].x, balls[j].y);
        ctx.strokeStyle = "grey";
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}
//klikanie
canvas.addEventListener("click", function (event) {
  var mouseX = event.clientX - canvas.getBoundingClientRect().left;
  var mouseY = event.clientY - canvas.getBoundingClientRect().top;

  for (var i = 0; i < balls.length; i++) {
    var ball = balls[i];
    var distanceToClick = Math.sqrt(
      Math.pow(ball.x - mouseX, 2) + Math.pow(ball.y - mouseY, 2)
    );

    if (distanceToClick < ball.radius) {
      balls.splice(i, 1);
      for (var j = 0; j < 2; j++) {
        balls.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 4,
          dy: (Math.random() - 0.5) * 4,
          radius: 10,
        });
      }

      break;
    }
  }
});
start.addEventListener("click", () => {
  if (interval === null) {
    createBalls();
    interval = setInterval(draw, 1000 / 60);
  } else {
    clearInterval(interval);
    interval = null;
    balls = [];
  }
});

reset.addEventListener("click", () => {
  balls = [];
  createBalls();
  clearInterval(interval);
  interval = setInterval(draw, 1000 / 60);
});

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.clientX - canvas.getBoundingClientRect().left;
  mouse.y = e.clientY - canvas.getBoundingClientRect().top;
});

start.click();
