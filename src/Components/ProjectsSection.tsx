'use client';

import React from 'react';

const projects = [
  {
    title: 'Omni-Trader Bot',
    description: 'Système de trading algorithmique et d\'analyse de structures de marché (SMC, Liquidity Shifts, FVG, Order Blocks) en Python.',
    tags: ['Python', 'Algorithmic Trading', 'Market Structure', 'Data Analysis'],
    status: 'In Development',
  },
  {
    title: 'CineAI Platform',
    description: 'Application web interactive combinant recommandations de contenus cinématographiques pilotées par IA et interface dynamique.',
    tags: ['Next.js', 'Vite', 'Vercel AI SDK', 'Tailwind CSS'],
    status: 'Production',
  },
  {
    title: 'Bankvi Core Service',
    description: 'Backend d\'application financière et bancaire hautement disponible hébergé sur infrastructure Cloud avec PostgreSQL.',
    tags: ['PostgreSQL', 'Railway', 'Render', 'REST API'],
    status: 'Production',
  },
  {
    title: 'Civic Alert UI/UX',
    description: 'Interface utilisateur conçue pour les signalements citoyens et la remontée d\'incidents en temps réel.',
    tags: ['Figma', 'UI/UX', 'Product Design', 'Prototyping'],
    status: 'Completed',
  },
];

function ProjectsSection() {
  return (
    <section id="projects" className="w-full bg-[#0F172A] py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Projets <span className="text-[#00F2FE]">Sélectionnés</span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-[#00F2FE]"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(0,242,254,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#00F2FE]">
                    {proj.title}
                  </h3>
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
                    {proj.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {proj.description}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {proj.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;