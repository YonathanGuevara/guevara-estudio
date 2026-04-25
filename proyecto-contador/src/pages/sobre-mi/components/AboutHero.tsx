const stats = [
  { value: 'Charla real', label: 'Te escucho antes de actuar', icon: 'ri-chat-3-line' },
  { value: 'Siempre cerca', label: 'Contacto constante, no solo en vencimientos', icon: 'ri-phone-line' },
  { value: 'A tu medida', label: 'Entiendo tu negocio antes de recomendar', icon: 'ri-focus-3-line' },
  { value: '100%', label: 'Digital y remoto', icon: 'ri-global-line' },
];

// Esta imagen es de static.readdy.ai (tu foto personal), no de la API de búsqueda
const PHOTO_URL = 'https://static.readdy.ai/image/37bdca1177b18a6b22719b392b997c4d/7fc1121b7cf9a11d7dc6cd7e63b7750d.png';

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-0 overflow-hidden">
      <div className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse at 70% 30%, #0f2044 0%, #0a0a0a 60%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pb-16">
          <div>
            <p className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-4">Sobre mí</p>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              No soy solo un liquidador de impuestos.
            </h1>
            <p className="text-[#9CA3AF] text-lg leading-relaxed mb-4">
              Soy <strong className="text-white">Yonathan Guevara</strong>,
              Contador Público Matriculado. Trabajo con empresas, pymes y emprendedores
              en toda Argentina de forma completamente digital.
            </p>
            <p className="text-[#9CA3AF] text-base leading-relaxed">
              Mi enfoque es diferente al del contador tradicional: me involucro con tu
              negocio, entiendo tus números y te ayudo a tomar{' '}
              <strong className="text-white">decisiones basadas en datos reales</strong>,
              no en intuiciones.
            </p>
          </div>

          <div className="relative">
            <div className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 w-full h-[420px]">
                <img
                  src={PHOTO_URL}
                  alt="Cr. Yonathan Guevara - Contador Público"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#111827] border border-white/5 rounded-2xl p-5 flex flex-col gap-3">
              <span className="w-8 h-8 flex items-center justify-center text-[#3B82F6]">
                <i className={`${s.icon} text-lg`}></i>
              </span>
              <div>
                <p className="text-white font-extrabold text-2xl">{s.value}</p>
                <p className="text-[#9CA3AF] text-xs mt-1">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
