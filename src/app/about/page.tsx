'use client';

import React from 'react';

const skillsCategory = [
  {
    title: 'Development & Architectures',
    skills: ['Next.js 16 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Python', 'REST APIs'],
  },
  {
    title: '3D & AI Integration',
    skills: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Model Context Protocol', 'Vercel AI SDK'],
  },
  {
    title: 'Cloud & Infrastructure',
    skills: ['PostgreSQL', 'Railway', 'Render', 'Vercel', 'Git / GitHub', 'Docker'],
  },
  {
    title: 'Product & Analytics',
    skills: ['Trading Quantitative (SMC / FVG)', 'UI/UX Design (Figma)', 'System Design', 'Agile / Scrum'],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[#0F172A] pt-28 pb-20 text-white">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* En-tête de page */}
        <div className="mb-16">
          <span className="text-xs font-bold tracking-widest text-[#00F2FE] uppercase">
            Ingénieur Logiciel & WebGL
          </span>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            À propos de <span className="text-[#00F2FE]">moi</span>
          </h1>
          <div className="mt-4 h-1 w-24 bg-[#00F2FE]"></div>
        </div>

        {/* Section Biographie */}
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 text-slate-300 leading-relaxed text-lg">
            <p>
              Je suis <strong className="text-white">BAWA Abdoul-Madjid (ABRO)</strong>, étudiant en ingénierie informatique spécialisé en développement Web, Mobile et architectures IA.
            </p>
            <p>
              Passionné par la création de solutions numériques à fort impact, je conçois des applications hautement performantes capables de résoudre des défis opérationnels complexes pour les entreprises et grands marchands. Mon travail s'articule autour d'une alliance entre une UI/UX soignée, des graphismes 3D interactifs (GLSL) et une logique backend solide.
            </p>
            <p className="text-base text-slate-400">
              En parallèle de l'ingénierie logicielle, je pratique le trading quantitatif et technique (Smart Money Concepts, Market Structure Shifts, Liquidity Mapping), une discipline qui renforce ma rigueur analytique et ma gestion du risque dans le code.
            </p>
          </div>

          {/* Quick Stats Box */}
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold tracking-wider text-[#00F2FE] uppercase">Focus Actuel</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex flex-col">
                <span className="text-xs text-slate-500">Spécialisation</span>
                <span className="font-semibold text-white">Fullstack & Frontend AI</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-slate-500">Localisation</span>
                <span className="font-semibold text-white">Lomé, Togo 🇹🇬</span>
              </li>
              <li className="flex flex-col">
                <span className="text-xs text-slate-500">Stack Principale</span>
                <span className="font-semibold text-white">Next.js, Python, PostgreSQL</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section Grille de Compétences */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-white">
            Stack Technique & Outillage
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {skillsCategory.map((cat, idx) => (
              <div 
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:border-cyan-500/40"
              >
                <h3 className="mb-4 text-base font-bold text-[#00F2FE]">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="rounded-lg bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 border border-slate-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}