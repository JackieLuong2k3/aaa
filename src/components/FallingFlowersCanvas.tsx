import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swayAngle: number;
  swaySpeed: number;
  opacity: number;
  flutter: number;
}

export const FallingFlowersCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const createPetal = (randomY = false): Petal => {
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -25 - Math.random() * 40,
        size: Math.random() * 10 + 12,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.015,
        opacity: Math.random() * 0.35 + 0.55,
        flutter: Math.random() * 0.6 + 0.3
      };
    };

    // Exactly 40 delicate petals for smooth, elegant falling
    const count = 42;
    const petals: Petal[] = Array.from({ length: count }, () => createPetal(true));

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.swayAngle) * p.flutter, 1);
      ctx.globalAlpha = p.opacity;

      // Soft pink lotus / rose petal shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size * 0.6, -p.size * 0.5, -p.size * 0.8, p.size * 0.6, 0, p.size * 1.2);
      ctx.bezierCurveTo(p.size * 0.8, p.size * 0.6, p.size * 0.6, -p.size * 0.5, 0, 0);

      const grad = ctx.createLinearGradient(0, 0, 0, p.size * 1.2);
      grad.addColorStop(0, '#FFE4E6');   // soft rose blush
      grad.addColorStop(0.5, '#FB7185'); // gentle rose pink
      grad.addColorStop(1, '#E11D48');   // deep rose crimson

      ctx.fillStyle = grad;
      ctx.fill();

      // Subtle translucent vein highlight
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, 2);
      ctx.quadraticCurveTo(p.size * 0.08, p.size * 0.5, 0, p.size * 1.0);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swayAngle += p.swaySpeed;
        p.rotation += p.rotationSpeed;

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.swayAngle) * 0.75;

        // Respawn when fallen off screen
        if (p.y > height + 30 || p.x < -30 || p.x > width + 30) {
          petals[i] = createPetal(false);
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
