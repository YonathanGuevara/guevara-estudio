import { taxServices } from '@/mocks/services';

export default function TaxAccountingSection() {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 flex items-center justify-center bg-[#3B82F6]/10 rounded-lg text-[#3B82F6]">
                <i className="ri-file-list-3-line"></i>
              </span>
              <span className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase">Área impositiva y contable</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Impuestos y<br />Contabilidad
            </h2>
          </div>
          <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-sm">
            Cumplimiento impositivo completo a nivel nacional y provincial.
            Sin sorpresas, sin multas, sin atrasos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {taxServices.map((s) => (
            <div
              key={s.id}
              className="bg-[#111827] border border-white/5 hover:border-[#3B82F6]/20 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300"
            >
              <span className="w-10 h-10 flex items-center justify-center bg-[#3B82F6]/10 rounded-xl text-[#3B82F6] flex-shrink-0">
                <i className={`${s.icon} text-lg`}></i>
              </span>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{s.description}</p>
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-[#9CA3AF] bg-white/5 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-[#6B7280] text-xs flex items-center gap-1.5">
                  <span className="w-3 h-3 flex items-center justify-center text-[#3B82F6]">
                    <i className="ri-user-line text-xs"></i>
                  </span>
                  {s.for}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#111827] border border-white/5 rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <span className="w-10 h-10 flex items-center justify-center bg-[#3B82F6]/10 rounded-xl text-[#3B82F6] flex-shrink-0">
            <i className="ri-shield-check-line text-lg"></i>
          </span>
          <div className="flex-1">
            <h4 className="text-white font-bold text-base mb-1">Planificación fiscal estratégica</h4>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              No solo liquidamos impuestos: analizamos tu situación fiscal para que
              pagues lo justo dentro de la ley. La planificación inteligente puede
              marcar una diferencia significativa en tu resultado anual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
