'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Terminal as TerminalIcon, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  LayoutGrid, 
  Mail, 
  MapPin, 
  Code2, 
  MessageSquare,
  LucideIcon 
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HistoryLine {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
  tag: string;
}

function ContactCard({ icon: Icon, title, value, href, tag }: ContactCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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

  const CardContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative h-full w-full rounded-2xl border border-ice-blue/15 bg-[#0f171c]/70 p-5 backdrop-blur-md transition-all duration-200 hover:border-amber-gold/50 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col justify-between"
    >
      <div style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-amber-gold/10 border border-amber-gold/20 text-amber-gold">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-mono text-ice-blue bg-ice-blue/10 border border-ice-blue/20 px-2 py-0.5 rounded-md">
            {tag}
          </span>
        </div>
        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">{title}</h3>
        <p className="text-sm font-poppins font-semibold text-white group-hover:text-amber-gold transition-colors">{value}</p>
      </div>
    </motion.div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block group">
      {CardContent}
    </a>
  ) : (
    <div className="group">{CardContent}</div>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'cli' | 'gui'>('cli');

  // Charge la police Fira Code directement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const linkId = 'fira-code-font';
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.href = 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    }
  }, []);

  // ÉTAT CLI
  const [inputVal, setInputVal] = useState('');
  const [step, setStep] = useState<'idle' | 'name' | 'email' | 'message'>('idle');
  const [history, setHistory] = useState<HistoryLine[]>([
    { type: 'output', text: 'Bienvenue sur le terminal de contact sécurisé v3.0.4' },
    { type: 'output', text: 'Tape "contact" pour initier l\'envoi d\'un message, ou "help" pour voir les commandes.' },
  ]);

  // ÉTAT GUI FORM
  const [guiForm, setGuiForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewMode === 'cli') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, viewMode]);

  const sendData = async (payload: { name: string; email: string; message: string }) => {
    setStatus('submitting');
    try {
      const response = await fetch('https://formspree.io/f/xnpaykep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        return true;
      } else {
        throw new Error('Erreur réseau');
      }
    } catch {
      setStatus('error');
      return false;
    }
  };

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd && step === 'idle') return;

    if (step === 'idle') {
      const newHistory = [...history, { type: 'input' as const, text: `$ ${cmd}` }];
      
      if (cmd.toLowerCase() === 'help') {
        newHistory.push({ type: 'output', text: 'Commandes disponibles:\n- contact : Démarrer l\'envoi\n- clear : Effacer l\'écran\n- about : Statut système\n- socials : Réseaux pro' });
      } else if (cmd.toLowerCase() === 'clear') {
        setHistory([]);
        setInputVal('');
        return;
      } else if (cmd.toLowerCase() === 'contact') {
        setStep('name');
        newHistory.push({ type: 'output', text: '>>> Initialisation du formulaire...\nQuel est ton nom ?' });
      } else {
        newHistory.push({ type: 'error', text: `Commande inconnue: "${cmd}". Tape "help".` });
      }
      setHistory(newHistory);
      setInputVal('');
    } else {
      const newHistory = [...history, { type: 'input' as const, text: `> ${cmd}` }];
      if (step === 'name') {
        if (!cmd) {
          newHistory.push({ type: 'error', text: 'Nom obligatoire.' });
        } else {
          setGuiForm((prev) => ({ ...prev, name: cmd }));
          setStep('email');
          newHistory.push({ type: 'output', text: `Enregistré, ${cmd}. Ton adresse email ?` });
        }
      } else if (step === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cmd)) {
          newHistory.push({ type: 'error', text: 'Email invalide.' });
        } else {
          setGuiForm((prev) => ({ ...prev, email: cmd }));
          setStep('message');
          newHistory.push({ type: 'output', text: 'Super. Écris ton message :' });
        }
      } else if (step === 'message') {
        if (!cmd) {
          newHistory.push({ type: 'error', text: 'Message vide non autorisé.' });
        } else {
          const updated = { ...guiForm, message: cmd };
          setGuiForm(updated);
          newHistory.push({ type: 'output', text: 'Transmission du message...' });
          setHistory(newHistory);
          setInputVal('');
          const success = await sendData(updated);
          if (success) {
            setHistory((prev) => [
              ...prev,
              { type: 'success', text: '✓ Message transmis avec succès !' },
              { type: 'output', text: 'Tape "contact" pour en renvoyer un autre.' },
            ]);
          } else {
            setHistory((prev) => [...prev, { type: 'error', text: '❌ Échec de l\'envoi.' }]);
          }
          setStep('idle');
          return;
        }
      }
      setHistory(newHistory);
      setInputVal('');
    }
  };

  const handleGuiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guiForm.name || !guiForm.email || !guiForm.message) return;
    await sendData(guiForm);
  };

  return (
    <main className="min-h-screen w-full bg-primary-dark text-white pt-28 pb-20 px-6">
      <div className="mx-auto max-w-5xl">
        
        {/* EN-TÊTE ET TOGGLE SWITCHER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex p-1 rounded-xl bg-[#0a1015] border border-ice-blue/20 mb-4">
              <button
                type="button"
                onClick={() => setViewMode('gui')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  viewMode === 'gui'
                    ? 'bg-amber-gold text-primary-dark shadow-[0_0_15px_rgba(255,180,0,0.3)] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>{t('contact.tab_std')}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cli')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  viewMode === 'cli'
                    ? 'bg-amber-gold text-primary-dark shadow-[0_0_15px_rgba(255,180,0,0.3)] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TerminalIcon className="h-3.5 w-3.5" />
                <span>{t('contact.tab_cli')}</span>
              </button>
            </div>

            <h1 className="font-poppins text-4xl font-black tracking-tight sm:text-5xl text-white">
              {t('contact.title_1')}{' '}
              <span className="text-amber-gold">{t('contact.title_highlight')}</span>
            </h1>
          </motion.div>

          <p className="text-slate-400 text-xs sm:text-sm max-w-md font-mono">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* CONTENU ANIMÉ DYNAMIQUE */}
        <AnimatePresence mode="wait">
          {viewMode === 'gui' ? (
            /* --- VUE GRAPHIQUE MODERNE (GUI) --- */
            <motion.div
              key="gui"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Cartes d'infos rapides 3D */}
              <div className="space-y-4">
                <ContactCard
                  icon={Mail}
                  title={t('contact.cards.email')}
                  value="abdoulmadjidbawa@gmail.com"
                  href="mailto:abdoulmadjidbawa@gmail.com"
                  tag={t('contact.cards.direct')}
                />
                <ContactCard
                  icon={MapPin}
                  title={t('contact.cards.location')}
                  value={t('contact.cards.location_val')}
                  tag={t('contact.cards.timezone')}
                />
                <ContactCard
                  icon={Code2}
                  title={t('contact.cards.codebase')}
                  value="ABRrO-ops"
                  href="https://github.com/ABRrO-ops/"
                  tag={t('contact.cards.open_source')}
                />
              </div>

              {/* Formulaire Standard Pro */}
              <div className="lg:col-span-2 rounded-2xl border border-ice-blue/15 bg-[#0f171c]/70 p-6 sm:p-8 backdrop-blur-md">
                <h3 className="font-poppins text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-amber-gold" />
                  <span>{t('contact.form.title')}</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mb-6">
                  {t('contact.form.subtitle')}
                </p>

                {status === 'success' ? (
                  <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-green-400 mx-auto" />
                    <h4 className="font-poppins font-bold text-white">Message Transmis !</h4>
                    <p className="text-xs text-slate-300">Merci pour votre message. Je vous recontacterai rapidement.</p>
                    <button
                      type="button"
                      onClick={() => { setStatus('idle'); setGuiForm({ name: '', email: '', message: '' }); }}
                      className="text-xs font-mono text-amber-gold underline hover:text-amber-300"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleGuiSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          {t('contact.form.label_name')}
                        </label>
                        <input
                          type="text"
                          required
                          value={guiForm.name}
                          onChange={(e) => setGuiForm({ ...guiForm, name: e.target.value })}
                          placeholder={t('contact.form.placeholder_name')}
                          className="w-full rounded-xl border border-ice-blue/20 bg-[#070b0e] px-4 py-2.5 text-xs text-white focus:border-amber-gold focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          {t('contact.form.label_email')}
                        </label>
                        <input
                          type="email"
                          required
                          value={guiForm.email}
                          onChange={(e) => setGuiForm({ ...guiForm, email: e.target.value })}
                          placeholder={t('contact.form.placeholder_email')}
                          className="w-full rounded-xl border border-ice-blue/20 bg-[#070b0e] px-4 py-2.5 text-xs text-white focus:border-amber-gold focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        {t('contact.form.label_message')}
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={guiForm.message}
                        onChange={(e) => setGuiForm({ ...guiForm, message: e.target.value })}
                        placeholder={t('contact.form.placeholder_message')}
                        className="w-full rounded-xl border border-ice-blue/20 bg-[#070b0e] px-4 py-2.5 text-xs text-white focus:border-amber-gold focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-xs text-red-400 font-mono">
                        <AlertCircle className="h-4 w-4" />
                        <span>Erreur d'envoi. Veuillez réessayer.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-gold text-primary-dark font-poppins font-bold text-xs hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(255,180,0,0.2)]"
                    >
                      {status === 'submitting' ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      <span>{t('contact.form.btn_send')}</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          ) : (
            /* --- VUE TERMINAL (CLI) --- */
            <motion.div
              key="cli"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{ 
                fontFamily: "'Fira Code', Consolas, Monaco, 'Courier New', monospace",
                letterSpacing: '0.12em'
              }}
              className="rounded-2xl border border-ice-blue/20 bg-[#0a1015] shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <div className="bg-[#0f171c] px-4 py-3 border-b border-ice-blue/15 flex items-center justify-between font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-gold/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80 inline-block" />
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                  <TerminalIcon className="h-3.5 w-3.5 text-amber-gold" />
                  <span>abro@portfolio-v3:~</span>
                </div>
                <div className="text-[10px] text-ice-blue/60 font-mono">bash</div>
              </div>

              <div className="p-6 min-h-87.5 max-h-125 overflow-y-auto space-y-3 text-[13px] font-mono leading-relaxed">
                {history.map((item, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">
                    {item.type === 'input' && <span className="text-amber-gold font-semibold">{item.text}</span>}
                    {item.type === 'output' && <span className="text-slate-300">{item.text}</span>}
                    {item.type === 'error' && <span className="text-red-400 flex items-center gap-1.5"><AlertCircle className="h-4 w-4 shrink-0" />{item.text}</span>}
                    {item.type === 'success' && <span className="text-green-400 flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 shrink-0" />{item.text}</span>}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              <form onSubmit={handleCommand} className="bg-[#070b0e] px-4 py-3 border-t border-ice-blue/15 flex items-center gap-2 font-mono">
                <span className="text-amber-gold font-semibold">
                  {step === 'idle' ? '$' : step === 'name' ? 'nom >' : step === 'email' ? 'email >' : 'msg >'}
                </span>
                <input
                  type={step === 'email' ? 'email' : 'text'}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={step === 'idle' ? 'Tape "contact" ou "help"...' : 'Écris ta réponse ici...'}
                  className="flex-1 bg-transparent text-white text-[13px] focus:outline-none placeholder:text-slate-600"
                  style={{ letterSpacing: '0.03em' }}
                  autoFocus
                  disabled={status === 'submitting'}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-3 py-1.5 rounded-lg bg-amber-gold text-primary-dark font-semibold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {status === 'submitting' ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline">Exécuter</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}