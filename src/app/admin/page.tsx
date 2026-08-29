'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Database,
  PlusCircle,
  Trash2,
  Loader2,
  CheckCircle2,
  FileCode,
  Briefcase,
  Award,
  Layers,
  ExternalLink,
  Lock,
  LogOut,
  KeyRound,
  Mail,
  FileImage,
  FileText,
  Upload,
} from 'lucide-react';


interface PdfViewerProps {
  documentUrl: string;
  documentPreviewUrl?: string; // Image d'aperçu/couverture de secours
  title?: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  documentUrl,
  documentPreviewUrl,
  title = "Document"
}) => {
  const [hasError, setHasError] = useState(false);

  // Ajout des paramètres pour cibler la page 1, ajuster la vue et masquer la barre d'outils PDF native
  const formattedPdfUrl = `${documentUrl}#page=1&view=FitH&toolbar=0`;

  return (
    <div className="flex flex-col w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Zone du Viewer PDF / Fallback */}
      <div className="relative w-full h-125 bg-slate-950 flex items-center justify-center overflow-hidden">
        {!hasError ? (
          <object
            data={formattedPdfUrl}
            type="application/pdf"
            className="w-full h-full"
            onError={() => setHasError(true)}
          >
            {/* Si <object> échoue ou est bloqué par le serveur distant (X-Frame-Options / CORS) */}
            <FallbackPreview 
              previewUrl={documentPreviewUrl} 
              title={title} 
              onFallbackTrigger={() => setHasError(true)} 
            />
          </object>
        ) : (
          <FallbackPreview previewUrl={documentPreviewUrl} title={title} />
        )}
      </div>

      {/* Zone d'action inférieure */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-t border-slate-800">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span className="truncate max-w-xs">{title}</span>
        </div>

        {/* Bouton d'action "Consulter le document" */}
        <a
          href={documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <span>Consulter le document</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

// Composant interne pour l'affichage de l'image miniature de secours
const FallbackPreview: React.FC<{ 
  previewUrl?: string; 
  title: string; 
  onFallbackTrigger?: () => void;
}> = ({ previewUrl, title, onFallbackTrigger }) => {
  if (previewUrl) {
    return (
      <img
        src={previewUrl}
        alt={`Aperçu de ${title}`}
        className="w-full h-full object-contain"
        onError={onFallbackTrigger}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
      <FileText className="w-12 h-12 text-slate-600 mb-2" />
      <p className="text-sm">L'aperçu interactif n'est pas disponible pour ce document.</p>
    </div>
  );
};
// Fonction de conversion PDF -> PNG (hors du composant React)
export async function convertPdfFirstPageToPng(pdfFile: File): Promise<File> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdfjs-dist/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  if (!context) throw new Error("Impossible de créer le contexte canvas");

  await page.render({
    canvasContext: context,
    canvas: canvas,
    viewport: viewport,
  }).promise;

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject("Erreur lors de la conversion du PDF en PNG");
      const pngFile = new File(
        [blob],
        pdfFile.name.replace(/\.pdf$/i, '.png'),
        { type: 'image/png' }
      );
      resolve(pngFile);
    }, 'image/png');
  });
}

export default function AdminDashboard() {
  // GESTION DE L'AUTHENTIFICATION
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // ÉTATS DE L'INTERFACE ADMIN
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'flyrank' | 'certifs'>('projects');
  const [loading, setLoading] = useState(false);
  const [loadingCertif, setLoadingCertif] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // ÉTATS DES DONNÉES RÉCUPÉRÉES DE SUPABASE
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [experiencesList, setExperiencesList] = useState<any[]>([]);
  const [flyrankList, setFlyrankList] = useState<any[]>([]);
  const [certifsList, setCertifsList] = useState<any[]>([]);

  // ÉTATS DES FORMULAIRES
  const [projectForm, setProjectForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: 'Web',
    status: 'Completed',
    stack: '',
    highlights: '',
    github_url: '',
    demo_url: '',
    featured: false,
    display_order: 0,
  });
  const [projectFile, setProjectFile] = useState<File | null>(null);

  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    type: '',
    start_date: '',
    description: '',
    stack: '',
    display_order: 0,
  });

  const [flyrankForm, setFlyrankForm] = useState({
    title: '',
    module: 'AI Fluency', // Alignement sur la colonne 'module' de Supabase
    artifact_type: 'code',
    description: '',
    stack: '',
    github_url: '',
    demo_url: '',
    image_url: '',
    doc_url: '',
    display_order: 0,
  });
  const [flyrankFile, setFlyrankFile] = useState<File | null>(null);

  // États distincts pour la gestion des certifications
  const [certifTitle, setCertifTitle] = useState('');
  const [certifIssuer, setCertifIssuer] = useState('');
  const [certifIssueDate, setCertifIssueDate] = useState('');
  const [certifCredentialUrl, setCertifCredentialUrl] = useState('');
  const [certifFile, setCertifFile] = useState<File | null>(null);

  // VÉRIFICATION DE LA SESSION SUPABASE
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      if (activeTab === 'projects') {
        const { data } = await supabase.from('projects').select('*').order('display_order', { ascending: true });
        setProjectsList(data || []);
      } else if (activeTab === 'experiences') {
        const { data } = await supabase.from('experiences').select('*').order('created_at', { ascending: false });
        setExperiencesList(data || []);
      } else if (activeTab === 'flyrank') {
        const { data } = await supabase.from('flyrank_assignments').select('*').order('display_order', { ascending: true });
        setFlyrankList(data || []);
      } else if (activeTab === 'certifs') {
        const { data } = await supabase.from('certifications').select('*').order('display_order', { ascending: true });
        setCertifsList(data || []);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
    }
  };

  useEffect(() => {
    if (session) {
      fetchData();
    }
  }, [activeTab, session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setAuthError(err.message || 'Identifiants invalides.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // HELPER UPLOAD STORAGE SUPABASE
  const uploadToStorage = async (file: File, folder: string) => {
    const cleanFileName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '_');
    const fileName = `${folder}_${Date.now()}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio-assets')
      .upload(fileName, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      console.error('Erreur Upload Supabase Storage:', uploadError);
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage.from('portfolio-assets').getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  // 1. AJOUT PROJET
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      let imageUrl = '';
      if (projectFile) {
        imageUrl = await uploadToStorage(projectFile, 'projects');
      }

      const { error } = await supabase.from('projects').insert([
        {
          title: projectForm.title,
          subtitle: projectForm.subtitle,
          description: projectForm.description,
          category: projectForm.category,
          status: projectForm.status,
          stack: projectForm.stack.split(',').map((s) => s.trim()).filter(Boolean),
          highlights: projectForm.highlights.split(',').map((h) => h.trim()).filter(Boolean),
          github_url: projectForm.github_url || null,
          demo_url: projectForm.demo_url || null,
          image_url: imageUrl || null,
          featured: projectForm.featured,
          display_order: Number(projectForm.display_order),
        },
      ]);

      if (error) throw error;
      setMessage({ type: 'success', text: 'Projet ajouté avec succès dans Supabase !' });
      setProjectForm({
        title: '',
        subtitle: '',
        description: '',
        category: 'Web',
        status: 'Completed',
        stack: '',
        highlights: '',
        github_url: '',
        demo_url: '',
        featured: false,
        display_order: 0,
      });
      setProjectFile(null);
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || "Erreur lors de l'ajout du projet." });
    } finally {
      setLoading(false);
    }
  };

  // 2. AJOUT EXPÉRIENCE
  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.from('experiences').insert([
        {
          role: expForm.role,
          company: expForm.company,
          type: expForm.type,
          start_date: expForm.start_date,
          description: expForm.description,
          stack: expForm.stack.split(',').map((s) => s.trim()).filter(Boolean),
          display_order: Number(expForm.display_order),
        },
      ]);

      if (error) throw error;
      setMessage({ type: 'success', text: 'Expérience / Jalon ajouté avec succès !' });
      setExpForm({
        role: '',
        company: '',
        type: '',
        start_date: '',
        description: '',
        stack: '',
        display_order: 0,
      });
      fetchData();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  /// 3. AJOUT MISSION FLYRANK (CORRIGÉ TYPESCRIPT + UPLOAD PDF)
const handleAddFlyrank = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage(null);
  try {
    let finalImageUrl = flyrankForm.image_url;
    let finalDocUrl = flyrankForm.doc_url;

    // Upload du fichier si fourni
    if (flyrankFile) {
      const uploadedUrl = await uploadToStorage(flyrankFile, 'flyrank');
      
      // Associe l'URL selon l'extension ou le type sélectionné
      if (flyrankFile.name.toLowerCase().endsWith('.pdf') || flyrankForm.artifact_type === 'doc') {
        finalDocUrl = uploadedUrl;
      } else {
        finalImageUrl = uploadedUrl;
      }
    }

    const { error } = await supabase.from('flyrank_assignments').insert([
      {
        title: flyrankForm.title,
        module: flyrankForm.module, // Utilisation de 'module'
        artifact_type: flyrankForm.artifact_type,
        description: flyrankForm.description,
        stack: flyrankForm.stack ? flyrankForm.stack.split(',').map((s) => s.trim()).filter(Boolean) : [],
        github_url: flyrankForm.github_url || null,
        demo_url: flyrankForm.demo_url || null,
        image_url: finalImageUrl || null,
        doc_url: finalDocUrl || null,
        display_order: Number(flyrankForm.display_order),
      },
    ]);

    if (error) throw error;
    setMessage({ type: 'success', text: 'Devoir/Mission FlyRank ajouté avec succès!' });
    
    // Réinitialisation exacte avec 'module' (pour corriger l'erreur de la ligne 425)
    setFlyrankForm({
      title: '',
      module: 'AI Fluency',
      artifact_type: 'code',
      description: '',
      stack: '',
      github_url: '',
      demo_url: '',
      image_url: '',
      doc_url: '',
      display_order: 0,
    });
    setFlyrankFile(null);
    fetchData();
  } catch (err: any) {
    setMessage({ type: 'error', text: err.message });
  } finally {
    setLoading(false);
  }
};

  // 4. AJOUT CERTIFICATION (AVEC CONVERSION PDF EN PNG)
  const handleAddCertif = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certifTitle || !certifIssuer || !certifIssueDate || !certifFile) return;

    setLoadingCertif(true);
    try {
      let fileToUpload = certifFile;

      if (certifFile.type === 'application/pdf') {
        fileToUpload = await convertPdfFirstPageToPng(certifFile);
      }

      const publicUrl = await uploadToStorage(fileToUpload, 'certifications');

      const { data, error } = await supabase
        .from('certifications')
        .insert([
          {
            title: certifTitle,
            issuer: certifIssuer,
            issue_date: certifIssueDate,
            credential_url: certifCredentialUrl || null,
            file_url: publicUrl,
          },
        ])
        .select();

      if (error) throw error;

      if (data) {
        setCertifsList((prev: any[]) => [data[0], ...prev]);
      }

      setCertifTitle('');
      setCertifIssuer('');
      setCertifIssueDate('');
      setCertifCredentialUrl('');
      setCertifFile(null);
    } catch (err: any) {
      alert('Erreur lors de l\'ajout de la certification : ' + err.message);
    } finally {
      setLoadingCertif(false);
    }
  };

  // SUPPRESSION GÉNÉRIQUE
  const handleDelete = async (table: string, id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cet élément ?')) return;
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert('Erreur de suppression: ' + err.message);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen w-full bg-primary-dark flex items-center justify-center text-white font-sans">
        <Loader2 className="h-8 w-8 animate-spin text-amber-gold" />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen w-full bg-primary-dark text-white flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f171c]/90 p-8 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="p-3 bg-amber-gold/10 border border-amber-gold/20 rounded-xl mb-3">
              <Lock className="h-6 w-6 text-amber-gold" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">Accès Réservé</h1>
            <p className="text-xs font-mono text-slate-400 mt-1">Authentifie-toi pour accéder à la gestion du site.</p>
          </div>
          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center font-medium">
              {authError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton-email@domaine.com"
                  className="input-admin pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Mot de passe</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="............"
                  className="input-admin pl-10"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-submit w-full mt-2">
              {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Se connecter'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-primary-dark text-white pt-28 pb-20 px-6 font-sans">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-poppins text-3xl font-black text-amber-gold flex items-center gap-3">
              <Database className="h-8 w-8 text-amber-gold" /> Dashboard Admin Supabase
            </h1>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Alimente directement ton portfolio en temps réel sans recompiler l'application.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-bold hover:bg-rose-500/20 transition-all"
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : null}
            {message.text}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8 bg-[#0f171c]/60 p-1.5 rounded-2xl border border-white/10">
          {[
            { id: 'projects', label: 'Projets', icon: FileCode },
            { id: 'experiences', label: 'Expériences', icon: Briefcase },
            { id: 'flyrank', label: 'FlyRank Stage', icon: Layers },
            { id: 'certifs', label: 'Certifications', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMessage(null);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-gold text-primary-dark shadow-[0_0_15px_rgba(255,180,0,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 1. TAB PROJETS */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleAddProject} className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0f171c]/80 p-6 backdrop-blur-md space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <PlusCircle className="h-5 w-5 text-amber-gold" /> Nouveau Projet
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Titre *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="CineAI Platform"
                    className="input-admin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Sous-titre / Slogan</label>
                  <input
                    type="text"
                    value={projectForm.subtitle}
                    onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                    placeholder="Plateforme IA de recommandation"
                    className="input-admin"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Description détaillée du projet..."
                  className="input-admin resize-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Catégorie</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="input-admin"
                  >
                    <option value="Fullstack">Web / Fullstack</option>
                    <option value="Systems">Systems / Low-level</option>
                    <option value="UI/UX & Mobile">Mobile / UI-UX</option>
                    <option value="3D & Creative">3D & Creative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Statut</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="input-admin"
                  >
                    <option value="Completed">Terminé</option>
                    <option value="In Progress">En cours</option>
                    <option value="Winner">Gagnant Hackathon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Ordre d'affichage</label>
                  <input
                    type="number"
                    value={projectForm.display_order}
                    onChange={(e) => setProjectForm({ ...projectForm, display_order: Number(e.target.value) })}
                    className="input-admin"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Technologies (séparées par virgules)</label>
                  <input
                    type="text"
                    value={projectForm.stack}
                    onChange={(e) => setProjectForm({ ...projectForm, stack: e.target.value })}
                    placeholder="Next.js, TypeScript, Supabase"
                    className="input-admin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Points forts (séparés par virgules)</label>
                  <input
                    type="text"
                    value={projectForm.highlights}
                    onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                    placeholder="Cache Redis, 99.9% Uptime"
                    className="input-admin"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">URL GitHub</label>
                  <input
                    type="url"
                    value={projectForm.github_url}
                    onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    className="input-admin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">URL Démo / Site Live</label>
                  <input
                    type="url"
                    value={projectForm.demo_url}
                    onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })}
                    placeholder="https://..."
                    className="input-admin"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Image Couverture (Upload Storage)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProjectFile(e.target.files?.[0] || null)}
                  className="input-admin text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-amber-gold file:text-primary-dark file:font-bold file:text-xs"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  className="h-4 w-4 rounded accent-amber-gold"
                />
                <label htmlFor="featured" className="text-xs font-mono text-slate-300">
                  Mettre en vedette (Featured)
                </label>
              </div>
              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Enregistrer dans Supabase'}
              </button>
            </form>

            <div className="rounded-2xl border border-white/10 bg-[#0f171c]/60 p-5 space-y-4">
              <h3 className="text-sm font-mono font-bold text-amber-gold border-b border-white/10 pb-2">
                Projets en BDD ({projectsList.length})
              </h3>
              <div className="space-y-3 max-h-150 overflow-y-auto pr-1">
                {projectsList.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-primary-dark/80 border border-white/5 flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-white">{p.title}</p>
                      <span className="text-[10px] font-mono text-amber-gold/80 bg-amber-500/10 px-2 py-0.5 rounded">{p.category}</span>
                    </div>
                    <button onClick={() => handleDelete('projects', p.id)} className="text-slate-500 hover:text-rose-400 transition-colors p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. TAB EXPÉRIENCES */}
        {activeTab === 'experiences' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleAddExperience} className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0f171c]/80 p-6 backdrop-blur-md space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <PlusCircle className="h-5 w-5 text-amber-gold" /> Nouvelle Expérience / Jalon
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Titre / Rôle *</label>
                  <input
                    type="text"
                    required
                    value={expForm.role}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    placeholder="Ex: Data Engineer"
                    className="input-admin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Entreprise / Organisation *</label>
                  <input
                    type="text"
                    required
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    placeholder="Ex: Google"
                    className="input-admin"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Type / Lieu (Texte en bleu) *</label>
                  <input
                    type="text"
                    required
                    value={expForm.type}
                    onChange={(e) => setExpForm({ ...expForm, type: e.target.value })}
                    placeholder="Ex: Lomé, Togo - Équipe Commit & Pray"
                    className="input-admin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Année / Période (Macaron jaune) *</label>
                  <input
                    type="text"
                    required
                    value={expForm.start_date}
                    onChange={(e) => setExpForm({ ...expForm, start_date: e.target.value })}
                    placeholder="Ex: 2026"
                    className="input-admin"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={expForm.description}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                  placeholder="Missions et réalisations principales..."
                  className="input-admin resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Technologies / Tags (séparés par virgules) *</label>
                <input
                  type="text"
                  required
                  value={expForm.stack}
                  onChange={(e) => setExpForm({ ...expForm, stack: e.target.value })}
                  placeholder="Ex: Hackathon, Civic Tech, UI/UX, Figma"
                  className="input-admin"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Ajouter au Parcours'}
              </button>
            </form>

            <div className="rounded-2xl border border-white/10 bg-[#0f171c]/60 p-5 space-y-4">
              <h3 className="text-sm font-mono font-bold text-amber-gold border-b border-white/10 pb-2">
                Expériences / Jalons ({experiencesList.length})
              </h3>
              <div className="space-y-3 max-h-150 overflow-y-auto">
                {experiencesList.map((e) => (
                  <div key={e.id} className="p-3 rounded-xl bg-primary-dark/80 border border-white/5 flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-white">
                        {e.role} {e.company ? `at ${e.company}` : ''}
                      </p>
                      <p className="text-xs text-cyan-400 font-mono">{e.type}</p>
                      <span className="text-[10px] text-amber-gold font-mono">{e.start_date}</span>
                    </div>
                    <button onClick={() => handleDelete('experiences', e.id)} className="text-slate-500 hover:text-rose-400 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. TAB STAGE FLYRANK (NOUVEAU FORMULAIRE AVEC SUPABASE STORAGE + DUAL LINK) */}
        {activeTab === 'flyrank' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleAddFlyrank} className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0f171c]/80 p-6 backdrop-blur-md space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <PlusCircle className="h-5 w-5 text-amber-gold" /> Mission / Devoir FlyRank
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Titre du Devoir / Mission *</label>
                  <input
                    type="text"
                    required
                    value={flyrankForm.title}
                    onChange={(e) => setFlyrankForm({ ...flyrankForm, title: e.target.value })}
                    placeholder="Identity Kit / Ship the Ugly"
                    className="input-admin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Parcours / Cohorte *</label>
                
                <select
                  value={flyrankForm.module}
                  onChange={(e) => setFlyrankForm({ ...flyrankForm, module: e.target.value })}
                  className="input-admin font-medium"
                >
                  <option value="AI Fluency">AI Fluency</option>
                  <option value="Front-end AI Engineering">Front-end AI Engineering</option>
                </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1 font-bold">
                  Format du Rendu / Artefact *
                </label>
                <select
                  value={flyrankForm.artifact_type}
                  onChange={(e) => setFlyrankForm({ ...flyrankForm, artifact_type: e.target.value })}
                  className="input-admin border-amber-gold/40 text-amber-gold font-bold"
                >
                  <option value="code">💻 Application Web (Repo GitHub + Live Demo)</option>
                  <option value="image">🖼️ Visual Design / Image PNG (Canva / Export)</option>
                  <option value="doc">📄 Document / PDF</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={flyrankForm.description}
                  onChange={(e) => setFlyrankForm({ ...flyrankForm, description: e.target.value })}
                  placeholder="Détail du travail effectué..."
                  className="input-admin resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Technologies / Stack (séparées par virgules)</label>
                <input
                  type="text"
                  value={flyrankForm.stack}
                  onChange={(e) => setFlyrankForm({ ...flyrankForm, stack: e.target.value })}
                  placeholder="Canva, HTML, TailwindCSS, Next.js"
                  className="input-admin"
                />
              </div>

              {/* CHAMPS DYNAMIQUES */}
              {flyrankForm.artifact_type === 'image' && (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-3">
                  <p className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                    <FileImage className="w-4 h-4" /> Artefact Visuel (PNG / Canva)
                  </p>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Fichier PNG/JPG (Upload direct)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFlyrankFile(e.target.files?.[0] || null)}
                      className="input-admin text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-emerald-500 file:text-slate-950 file:font-bold file:text-xs"
                    />
                  </div>
                  <div className="text-center text-xs text-slate-500 font-mono">OU</div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">URL externe de l'image</label>
                    <input
                      type="url"
                      value={flyrankForm.image_url}
                      onChange={(e) => setFlyrankForm({ ...flyrankForm, image_url: e.target.value })}
                      placeholder="https://..."
                      className="input-admin"
                    />
                  </div>
                </div>
              )}

              {flyrankForm.artifact_type === 'doc' && (
                <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/5 space-y-3">
                  <p className="text-xs font-mono text-blue-400 font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Artefact Documentaire (PDF)
                  </p>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Fichier PDF (Upload direct)</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setFlyrankFile(e.target.files?.[0] || null)}
                      className="input-admin text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white file:font-bold file:text-xs"
                    />
                  </div>
                  <div className="text-center text-xs text-slate-500 font-mono">OU</div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">URL externe du PDF/Doc</label>
                    <input
                      type="url"
                      value={flyrankForm.doc_url}
                      onChange={(e) => setFlyrankForm({ ...flyrankForm, doc_url: e.target.value })}
                      placeholder="https://..."
                      className="input-admin"
                    />
                  </div>
                </div>
              )}

              {flyrankForm.artifact_type === 'code' && (
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-3">
                  <p className="text-xs font-mono text-amber-gold font-bold flex items-center gap-2">
                    <FileCode className="w-4 h-4" /> Artefact Code & Web App
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">URL Repos GitHub</label>
                      <input
                        type="url"
                        value={flyrankForm.github_url}
                        onChange={(e) => setFlyrankForm({ ...flyrankForm, github_url: e.target.value })}
                        placeholder="https://github.com/..."
                        className="input-admin"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">URL Démo Site Live (Netlify/Vercel)</label>
                      <input
                        type="url"
                        value={flyrankForm.demo_url}
                        onChange={(e) => setFlyrankForm({ ...flyrankForm, demo_url: e.target.value })}
                        placeholder="https://...netlify.app"
                        className="input-admin"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Ajouter Mission FlyRank'}
              </button>
            </form>

            <div className="rounded-2xl border border-white/10 bg-[#0f171c]/60 p-5 space-y-4">
              <h3 className="text-sm font-mono font-bold text-amber-gold border-b border-white/10 pb-2">
                Missions enregistrées ({flyrankList.length})
              </h3>
              <div className="space-y-3 max-h-150 overflow-y-auto">
                {flyrankList.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-primary-dark/80 border border-white/5 flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                      <span className="text-[10px] text-cyan-400 font-mono">{item.track || item.module}</span>
                    </div>
                    <button onClick={() => handleDelete('flyrank_assignments', item.id)} className="text-slate-500 hover:text-rose-400 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. TAB CERTIFICATIONS */}
        {activeTab === 'certifs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleAddCertif} className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0f171c]/80 p-6 backdrop-blur-md space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <PlusCircle className="h-5 w-5 text-amber-gold" /> Nouvelle Certification
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Intitulé Certif *</label>
                  <input
                    type="text"
                    required
                    value={certifTitle}
                    onChange={(e) => setCertifTitle(e.target.value)}
                    placeholder="Cisco CCNA - Switching & Routing"
                    className="input-admin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Organisme Délivreur *</label>
                  <input
                    type="text"
                    required
                    value={certifIssuer}
                   onChange={(e) => setCertifIssuer(e.target.value)}
                    placeholder="Cisco Systems"
                    className="input-admin"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Année / Date</label>
                  <input
                    type="text"
                    value={certifIssueDate}
                    onChange={(e) => setCertifIssueDate(e.target.value)}
                    placeholder="2026"
                    className="input-admin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Lien de vérification (externe)</label>
                  <input
                    type="url"
                    value={certifCredentialUrl}
                   onChange={(e) => setCertifCredentialUrl(e.target.value)}
                    placeholder="https://credly.com/..."
                    className="input-admin"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Fichier Diplôme/Certificat (PDF/PNG) *</label>
                <input
                  type="file"
                  required
                  accept="image/*, application/pdf"
                  onChange={(e) => setCertifFile(e.target.files?.[0] || null)}
                  className="input-admin text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-amber-gold file:text-primary-dark file:font-bold file:text-xs"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-submit">
                {loading ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Uploader & Ajouter Certif'}
              </button>
            </form>

            <div className="rounded-2xl border border-white/10 bg-[#0f171c]/60 p-5 space-y-4">
              <h3 className="text-sm font-mono font-bold text-amber-gold border-b border-white/10 pb-2">
                Certifications ({certifsList.length})
              </h3>
              <div className="space-y-3 max-h-150 overflow-y-auto">
                {certifsList.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-primary-dark/80 border border-white/5 flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{c.title}</p>
                      <p className="text-xs text-emerald-400">
                        {c.issuer} ({c.issue_date})
                      </p>
                      {c.file_url && (
                        <a
                          href={c.file_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-amber-gold hover:underline flex items-center gap-1 mt-1"
                        >
                          Voir fichier <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                    <button onClick={() => handleDelete('certifications', c.id)} className="text-slate-500 hover:text-rose-400 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}