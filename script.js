const STAR_BUTTON = document.getElementById('starButton');
const EFFECT_CONTAINER = document.getElementById('effectContainer');
const COLORS = ['#ff5d5d', '#ffce4f', '#58e8a1', '#61b6ff', '#ff7acd', '#ffd76c'];
const CONFETTI_SHAPES = ['circle', 'square', 'triangle'];
let exploded = false;

function createParticle(x, y, color, size, delay = 0) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.background = color;
  particle.style.opacity = '0';
  particle.style.transform = `translate(-50%, -50%) scale(0.5)`;
  particle.style.transition = `opacity 0.1s ease ${delay}s, transform 0.7s cubic-bezier(.25,.92,.47,1.14) ${delay}s`;
  EFFECT_CONTAINER.appendChild(particle);

  requestAnimationFrame(() => {
    const dx = (Math.random() - 0.5) * 240;
    const dy = (Math.random() - 0.85) * 240;
    const scale = 1 + Math.random() * 0.8;
    particle.style.opacity = '1';
    particle.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(${scale})`;
  });

  setTimeout(() => {
    particle.style.opacity = '0';
  }, 600 + delay * 1000);
  setTimeout(() => particle.remove(), 1000 + delay * 1000);
}

function createConfetti(x, y, delay = 0) {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  const size = 10 + Math.random() * 12;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size * 0.75}px`;
  confetti.style.left = `${x}px`;
  confetti.style.top = `${y}px`;
  confetti.style.background = color;
  confetti.style.opacity = '0';
  confetti.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
  confetti.style.animation = `confetti-fall 1.5s ease-out ${delay}s forwards`;
  EFFECT_CONTAINER.appendChild(confetti);

  setTimeout(() => confetti.remove(), 2000 + delay * 1000);
}

function createSpark(x, y, color, angle) {
  const spark = document.createElement('div');
  spark.className = 'spark';
  const size = 8 + Math.random() * 12;
  spark.style.width = `${size}px`;
  spark.style.height = `${size}px`;
  spark.style.left = `${x}px`;
  spark.style.top = `${y}px`;
  spark.style.background = color;
  spark.style.transform = `translate(-50%, -50%) scale(1)`;
  spark.style.animation = `spark-fly 0.9s ease-out forwards`;
  spark.style.filter = `drop-shadow(0 0 10px ${color})`;
  EFFECT_CONTAINER.appendChild(spark);

  setTimeout(() => spark.remove(), 900);
}

function createExplosion(x, y) {
  const count = 22;
  for (let i = 0; i < count; i += 1) {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = 16 + Math.random() * 14;
    createParticle(x, y, color, size, Math.random() * 0.15);
    createSpark(x, y, '#fffef0', i * 0.02);
  }

  for (let j = 0; j < 24; j += 1) {
    createConfetti(x, y, Math.random() * 0.2);
  }
}

function popStar() {
  if (exploded) return;
  exploded = true;

  const rect = STAR_BUTTON.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  STAR_BUTTON.classList.add('popped');
  setTimeout(() => STAR_BUTTON.classList.add('hidden'), 350);
  createExplosion(x, y);
}

STAR_BUTTON.addEventListener('click', popStar);
