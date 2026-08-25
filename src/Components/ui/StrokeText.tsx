'use client';

import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StrokeTextProps {
  text?: string;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  drawDuration?: number;
  fillDelay?: number;
  stagger?: number;
  ease?: string;
  trigger?: 'mount' | 'hover' | 'scroll' | 'loop';
  fillMode?: 'wipe' | 'fade' | 'none';
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  reverse?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export default function StrokeText({
  text = 'ABRrO-ops | Portfolio',
  strokeColor = '#FFB400',
  fillColor = '#FFFFFF',
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = 'power2.out',
  trigger = 'mount',
  fillMode = 'wipe',
  fontSize = 72,
  fontWeight = 800,
  letterSpacing = -2,
  reverse = false,
  className = '',
  style = {},
  onComplete,
}: StrokeTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const strokeTextRef = useRef<SVGTextElement>(null);
  const wipeRectRef = useRef<SVGRectElement>(null);
  const [box, setBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const rawId = useId();
  const wipeId = `stroke-text-wipe-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const characters = useMemo(() => Array.from(String(text ?? '')), [text]);
  const dash = Math.max(fontSize * 7, 200);

  const fontStyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
    }),
    [fontSize, fontWeight, letterSpacing]
  );

  useLayoutEffect(() => {
    const node = strokeTextRef.current;
    if (!node) return;

    let cancelled = false;

    const measure = () => {
      if (cancelled || !strokeTextRef.current) return;
      let bbox;
      try {
        bbox = strokeTextRef.current.getBBox();
      } catch {
        return;
      }
      if (!bbox || !bbox.width) return;

      const pad = Math.max(Number(strokeWidth) || 1, fontSize * 0.1);
      const next = {
        x: bbox.x - pad,
        y: bbox.y - pad,
        width: bbox.width + pad * 2,
        height: bbox.height + pad * 2,
      };

      setBox(prev =>
        prev &&
        Math.abs(prev.x - next.x) < 0.5 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.y - next.y) < 0.5
          ? prev
          : next
      );
    };

    measure();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [characters, fontSize, fontWeight, letterSpacing, strokeWidth]);

  useEffect(() => {
    const root = rootRef.current;
    if (typeof window === 'undefined' || !root || !box) return;

    const strokes = gsap.utils.toArray(root.querySelectorAll('[data-stroke-char]'));
    const fills = gsap.utils.toArray(root.querySelectorAll('[data-fill-char]'));
    const wipe = wipeRectRef.current;
    if (!strokes.length) return;

    const fillEnabled = fillMode !== 'none';
    const useWipe = fillEnabled && fillMode === 'wipe';
    const fillDuration = Math.max(0.4, drawDuration * 0.5);
    const staggerConfig = reverse ? { each: stagger, from: 'end' as const } : stagger;
    const targets = [...strokes, ...fills, wipe].filter(Boolean);

    const setStart = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: 0 } });
    };

    const setEnd = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0 });
      gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: { width: fillEnabled ? box.width : 0 } });
    };

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setEnd();
      onComplete?.();
      return () => gsap.killTweensOf(targets);
    }

    const build = () => {
      setStart();
      const tl = gsap.timeline({
        paused: true,
        repeat: trigger === 'loop' ? -1 : 0,
        repeatDelay: trigger === 'loop' ? 0.9 : 0,
        defaults: { overwrite: 'auto' },
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      tl.to(strokes, { strokeDashoffset: 0, duration: drawDuration, ease, stagger: staggerConfig }, 0);

      if (useWipe && wipe) {
        tl.to(
          wipe,
          { attr: { width: box.width }, duration: fillDuration, ease: 'power2.inOut' },
          drawDuration + fillDelay
        );
      } else if (fillEnabled) {
        tl.to(
          fills,
          { opacity: 1, duration: fillDuration, ease: 'power2.out', stagger: staggerConfig },
          drawDuration + fillDelay
        );
      }

      return tl;
    };

    let timeline: gsap.core.Timeline | null = null;
    timeline = build();
    timeline.play(0);

    return () => {
      timeline?.kill();
      gsap.killTweensOf(targets);
    };
  }, [box, dash, drawDuration, fillDelay, stagger, ease, trigger, fillMode, reverse, onComplete]);

  const viewBox = box ? `${box.x} ${box.y} ${box.width} ${box.height}` : `0 ${-fontSize} 600 ${fontSize * 1.3}`;

  return (
    <span
      ref={rootRef}
      className={`block w-full leading-none ${className}`.trim()}
      style={{ ...style, height: `${Math.round(fontSize * 1.4)}px` }}
      role="img"
      aria-label={String(text ?? '')}
    >
      <svg className="block w-full h-full" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {fillMode === 'wipe' && box && (
          <defs>
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <rect ref={wipeRectRef} x={box.x} y={box.y} width="0" height={box.height} />
            </clipPath>
          </defs>
        )}

        <text
          ref={strokeTextRef}
          className="select-none"
          x="0"
          y="0"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          style={fontStyle}
        >
          {characters.map((char, index) => (
            <tspan data-stroke-char key={`s-${index}`}>
              {char}
            </tspan>
          ))}
        </text>

        <text
          className="select-none"
          x="0"
          y="0"
          fill={fillColor}
          stroke="none"
          style={fontStyle}
          clipPath={fillMode === 'wipe' && box ? `url(#${wipeId})` : undefined}
        >
          {characters.map((char, index) => (
            <tspan data-fill-char key={`f-${index}`}>
              {char}
            </tspan>
          ))}
        </text>
      </svg>
    </span>
  );
}