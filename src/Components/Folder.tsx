'use client';

import React, { useState } from 'react';
import { FileText, Briefcase, Award, ExternalLink } from 'lucide-react';

const darkenColor = (hex: string, percent: number) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const num = parseInt(color.slice(0, 6), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

interface FolderProps {
  color?: string;
  size?: number;
  className?: string;
  title?: string;
  onOpenFlyRankModal: () => void;
  onOpenCertifsModal: () => void;
}

export default function Folder({
  color = '#F59E0B',
  size = 1.2,
  className = '',
  title = 'Ressources & Accréditations',
  onOpenFlyRankModal,
  onOpenCertifsModal,
}: FolderProps) {
  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const folderBackColor = darkenColor(color, 0.15);

  const handleClickFolder = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets([
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ]);
    }
  };

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (index: number) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div style={{ transform: `scale(${size})` }} className="relative select-none py-6">
        <div
          onClick={handleClickFolder}
          tabIndex={0}
          role="button"
          aria-expanded={open}
          className="group cursor-pointer transition-transform duration-300 focus:outline-none"
        >
          {/* DOSSIER ARRIÈRE avec tailles fixes Tailwind valides */}
          <div
            className="relative h-24 w-32 rounded-b-lg rounded-tr-lg transition-transform duration-300 group-hover:-translate-y-2"
            style={{ backgroundColor: folderBackColor }}
          >
            {/* Languette du dossier */}
            <div
              className="absolute -top-3 left-0 h-3 w-12 rounded-t-md"
              style={{ backgroundColor: folderBackColor }}
            />

            {/* FEUILLE 1 : CV PDF */}
            <div
              onMouseMove={e => handlePaperMouseMove(e, 0)}
              onMouseLeave={() => handlePaperMouseLeave(0)}
              onClick={e => {
                e.stopPropagation();
                window.open('/cv.pdf', '_blank');
              }}
              style={{
                transform: open
                  ? `translate(calc(-120% + ${paperOffsets[0].x}px), calc(-70% + ${paperOffsets[0].y}px)) rotate(-15deg)`
                  : 'translate(-50%, 5%)',
              }}
              className="absolute bottom-[10%] left-1/2 z-10 flex h-[85%] w-[75%] flex-col items-center justify-center gap-1 rounded-lg bg-slate-100 p-2 text-slate-900 shadow-md transition-all duration-300 hover:scale-105"
            >
              <FileText className="h-5 w-5 text-amber-600" />
              <span className="text-[9px] font-bold tracking-tight">Mon CV</span>
              <span className="text-[7px] font-mono text-slate-500 flex items-center gap-0.5">
                PDF <ExternalLink className="h-2 w-2" />
              </span>
            </div>

            {/* FEUILLE 2 : FLYRANK AI STAGE */}
            <div
              onMouseMove={e => handlePaperMouseMove(e, 1)}
              onMouseLeave={() => handlePaperMouseLeave(1)}
              onClick={e => {
                e.stopPropagation();
                onOpenFlyRankModal();
              }}
              style={{
                transform: open
                  ? `translate(calc(20% + ${paperOffsets[1].x}px), calc(-70% + ${paperOffsets[1].y}px)) rotate(15deg)`
                  : 'translate(-50%, 5%)',
              }}
              className="absolute bottom-[10%] left-1/2 z-10 flex h-[80%] w-[80%] flex-col items-center justify-center gap-1 rounded-lg bg-slate-200 p-2 text-slate-900 shadow-md transition-all duration-300 hover:scale-105"
            >
              <Briefcase className="h-5 w-5 text-cyan-600" />
              <span className="text-[9px] font-bold tracking-tight text-center leading-tight">Stage AI</span>
              <span className="text-[7px] font-mono text-slate-500">FlyRank AI</span>
            </div>

            {/* FEUILLE 3 : CERTIFICATIONS */}
            <div
              onMouseMove={e => handlePaperMouseMove(e, 2)}
              onMouseLeave={() => handlePaperMouseLeave(2)}
              onClick={e => {
                e.stopPropagation();
                onOpenCertifsModal();
              }}
              style={{
                transform: open
                  ? `translate(calc(-50% + ${paperOffsets[2].x}px), calc(-105% + ${paperOffsets[2].y}px)) rotate(3deg)`
                  : 'translate(-50%, 5%)',
              }}
              className="absolute bottom-[10%] left-1/2 z-10 flex h-[75%] w-[85%] flex-col items-center justify-center gap-1 rounded-lg bg-white p-2 text-slate-900 shadow-md transition-all duration-300 hover:scale-105"
            >
              <Award className="h-5 w-5 text-emerald-600" />
              <span className="text-[9px] font-bold tracking-tight">Certifs</span>
              <span className="text-[7px] font-mono text-slate-500">Net / AI /Web</span>
            </div>

            {/* DOSSIER AVANT (COUVERCLE) */}
            <div
              className={`absolute z-20 h-full w-full rounded-b-lg rounded-tr-lg transition-all duration-300 origin-bottom ${
                open ? 'skew-x-12 scale-y-75' : 'group-hover:skew-x-12 group-hover:scale-y-75'
              }`}
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
      </div>

      {title && (
        <span className="text-xs font-mono text-ice-blue/70">
          {title} <span className="text-amber-gold font-bold">{open ? '(cliquer pour fermer)' : '(cliquer pour ouvrir)'}</span>
        </span>
      )}
    </div>
  );
}