'use client';

import React from 'react';

const skills = [
  { category: 'Frontend & 3D', items: ['Next.js 16', 'React', 'Three.js', 'React Three Fiber', 'Tailwind CSS'] },
  { category: 'Backend & Cloud', items: ['Python', 'PostgreSQL', 'REST APIs', 'Railway', 'Render', 'Vercel'] },
  { category: 'AI & Data Science', items: ['Model Context Protocol (FastMCP)', 'Claude API', 'Machine Learning', 'Data Analysis'] },
  { category: 'Engineering & Workflow', items: ['Git/GitHub', 'Figma (UI/UX)', 'Smart Money Concepts', 'System Architecture'] },
];

function AboutSection() {
  return (
    <section id="about" className="w-full bg-slate-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            À Propos & <span className="text-[#00F2FE]">Expertise</span>
          </h2>
          <div className="mt-2 h-1 w-20 bg-[#00F2FE]"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="space-y-4 text-slate-300">
            <p className="text-lg leading-relaxed">
              Étudiant en ingénierie logicielle spécialisé en développement web, mobile et architectures IA. 
              Je conçois des solutions numériques performantes axées sur la résolution de problèmes opérationnels 
              complexes pour les entreprises et grands marchands.
            </p>
            <p className="text-base text-slate-400">
              Mon approche combine une rigueur algorithmique, une attention stricte à l'ergonomie (UI/UX) 
              et l'intégration d'outils d'IA avancés pour délivrer des applications prêtes pour la production.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {skills.map((group, idx) => (
              <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 backdrop-blur-sm">
                <h3 className="mb-3 text-sm font-bold tracking-wide text-[#00F2FE] uppercase">{group.category}</h3>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;