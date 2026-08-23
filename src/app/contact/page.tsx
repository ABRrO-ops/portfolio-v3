'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Briefcase, Send, CheckCircle2, Code } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] pt-28 pb-20 text-white">
      <div className="mx-auto max-w-5xl px-6">
        
        <div className="mb-16 text-center">
          <span className="text-xs font-bold tracking-widest text-[#00F2FE] uppercase">
            Travaillons ensemble
          </span>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Me <span className="text-[#00F2FE]">Contacter</span>
          </h1>
          <p className="mt-4 mx-auto max-w-xl text-slate-400">
            Un projet d'application web, une opportunité d'ingénierie logicielle ou une question technique ? Laissez-moi un message.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4">Coordonnées</h3>
              
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-cyan-500/10 p-2.5 text-[#00F2FE] border border-cyan-500/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Email direct</span>
                    <a href="mailto:contact@abro.dev" className="font-medium text-slate-200 hover:text-[#00F2FE] transition-colors">
                      contact@abro.dev
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="rounded-lg bg-cyan-500/10 p-2.5 text-[#00F2FE] border border-cyan-500/20">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Localisation</span>
                    <span className="font-medium text-slate-200">Lomé, Togo 🇹🇬</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-bold tracking-wider text-[#00F2FE] uppercase mb-4">Profils Pro</h3>
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="https://github.com/ABRO-code" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs font-semibold text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all"
                >
                    <Code className="h-4 w-4 text-[#00F2FE]" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs font-semibold text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all"
                >
                  <Briefcase className="h-4 w-4 text-[#00F2FE]" />
                  <span>Upwork</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <div className="h-14 w-14 rounded-full bg-cyan-500/10 text-[#00F2FE] flex items-center justify-center border border-cyan-500/30 mb-4">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Envoyé !</h3>
                <p className="mt-2 text-sm text-slate-400">Merci de votre prise de contact. Je vous répondrai dans les plus brefs délais.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-semibold text-[#00F2FE] hover:underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-300 uppercase mb-2">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-[#00F2FE] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-300 uppercase mb-2">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-[#00F2FE] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-300 uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre projet ou votre demande..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-[#00F2FE] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#00F2FE] py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,242,254,0.4)]"
                >
                  <Send className="h-4 w-4" />
                  <span>Envoyer le Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}