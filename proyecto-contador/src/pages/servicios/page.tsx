import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ServicesHero from './components/ServicesHero';
import TaxAccountingSection from './components/TaxAccountingSection';
import FinanceManagementSection from './components/FinanceManagementSection';
import CtaBanner from '@/pages/home/components/CtaBanner';

export default function Servicios() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <main>
        <ServicesHero />
        <FinanceManagementSection />
        <TaxAccountingSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
