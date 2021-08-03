const canvas = document.getElementById("myCanvas")
const {width, height} = canvas
const ctx = canvas.getContext("2d")
let x = width / 2
let y = height - 30
let dx = 2
let dy = -2

let ballRadius = 10

function colorMaker() { // 碰撞改变颜色
  return "#" + (function (color) {
    return (color += "0123456789abcdef"[Math.floor(Math.random() * 16)])
    && (color.length === 6) ? color : arguments.callee(color)
  })("")
}

//声明球板
const paddleHeight = 10
const paddleWidth = 75
let paddleX = (width - paddleWidth) / 2

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = "#0095DD"
  ctx.fill()
  ctx.closePath()
}

//按键
let rightPressed, leftPressed = false

function keyDownHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = true
  } else if (e.keyCode === 37) {
    leftPressed = true
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 39) {
    rightPressed = false
  } else if (e.keyCode === 37) {
    leftPressed = false
  }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)


function drawBall(color) {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = `${color}` || "#0095DD"
  ctx.fill()
  ctx.closePath()
}

function draw() {
  ctx.clearRect(0, 0, width, height)
  const color = function () {
    if ((dx > 0 && x + ballRadius === width) || (dx < 0 && x - ballRadius === 0) || (dy > 0 && y + ballRadius === height) || (dy < 0 && y - ballRadius === 0)) {
      return colorMaker()
    }
  }()
  drawBall(color)
  drawPaddle();
  if (y + dy > height - ballRadius || y + dy < ballRadius) {
    dy = -dy
  }
  if (x + dx > width - ballRadius || x + dx < ballRadius / 2) {
    dx = -dx
  }
  x += dx
  y += dy

  if(rightPressed&&paddleX<width-paddleWidth){
    paddleX+=7
  }
  else if(leftPressed&&paddleX>0){
    paddleX-=7
  }
}

setInterval(draw, 10)