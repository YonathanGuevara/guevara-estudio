import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import AboutHero from './components/AboutHero';
import IndustriesSection from './components/IndustriesSection';
import ValuesSection from './components/ValuesSection';
import CtaBanner from '@/pages/home/components/CtaBanner';

export default function SobreMi() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <main>
        <AboutHero />
        <IndustriesSection />
        <ValuesSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
