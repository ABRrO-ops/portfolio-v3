'use client';

import React, { useState } from 'react';

// Base de données de tes projets
const allProjects = [
  {
    title: 'Omni-Trader Bot',
    category: 'Algorithmic Trading',
    description: "Système de trading automatisé en Python basé sur les Smart Money Concepts (SMC). Analyse des structures de marché (BOS, CHoCH, SSL) et identification de zones de liquidité (Order Blocks, FVG) sur XAUUSD, EURUSD et GBPUSD.",
    stack: ['Python', 'Data Science', 'SMC', 'Algorithmic Trading'],
    link: '#', // À remplacer par le lien GitHub ou le doc plus tard
    status: 'In Development',
  },
  {
    title: 'CineAI Platform',
    category: 'Web & AI',
    description: "Application interactive de recommandation cinématographique pilotée par l'IA. Intégration du Vercel AI SDK pour un filtrage contextuel et sémantique des requêtes utilisateur.",
    stack: ['Next.js', 'Vite', 'Vercel AI SDK', 'Tailwind CSS'],
    link: '#',
    status: 'Production',
  },
  {
    title: 'Bankvi Core Service',
    category: 'Backend & Cloud',
    description: "Architecture Backend robuste pour un service financier. Hébergement hautement disponible sur Railway et Render avec gestion de base de données relationnelle PostgreSQL.",
    stack: ['PostgreSQL', 'Railway', 'Render', 'REST API'],
    link: '#',
    status: 'Production',
  },
  {
    title: 'Civic Alert Interface',
    category: 'UI/UX Design',
    description: "Maquettage et conception UI/UX d'une application de signalement citoyen. Focus sur l'ergonomie mobile, l'accessibilité et la clarté de remontée d'incidents.",
    stack: ['Figma', 'Prototyping', 'User Research', 'Mobile First'],
    link: '#',
    status: 'Completed',
  },
  {
    title: 'Portfolio v3 (3D AI Showcase)',
    category: 'Web & AI',
    description: "Vitrine professionnelle intégrant des shaders GLSL personnalisés via React Three Fiber, avec des protections défensives d'API (rate-limiting, input capping) développées avec Claude/Gemini.",
    stack: ['Next.js 16', 'Three.js', 'GLSL', 'AI Fluency'],
    link: 'https://portfolio-v3-abro.vercel.app',
    status: 'Production',
  }
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Web & AI', 'Backend & Cloud', 'Algorithmic Trading', 'UI/UX Design'];

  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen w-full bg-[#0F172A] pt-28 pb-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* En-tête */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-widest text-[#00F2FE] uppercase">
            Portfolio & Cas d'étude
          </span>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Projets <span className="text-[#00F2FE]">Récents</span>
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-slate-400">
            Une sélection de mes travaux allant de l'architecture backend et systèmes de trading algorithmique, à l'intégration de modèles d'IA et au design d'interfaces 3D.
          </p>
        </div>

        {/* Filtres de catégories */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                filter === cat 
                  ? 'bg-[#00F2FE] text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.4)]' 
                  : 'bg-slate-900/80 text-slate-300 border border-slate-700/50 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((proj, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(0,242,254,0.1)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                    {proj.category}
                  </span>
                  <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-[10px] font-semibold text-cyan-400 border border-cyan-500/20">
                    {proj.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {proj.title}
                </h3>
                
                <p className="text-sm leading-relaxed text-slate-300">
                  {proj.description}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {proj.stack.map((item, itemIdx) => (
                    <span key={itemIdx} className="rounded-md bg-slate-950 px-2 py-1 text-[11px] font-medium text-slate-300 border border-slate-800/80">
                      {item}
                    </span>
                  ))}
                </div>
                
                {/* Lien/Bouton */}
                <a 
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[#00F2FE]"
                >
                  Voir le projet
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}