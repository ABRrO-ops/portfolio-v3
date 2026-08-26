'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Briefcase } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { supabase } from '@/lib/supabase';

interface FlyRankProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github_url?: string;
  live_url?: string;
}

interface FlyRankModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FlyRankModal({ isOpen, onClose }: FlyRankModalProps) {
  const [projects, setProjects] = useState<FlyRankProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      const fetchFlyRankProjects = async () => {
        setLoading(true);

        // 1. Récupération dans la table projects (category = flyrank)
        const { data: catProjects } = await supabase
          .from('projects')
          .select('*')
          .eq('category', 'flyrank');

        // 2. Récupération dans la table dédiée flyrank_assignments
        const { data: assignments } = await supabase
          .from('flyrank_assignments')
          .select('*')
          .order('created_at', { ascending: false });

        const combined = [
          ...(catProjects || []),
          ...(assignments || []),
        ];

        setProjects(combined);
        setLoading(false);
      };

      fetchFlyRankProjects();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-cyan-500/30 bg-[#0a1118] p-6 sm:p-8 text-white shadow-[0_0_50px_rgba(6,182,212,0.15)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-poppins text-lg font-bold text-white">Stage FlyRank AI</h3>
                <p className="text-xs text-slate-400">Travaux et rendus réalisés durant mon stage</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          {loading ? (
            <div className="py-12 text-center text-slate-400 text-sm">Chargement des devoirs...</div>
          ) : projects.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Aucun devoir trouvé pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id || `flyrank-${idx}`}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-white text-base mb-1">{proj.title}</h4>
                    <p className="text-xs text-slate-300 mb-3">{proj.description}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      {proj.github_url && (
                        <a
                          href={proj.github_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                          <SiGithub className="h-3.5 w-3.5" /> Code
                        </a>
                      )}
                      {proj.live_url && (
                        <a
                          href={proj.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-slate-300 hover:text-cyan-400 transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}