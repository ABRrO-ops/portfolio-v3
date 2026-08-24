'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="w-full border-t border-ice-blue/10 bg-[#070b0e] py-10 px-6 font-mono text-xs text-slate-400">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2">
          <span className="font-poppins font-bold text-white tracking-tight">ABRO<span className="text-amber-gold">.</span></span>
          <span className="text-slate-600">|</span>
          <span>© {new Date().getFullYear()} — {lang === 'FR' ? 'Tous droits réservés' : 'All rights reserved'}</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-amber-gold transition-colors">
            {lang === 'FR' ? 'Accueil' : 'Home'}
          </Link>
          <Link href="/about" className="hover:text-amber-gold transition-colors">
            {lang === 'FR' ? 'À Propos' : 'About'}
          </Link>
          <Link href="/projects" className="hover:text-amber-gold transition-colors">
            {lang === 'FR' ? 'Projets' : 'Projects'}
          </Link>
          <Link href="/contact" className="hover:text-amber-gold transition-colors">
            Contact
          </Link>
        </div>

      </div>
    </footer>
  );
}