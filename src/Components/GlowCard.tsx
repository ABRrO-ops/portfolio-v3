'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: 'amber' | 'cyan';
  className?: string;
}

export default function GlowCard({
  children,
  glowColor = 'amber',
  className = '',
}: GlowCardProps) {
  const isAmber = glowColor === 'amber';

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={`group relative h-full rounded-2xl border border-white/10 bg-[#0f171c]/60 p-6 backdrop-blur-md transition-all duration-300 ${
        isAmber
          ? 'hover:border-amber-500/40 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.15)]'
          : 'hover:border-cyan-500/40 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.15)]'
      } ${className}`}
    >
      {/* Subtile lueur de fond qui s'active au survol */}
      <div
        className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          isAmber
            ? 'bg-linear-to-b from-amber-500/10 to-transparent'
            : 'bg-linear-to-b from-cyan-500/10 to-transparent'
        }`}
      />
      
      {/* Contenu de la carte */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}