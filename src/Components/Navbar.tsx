'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-dark/80 backdrop-blur-md border-b border-ice-blue/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-poppins font-black text-2xl tracking-tighter text-white">
          ABRO<span className="text-amber-gold">.</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-sm sm:text-base font-medium transition-colors ${
                    isActive ? 'text-amber-gold font-bold' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-gold rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Switcher FR / EN */}
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ice-blue/20 bg-[#0f171c] text-xs font-mono font-bold text-ice-blue hover:border-amber-gold transition-colors cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-amber-gold" />
            <span>{lang}</span>
          </button>

          {/* GitHub Button */}
          <a
            href="https://github.com/ABRrO-ops"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-gold/10 border border-amber-gold/30 text-amber-gold text-xs font-mono font-bold hover:bg-amber-gold hover:text-primary-dark transition-all"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        {/* MOBILE BURGER BTN */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-ice-blue/20 bg-[#0f171c] text-xs font-mono font-bold text-ice-blue"
          >
            <Globe className="h-3 w-3 text-amber-gold" />
            <span>{lang}</span>
          </button>
          
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-300 hover:text-amber-gold transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-ice-blue/15 bg-[#0a1015] px-6 py-6 space-y-4 font-mono text-sm"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-1.5 ${
                  pathname === link.path ? 'text-amber-gold font-bold' : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://github.com/ABRrO-ops"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 pt-2 text-amber-gold font-bold"
            >
              <span>GitHub</span>
              <span className="text-xs">↗</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}