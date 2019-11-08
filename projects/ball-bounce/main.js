// Global Canvas Variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

/*--- Utility Functions ---*/
// Mouse Event
let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

// Mouse Event Listener
addEventListener("mousemove", function(event) {
    let mousePos = getMousePos(event);
    mouse.x = mousePos.x;
    mouse.y = mousePos.y;
});

// GetDistance
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

// RandomIntFromRange
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Rotate Velocities
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

// Collision Resolver
function resolveCollision(particle, otherParticle) {
    // Uses one-dimensional newtonian equation
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

/*--- Classes ---*/
let globalGravity = 0.02

// a class for a simple wall
class Wall {
    // Constructor
    constructor (x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    // draw() - draws the wall on screen

}

// A class for a simple ball
class Ball {
    // Constructor for class Ball
    constructor (x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.mass = 1;
        this.radius = radius;
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        };
        this.color = color;
        this.opacity = 0;
        this.currentDistance = getDistance(this.x,this.y,mouse.x,mouse.y);
        this.nextDistance = getDistance(this.x+this.velocity.x,this.y+this.velocity.y,mouse.x,mouse.y);
    }

    // draw() - draws the ball on screen
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.strokeStyle = this.color;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.stroke();
        ctx.closePath();
    }

    // update() - updates position of the ball in each frame
    update(objects) {
        this.draw();

        for (let i = 0; i < objects.length; i++) {
            if (this === objects[i]) continue;
            if (getDistance(this.x, this.y, objects[i].x, objects[i].y) - this.radius*2 < 0) {
                resolveCollision(this,objects[i])
            }
        }

        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocity.y = -this.velocity.y;
        }

        // Mouse Collision Detection
        if (getDistance(this.x, this.y, mouse.x, mouse.y) < 120 && this.opacity < 0.2) {
            this.opacity += 0.02;

            this.currentDistance = getDistance(this.x,this.y,mouse.x,mouse.y);
            this.nextDistance = getDistance(this.x+this.velocity.x,this.y+this.velocity.y,mouse.x,mouse.y);

            if (this.nextDistance < this.currentDistance) {
                this.velocity.y = -this.velocity.y;
                this.velocity.x = -this.velocity.x;
            }
        } else if (this.opacity > 0) {
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity);
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

/*-- Init and Animate --*/
// Main init
let objects;

function init() {
    objects = [];

    for (let i = 0; i < 250; i++) {
        const radius = 12;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        const color = '#92c9b1';

        if (i != 0) {
            for (let j = 0; j < objects.length; j++) {
                if (getDistance(x, y, objects[j].x, objects[j].y) - radius*2 < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);

                    j = -1;
                }
            }
        }
        objects.push(new Ball(x, y, radius, color));
    }
}

// Main animate function
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#172a3a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    objects.forEach(object => {
        object.update(objects);
    });

    // Animation Frame
    requestAnimationFrame(animate);
}

init();
animate();