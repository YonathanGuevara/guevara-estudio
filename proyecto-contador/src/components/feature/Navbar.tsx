import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Tu logo propio - reemplazá esta URL con la tuya cuando tengas hosting
const LOGO_URL = 'https://static.readdy.ai/image/37bdca1177b18a6b22719b392b997c4d/e7d0a2434435225cf8237542872598ab.jpeg';

const navLinks = [
  { label: 'Inicio', path: '/' },
  { label: 'Servicios', path: '/servicios' },
  { label: 'Sobre mí', path: '/sobre-mi' },
  { label: 'Contacto', path: '/contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[#08090A]/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-md overflow-hidden flex-shrink-0">
            <img src={LOGO_URL} alt="Logo Cr. Yonathan Guevara" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-bold text-sm leading-tight tracking-tight">Cr. Yonathan Guevara</p>
            <p className="text-[#6B7280] text-xs tracking-wide">Contador Público · Argentina</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                location.pathname === link.path
                  ? 'text-white'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contacto"
            className="hidden md:flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap"
          >
            Consulta gratuita
            <span className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-right-line text-sm"></i>
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-white cursor-pointer rounded-md border border-white/10"
            aria-label="Toggle menu"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0A0B0D] border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base font-medium cursor-pointer ${
                location.pathname === link.path ? 'text-white' : 'text-[#9CA3AF]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contacto"
            className="mt-1 flex items-center justify-center gap-2 bg-[#3B82F6] text-white text-sm font-semibold px-5 py-3 rounded-full whitespace-nowrap cursor-pointer"
          >
            Consulta gratuita <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      )}
    </header>
  );
}
