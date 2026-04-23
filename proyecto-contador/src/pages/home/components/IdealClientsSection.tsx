import { Link } from 'react-router-dom';

const clients = [
  {
    id: 1,
    title: 'Emprendedores',
    subtitle: 'que están arrancando o en crecimiento',
    description: 'Te acompaño desde el principio: cómo arrancar legalmente, qué régimen elegir, cómo estructurar tu negocio y qué números mirar para crecer de forma sostenida.',
    points: [
      'Alta impositiva y figura legal',
      'Monotributo o Responsable Inscripto',
      'Proyecciones y punto de equilibrio',
    ],
    gradient: 'from-[#1e3a5f] to-[#0a1628]',
    icon: 'ri-rocket-line',
    accent: '#3B82F6',
  },
  {
    id: 2,
    title: 'Pymes',
    subtitle: 'que necesitan orden y control',
    description: 'Para empresas con empleados, múltiples clientes y operaciones complejas. Te doy claridad financiera, cumplimiento impositivo y visibilidad del negocio en tiempo real.',
    points: [
      'Contabilidad e impuestos completos',
      'Sueldos y liquidaciones laborales',
      'Dashboards y reportes de gestión',
    ],
    gradient: 'from-[#064e3b] to-[#022c22]',
    icon: 'ri-building-2-line',
    accent: '#10B981',
  },
  {
    id: 3,
    title: 'Profesionales independientes',
    subtitle: 'que quieren enfocarse en su trabajo',
    description: 'Médicos, arquitectos, abogados, diseñadores: vos hacés lo tuyo y yo me encargo de que estés al día con todo lo impositivo, sin dolores de cabeza.',
    points: [
      'Declaraciones juradas al día',
      'Optimización de carga fiscal',
      'Atención personalizada y digital',
    ],
    gradient: 'from-[#451a03] to-[#1c0a00]',
    icon: 'ri-user-star-line',
    accent: '#F59E0B',
  },
];

export default function IdealClientsSection() {
  return (
    <section className="py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">
            ¿Para quién trabajo?
          </p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            Clientes que tomaron el control de su negocio.
          </h2>
          <p className="text-[#9CA3AF] text-base leading-relaxed">
            Trabajo con negocios de todos los tamaños que quieren más que un contador.
            Quieren un aliado estratégico.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {clients.map((c) => (
            <div
              key={c.id}
              className="bg-[#0A0A0A] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
            >
              {/* Image placeholder with gradient + icon */}
              <div className={`w-full h-48 bg-gradient-to-br ${c.gradient} flex items-center justify-center`}>
                <span className="w-16 h-16 flex items-center justify-center rounded-2xl" style={{ backgroundColor: `${c.accent}20` }}>
                  <i className={`${c.icon} text-4xl`} style={{ color: c.accent }}></i>
                </span>
              </div>

              <div className="p-7 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-white font-bold text-xl mb-1">{c.title}</h3>
                  <p className="text-sm font-medium" style={{ color: c.accent }}>{c.subtitle}</p>
                </div>
                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">{c.description}</p>
                <ul className="flex flex-col gap-2 mb-6 mt-auto">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-[#D1D5DB]">
                      <span className="w-4 h-4 flex items-center justify-center flex-shrink-0" style={{ color: c.accent }}>
                        <i className="ri-check-line text-xs"></i>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  style={{ color: c.accent }}
                >
                  Quiero hablar con un contador
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
