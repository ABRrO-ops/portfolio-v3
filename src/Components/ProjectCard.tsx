'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Fullstack' | 'Systems' | 'UI/UX & Mobile' | '3D & Creative' | string;
  description: string;
  tags?: string[];
  stack?: string[];
  metrics?: string;
  highlights?: string[];
  status: 'Production' | 'In Development' | 'Finalist Hackathon' | string;
  githubUrl?: string;
  github_url?: string;
  demoUrl?: string;
  demo_url?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  // Normalisation des clés Supabase et locales
  const techStack = (project.stack && project.stack.length > 0) ? project.stack : (project.tags || []);
  const subtitleText = project.subtitle || project.metrics || (project.highlights && project.highlights[0]);
  const githubLink = project.github_url || project.githubUrl;
  const demoLink = project.demo_url || project.demoUrl;

  // Effet Tilt 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full w-full rounded-2xl border border-ice-blue/15 bg-[#0f171c]/70 p-6 backdrop-blur-md transition-all duration-200 hover:border-amber-gold/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-gold border border-amber-gold/30 px-2.5 py-1 rounded-full bg-amber-gold/10">
              {project.category}
            </span>
            <span className="text-[10px] font-mono text-slate-400 border border-slate-700/50 px-2 py-0.5 rounded-md">
              {project.status}
            </span>
          </div>

          {/* Titre & Description */}
          <h3 className="font-poppins text-xl font-bold text-white mb-2 group-hover:text-amber-gold transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        <div>
          {/* Slogan / Highlight */}
          {subtitleText && (
            <div className="mb-4 text-[11px] font-mono text-ice-blue bg-ice-blue/10 border border-ice-blue/20 rounded-lg p-2 flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-amber-gold shrink-0" />
              <span className="truncate">{subtitleText}</span>
            </div>
          )}

          {/* Tags Tech */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {techStack.map((tag) => (
              <span 
                key={tag} 
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary-dark text-ice-blue border border-ice-blue/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Liens d'action : Centrés en bas avec gap */}
          {(githubLink || demoLink) && (
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-800/80">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noreferrer"
                  title="Voir le code sur GitHub"
                  className="p-1 text-slate-400 hover:text-amber-gold transition-colors duration-200"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              )}

              {demoLink && (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noreferrer"
                  title="Voir la démo en direct"
                  className="p-1 text-slate-400 hover:text-amber-gold transition-colors duration-200"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}