import { Link } from 'react-router-dom';

const WA_LINK = 'https://wa.me/5492954321876?text=Hola%21%20Me%20interesa%20una%20consulta%20gratuita.';

const pillars = [
  { icon: 'ri-gift-line', label: 'Primera consulta sin cargo' },
  { icon: 'ri-global-line', label: '100% digital · Todo el país' },
  { icon: 'ri-shield-check-line', label: 'Atención personalizada siempre' },
];

const miniCards = [
  { label: 'IVA · Ganancias · IIBB', sub: 'Liquidaciones al día', icon: 'ri-file-list-3-line' },
  { label: 'Flujo de fondos', sub: 'Control de liquidez', icon: 'ri-exchange-funds-line' },
  { label: 'KPIs en tiempo real', sub: 'Dashboards personalizados', icon: 'ri-bar-chart-2-line' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, #0f2044 0%, #0a0a0a 60%)',
        }}
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-transparent to-[#0A0A0A]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-0 w-full">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] inline-block"></span>
          <span className="text-[#9CA3AF] text-xs font-medium tracking-wider uppercase">Contador Público · Argentina</span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-none tracking-tight mb-6">
          <span className="text-white block">Transformo tus</span>
          <span className="text-white block">números en</span>
          <span className="gradient-text block">decisiones.</span>
        </h1>
        <p className="text-[#9CA3AF] text-lg md:text-xl font-light max-w-2xl mb-10 leading-relaxed">
          Contabilidad, impuestos y gestión financiera para empresas, pymes y emprendedores en toda Argentina. No solo cumplo con el fisco, te ayudo a entender tu negocio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link to="/contacto" className="inline-flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm">
            Consultá gratis
            <span className="w-4 h-4 flex items-center justify-center"><i className="ri-arrow-right-line"></i></span>
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer whitespace-nowrap text-sm">
            <span className="w-4 h-4 flex items-center justify-center text-green-400"><i className="ri-whatsapp-line text-base"></i></span>
            WhatsApp directo
          </a>
        </div>
        <div className="flex flex-wrap gap-6 mb-16">
          {pillars.map((p) => (
            <div key={p.label} className="flex items-center gap-2.5">
              <span className="w-7 h-7 flex items-center justify-center text-[#3B82F6]">
                <i className={`${p.icon} text-base`}></i>
              </span>
              <span className="text-[#D1D5DB] text-sm font-medium">{p.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
            {miniCards.map((card) => (
              <div key={card.label} className="flex items-center gap-4 py-5 px-4 hover:bg-white/[0.03] transition-colors">
                <span className="w-9 h-9 flex items-center justify-center bg-[#3B82F6]/10 rounded-lg text-[#3B82F6] flex-shrink-0">
                  <i className={`${card.icon} text-lg`}></i>
                </span>
                <div>
                  <p className="text-white font-semibold text-sm">{card.label}</p>
                  <p className="text-[#6B7280] text-xs mt-0.5">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
