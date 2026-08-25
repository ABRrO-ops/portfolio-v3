'use client';

import { useState, useEffect } from 'react';
import '@/app/globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import SplashScreen from '@/Components/SplashScreen'; 
import Navbar from '@/Components/Navbar'; // Vérifie le nom/chemin exact de ton composant Navbar

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setLoading(false);
    }
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setLoading(false);
  };

  return (
    <html lang="fr">
      <body>
        <LanguageProvider>
          {loading && <SplashScreen onFinish={handleSplashFinish} />}
          <div className={loading ? 'opacity-0 overflow-hidden h-screen' : 'opacity-100 transition-opacity duration-1000'}>
            <Navbar />
            <main>{children}</main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}