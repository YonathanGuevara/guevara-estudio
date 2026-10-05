import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import AureaHero from './components/AureaHero';
import AureaModulos from './components/AureaModulos';
import AureaDemo from './components/AureaDemo';
import AureaComoFunciona from './components/AureaComoFunciona';
import AureaCTA from './components/AureaCTA';

export default function Aurea() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <main>
        <AureaHero />
        <AureaModulos />
        <AureaDemo />
        <AureaComoFunciona />
        <AureaCTA />
      </main>
      <Footer />
    </div>
  );
}
