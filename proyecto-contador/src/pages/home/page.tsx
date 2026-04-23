import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import HeroSection from './components/HeroSection';
import ServicesPreview from './components/ServicesPreview';
import DashboardPreview from './components/DashboardPreview';
import IdealClientsSection from './components/IdealClientsSection';
import CtaBanner from './components/CtaBanner';

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesPreview />
        <DashboardPreview />
        <IdealClientsSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
