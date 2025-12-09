import { useEffect, useRef } from 'react';
import { useThemeLogic } from '@/hooks/use-theme-logic';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type?: 'snow' | 'leaf' | 'ghost' | 'standard';
  rotation?: number;
  rotationSpeed?: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const { theme, isSnowing } = useThemeLogic();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);

      for (let i = 0; i < particleCount; i++) {
        let color = `hsl(${180 + Math.random() * 60}, 70%, 60%)`;
        let size = Math.random() * 2 + 1;
        let vx = (Math.random() - 0.5) * 0.5;
        let vy = (Math.random() - 0.5) * 0.5;
        let type: Particle['type'] = 'standard';
        let rotation = 0;
        let rotationSpeed = 0;

        if (isSnowing || theme === 'christmas') {
          type = 'snow';
          color = 'rgba(255, 255, 255, 0.8)';
          size = Math.random() * 3 + 1;
          vx = (Math.random() - 0.5) * 0.5;
          vy = Math.random() * 1 + 0.5; // Fall down
        } else if (theme === 'thanksgiving') {
          type = 'leaf';
          // Autumn colors: Orange, Red, Brown, Yellow
          const hue = Math.random() > 0.5 ? 20 + Math.random() * 30 : 0 + Math.random() * 20;
          color = `hsl(${hue}, 80%, 50%)`;
          size = Math.random() * 4 + 2;
          vx = (Math.random() - 0.5) * 1;
          vy = Math.random() * 1 + 0.5;
          rotation = Math.random() * 360;
          rotationSpeed = (Math.random() - 0.5) * 2;
        } else if (theme === 'halloween') {
          type = 'ghost';
          // Purple and Orange
          const isPurple = Math.random() > 0.5;
          color = isPurple ? `hsl(270, 70%, 60%)` : `hsl(30, 90%, 50%)`;
          size = Math.random() * 3 + 1;
        }

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx,
          vy,
          size,
          opacity: Math.random() * 0.5 + 0.2,
          color,
          type,
          rotation,
          rotationSpeed
        });
      }

      particlesRef.current = particles;
    };

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.type === 'snow' || particle.type === 'leaf') {
          // Reset to top if fell off bottom
          if (particle.y > canvas.height) {
            particle.y = -10;
            particle.x = Math.random() * canvas.width;
          }
          // Wrap sides
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.x < 0) particle.x = canvas.width;

          if (particle.type === 'leaf') {
            particle.rotation! += particle.rotationSpeed!;
            particle.x += Math.sin(Date.now() * 0.001 + particle.y * 0.01) * 0.5; // Sway
          }
        } else {
          // Standard/Halloween bounce behavior
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        }

        particle.opacity = 0.2 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.3;
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        if (particle.type === 'leaf') {
          ctx.rotate((particle.rotation! * Math.PI) / 180);
          // Draw Leaf shape (ellipse)
          ctx.beginPath();
          ctx.ellipse(0, 0, particle.size, particle.size / 2, 0, 0, Math.PI * 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
        }
        ctx.restore();

        ctx.fillStyle = particle.color.replace('60%)', `60%, ${particle.opacity})`);
        if (particle.type === 'snow') ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;

        ctx.fill();
      });

      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme, isSnowing]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
      data-testid="particle-background"
    />
  );
}