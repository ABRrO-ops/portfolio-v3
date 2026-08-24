'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Award, BookOpen, Rocket, ShieldCheck, Cpu } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'project' | 'achievement' | 'internship';
  tags: string[];
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: '2026',
    title: 'Finaliste Hackathon TCC Hack & Defend',
    subtitle: 'Lomé, Togo • Équipe Commit & Pray',
    description: 'Sélection et parcours finaliste autour du projet Civic Alert, une interface citoyenne de réponse aux incidents.',
    type: 'achievement',
    tags: ['Hackathon', 'Civic Tech', 'UI/UX', 'Figma'],
  },
  {
    year: '2026',
    title: 'FlyRank AI Engineering Cohort',
    subtitle: 'Front-end AI Engineering',
    description: 'Immersion intensive sur l\'intégration des LLM, FastMCP (Model Context Protocol) et la création d\'interfaces dynamiques guidées par l\'IA.',
    type: 'internship',
    tags: ['AI SDK', 'FastMCP', 'Next.js', 'LLM'],
  },
  {
    year: '2026',
    title: 'Système Algorithmique Omni-Trader Bot',
    subtitle: 'Trading Systémique & Quantitative',
    description: 'Conception et développement d\'un bot automatisé intégrant la structure Smart Money (BOS, CHoCH, Order Blocks) pour XAUUSD et EURUSD.',
    type: 'project',
    tags: ['Python', 'Smart Money Concepts', 'REST API', 'TradingView'],
  },
  {
    year: '2025 - 2026',
    title: 'Licence 1 Informatique & Ingénierie Web',
    subtitle: 'IPNet Institute of Technology',
    description: 'Formation spécialisée en génie logiciel, algorithmique avancée, structures de données avec Python/JS et réseaux (CCNA).',
    type: 'education',
    tags: ['Computer Science', 'Python', 'Web/Mobile', 'Networks'],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-primary-dark text-white pt-28 pb-20 px-6">
      <div className="mx-auto max-w-5xl">
        
        {/* SECTION PRESENTATION */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-gold border border-amber-gold/30 px-3 py-1 rounded-full bg-amber-gold/10 inline-block mb-4">
              À Propos de moi
            </span>
            <h1 className="font-poppins text-4xl font-black tracking-tight sm:text-6xl text-white mb-6">
              Bâtir des outils <span className="text-amber-gold">scalables</span> & des expériences <span className="text-ice-blue">interactives</span>.
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-2 space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                Actuellement en cursus d'ingénierie logicielle spécialisé en développement Web & Mobile, je me passionne pour la création de solutions technologiques complètes : des architectures backend robustes aux interfaces utilisateurs 3D immersives.
              </p>
              <p>
                Parallèlement à mon profil de développeur, je suis swing trader & scalper actif. Cette double compétence me permet d'appliquer la rigueur algorithmique, la gestion de données en temps réel et les patterns quantitatifs dans tous mes projets informatiques.
              </p>
            </div>

            {/* Quick Stats Card */}
            <div className="rounded-2xl border border-ice-blue/15 bg-[#0f171c]/70 p-6 backdrop-blur-md space-y-4">
              <h3 className="font-poppins text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                En Résumé
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Focus Core :</span>
                  <span className="text-ice-blue font-semibold">Fullstack & AI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Trading :</span>
                  <span className="text-amber-gold font-semibold">XAUUSD / EURUSD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Architecture :</span>
                  <span className="text-slate-200">Microservices / SaaS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Base DB :</span>
                  <span className="text-ice-blue font-semibold">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION TIMELINE */}
        <section className="py-8">
          <div className="mb-12">
            <h2 className="font-poppins text-2xl font-bold tracking-tight text-white sm:text-3xl mb-2">
              Parcours & Jalons
            </h2>
            <p className="text-xs text-ice-blue/70 font-mono">
              Projets majeurs, formation académique et hackathons.
            </p>
          </div>

          <div className="relative border-l border-ice-blue/20 ml-4 md:ml-32 space-y-12">
            {TIMELINE_DATA.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-10"
              >
                {/* Anneau lumineux sur l'axe */}
                <div className="absolute -left-2.25 top-1.5 h-4 w-4 rounded-full border-2 border-amber-gold bg-primary-dark shadow-[0_0_10px_rgba(255,180,0,0.8)]" />

                {/* Badge d'année aligné sur la gauche pour grands écrans */}
                <span className="md:absolute md:-left-32 md:top-1 font-mono text-xs font-bold text-amber-gold bg-amber-gold/10 border border-amber-gold/30 px-2.5 py-1 rounded-md inline-block mb-2 md:mb-0">
                  {item.year}
                </span>

                {/* Contenu du jalon */}
                <div className="rounded-2xl border border-ice-blue/15 bg-[#0f171c]/60 p-6 backdrop-blur-md hover:border-amber-gold/40 transition-all">
                  <h3 className="font-poppins text-lg font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <h4 className="text-xs font-mono text-ice-blue mb-3">
                    {item.subtitle}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary-dark text-ice-blue border border-ice-blue/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}