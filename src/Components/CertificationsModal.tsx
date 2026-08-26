'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Briefcase, Award } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { supabase } from '@/lib/supabase'; // Ajusté en chemin relatif si nécessaire

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string;
  file_url: string;
}

interface CertificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificationsModal({ isOpen, onClose }: CertificationsModalProps) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchCertifications();
    }
  }, [isOpen]);

  const fetchCertifications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setCertifications(data);
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0f171c] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-6 bg-[#162229]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-gold flex items-center justify-center">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-poppins text-lg font-bold text-white">Certifications & Accréditations</h3>
                  <p className="text-xs text-ice-blue/70">Diplômes officiels et certifications obtenues</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Contenu / Galerie */}
            <div className="overflow-y-auto p-6 max-h-[calc(85vh-100px)]">
              {loading ? (
                <div className="py-12 text-center text-sm text-ice-blue/60">Chargement des certifications...</div>
              ) : certifications.length === 0 ? (
                <div className="py-12 text-center text-sm text-ice-blue/60">
                  Aucune certification ajoutée pour le moment.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="group rounded-xl border border-white/10 bg-primary-dark/60 overflow-hidden backdrop-blur-md hover:border-amber-gold/40 transition-all flex flex-col justify-between"
                    >
                      {/* Aperçu Visuel / Image */}
                      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                        <img
                          src={cert.file_url}
                          alt={cert.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Infos */}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-poppins text-sm font-bold text-white">{cert.title}</h4>
                            <p className="text-xs text-amber-gold font-medium mt-0.5">
                              {cert.issuer} {cert.issue_date && `• ${cert.issue_date}`}
                            </p>
                          </div>
                          {cert.credential_url && (
                            <a
                              href={cert.credential_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                              title="Vérifier le diplôme"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}