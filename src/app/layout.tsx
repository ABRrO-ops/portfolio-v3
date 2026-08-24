import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  weight: ['400', '600', '700', '900'], 
  subsets: ['latin'], 
  variable: '--font-poppins' 
});

export const metadata: Metadata = {
  title: 'ABRO | Portfolio Ingénieur & Trader',
  description: 'Portfolio d\'un élève ingénieur Fullstack & trader algorithmique.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="bg-primary-dark text-white antialiased">
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}