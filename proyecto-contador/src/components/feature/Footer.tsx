import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

const LOGO_URL = 'https://static.readdy.ai/image/37bdca1177b18a6b22719b392b997c4d/e7d0a2434435225cf8237542872598ab.jpeg';
const WA_LINK = 'https://wa.me/5492954321876?text=Hola%21%20Me%20interesa%20una%20consulta%20gratuita.';

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Sobre mí', path: '/sobre-mi' },
  { label: 'Contacto', path: '/contacto' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  // El newsletter ahora abre WhatsApp con el email del usuario
  const handleNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const msg = encodeURIComponent(`Hola! Quiero suscribirme a las novedades fiscales. Mi email es: ${email}`);
    window.open(`https://wa.me/5492954321876?text=${msg}`, '_blank');
    setSubscribed(true);
    setEmail('');
    setLoading(false);
  };

  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-md overflow-hidden flex-shrink-0">
                <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Cr. Yonathan Guevara</p>
                <p className="text-[#6B7280] text-xs">Contador Público</p>
              </div>
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">
              Transformo los números de tu negocio en decisiones claras y estratégicas.
              Contabilidad e impuestos con visión financiera.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-[#9CA3AF] hover:text-white hover:border-white/30 transition-colors cursor-pointer"
              >
                <i className="ri-whatsapp-line text-base"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-[#9CA3AF] hover:text-white hover:border-white/30 transition-colors cursor-pointer"
              >
                <i className="ri-linkedin-line text-base"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-[#9CA3AF] hover:text-white hover:border-white/30 transition-colors cursor-pointer"
              >
                <i className="ri-instagram-line text-base"></i>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white font-semibold text-sm mb-5">Navegación</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#9CA3AF] hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-white font-semibold text-sm mb-5">Servicios</p>
            <ul className="flex flex-col gap-3">
              {[
                'Impuestos Nacionales',
                'Ingresos Brutos',
                'Contabilidad Integral',
                'Sueldos y Liquidaciones',
                'Dashboards Financieros',
                'Planificación Fiscal',
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/servicios"
                    className="text-[#9CA3AF] hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter → WhatsApp */}
          <div>
            <p className="text-white font-semibold text-sm mb-2">Novedades fiscales</p>
            <p className="text-[#9CA3AF] text-xs mb-4 leading-relaxed">
              Recibí actualizaciones impositivas y tips de gestión financiera para tu negocio.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-check-line"></i>
                </span>
                ¡Mensaje enviado por WhatsApp!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  required
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder-[#6B7280] text-sm px-3 py-2.5 rounded-lg outline-none focus:border-[#3B82F6] transition-colors min-w-0"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-10 h-10 flex items-center justify-center bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition-colors cursor-pointer flex-shrink-0"
                >
                  <i className="ri-arrow-right-line text-white text-sm"></i>
                </button>
              </form>
            )}
            <div className="mt-6 pt-6 border-t border-white/5">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#9CA3AF] hover:text-white text-sm transition-colors cursor-pointer"
              >
                <span className="w-4 h-4 flex items-center justify-center text-green-400">
                  <i className="ri-whatsapp-fill"></i>
                </span>
                Escribime por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#6B7280] text-xs">
            © 2026 Cr. Yonathan Guevara · Contador Público Matriculado · Argentina
          </p>
          <p className="text-[#6B7280] text-xs">
            CUIT: 20-XXXXXXXX-X · Matrícula CPCE
          </p>
        </div>
      </div>

      {/* Watermark */}
      <div className="overflow-hidden pb-2">
        <p className="text-[#111111] font-black text-[80px] sm:text-[120px] lg:text-[160px] leading-none text-center tracking-tighter select-none whitespace-nowrap">
          CONTABILIDAD
        </p>
      </div>
    </footer>
  );
}
