const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Center of the screen
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Ball properties
const ballRadius = 20;
let ball1 = {
    x: centerX - 150,
    y: centerY,
    vx: 0,
    vy: 0,
    dragging: false,
    lastX: centerX - 150,
    lastY: centerY
};
let ball2 = {
    x: centerX + 150,
    y: centerY,
    vx: 0,
    vy: 0,
    dragging: false,
    lastX: centerX + 150,
    lastY: centerY
};

// Spring properties
const springLength = 200;
const springConstant = 0.01;
const friction = 0.90; // Increased damping

// HTML elements for ball content
const ball1Content = document.getElementById("ball1-content");
const ball2Content = document.getElementById("ball2-content");

// Track mouse state
let isDragging = false;
let draggedBall = null;

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#3498db";
    ctx.fill();
    ctx.closePath();
}

function drawSpring(ball1, ball2) {
    ctx.beginPath();
    ctx.moveTo(ball1.x, ball1.y);
    ctx.lineTo(centerX, centerY);
    ctx.moveTo(ball2.x, ball2.y);
    ctx.lineTo(centerX, centerY);
    ctx.strokeStyle = "#2ecc71";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
}

function updatePosition(ball) {
    if (!ball.dragging) {
        const dx = centerX - ball.x;
        const dy = centerY - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = (distance - springLength) * springConstant;

        const ax = (dx / distance) * force;
        const ay = (dy / distance) * force;

        ball.vx += ax;
        ball.vy += ay;

        // Apply friction
        ball.vx *= friction;
        ball.vy *= friction;

        ball.x += ball.vx;
        ball.y += ball.vy;
    }
}

// Update position of the attached HTML elements
function updateBallContentPosition(ball, contentElement) {
    contentElement.style.left = `${ball.x - ballRadius}px`;
    contentElement.style.top = `${ball.y - ballRadius}px`;
}

// Mouse drag logic
function onMouseDown(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Check if the mouse is within either ball
    if (isMouseInBall(mouseX, mouseY, ball1)) {
        ball1.dragging = true;
        draggedBall = ball1;
    } else if (isMouseInBall(mouseX, mouseY, ball2)) {
        ball2.dragging = true;
        draggedBall = ball2;
    }

    if (draggedBall) {
        isDragging = true;
    }
}

function onMouseMove(e) {
    if (isDragging && draggedBall) {
        // Update velocity based on mouse movement
        draggedBall.vx = e.clientX - draggedBall.lastX;
        draggedBall.vy = e.clientY - draggedBall.lastY;

        // Update ball position to follow mouse
        draggedBall.x = e.clientX;
        draggedBall.y = e.clientY;

        // Store last mouse position
        draggedBall.lastX = e.clientX;
        draggedBall.lastY = e.clientY;
    }
}

function onMouseUp() {
    if (draggedBall) {
        draggedBall.dragging = false;
    }
    isDragging = false;
    draggedBall = null;
}

function isMouseInBall(mouseX, mouseY, ball) {
    const dist = Math.sqrt((mouseX - ball.x) ** 2 + (mouseY - ball.y) ** 2);
    return dist <= ballRadius;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update positions
    updatePosition(ball1);
    updatePosition(ball2);

    // Draw spring and balls
    drawSpring(ball1, ball2);
    drawBall(ball1);
    drawBall(ball2);

    // Update attached HTML elements
    updateBallContentPosition(ball1, ball1Content);
    updateBallContentPosition(ball2, ball2Content);

    requestAnimationFrame(animate);
}

// Event listeners for dragging
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);

animate();