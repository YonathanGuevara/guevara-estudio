const values = [
  { icon: 'ri-shield-check-line', title: 'Confianza y transparencia', desc: 'Te explico cada decisión en términos simples. Sin letra chica, sin sorpresas. Lo que acordamos, lo cumplimos.', accent: '#3B82F6' },
  { icon: 'ri-lightbulb-line', title: 'Enfoque en soluciones', desc: 'No vengo a decirte lo que no podés hacer. Vengo a encontrar la mejor manera de que crezcas dentro de la ley.', accent: '#F59E0B' },
  { icon: 'ri-bar-chart-2-line', title: 'Visión financiera real', desc: 'Más allá de los impuestos, entiendo tu modelo de negocio y te doy información que realmente sirve para crecer.', accent: '#10B981' },
  { icon: 'ri-global-line', title: '100% digital y ágil', desc: 'Trabajo de forma completamente remota. Atención rápida, documentación en la nube y reportes digitales sin burocracia.', accent: '#8B5CF6' },
];

export default function ValuesSection() {
  return (
    <section className="py-20 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">Mi forma de trabajar</p>
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Valores que guían cada decisión.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-[#0A0A0A] border border-white/5 hover:border-white/10 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ backgroundColor: `${v.accent}15` }}>
                <i className={`${v.icon} text-lg`} style={{ color: v.accent }}></i>
              </span>
              <h3 className="text-white font-bold text-base">{v.title}</h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
