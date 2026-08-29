"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Image as ImageIcon, FileText, Code2, 
  ExternalLink, Eye 
} from 'lucide-react';

const GithubIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export interface FlyRankAssignment {
  id: string;
  title: string;
  module: string;
  description: string;
  artifact_type?: string;
  artifactType?: string;
  image_url?: string;
  imageUrl?: string;
  doc_url?: string;
  document_url?: string;
  documentUrl?: string;
  github_url?: string;
  githubUrl?: string;
  demo_url?: string;
  demoUrl?: string;
  technologies?: string[];
  stack?: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignments: FlyRankAssignment[];
}

export const FlyRankExplorerModal: React.FC<ModalProps> = ({ isOpen, onClose, assignments = [] }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'AI Fluency' | 'Front-end AI Engineering'>('all');

  useEffect(() => {
    if (assignments.length > 0 && !selectedId) {
      setSelectedId(assignments[0].id);
    }
  }, [assignments, selectedId]);

  if (!isOpen) return null;

  const filteredAssignments = activeTab === 'all' 
    ? assignments 
    : assignments.filter((item) => item.module === activeTab);  

  const selectedAssignment = assignments.find((item) => item.id === selectedId) || filteredAssignments[0] || assignments[0];

  const item = (selectedAssignment || {}) as any;
  
  // Extraction robuste des URLs
  const currentImgUrl = (item?.image_url || item?.imageUrl || '').trim();
  const currentDocUrl = (item?.doc_url || item?.document_url || item?.documentUrl || '').trim();
  const currentGithubUrl = (item?.github_url || item?.githubUrl || item?.repo_url || '').trim();
  const currentDemoUrl = (item?.demo_url || item?.demoUrl || item?.live_url || '').trim();
  const currentTechs = item?.technologies || item?.stack || [];

  // Détection si c'est un PDF par l'URL ou par le type
  const isPdf = currentDocUrl.toLowerCase().includes('.pdf') || item?.artifact_type === 'doc' || item?.artifactType === 'doc';

  const getArtifactIcon = (assign: any) => {
    const doc = assign?.doc_url || assign?.document_url || assign?.documentUrl;
    const img = assign?.image_url || assign?.imageUrl;
    const type = assign?.artifact_type || assign?.artifactType;

    if (doc || type === 'doc' || type === 'document') {
      return <FileText className="h-4 w-4 text-blue-400 shrink-0" />;
    }
    if (img || type === 'image') {
      return <ImageIcon className="h-4 w-4 text-pink-400 shrink-0" />;
    }
    return <Code2 className="h-4 w-4 text-emerald-400 shrink-0" />;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900/90 border border-slate-700/60 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl backdrop-filter"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 border-l border-slate-800 pl-3">
                flyrank-explorer // workspace
              </span>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-slate-800 bg-slate-950/30 flex flex-col">
              <div className="p-3 border-b border-slate-800/60 flex gap-1">
                {(['all', 'AI Fluency', 'Front-end AI Engineering'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                      activeTab === tab 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                        : 'text-slate-400 hover:bg-slate-800/50'
                    }`}
                  >
                    {tab === 'all' ? 'Tous' : tab === 'AI Fluency' ? 'AI Fluency' : 'Frontend AI'}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredAssignments.map((assignment) => (
                  <button
                    key={assignment.id}
                    onClick={() => setSelectedId(assignment.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 border ${
                      selectedAssignment?.id === assignment.id
                        ? 'bg-slate-800/80 border-slate-600/80 text-white shadow-lg'
                        : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="mt-0.5">{getArtifactIcon(assignment)}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold truncate text-slate-200">{assignment.title}</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{assignment.module}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Viewer Central */}
            <div className="flex-1 flex flex-col bg-slate-900/40 p-6 overflow-y-auto">
              {selectedAssignment ? (
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
                        {selectedAssignment.module}
                      </span>
                      <h2 className="text-xl font-bold text-white">{selectedAssignment.title}</h2>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {selectedAssignment.description}
                  </p>

                  <div className="flex-1 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-hidden flex flex-col justify-center items-center min-h-[400px] relative p-2">
                    
                    {/* OPTION 1 : VISUALISEUR PDF NATIVE IFRAME */}
                    {Boolean(currentDocUrl) ? (
                      <div className="w-full h-full flex flex-col relative">
                        <iframe
                          src={`${currentDocUrl}#toolbar=0`}
                          className="w-full flex-1 rounded-lg border-0 bg-white/5"
                          title={selectedAssignment.title}
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <a 
                            href={currentDocUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-blue-400 border border-blue-500/30 text-xs font-mono flex items-center gap-1.5 backdrop-blur transition-all"
                          >
                            <ExternalLink className="h-3.5 w-3.5" /> Ouvrir en grand
                          </a>
                        </div>
                      </div>
                    ) : Boolean(currentImgUrl) ? (
                      /* OPTION 2 : RENDU IMAGE */
                      <div className="relative group w-full h-full flex items-center justify-center">
                        <img 
                          src={currentImgUrl} 
                          alt={selectedAssignment.title}
                          className="max-h-96 w-auto object-contain rounded-lg border border-slate-800 shadow-md"
                        />
                        <a 
                          href={currentImgUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs font-mono flex items-center gap-2 backdrop-blur border border-white/10"
                        >
                          <Eye className="h-3.5 w-3.5" /> Agrandir PNG
                        </a>
                      </div>
                    ) : (
                      /* OPTION 3 : LIENS CODE / DEMO */
                      <div className="text-center space-y-4">
                        <Code2 className="h-12 w-12 text-emerald-400 mx-auto opacity-80" />
                        <div className="flex flex-wrap items-center justify-center gap-3">
                          {Boolean(currentGithubUrl) && (
                            <a 
                              href={currentGithubUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
                            >
                              <GithubIcon className="h-4 w-4" /> Code Source
                            </a>
                          )}
                          {Boolean(currentDemoUrl) && (
                            <a 
                              href={currentDemoUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" /> Voir la Démo
                            </a>
                          )}
                        </div>
                        {!currentGithubUrl && !currentDemoUrl && (
                          <p className="text-xs text-slate-500 font-mono">
                            Aucun fichier ou lien externe rattaché.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Technologies */}
                  {currentTechs.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-slate-400 block mb-2">Technologies :</span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentTechs.map((tech: string) => (
                          <span key={tech} className="px-2 py-0.5 bg-slate-800 rounded text-[10px] font-mono text-slate-300 border border-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-500 text-xs font-mono">
                  Aucun livrable sélectionné.
                </div>
              )}

              {/* Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500 mt-4">
                <span>
                  Livrables : {filteredAssignments.length} / {assignments.length}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};