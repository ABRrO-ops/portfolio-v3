'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard, { Project } from '@/Components/ProjectCard';
import { useLanguage } from '@/context/LanguageContext';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Tous');

  // Données localisées dynamiquement via i18n
  const PROJECTS_DATA: Project[] = [
    {
      id: 'cineai',
      title: t('projects.cards.cineai.title'),
      category: 'Fullstack',
      description: t('projects.cards.cineai.description'),
      tags: ['Next.js', 'Vite', 'Vercel AI SDK', 'TypeScript', 'Tailwind'],
      status: t('projects.status.in_dev') as Project['status'],
      metrics: t('projects.cards.cineai.highlight'),
    },
    {
      id: 'bankvi',
      title: t('projects.cards.bankvi.title'),
      category: 'Fullstack',
      description: t('projects.cards.bankvi.description'),
      tags: ['Next.js', 'Python', 'PostgreSQL', 'Railway', 'Render'],
      status: t('projects.status.prod') as Project['status'],
      metrics: t('projects.cards.bankvi.highlight'),
    },
    {
      id: 'omni-trader',
      title: t('projects.cards.omni.title'),
      category: 'Systems',
      description: t('projects.cards.omni.description'),
      tags: ['Python', 'Algorithmes', 'Technical Analysis', 'TradingView API'],
      status: t('projects.status.in_dev') as Project['status'],
      metrics: t('projects.cards.omni.highlight'),
    },
    {
      id: 'civic-alert',
      title: t('projects.cards.civic.title'),
      category: 'UI/UX & Mobile',
      description: t('projects.cards.civic.description'),
      tags: ['Figma', 'UI/UX Design', 'Design System', 'Prototypage'],
      status: t('projects.status.finalist') as Project['status'],
      metrics: t('projects.cards.civic.highlight'),
    },
    {
      id: 'cotipay',
      title: t('projects.cards.cotipay.title'),
      category: 'UI/UX & Mobile',
      description: t('projects.cards.cotipay.description'),
      tags: ['React Native', 'UI/UX', 'Figma', 'Node.js'],
      status: t('projects.status.in_dev') as Project['status'],
      metrics: t('projects.cards.cotipay.highlight'),
    },
  ];

  const CATEGORIES = [
    { key: 'Tous', label: t('projects.categories.all') },
    { key: 'Fullstack', label: t('projects.categories.fullstack') },
    { key: 'Systems', label: t('projects.categories.systems') },
    { key: 'UI/UX & Mobile', label: t('projects.categories.uiux') },
    { key: '3D & Creative', label: t('projects.categories.creative') },
  ];

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
            {t('projects.title_1')}{' '}
            <span className="text-amber-gold">{t('projects.title_highlight')}</span>
          </motion.h1>
          <p className="text-slate-300 max-w-2xl text-base leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Barre de Filtres */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`text-xs font-mono px-4 py-2 rounded-xl border transition-all ${
                activeCategory === cat.key
                  ? 'bg-amber-gold text-primary-dark border-amber-gold font-bold shadow-[0_0_15px_rgba(255,180,0,0.3)]'
                  : 'bg-[#0f171c]/60 text-ice-blue border-ice-blue/20 hover:border-amber-gold/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille de Cartes Projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </main>
  );
}