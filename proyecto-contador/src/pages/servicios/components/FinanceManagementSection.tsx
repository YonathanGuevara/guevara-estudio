import { financeServices } from '@/mocks/services';
import { Link } from 'react-router-dom';

const howItWorks = [
  { step: '01', title: 'Diagnóstico inicial', desc: 'Entendemos tu negocio, sus números actuales y qué información necesitás para tomar mejores decisiones.' },
  { step: '02', title: 'Diseño del dashboard', desc: 'Armamos un tablero personalizado con los KPIs más relevantes para tu sector y modelo de negocio.' },
  { step: '03', title: 'Reporte mensual', desc: 'Cada mes recibís un informe actualizado con análisis, comparativos y recomendaciones concretas.' },
  { step: '04', title: 'Reunión de revisión', desc: 'Nos juntamos (virtual o presencial) para revisar los números y definir acciones para el período siguiente.' },
];

export default function FinanceManagementSection() {
  return (
    <section className="py-20 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 flex items-center justify-center bg-[#F59E0B]/10 rounded-lg text-[#F59E0B]">
                <i className="ri-bar-chart-2-line"></i>
              </span>
              <span className="text-[#F59E0B] text-xs font-semibold tracking-widest uppercase">Área financiera</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Finanzas y<br />Gestión de negocio
            </h2>
          </div>
          <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-sm">
            Más allá de los impuestos: dashboards, análisis y reportes para que
            entiendas tus números y tomes mejores decisiones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {financeServices.map((s) => (
            <div
              key={s.id}
              className={`rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 ${
                s.highlight
                  ? 'bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] border border-[#3B82F6]/20'
                  : 'bg-[#0A0A0A] border border-white/5 hover:border-white/10'
              }`}
            >
              <span className="w-10 h-10 flex items-center justify-center bg-[#F59E0B]/10 rounded-xl text-[#F59E0B] flex-shrink-0">
                <i className={`${s.icon} text-lg`}></i>
              </span>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{s.description}</p>
              </div>
              {s.highlight && (
                <span className="mt-auto w-fit text-xs font-semibold text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full">
                  Servicio destacado
                </span>
              )}
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-10">
          <h3 className="text-white font-extrabold text-2xl mb-2">¿Cómo funciona el servicio de gestión?</h3>
          <p className="text-[#9CA3AF] text-sm mb-10 max-w-lg">
            Un proceso simple y efectivo para que tengas visibilidad real de tu negocio cada mes.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-white/5 z-0" style={{ width: 'calc(100% - 2rem)' }}></div>
                )}
                <div className="relative z-10">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-xl mb-4">
                    <span className="text-[#3B82F6] font-bold text-sm">{step.step}</span>
                  </div>
                  <h4 className="text-white font-bold text-base mb-2">{step.title}</h4>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#9CA3AF] text-sm">¿Querés empezar? La primera consulta es sin cargo.</p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm whitespace-nowrap"
            >
              Hablemos
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
