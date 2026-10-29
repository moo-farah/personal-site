import { useState, type PointerEvent } from 'react';
import { motion } from 'framer-motion';

const rings = [
  { count: 6, radius: 36, duration: 16, size: 6 },
  { count: 10, radius: 58, duration: 22, size: 5 },
  { count: 14, radius: 80, duration: 30, size: 4 },
];

export const OrbitRings = () => {
  const [tilt, setTilt] = useState({ x: 12, y: -16 });

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -26, y: px * 28 });
  };

  return (
    <div
      className="flex h-full items-center justify-center perspective-1000"
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 12, y: -16 })}
    >
      <motion.div
        className="relative h-44 w-44 preserve-3d"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 140, damping: 18 }}
      >
        <div className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900 dark:bg-white" />
        {rings.map((ring) => (
          <motion.div
            key={ring.radius}
            className="absolute inset-0"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: ring.duration, ease: 'linear' }}
          >
            <div
              className="absolute left-1/2 top-1/2 rounded-full border border-gray-300 dark:border-gray-600"
              style={{
                width: ring.radius * 2,
                height: ring.radius * 2,
                marginLeft: -ring.radius,
                marginTop: -ring.radius,
              }}
            />
            {Array.from({ length: ring.count }).map((_, index) => {
              const angle = (index / ring.count) * Math.PI * 2;
              const x = Math.cos(angle) * ring.radius;
              const y = Math.sin(angle) * ring.radius;
              return (
                <span
                  key={index}
                  className="absolute left-1/2 top-1/2 rounded-full bg-gray-800 dark:bg-gray-100"
                  style={{
                    width: ring.size,
                    height: ring.size,
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                />
              );
            })}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
