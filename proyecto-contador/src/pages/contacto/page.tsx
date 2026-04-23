import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';

export default function Contacto() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      {/* Hero bg - usamos gradiente CSS en lugar de imagen de Readdy */}
      <div className="relative pt-32 pb-0">
        <div className="absolute inset-0 z-0 h-72"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 50%, #0a0a0a 100%)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/20 to-[#0A0A0A]"></div>
        </div>
        <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* Left: Info */}
            <ContactInfo />
            {/* Right: Form */}
            <div className="lg:sticky lg:top-28">
              <ContactForm />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
