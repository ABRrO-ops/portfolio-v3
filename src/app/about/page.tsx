'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface TimelineItem {
  year: string;
  key: 'tcc' | 'flyrank' | 'omni' | 'degree';
  type: 'education' | 'project' | 'achievement' | 'internship';
  tags: string[];
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: '2026',
    key: 'tcc',
    type: 'achievement',
    tags: ['Hackathon', 'Civic Tech', 'UI/UX', 'Figma'],
  },
  {
    year: '2026',
    key: 'flyrank',
    type: 'internship',
    tags: ['AI SDK', 'FastMCP', 'Next.js', 'LLM'],
  },
  {
    year: '2026',
    key: 'omni',
    type: 'project',
    tags: ['Python', 'Smart Money Concepts', 'REST API', 'TradingView'],
  },
  {
    year: '2025 - 2026',
    key: 'degree',
    type: 'education',
    tags: ['Computer Science', 'Python', 'Web/Mobile', 'Networks'],
  },
];

export default function AboutPage() {
  const { lang, t } = useLanguage();

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
              {lang === 'FR' ? 'À Propos de moi' : 'About Me'}
            </span>
            <h1 className="font-poppins text-4xl font-black tracking-tight sm:text-6xl text-white mb-6">
              {lang === 'FR' ? (
                <>Bâtir des outils <span className="text-amber-gold">scalables</span> & des expériences <span className="text-ice-blue">interactives</span>.</>
              ) : (
                <>Building <span className="text-amber-gold">scalable</span> tools & <span className="text-ice-blue">interactive</span> experiences.</>
              )}
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  {lang === 'FR'
                    ? "Actuellement en cursus d'ingénierie logicielle spécialisé en développement Web & Mobile, je me passionne pour la création de solutions technologiques complètes : des architectures backend robustes aux interfaces utilisateurs 3D immersives."
                    : "Currently studying software engineering with a focus on Web & Mobile development, I build robust end-to-end tech solutions ranging from backend architectures to 3D user interfaces."}
                </p>
                <p>
                  {lang === 'FR'
                    ? "Parallèlement à mon profil de développeur, je suis swing trader & scalper actif. Cette double compétence me permet d'appliquer la rigueur algorithmique, la gestion de données en temps réel et les patterns quantitatifs dans tous mes projets informatiques."
                    : "Alongside development, I actively trade forex and metals. This dual background lets me bring algorithmic rigor, real-time data handling, and quantitative patterns to software development."}
                </p>
              </div>

              {/* Bouton LinkedIn */}
              <div className="pt-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#0a66c2]/15 border border-[#0a66c2]/40 text-[#70b5f9] hover:bg-[#0a66c2] hover:text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(10,102,194,0.2)] cursor-pointer"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/>
                  </svg>
                  <span>{lang === 'FR' ? 'Me contacter sur LinkedIn' : 'Connect on LinkedIn'}</span>
                </a>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="rounded-2xl border border-ice-blue/15 bg-[#0f171c]/70 p-6 backdrop-blur-md space-y-4">
              <h3 className="font-poppins text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
                {t('about.summary.title')}
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('about.summary.focus')} :</span>
                  <span className="text-ice-blue font-semibold">Fullstack & AI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('about.summary.trading')} :</span>
                  <span className="text-amber-gold font-semibold">XAUUSD / EURUSD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('about.summary.architecture')} :</span>
                  <span className="text-slate-200">Microservices / SaaS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t('about.summary.database')} :</span>
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
              {lang === 'FR' ? 'Parcours & Jalons' : 'Track & Milestones'}
            </h2>
            <p className="text-xs text-ice-blue/70 font-mono">
              {lang === 'FR' ? 'Projets majeurs, formation académique et hackathons.' : 'Key projects, education and hackathons.'}
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
                <div className="absolute -left-2.25 top-1.5 h-4 w-4 rounded-full border-2 border-amber-gold bg-primary-dark shadow-[0_0_10px_rgba(255,180,0,0.8)]" />

                <span className="md:absolute md:-left-32 md:top-1 font-mono text-xs font-bold text-amber-gold bg-amber-gold/10 border border-amber-gold/30 px-2.5 py-1 rounded-md inline-block mb-2 md:mb-0">
                  {item.year}
                </span>

                <div className="rounded-2xl border border-ice-blue/15 bg-[#0f171c]/60 p-6 backdrop-blur-md hover:border-amber-gold/40 transition-all">
                  <h3 className="font-poppins text-lg font-bold text-white mb-1">
                    {t(`about.timeline.${item.key}.title`)}
                  </h3>
                  <h4 className="text-xs font-mono text-ice-blue mb-3">
                    {t(`about.timeline.${item.key}.subtitle`)}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {t(`about.timeline.${item.key}.description`)}
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