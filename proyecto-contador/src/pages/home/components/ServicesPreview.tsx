import { Link } from 'react-router-dom';

const services = [
  { icon: 'ri-file-list-3-line', title: 'Impuestos', desc: 'IVA, Ganancias, Ingresos Brutos, Monotributo y todo el cumplimiento impositivo nacional y provincial.', tag: 'Impuestos', color: '#3B82F6' },
  { icon: 'ri-book-open-line', title: 'Contabilidad', desc: 'Registros contables, balances y estados financieros. La información que necesitás para tomar decisiones.', tag: 'Contabilidad', color: '#8B5CF6' },
  { icon: 'ri-group-line', title: 'Sueldos y Cargas', desc: 'Liquidación de haberes, cargas sociales y ART. Cumplimiento laboral sin complicaciones.', tag: 'Laboral', color: '#10B981' },
  { icon: 'ri-bar-chart-2-line', title: 'Gestión Financiera', desc: 'Dashboards, análisis de rentabilidad, flujo de fondos y KPIs. Tu negocio con visibilidad total.', tag: 'Finanzas', color: '#F59E0B' },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">Lo que hago</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Servicios que van más<br />allá del número.
            </h2>
          </div>
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-white text-sm font-medium transition-colors cursor-pointer whitespace-nowrap border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-full"
          >
            Ver todos los servicios
            <span className="w-4 h-4 flex items-center justify-center"><i className="ri-arrow-right-line"></i></span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-[#111827] border border-white/5 hover:border-white/15 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer group"
            >
              <span className="w-11 h-11 flex items-center justify-center rounded-xl" style={{ backgroundColor: `${s.color}15` }}>
                <i className={`${s.icon} text-xl`} style={{ color: s.color }}></i>
              </span>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs font-medium text-[#6B7280] bg-white/5 px-3 py-1 rounded-full">{s.tag}</span>
                <span
                  className="w-7 h-7 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: `${s.color}20` }}
                >
                  <i className="ri-arrow-right-line text-sm" style={{ color: s.color }}></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
