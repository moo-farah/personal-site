import { useCallback, useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

type Marble = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
};

const PALETTE = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b', '#f43f5e', '#10b981'];
const MAX_MARBLES = 24;
const GRAVITY = 0.28;
const BOUNCE = 0.72;
const FRICTION = 0.992;

export type MarblesHandle = {
  reset: () => void;
};

export const Marbles = forwardRef<MarblesHandle>(function Marbles(_, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const marblesRef = useRef<Marble[]>([]);
  const { isDarkMode } = useTheme();
  const darkRef = useRef(isDarkMode);
  darkRef.current = isDarkMode;

  const reset = useCallback(() => {
    marblesRef.current = [];
  }, []);

  useImperativeHandle(ref, () => ({ reset }), [reset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drop = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const r = 9 + Math.random() * 6;
      const marble: Marble = {
        x,
        y,
        vx: (Math.random() - 0.5) * 3.4,
        vy: Math.random() * 1.2,
        r,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      };
      marblesRef.current.push(marble);
      if (marblesRef.current.length > MAX_MARBLES) {
        marblesRef.current.shift();
      }
    };

    const collide = (marbles: Marble[]) => {
      for (let i = 0; i < marbles.length; i += 1) {
        for (let j = i + 1; j < marbles.length; j += 1) {
          const a = marbles[i];
          const b = marbles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.001;
          const minDist = a.r + b.r;
          if (dist >= minDist) continue;

          const nx = dx / dist;
          const ny = dy / dist;
          const overlap = minDist - dist;
          a.x -= nx * overlap * 0.5;
          a.y -= ny * overlap * 0.5;
          b.x += nx * overlap * 0.5;
          b.y += ny * overlap * 0.5;

          const dvx = b.vx - a.vx;
          const dvy = b.vy - a.vy;
          const along = dvx * nx + dvy * ny;
          if (along > 0) continue;
          a.vx += along * nx;
          a.vy += along * ny;
          b.vx -= along * nx;
          b.vy -= along * ny;
        }
      }
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      const marbles = marblesRef.current;

      for (const marble of marbles) {
        const onFloor = marble.y >= height - marble.r - 0.4;
        if (!onFloor) marble.vy += GRAVITY;
        marble.vx *= FRICTION;
        marble.x += marble.vx;
        marble.y += marble.vy;

        if (marble.x < marble.r) {
          marble.x = marble.r;
          marble.vx *= -BOUNCE;
        } else if (marble.x > width - marble.r) {
          marble.x = width - marble.r;
          marble.vx *= -BOUNCE;
        }

        if (marble.y > height - marble.r) {
          marble.y = height - marble.r;
          marble.vy *= -BOUNCE;
          marble.vx *= 0.96;
          if (Math.abs(marble.vy) < 0.5) marble.vy = 0;
          if (Math.abs(marble.vx) < 0.08) marble.vx = 0;
        } else if (marble.y < marble.r) {
          marble.y = marble.r;
          marble.vy *= -BOUNCE;
        }
      }

      collide(marbles);

      for (const marble of marbles) {
        ctx.beginPath();
        ctx.fillStyle = marble.color;
        ctx.globalAlpha = darkRef.current ? 0.92 : 0.88;
        ctx.arc(marble.x, marble.y, marble.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.arc(marble.x - marble.r * 0.28, marble.y - marble.r * 0.32, marble.r * 0.28, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    canvas.addEventListener('pointerdown', drop);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener('pointerdown', drop);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full cursor-pointer touch-none"
      aria-label="Marble pit. Click or tap to drop a marble."
    />
  );
});
