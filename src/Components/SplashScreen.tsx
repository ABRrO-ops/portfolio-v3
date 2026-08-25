'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StrokeText from './ui/StrokeText';

export default function SplashScreen({ onFinish }: { onFinish?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleAnimationComplete = () => {
    // Petit délai de lecture avant le fondu de fermeture
    setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#070b0e] px-6"
        >
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
            <StrokeText
              text="ABRrO-ops | Portfolio"
              strokeColor="#FFB400"
              fillColor="#FFFFFF"
              fontSize={52}
              drawDuration={2.8}
              fillDelay={0.4}
              stagger={0.08}
              onComplete={handleAnimationComplete}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}