'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Sparkles, Layers } from 'lucide-react';

const Canvas3D = dynamic(() => import('@/Components/Canva3D').then((mod) => mod.default), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-primary-dark text-white pt-24 pb-16">
      {/* Background WebGL 3D */}
      <Canvas3D />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* HERO SECTION */}
        <section className="flex min-h-[75vh] flex-col justify-center py-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-ice-blue/30 bg-ice-blue/10 px-4 py-1.5 text-xs font-mono font-semibold text-ice-blue backdrop-blur-md w-fit mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-gold" />
            <span>Fullstack Software Engineer & Creative Technologist</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-poppins text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl max-w-4xl leading-[1.1]"
          >
            Concevoir des <span className="text-amber-gold">systèmes complexes</span> avec une touche visuelle.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-2xl text-lg text-ice-blue/80 font-normal leading-relaxed"
          >
            Je combine l'ingénierie logicielle fullstack (Next.js, Python, PostgreSQL), la conception UI/UX et la 3D interactive (Three.js/GLSL) pour bâtir des applications web robustes et immersives.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/projects"
              className="flex items-center gap-2 rounded-xl bg-amber-gold px-6 py-3.5 text-sm font-bold text-primary-dark transition-all hover:bg-amber-300 hover:shadow-[0_0_25px_rgba(255,180,0,0.4)]"
            >
              <span>Explorer mes travaux</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl border border-ice-blue/20 bg-primary-dark/80 px-6 py-3.5 text-sm font-bold text-ice-blue backdrop-blur-md transition-all hover:border-amber-gold hover:text-white"
            >
              Me Contacter
            </Link>
          </motion.div>
        </section>

        {/* BENTO GRID SKILLS & ARCHITECTURE */}
        <section className="py-16">
          <div className="mb-10">
            <h2 className="font-poppins text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Stack & Expertise Core
            </h2>
            <p className="text-sm text-ice-blue/70 mt-1">L'alliance de la rigueur technique et du design interactif.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="rounded-2xl border border-ice-blue/15 bg-[#0f171c]/60 p-6 backdrop-blur-md hover:border-amber-gold/40 transition-all">
              <div className="h-10 w-10 rounded-xl bg-amber-gold/10 border border-amber-gold/30 text-amber-gold flex items-center justify-center mb-4">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="font-poppins text-lg font-bold text-white mb-2">Fullstack Development</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Architecture d'applications scalable, API REST/GraphQL, bases de données relationnelles et état d'application complexe.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'].map(tech => (
                  <span key={tech} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-primary-dark text-ice-blue border border-ice-blue/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-ice-blue/15 bg-[#0f171c]/60 p-6 backdrop-blur-md hover:border-amber-gold/40 transition-all">
              <div className="h-10 w-10 rounded-xl bg-ice-blue/10 border border-ice-blue/30 text-ice-blue flex items-center justify-center mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-poppins text-lg font-bold text-white mb-2">3D & WebGL Shaders</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Création d'expériences 3D dans le navigateur, shaders personnalisés (GLSL) et animations haute performance.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Three.js', 'R3F', 'GLSL', 'Framer Motion', 'Canvas'].map(tech => (
                  <span key={tech} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-primary-dark text-ice-blue border border-ice-blue/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-ice-blue/15 bg-[#0f171c]/60 p-6 backdrop-blur-md hover:border-amber-gold/40 transition-all">
              <div className="h-10 w-10 rounded-xl bg-amber-gold/10 border border-amber-gold/30 text-amber-gold flex items-center justify-center mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-poppins text-lg font-bold text-white mb-2">Systems & Data</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Algorithmique, traitement de données en temps réel, bots de trading et modélisation de flux financiers.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Python', 'Algorithmes', 'Data Analysis', 'Bots', 'REST APIs'].map(tech => (
                  <span key={tech} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-primary-dark text-ice-blue border border-ice-blue/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}