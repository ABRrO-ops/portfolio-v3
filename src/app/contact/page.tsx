'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface HistoryLine {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export default function ContactPage() {
  const [inputVal, setInputVal] = useState('');
  const [step, setStep] = useState<'idle' | 'name' | 'email' | 'message' | 'confirm'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: 'output', text: 'Bienvenue sur le terminal de contact sécurisé v3.0.4' },
    { type: 'output', text: 'Tape "contact" pour initier l\'envoi d\'un message, ou "help" pour voir les commandes.' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd && step === 'idle') return;

    if (step === 'idle') {
      const newHistory = [...history, { type: 'input' as const, text: `$ ${cmd}` }];
      
      if (cmd.toLowerCase() === 'help') {
        newHistory.push({ type: 'output', text: 'Commandes disponibles:\n- contact : Démarrer le formulaire de message\n- clear : Effacer l\'écran du terminal\n- about : Afficher le statut système\n- socials : Voir les liens pro' });
      } else if (cmd.toLowerCase() === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      } else if (cmd.toLowerCase() === 'about') {
        newHistory.push({ type: 'output', text: 'Système : Cursus Ingénierie Web & Mobile / Trading Algorithmique. Statut : Opérationnel.' });
      } else if (cmd.toLowerCase() === 'socials') {
        newHistory.push({ type: 'output', text: 'GitHub: github.com/abro\nLinkedIn / Upwork: Disponibles sur demande.' });
      } else if (cmd.toLowerCase() === 'contact') {
        setStep('name');
        newHistory.push({ type: 'output', text: '>>> Initialisation du protocole de message...\nQuel est ton nom ?' });
      } else {
        newHistory.push({ type: 'error', text: `Commande inconnue: "${cmd}". Tape "help" pour la liste.` });
      }
      setHistory(newHistory);
      setInputVal('');
    } else {
      handleWizard(cmd);
    }
  };

  const handleWizard = (val: string) => {
    const newHistory = [...history, { type: 'input' as const, text: `> ${val}` }];

    if (step === 'name') {
      if (!val) {
        newHistory.push({ type: 'error', text: 'Le nom ne peut pas être vide.' });
      } else {
        setFormData((prev) => ({ ...prev, name: val }));
        setStep('email');
        newHistory.push({ type: 'output', text: `Enregistré, ${val}. Quel est ton email de contact ?` });
      }
    } else if (step === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        newHistory.push({ type: 'error', text: 'Format d\'email invalide. Réessaie :' });
      } else {
        setFormData((prev) => ({ ...prev, email: val }));
        setStep('message');
        newHistory.push({ type: 'output', text: 'Parfait. Écris maintenant ton message :' });
      }
    } else if (step === 'message') {
      if (!val) {
        newHistory.push({ type: 'error', text: 'Le message ne peut pas être vide.' });
      } else {
        setFormData((prev) => {
          const updated = { ...prev, message: val };
          submitMessage(updated);
          return updated;
        });
        setStep('confirm');
        newHistory.push({ type: 'output', text: 'Transmission du message aux serveurs...' });
      }
    }
    setHistory(newHistory);
    setInputVal('');
  };

  const submitMessage = async (data: { name: string; email: string; message: string }) => {
    setStatus('submitting');
    try {
      
      const response = await fetch('https://formspree.io/f/xnpaykep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        setHistory((prev) => [
          ...prev,
          { type: 'success', text: '✓ Message transmis avec succès ! Je te recontacterai rapidement.' },
          { type: 'output', text: 'Tape "contact" pour envoyer un autre message ou "help".' },
        ]);
      } else {
        throw new Error('Erreur réseau');
      }
    } catch {
      setStatus('error');
      setHistory((prev) => [
        ...prev,
        { type: 'error', text: '❌ Échec de l\'envoi. Vérifie ta connexion ou contacte-moi directement par mail.' },
      ]);
    } finally {
      setStep('idle');
    }
  };

  return (
    <main className="min-h-screen w-full bg-primary-dark text-white pt-28 pb-20 px-6">
      <div className="mx-auto max-w-4xl">
        
        {/* Titre */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-gold border border-amber-gold/30 px-3 py-1 rounded-full bg-amber-gold/10 inline-block mb-4">
            Interface CLI
          </span>
          <h1 className="font-poppins text-4xl font-black tracking-tight sm:text-5xl text-white mb-2">
            Terminal de <span className="text-amber-gold">Contact</span>
          </h1>
          <p className="text-slate-300 text-sm">
            Interagis directement avec la console pour m'envoyer un message chiffré.
          </p>
        </motion.div>

        {/* Boîte Terminal */}
        <div className="rounded-2xl border border-ice-blue/20 bg-[#0a1015] shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden font-mono">
          
          {/* Barre de titre du Terminal */}
          <div className="bg-[#0f171c] px-4 py-3 border-b border-ice-blue/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-gold/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <TerminalIcon className="h-3.5 w-3.5 text-amber-gold" />
              <span>abro@portfolio-v3:~</span>
            </div>
            <div className="text-[10px] text-ice-blue/60">bash</div>
          </div>

          {/* Écran du terminal */}
          <div className="p-6 min-h-87.5 max-h-125 overflow-y-auto space-y-3 text-xs sm:text-sm">
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                {item.type === 'input' && <span className="text-amber-gold font-bold">{item.text}</span>}
                {item.type === 'output' && <span className="text-slate-300">{item.text}</span>}
                {item.type === 'error' && <span className="text-red-400 flex items-center gap-1.5"><AlertCircle className="h-4 w-4 shrink-0" />{item.text}</span>}
                {item.type === 'success' && <span className="text-green-400 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 shrink-0" />{item.text}</span>}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Ligne de commande active */}
          <form onSubmit={handleCommand} className="bg-[#070b0e] px-4 py-3 border-t border-ice-blue/15 flex items-center gap-2">
            <span className="text-amber-gold font-bold">
              {step === 'idle' ? '$' : step === 'name' ? 'nom >' : step === 'email' ? 'email >' : 'msg >'}
            </span>
            <input
              type={step === 'email' ? 'email' : 'text'}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={step === 'idle' ? 'Tape "contact" ou "help"...' : 'Écris ta réponse ici...'}
              className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-slate-600"
              autoFocus
              disabled={status === 'submitting'}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-3 py-1.5 rounded-lg bg-amber-gold text-primary-dark font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              {status === 'submitting' ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">Exécuter</span>
            </button>
          </form>

        </div>

      </div>
    </main>
  );
}