'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Sparkles, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import OrbitImages from '@/Components/OrbitImages';
import GlowCard from '@/Components/GlowCard';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiPostgresql, 
  SiPython, 
  SiTailwindcss, 
  SiFramer 
} from 'react-icons/si';

const Canvas3D = dynamic(() => import('@/Components/Canva3D').then((mod) => mod.default), {
  ssr: false,
});

const techIcons = [
  <SiReact className="w-7 h-7 text-[#61DAFB]" key="react" />,
  <SiNextdotjs className="w-7 h-7 text-white" key="next" />,
  <SiTypescript className="w-7 h-7 text-[#3178C6]" key="ts" />,
  <SiNodedotjs className="w-7 h-7 text-[#5FA04E]" key="node" />,
  <SiPostgresql className="w-7 h-7 text-[#4169E1]" key="postgres" />,
  <SiPython className="w-7 h-7 text-[#3776AB]" key="python" />,
  <SiTailwindcss className="w-7 h-7 text-[#06B6D4]" key="tailwind" />,
  <SiFramer className="w-7 h-7 text-[#0055FF]" key="framer" />,
];

const FadeText = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    initial={{ opacity: 0, y: 3 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -3 }}
    transition={{ duration: 0.25, ease: 'easeInOut' }}
  >
    {children}
  </motion.span>
);

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-primary-dark text-white pt-24 pb-16">
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
            <AnimatePresence mode="wait">
              <FadeText key={t('hero.badge')}>{t('hero.badge')}</FadeText>
            </AnimatePresence>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-poppins text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl max-w-4xl leading-[1.1]"
          >
            <AnimatePresence mode="wait">
              <FadeText key={t('hero.title_1')}>
                {t('hero.title_1')}{' '}
                <span className="text-amber-gold">{t('hero.title_highlight')}</span>{' '}
                {t('hero.title_2')}
              </FadeText>
            </AnimatePresence>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-ice-blue/80 font-normal leading-relaxed min-h-14"
          >
            <AnimatePresence mode="wait">
              <FadeText key={t('hero.description')}>{t('hero.description')}</FadeText>
            </AnimatePresence>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/projects"
              className="flex items-center gap-2 rounded-xl bg-amber-gold px-6 py-3.5 text-sm font-bold text-primary-dark transition-all hover:bg-amber-300 hover:shadow-[0_0_25px_rgba(255,180,0,0.4)]"
            >
              <span>{t('hero.btn_projects')}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-xl border border-ice-blue/20 bg-primary-dark/80 px-6 py-3.5 text-sm font-bold text-ice-blue backdrop-blur-md transition-all hover:border-amber-gold hover:text-white"
            >
              {t('hero.btn_contact')}
            </Link>
          </motion.div>
        </section>

        {/* BENTO GRID SKILLS & ARCHITECTURE */}
        <section className="py-16">
          <div className="mb-6 text-center md:text-left">
            <h2 className="font-poppins text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t('skills.title')}
            </h2>
            <p className="text-sm text-ice-blue/70 mt-1">
              {t('skills.subtitle')}
            </p>
          </div>

          {/* ANIMATION ORBIT IMAGES */}
          <div className="relative my-2 flex justify-center items-center max-w-xl mx-auto h-55 overflow-hidden">
            <OrbitImages
              itemsList={techIcons}
              shape="ellipse"
              baseWidth={800}
              radiusX={340}
              radiusY={90}
              rotation={-6}
              itemSize={48}
              duration={30}
              showPath={true}
              pathColor="rgba(245, 158, 11, 0.3)"
              pathWidth={1.5}
              responsive={true}
              centerContent={
                <div className="text-center px-4 py-2 bg-slate-950/80 rounded-full border border-amber-gold/30 backdrop-blur-md shadow-[0_0_20px_rgba(255,180,0,0.15)]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-gold">
                    Tech Ecosystem
                  </span>
                </div>
              }
            />
          </div>

          {/* CARDS GRID WITH CLEAN GLOW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlowCard glowColor="amber">
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-gold/10 border border-amber-gold/30 text-amber-gold flex items-center justify-center mb-4">
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="font-poppins text-lg font-bold text-white mb-2">
                  {t('skills.card1_title')}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t('skills.card1_desc')}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'].map((tech) => (
                  <span key={tech} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-primary-dark/80 text-ice-blue border border-ice-blue/20">
                    {tech}
                  </span>
                ))}
              </div>
            </GlowCard>

            <GlowCard glowColor="cyan">
              <div>
                <div className="h-10 w-10 rounded-xl bg-ice-blue/10 border border-ice-blue/30 text-ice-blue flex items-center justify-center mb-4">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-poppins text-lg font-bold text-white mb-2">
                  {t('skills.card2_title')}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t('skills.card2_desc')}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Three.js', 'R3F', 'GLSL', 'Framer Motion', 'Canvas'].map((tech) => (
                  <span key={tech} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-primary-dark/80 text-ice-blue border border-ice-blue/20">
                    {tech}
                  </span>
                ))}
              </div>
            </GlowCard>

            <GlowCard glowColor="amber">
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-gold/10 border border-amber-gold/30 text-amber-gold flex items-center justify-center mb-4">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="font-poppins text-lg font-bold text-white mb-2">
                  {t('skills.card3_title')}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t('skills.card3_desc')}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Python', 'Algorithmes', 'Data Analysis', 'Bots', 'REST APIs'].map((tech) => (
                  <span key={tech} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-primary-dark/80 text-ice-blue border border-ice-blue/20">
                    {tech}
                  </span>
                ))}
              </div>
            </GlowCard>
          </div>
        </section>
      </div>
    </main>
  );
}