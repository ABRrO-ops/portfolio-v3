import type { Metadata } from 'next';
import { Poppins, Roboto, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/Components/Navbar';

const poppins = Poppins({
  weight: ['700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'ABRO | Fullstack Software Engineer & Creative Technologist',
  description: 'Portfolio d\'ingénieur logiciel Fullstack, UI/UX & WebGL 3D',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${roboto.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-primary-dark font-sans text-slate-100 antialiased selection:bg-amber-gold selection:text-primary-dark">
        <Navbar />
        {children}
      </body>
    </html>
  );
}