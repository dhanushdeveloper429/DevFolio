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
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const { theme, isSnowing } = useThemeLogic();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const isDark = document.documentElement.classList.contains('dark');

    // Theme Colors Configuration
    const getThemeColors = () => {
      if (isSnowing || theme === 'christmas') return ['255, 255, 255']; // White snow
      if (theme === 'halloween') return ['255, 100, 0', '147, 51, 234']; // Orange & Purple
      if (theme === 'thanksgiving') return ['234, 88, 12', '202, 138, 4']; // Orange & Gold
      return isDark ? ['0, 255, 255', '56, 189, 248'] : ['59, 130, 246', '37, 99, 235']; // Cyan/Sky (dark) vs Blue/DarkBlue (light)
    };

    const colors = getThemeColors();
    const isFalling = isSnowing || theme === 'christmas';

    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / (isFalling ? 8000 : 12000)); // More dense for snow

      for (let i = 0; i < particleCount; i++) {
        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: isFalling ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 0.3,
          vy: isFalling ? Math.random() * 1.5 + 0.5 : (Math.random() - 0.5) * 0.3,
          size: Math.random() * (isFalling ? 3 : 2) + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: colorBase,
        });
      }

      particlesRef.current = particles;
    };

    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        // Basic Movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse Interaction (Subtle Parallax/Repulsion)
        if (!isFalling) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) {
            const force = (200 - distance) / 200;
            const repulsionX = (dx / distance) * force * 0.5;
            const repulsionY = (dy / distance) * force * 0.5;
            particle.x -= repulsionX;
            particle.y -= repulsionY;
          }
        }

        // Boundary Logic
        if (isFalling) {
          // Reset to top if fell off bottom
          if (particle.y > canvas.height) {
            particle.y = -10;
            particle.x = Math.random() * canvas.width;
          }
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.x < 0) particle.x = canvas.width;
        } else {
          // Standard bounce
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Global Glow Effect for "High Quality" feel
      ctx.shadowBlur = isFalling ? 5 : 15;
      ctx.shadowColor = `rgba(${colors[0]}, 0.5)`;

      const showConnections = !isFalling;

      if (showConnections) {
        ctx.lineWidth = 0.5;
        // Optimization: Draw lines but don't overdo it
        for (let i = 0; i < particlesRef.current.length; i++) {
          const p1 = particlesRef.current[i];
          // Limit connection checks for performance
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p2 = particlesRef.current[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            // Taxi  dist check first for speed
            if (Math.abs(dx) > 150 || Math.abs(dy) > 150) continue;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              const opacity = (1 - distance / 150) * 0.15;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${p1.color}, ${opacity})`;
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        // Glowy circles/snowflakes
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.fill();
      });

      // Reset shadow for next frame to avoid performance hit if used elsewhere (though this is own canvas)
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  // Use a Tailwind gradient background as the base
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background/95 to-background/90" data-testid="particle-background-container">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50"></div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}