import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

type Dot = { ox: number; oy: number; x: number; y: number };

const COLS = 18;
const ROWS = 9;
const RADIUS = 92;
const FORCE = 38;

export const MagneticGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pointer = { x: -9999, y: -9999, inside: false };
    let dots: Dot[] = [];
    let raf = 0;
    let running = true;

    const restColor = isDarkMode
      ? { r: 255, g: 255, b: 255, a: 0.2 }
      : { r: 17, g: 24, b: 39, a: 0.18 };
    const hotColor = isDarkMode
      ? { r: 255, g: 255, b: 255, a: 0.95 }
      : { r: 17, g: 24, b: 39, a: 0.92 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const padX = 18;
      const padY = 18;
      const gapX = (width - padX * 2) / (COLS - 1);
      const gapY = (height - padY * 2) / (ROWS - 1);
      dots = [];
      for (let row = 0; row < ROWS; row += 1) {
        for (let col = 0; col < COLS; col += 1) {
          const x = padX + col * gapX;
          const y = padY + row * gapY;
          dots.push({ ox: x, oy: y, x, y });
        }
      }
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.inside = true;
    };

    const onLeave = () => {
      pointer.inside = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const tick = () => {
      if (!running) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      for (const dot of dots) {
        const dx = pointer.x - dot.ox;
        const dy = pointer.y - dot.oy;
        const dist = Math.hypot(dx, dy);
        let tx = dot.ox;
        let ty = dot.oy;
        let influence = 0;

        if (pointer.inside && dist < RADIUS && dist > 0.001) {
          influence = 1 - dist / RADIUS;
          const push = FORCE * influence;
          tx = dot.ox - (dx / dist) * push;
          ty = dot.oy - (dy / dist) * push;
        }

        dot.x += (tx - dot.x) * 0.18;
        dot.y += (ty - dot.y) * 0.18;

        const a = restColor.a + (hotColor.a - restColor.a) * influence;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${hotColor.r}, ${hotColor.g}, ${hotColor.b}, ${a})`;
        ctx.arc(dot.x, dot.y, 1.5 + influence * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerenter', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('pointerdown', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerenter', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onMove);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full cursor-crosshair touch-none"
      aria-label="Magnetic dot field. Move your pointer to push the dots aside."
    />
  );
};
