import Navbar from '../Components/Navbar';
import SignatureHero from '../Hero/SignatureHero';
import AboutSection from '../Components/AboutSection';
import ProjectsSection from '../Components/ProjectsSection';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#0F172A] overflow-x-hidden scroll-smooth">
      <Navbar />
      <SignatureHero />
      <AboutSection />
      <ProjectsSection />
      
      <footer className="w-full border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-400">
        <p>© 2026 BAWA Abdoul-Madjid (ABRO) — Frontend & AI Engineering Showcase</p>
      </footer>
    </main>
  );
}