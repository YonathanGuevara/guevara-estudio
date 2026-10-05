const AUREA_URL = 'https://aurea.guevara-estudio.com.ar';

export default function AureaHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, #1a0a2e 0%, #0A0A0A 65%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage: 'linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)',backgroundSize: '60px 60px'}}/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block animate-pulse"></span>
              <span className="text-purple-300 text-xs font-medium tracking-wider uppercase">Sistema de gestión empresarial</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                <span className="text-white font-black text-2xl" style={{ fontFamily: 'serif' }}>A</span>
              </div>
              <div>
                <h1 className="text-5xl lg:text-6xl font-extrabold text-white tracking-tight">AUREA</h1>
                <p className="text-purple-400 text-sm font-medium tracking-widest uppercase">by Guevara Estudio</p>
              </div>
            </div>
            <p className="text-[#9CA3AF] text-lg lg:text-xl leading-relaxed mb-4 max-w-xl">Sistema de gestión comercial y facturación electrónica para empresas y emprendedores argentinos.</p>
            <p className="text-[#6B7280] text-base leading-relaxed mb-10 max-w-xl">Emitís facturas reales ante ARCA/AFIP, controlás tus ventas y gastos, y recibís reportes automáticos de tu negocio — todo desde un solo lugar.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={AUREA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm">
                Acceder a Aurea <i className="ri-arrow-right-line"></i>
              </a>
              <a href="https://wa.me/5492954321876?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20Aurea." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm">
                <i className="ri-whatsapp-line text-green-400"></i> Consultar por WhatsApp
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#0A0E14] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-semibold">Aurea</span>
                  <span className="text-[#6B7280] text-xs">· Empresa Demo S.R.L.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-green-400 text-xs">En línea</span>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-3">
                  {[{label:'Facturado',val:'$2.840.000',color:'#a855f7'},{label:'Comprobantes',val:'47',color:'#10B981'},{label:'Por cobrar',val:'$380.000',color:'#F59E0B'}].map((k,i)=>(
                    <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-3">
                      <p className="text-[#6B7280] text-xs mb-1">{k.label}</p>
                      <p className="text-white font-bold text-sm" style={{color:k.color}}>{k.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
