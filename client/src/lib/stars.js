// stars.js
// Based on: https://github.com/Danziger/starsjs
// A lightweight library to generate a rotating galaxy in a canvas.

class Stars {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = {
      speed: options.speed || 0.1,
      number: options.number || 500,
      width: options.width || window.innerWidth,
      height: options.height || window.innerHeight,
      ...options
    };

    this.stars = [];
    this.canvas.width = this.options.width;
    this.canvas.height = this.options.height;

    this.init();
    this.animate();
  }

  init() {
    for (let i = 0; i < this.options.number; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2,
        speed: (Math.random() + 0.5) * this.options.speed,
        opacity: Math.random()
      });
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let star of this.stars) {
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Simple rotation/movement to simulate a galaxy feel
      const dx = star.x - this.canvas.width / 2;
      const dy = star.y - this.canvas.height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) + (star.speed / (dist * 0.1 + 1));
      
      star.x = this.canvas.width / 2 + Math.cos(angle) * dist;
      star.y = this.canvas.height / 2 + Math.sin(angle) * dist;
      
      // Twinkle
      star.opacity += (Math.random() - 0.5) * 0.05;
      if (star.opacity < 0.1) star.opacity = 0.1;
      if (star.opacity > 1) star.opacity = 1;
    }
  }

  animate() {
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

export default Stars;
