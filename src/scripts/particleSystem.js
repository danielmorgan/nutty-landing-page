// Constants
const NUM_PARTICLES = 5;
const PARTICLE_LIFESPAN = 3000; // milliseconds
const PARTICLE_SIZE_MIN = 20; // px
const PARTICLE_SIZE_MAX = 40; // px
const GRAVITY = 0.5; // pixels/frame^2
const HORIZONTAL_DRIFT_MAX = 2; // pixels/frame
const ROTATION_SPEED_MAX = 5; // degrees/frame
const SPRITE_URL = "/images/acorn-sticker.png"; // Relative to public folder

let particleContainer;

function createParticleContainer() {
  if (document.getElementById("particle-container")) {
    particleContainer = document.getElementById("particle-container");
    return;
  }
  particleContainer = document.createElement("div");
  particleContainer.id = "particle-container";
  particleContainer.style.position = "fixed";
  particleContainer.style.top = "0";
  particleContainer.style.left = "0";
  particleContainer.style.width = "100vw";
  particleContainer.style.height = "100vh";
  particleContainer.style.pointerEvents = "none"; // Allow clicks to pass through
  particleContainer.style.overflow = "hidden";
  particleContainer.style.zIndex = "9999";
  document.body.appendChild(particleContainer);
}

function createParticle(startX, startY) {
  const particle = document.createElement("img");
  particle.src = SPRITE_URL;
  particle.style.position = "absolute";
  particle.style.willChange = "transform, opacity";

  const size = Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  let x = startX - size / 2;
  let y = startY - size / 2;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  let vy = Math.random() * -5 - 5; // Initial upward velocity
  let vx = (Math.random() - 0.5) * HORIZONTAL_DRIFT_MAX * 2;
  let rotation = Math.random() * 360;
  let rotationSpeed = (Math.random() - 0.5) * ROTATION_SPEED_MAX * 2;

  particleContainer.appendChild(particle);

  const startTime = performance.now();

  function animate() {
    const elapsedTime = performance.now() - startTime;
    if (elapsedTime > PARTICLE_LIFESPAN || y > window.innerHeight) {
      particle.remove();
      return;
    }

    vy += GRAVITY;
    y += vy;
    x += vx;
    rotation += rotationSpeed;

    particle.style.transform = `translate(${x - (startX - size / 2)}px, ${y - (startY - size / 2)}px) rotate(${rotation}deg)`;
    particle.style.opacity = 1 - (elapsedTime / PARTICLE_LIFESPAN);

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

export function triggerAcornRain(event) {
  if (!particleContainer) {
    createParticleContainer();
  }

  const rect = event.target.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;

  for (let i = 0; i < NUM_PARTICLES; i++) {
    setTimeout(() => {
      createParticle(startX, startY);
    }, i * 50); // Stagger particle creation
  }
}
