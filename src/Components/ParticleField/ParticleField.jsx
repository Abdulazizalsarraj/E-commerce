
import { useEffect, useRef } from 'react';

const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;


    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();


    class Particle {
      constructor(x, y, size, color, velocity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.friction = 0.98;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }

      update() {
        this.draw();
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.005;
      }
    }


    const particles = [];
    const colors = ['#6366f1', '#10b981', '#3b82f6', '#f59e0b', '#ec4899'];

    const createParticles = (x, y, count) => {
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 3 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const velocity = {
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 4
        };
        particles.push(new Particle(x, y, size, color, velocity));
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.fillStyle = 'rgba(17, 24, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);


      if (Math.random() < 0.1) {
        createParticles(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.floor(Math.random() * 3 + 1)
        );
      }

      particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        } else {
          particle.update();
        }
      });
    };


    animate();


    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleField;