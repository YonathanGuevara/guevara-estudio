export default function ServicesHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, #0f2044 0%, #0a0a0a 65%)' }}
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
        <div className="max-w-2xl">
          <p className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-4">Servicios</p>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            Todo lo que tu negocio necesita, en un solo lugar.
          </h1>
          <p className="text-[#9CA3AF] text-lg leading-relaxed">
            Desde el cumplimiento impositivo hasta la gestión financiera estratégica.
            Trabajo con empresas, pymes y emprendedores en toda Argentina.
          </p>
        </div>
      </div>
    </section>
  );
}
