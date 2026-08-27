'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard, { Project } from '@/Components/ProjectCard';
import { useLanguage } from '@/context/LanguageContext';
import Folder from '@/Components/Folder';
import FlyRankModal from '@/Components/FlyRankModal';
import CertificationsModal from '@/Components/CertificationsModal';
import { supabase } from '@/lib/supabase';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [isFlyRankOpen, setIsFlyRankOpen] = useState(false);
  const [isCertifsOpen, setIsCertifsOpen] = useState(false);
  const [dbProjects, setDbProjects] = useState<Project[]>([]);

  // 1. Projets statiques locaux existants
  const LOCAL_PROJECTS: Project[] = [
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

  // 2. Fetch des projets issus de la BDD Supabase
  useEffect(() => {
    const fetchDbProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .neq('category', 'flyrank') // Exclure les devoirs spécifiques à FlyRank
        .order('created_at', { ascending: false });

      if (!error && data) {
        setDbProjects(data as Project[]);
      }
    };

    fetchDbProjects();
  }, []);

  // 3. Fusion des projets (Locaux + BDD)
  const allProjects = [...LOCAL_PROJECTS, ...dbProjects];

  const CATEGORIES = [
    { key: 'Tous', label: t('projects.categories.all') },
    { key: 'Fullstack', label: t('projects.categories.fullstack') },
    { key: 'Systems', label: t('projects.categories.systems') },
    { key: 'UI/UX & Mobile', label: t('projects.categories.uiux') },
    { key: '3D & Creative', label: t('projects.categories.creative') },
  ];

  const filteredProjects =
    activeCategory === 'Tous'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen w-full bg-primary-dark text-white pt-28 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* En-tête de la page */}
        <div className="mb-10">
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

        {/* SECTION DOSSIER INTERACTIF / HUB ACCRÉDITATIONS */}
        <section className="mb-14 rounded-2xl border border-white/10 bg-[#0f171c]/60 p-8 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-md text-center md:text-left">
            <h2 className="font-poppins text-2xl font-bold text-white">
              Hub Accréditations & Devoirs
            </h2>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Consulte mon CV au format PDF, tous les travaux réalisés durant mon stage chez{' '}
              <strong className="text-cyan-400">FlyRank AI</strong>, ainsi que mes certifications officielles.
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-center">
            <Folder
              title="Mon Hub Accréditations"
              onOpenFlyRankModal={() => setIsFlyRankOpen(true)}
              onOpenCertifsModal={() => setIsCertifsOpen(true)}
            />
          </div>
        </section>

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
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id || `proj-${idx}`} project={project} />
          ))}
        </div>
      </div>

      {/* Modals dynamiques */}
      <FlyRankModal isOpen={isFlyRankOpen} onClose={() => setIsFlyRankOpen(false)} />
      <CertificationsModal isOpen={isCertifsOpen} onClose={() => setIsCertifsOpen(false)} />
    </main>
  );
}