const industries = [
  { icon: 'ri-store-2-line', name: 'Comercio y Retail', desc: 'Distribuidoras, negocios minoristas, importadores' },
  { icon: 'ri-restaurant-line', name: 'Gastronomía', desc: 'Restaurantes, cafeterías, delivery, catering' },
  { icon: 'ri-heart-pulse-line', name: 'Salud', desc: 'Médicos, clínicas, odontólogos, psicólogos' },
  { icon: 'ri-building-2-line', name: 'Construcción', desc: 'Constructoras, inmobiliarias, arquitectos' },
  { icon: 'ri-code-s-slash-line', name: 'Tecnología', desc: 'Startups, agencias digitales, freelancers tech' },
  { icon: 'ri-scales-3-line', name: 'Profesionales', desc: 'Abogados, contadores, ingenieros, consultores' },
  { icon: 'ri-scissors-cut-line', name: 'Servicios personales', desc: 'Peluquerías, estéticas, instructores' },
  { icon: 'ri-car-line', name: 'Automotor', desc: 'Concesionarias, talleres, rent a car' },
  { icon: 'ri-seedling-line', name: 'Agro y Alimentos', desc: 'Productores, procesadoras, exportadores' },
  { icon: 'ri-palette-line', name: 'Diseño y Creatividad', desc: 'Diseñadores, fotógrafos, productoras' },
  { icon: 'ri-global-line', name: 'E-commerce', desc: 'Tiendas online, marketplaces, dropshipping' },
  { icon: 'ri-graduation-cap-line', name: 'Educación', desc: 'Institutos, tutores, plataformas educativas' },
];

export default function IndustriesSection() {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">Experiencia sectorial</p>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            He trabajado con negocios de todos los rubros.
          </h2>
          <p className="text-[#9CA3AF] text-sm leading-relaxed">
            Cada industria tiene sus particularidades fiscales y financieras.
            La experiencia transversal me permite dar un asesoramiento más completo y preciso.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="bg-[#111827] border border-white/5 hover:border-white/10 rounded-xl p-5 flex flex-col gap-3 transition-all duration-300"
            >
              <span className="w-8 h-8 flex items-center justify-center text-[#3B82F6]">
                <i className={`${ind.icon} text-lg`}></i>
              </span>
              <div>
                <p className="text-white font-semibold text-sm">{ind.name}</p>
                <p className="text-[#6B7280] text-xs mt-1 leading-snug">{ind.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
