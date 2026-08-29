'use client';

import React, { useMemo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import './OrbitImages.css';

function generateEllipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function generateCirclePath(cx: number, cy: number, r: number) {
  return generateEllipsePath(cx, cy, r, r);
}

interface OrbitItemProps {
  item: React.ReactNode;
  index: number;
  totalItems: number;
  path: string;
  itemSize: number;
  rotation: number;
  progress: any;
  fill: boolean;
}

function OrbitItem({ index, totalItems, path, itemSize, rotation, progress, fill, item }: OrbitItemProps) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;

  const offsetDistance = useTransform(progress, (p: number) => {
    const offset = (((p + itemOffset) % 100) + 100) % 100;
    return `${offset}%`;
  });

  return (
    <motion.div
      className="orbit-item"
      style={{
        width: itemSize,
        height: itemSize,
        offsetPath: `path("${path}")`,
        offsetRotate: '0deg',
        offsetAnchor: 'center center',
        offsetDistance,
      }}
    >
      <div style={{ transform: `rotate(${-rotation}deg)` }}>{item}</div>
    </motion.div>
  );
}

interface OrbitImagesProps {
  itemsList?: React.ReactNode[];
  images?: string[];
  altPrefix?: string;
  shape?: string;
  baseWidth?: number;
  radiusX?: number;
  radiusY?: number;
  radius?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: 'normal' | 'reverse';
  fill?: boolean;
  width?: number | string;
  height?: number | string;
  className?: string;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  easing?: string;
  paused?: boolean;
  centerContent?: React.ReactNode;
  responsive?: boolean;
}

export default function OrbitImages({
  itemsList,
  images = [],
  altPrefix = 'Orbiting image',
  shape = 'circle',
  baseWidth = 1400,
  radiusX = 700,
  radiusY = 170,
  radius = 300,
  rotation = -8,
  duration = 30,
  itemSize = 56,
  direction = 'normal',
  fill = true,
  width = '100%',
  height = 'auto',
  className = '',
  showPath = true,
  pathColor = 'rgba(245, 158, 11, 0.25)',
  pathWidth = 1.5,
  paused = false,
  centerContent,
  responsive = true,
}: OrbitImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const path = useMemo(() => {
  if (shape === 'ellipse') {
    return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
  }
  return generateCirclePath(designCenterX, designCenterY, radius);
}, [shape, designCenterX, designCenterY, radiusX, radiusY, radius]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) return;
    const controls = animate(progress, direction === 'reverse' ? -100 : 100, {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });
    return () => controls.stop();
  }, [progress, duration, direction, paused]);

  const rawItems = itemsList || images;
  const items = rawItems.map((item, index) => (
    <div
      key={index}
      className="flex items-center justify-center w-full h-full p-2 bg-slate-900/90 border border-slate-700/60 rounded-xl shadow-lg hover:border-amber-gold transition-colors"
    >
      {typeof item === 'string' ? (
        <img src={item} alt={`${altPrefix} ${index + 1}`} className="orbit-image" />
      ) : (
        item
      )}
    </div>
  ));

   return (
  <div
    ref={containerRef}
    className={`orbit-container ${className}`}
    style={{
      width: responsive ? '100%' : width,
      height: responsive ? '100%' : height,
      aspectRatio: responsive ? '16 / 7' : undefined, 
    }}
    aria-hidden="true"
  >
      <div
        className={responsive ? 'orbit-scaling-container orbit-scaling-container--responsive' : 'orbit-scaling-container'}
        style={{
          width: responsive ? baseWidth : '100%',
          height: responsive ? baseWidth : '100%',
          transform: responsive && scale !== null ? `translate(-50%, -50%) scale(${scale})` : undefined,
          visibility: responsive && scale === null ? 'hidden' : undefined,
        }}
      >
        <div className="orbit-rotation-wrapper" style={{ transform: `rotate(${rotation}deg)` }}>
          {showPath && (
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${baseWidth} ${baseWidth}`}
              className="orbit-path-svg"
            >
              <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth / (scale ?? 1)} />
            </svg>
          )}

          {items.map((item, index) => (
            <OrbitItem
              key={index}
              item={item}
              index={index}
              totalItems={items.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
            />
          ))}
        </div>
      </div>

      {centerContent && <div className="orbit-center-content">{centerContent}</div>}
    </div>
  );
}