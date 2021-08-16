const canvas = document.getElementById("myCanvas")
const {width, height} = canvas
const ctx = canvas.getContext("2d")
//声明球
let x = width / 2
let y = height - 30
let dx = 2
let dy = -2
let ballRadius = 10
let color = "#0095dd"
//声明球板
const paddleHeight = 5
const paddleWidth = 200
let paddleX = (width - paddleWidth) / 2
let id
let start = true

//声明砖块
let brickRowCount = 5
let brickColumnCount = 6
let brickWidth = 65
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 20

let bricks = [] //砖块二维数组
function initBricks (){
  for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: (c*(brickWidth+brickPadding))+brickOffsetLeft, y: (r*(brickHeight+brickPadding))+brickOffsetTop, visible:true };
    }
  }
}
initBricks()

function drawBricks(){
  for(let c=0;c<brickColumnCount;c++){
    for(let r=0;r<brickRowCount;r++){
     /* const brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft
      const brickY = (r*(brickHeight+brickPadding))+brickOffsetTop
      bricks[c][r].x=brickX
      bricks[c][r].y=brickY*/
      const brick = bricks[c][r]
      if(brick.visible){
        ctx.beginPath()
        ctx.rect(brick.x,brick.y,brickWidth,brickHeight)
        ctx.fillStyle = "#0095dd"
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}


function colorMaker() { // 碰撞改变颜色
  console.log("colorMaker")
  return "#" + (function (color) {
    return (color += "0123456789abcdef"[Math.floor(Math.random() * 16)])
    && (color.length === 6) ? color : arguments.callee(color)
  })("")
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = "#0095dd"
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
// 撞击侦测函数
function collisionDetection(){
  for(let c=0;c<brickColumnCount;c++){
    for(let r=0;r<brickRowCount;r++){
      const b = bricks[c][r]
      if(b.visible){
        if(x>b.x&&x<b.x+brickWidth&&y>b.y&&y<b.y+brickHeight){
          dy=-dy
          b.visible = false
          color = colorMaker()
        }
      }
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)


function drawBall(color) {
  drawBricks()
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = `${color}` || "#0095DD"
  ctx.fill()
  ctx.closePath()
}

function draw() {
  ctx.clearRect(0, 0, width, height)
  drawPaddle()
  collisionDetection()
  drawBall(color)
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > height - ballRadius+paddleHeight) {
    if (x > paddleX  && x < paddleX+paddleWidth) {
      dy = -dy
    } else {
      start && alert("gg")
      start = false
      clearInterval(id)
    }
  }
  if (x + dx > width - ballRadius || x + dx < ballRadius / 2) {
    dx = -dx
  }
  x += dx
  y += dy

  if (rightPressed && paddleX < width - paddleWidth) {
    paddleX += 7
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7
  }
}

reload = () => {
  clearInterval(id)
  x = width / 2
  y = height - 30
  dx = 2
  dy = -2
  ballRadius = 10
//声明球板
  paddleX = (width - paddleWidth) / 2
  initBricks()
  draw()
  id = setInterval(draw, 10)
  return start = true
}
id = start && setInterval(draw, 10)