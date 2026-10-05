const pasos = [
  { num: '01', title: 'Creás tu cuenta', desc: 'Registrate con tu email y los datos de tu empresa. El proceso tarda menos de 5 minutos.', icon: 'ri-user-add-line' },
  { num: '02', title: 'Configurás tu CUIT en ARCA', desc: 'Habilitás un Punto de Venta tipo Web Services en ARCA y delegás el servicio de Facturación Electrónica. Te guiamos paso a paso.', icon: 'ri-shield-check-line' },
  { num: '03', title: 'Empezás a facturar', desc: 'Cargás los datos de la factura, la emitís y el CAE llega en segundos. Podés compartirla por WhatsApp o email al instante.', icon: 'ri-file-list-3-line' },
  { num: '04', title: 'Recibís reportes automáticos', desc: 'Todos los lunes te llega un resumen de tu semana: ventas, gastos y cuentas pendientes. Sin hacer nada extra.', icon: 'ri-mail-send-line' },
];
const badges = [
  { icon: 'ri-shield-check-line', title: 'Integración real con ARCA', desc: 'No simulada. Cada factura pasa por los servidores oficiales de ARCA/AFIP y recibe su CAE real.', color: '#10B981' },
  { icon: 'ri-lock-line', title: 'Datos seguros', desc: 'Tu información y la de tus clientes está protegida. Nunca compartimos datos con terceros.', color: '#3B82F6' },
  { icon: 'ri-customer-service-2-line', title: 'Soporte de tu contador', desc: 'Aurea es desarrollado y mantenido por Guevara Estudio. Tenés soporte contable directo.', color: '#a855f7' },
];
export default function AureaComoFunciona() {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-3">¿Cómo funciona?</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">Empezás a facturar en menos de un día.</h2>
          <p className="text-[#9CA3AF] text-base leading-relaxed">No necesitás conocimientos técnicos. El proceso es simple y si tenés dudas, el equipo de Guevara Estudio te acompaña.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pasos.map((p, i) => (
            <div key={p.num} className="relative">
              {i < pasos.length - 1 && <div className="hidden lg:block absolute top-5 left-full h-px bg-white/5 z-0" style={{width:'calc(100% - 2rem)'}}></div>}
              <div className="relative z-10">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-500/10 border border-purple-500/20 rounded-xl mb-4">
                  <span className="text-purple-400 font-bold text-sm">{p.num}</span>
                </div>
                <span className="w-9 h-9 flex items-center justify-center text-purple-400 mb-3 block"><i className={`${p.icon} text-xl`}></i></span>
                <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div key={b.title} className="bg-[#111827] border border-white/5 rounded-2xl p-6 flex gap-4 items-start">
              <span className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{backgroundColor:`${b.color}15`}}>
                <i className={`${b.icon} text-lg`} style={{color:b.color}}></i>
              </span>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">{b.title}</h4>
                <p className="text-[#9CA3AF] text-xs leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
