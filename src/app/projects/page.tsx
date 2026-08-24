'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard, { Project } from '@/Components/ProjectCard';

const PROJECTS_DATA: Project[] = [
  {
    id: 'cineai',
    title: 'CineAI Platform',
    category: 'Fullstack',
    description: 'Application web propulsée par l\'IA pour la génération et l\'exploration de contenus cinématographiques interactifs.',
    tags: ['Next.js', 'Vite', 'Vercel AI SDK', 'TypeScript', 'Tailwind'],
    status: 'In Development',
    metrics: 'Intégration temps réel Vercel AI SDK',
  },
  {
    id: 'bankvi',
    title: 'Bankvi Dashboard',
    category: 'Fullstack',
    description: 'Plateforme SaaS de gestion financière, suivi des stocks et des dettes pour marchands.',
    tags: ['Next.js', 'Python', 'PostgreSQL', 'Railway', 'Render'],
    status: 'Production',
    metrics: 'Base de données PostgreSQL managée',
  },
  {
    id: 'omni-trader',
    title: 'Omni-Trader Bot',
    category: 'Systems',
    description: 'Système de trading algorithmique basé sur les concepts Smart Money, Shifts de structures et Order Blocks.',
    tags: ['Python', 'Algorithmes', 'Technical Analysis', 'TradingView API'],
    status: 'In Development',
    metrics: 'Exécution d\'ordres automatisée sur XAUUSD & EURUSD',
  },
  {
    id: 'civic-alert',
    title: 'Civic Alert UI/UX',
    category: 'UI/UX & Mobile',
    description: 'Interface d\'application citoyenne dédiée au signalement d\'incidents urbains et à la réponse communautaire.',
    tags: ['Figma', 'UI/UX Design', 'Design System', 'Prototypage'],
    status: 'Finalist Hackathon',
    metrics: 'Projet Finaliste TCC Hack & Defend 2026',
  },
  {
    id: 'cotipay',
    title: 'CotiPay Fintech',
    category: 'UI/UX & Mobile',
    description: 'Solution Fintech de tontine digitale et de gestion des paiements communautaires.',
    tags: ['React Native', 'UI/UX', 'Figma', 'Node.js'],
    status: 'In Development',
    metrics: 'Architecture de paiement multi-devises',
  },
];

const CATEGORIES = ['Tous', 'Fullstack', 'Systems', 'UI/UX & Mobile', '3D & Creative'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');

  const filteredProjects = activeCategory === 'Tous'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen w-full bg-primary-dark text-white pt-28 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        
        {/* En-tête de la page */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-poppins text-4xl font-black tracking-tight sm:text-6xl text-white mb-4"
          >
            Projets & <span className="text-amber-gold">Réalisations</span>
          </motion.h1>
          <p className="text-slate-300 max-w-2xl text-base leading-relaxed">
            Applications fullstack, systèmes algorithmiques et prototypes UI/UX conçus avec un souci constant d'architecture et de performance.
          </p>
        </div>

        {/* Barre de Filtres */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono px-4 py-2 rounded-xl border transition-all ${
                activeCategory === cat
                  ? 'bg-amber-gold text-primary-dark border-amber-gold font-bold shadow-[0_0_15px_rgba(255,180,0,0.3)]'
                  : 'bg-[#0f171c]/60 text-ice-blue border-ice-blue/20 hover:border-amber-gold/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille de Cartes Projets avec Tilt 3D */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </main>
  );
}