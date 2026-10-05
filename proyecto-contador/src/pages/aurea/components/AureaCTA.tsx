const AUREA_URL = 'https://aurea.guevara-estudio.com.ar';
const WA_LINK = 'https://wa.me/5492954321876?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20el%20sistema%20Aurea.';
export default function AureaCTA() {
  return (
    <section className="py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 p-10 lg:p-16"
          style={{background:'linear-gradient(135deg, #1a0a2e 0%, #0f172a 100%)'}}>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-purple-500/5 pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-10 w-60 h-60 rounded-full bg-purple-500/3 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-xl">
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center border border-purple-500/30">
                  <span className="text-white font-black text-lg" style={{fontFamily:'serif'}}>A</span>
                </div>
                <span className="text-purple-300 font-bold text-lg tracking-wide">AUREA</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">¿Listo para facturar de forma profesional?</h2>
              <p className="text-[#9CA3AF] text-base leading-relaxed">Creá tu cuenta gratis y empezá a emitir facturas reales ante ARCA en minutos. Si tenés dudas, escribinos por WhatsApp.</p>
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-auto flex-shrink-0">
              <a href={AUREA_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm whitespace-nowrap">
                <i className="ri-external-link-line"></i> Acceder a Aurea
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm whitespace-nowrap">
                <i className="ri-whatsapp-line text-green-400"></i> Consultar por WhatsApp
              </a>
              <p className="text-[#6B7280] text-xs text-center">Desarrollado y mantenido por Guevara Estudio Contable</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
