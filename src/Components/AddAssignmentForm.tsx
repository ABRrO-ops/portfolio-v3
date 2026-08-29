"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const AddAssignmentForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [title, setTitle] = useState('');
  const [module, setModule] = useState('AI Fluency');
  const [description, setDescription] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setErrorMsg('Veuillez sélectionner un fichier au format PDF.');
        return;
      }
      setErrorMsg(null);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(false);

    try {
      let publicDocUrl = null;

      // STEP 1 : Téléversement du fichier sur Supabase Storage
      if (file) {
        // Nettoyage du nom de fichier pour éviter les conflits et caractères spéciaux
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const filePath = `documents/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('assignments_docs')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        // STEP 2 : Récupération de l'URL publique
        const { data: publicUrlData } = supabase.storage
          .from('assignments_docs')
          .getPublicUrl(filePath);

        publicDocUrl = publicUrlData.publicUrl;
      }

      // STEP 3 : Détermination du type de livrable
      let artifactType: 'document' | 'code' | 'image' = 'code';
      if (publicDocUrl) {
        artifactType = 'document';
      }

      // STEP 4 : Insertion dans la table PostgreSQL
      const { error: insertError } = await supabase
        .from('assignments')
        .insert([
          {
            title,
            module,
            description,
            artifact_type: artifactType,
            doc_url: publicDocUrl,
            github_url: githubUrl || null,
            demo_url: demoUrl || null,
          }
        ]);

      if (insertError) throw insertError;

      setSuccessMsg(true);
      setTitle('');
      setDescription('');
      setGithubUrl('');
      setDemoUrl('');
      setFile(null);

      if (onSuccess) onSuccess();

    } catch (err: any) {
      setErrorMsg(err.message || "Une erreur est survenue lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 max-w-lg mx-auto text-white">
      <h3 className="text-lg font-bold border-b border-slate-800 pb-2">Ajouter un Devoir</h3>

      {errorMsg && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Devoir et document enregistrés avec succès !</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1">Titre du devoir *</label>
        <input 
          type="text" 
          required
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Ship the ugly"
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
        />
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1">Module *</label>
        <select 
          value={module} 
          onChange={(e) => setModule(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 text-slate-300"
        >
          <option value="AI Fluency">AI Fluency</option>
          <option value="Front-end AI Engineering">Front-end AI Engineering</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1">Description</label>
        <textarea 
          rows={3}
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Résumé du projet..."
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500 resize-none"
        />
      </div>

      {/* ZONE UPLOAD PDF */}
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-1">Document PDF (Optionnel)</label>
        <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-950/50 rounded-xl p-4 text-center cursor-pointer relative">
          <input 
            type="file" 
            accept="application/pdf"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center gap-1.5">
            <Upload className="h-6 w-6 text-slate-500" />
            {file ? (
              <span className="text-xs text-amber-400 font-mono font-semibold flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" /> {file.name}
              </span>
            ) : (
              <span className="text-xs text-slate-500 font-mono">
                Glissez un PDF ici ou cliquez pour parcourir
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Lien Repo GitHub</label>
          <input 
            type="url" 
            value={githubUrl} 
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1">Lien Live Demo</label>
          <input 
            type="url" 
            value={demoUrl} 
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://vercel.app/..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold py-2 px-4 rounded-lg text-xs font-mono flex items-center justify-center gap-2 transition-colors mt-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Envoi en cours...</span>
          </>
        ) : (
          <span>Publier le devoir</span>
        )}
      </button>
    </form>
  );
};