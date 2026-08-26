'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  speed?: number;
  chars?: string;
  className?: string;
}

export default function ScrambleText({
  text,
  speed = 0.000001,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()',
  className = '',
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Ne pas animer au tout premier chargement de la page
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const targetText = text;
    
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            // Conserve les espaces intacts pour ne pas casser la mise en page
            if (char === ' ') return ' ';

            // Si la lettre a déjà atteint sa position finale
            if (index < iteration) {
              return targetText[index];
            }

            // Génère un caractère aléatoire parmi le masque
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Règle la vitesse d'apparition progressive de chaque lettre
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, chars]);

  return <span className={className}>{displayText}</span>;
}