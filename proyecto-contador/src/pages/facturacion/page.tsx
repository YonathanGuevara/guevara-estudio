import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

const AUREA_URL = 'https://aurea.guevara-estudio.com.ar';
const DEMO_URL = 'https://aurea.guevara-estudio.com.ar/demo';
const WA_LINK = 'https://wa.me/5492954321876?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20el%20sistema%20Aurea.';

const modulos = [
  { icon: 'ri-file-list-3-line', title: 'Facturación electrónica real', desc: 'Emitís Facturas A, B y C directamente ante ARCA/AFIP con CAE en segundos. Sin intermediarios ni errores.', color: '#a855f7' },
  { icon: 'ri-share-line', title: 'Compartir comprobantes', desc: 'Un clic y la factura llega al cliente por WhatsApp o email, con link para ver, descargar e imprimir sin cuenta.', color: '#10B981' },
  { icon: 'ri-mail-send-line', title: 'Resumen semanal automático', desc: 'Cada lunes recibís un resumen de ventas, gastos y cuentas por cobrar/pagar. Sin hacer nada, llega solo.', color: '#3B82F6' },
  { icon: 'ri-money-dollar-circle-line', title: 'Gastos y compras', desc: 'Registrá todos tus gastos para tener el cuadro de resultado real de tu negocio siempre actualizado.', color: '#F59E0B' },
  { icon: 'ri-group-line', title: 'Clientes y cuentas corrientes', desc: 'Seguimiento de cada cliente, sus facturas y saldo pendiente. Sabés en todo momento quién te debe y cuánto.', color: '#EC4899' },
  { icon: 'ri-settings-3-line', title: 'Multi-empresa y multi-punto de venta', desc: 'Varias empresas o puntos de venta desde una sola cuenta, cada uno con su logo y numeración propia.', color: '#8B5CF6' },
];

const pasos = [
  { num: '01', title: 'Creás tu cuenta', desc: 'Registrate con tu email y datos de tu empresa. Menos de 5 minutos.' },
  { num: '02', title: 'Configurás tu CUIT en ARCA', desc: 'Habilitás un Punto de Venta Web Services y delegás Facturación Electrónica. Te guiamos paso a paso.' },
  { num: '03', title: 'Empezás a facturar', desc: 'Cargás la factura, la emitís y el CAE llega en segundos. Compartila por WhatsApp al instante.' },
  { num: '04', title: 'Recibís reportes automáticos', desc: 'Todos los lunes te llega un resumen completo de tu semana sin hacer nada extra.' },
];

export default function Facturacion() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <main>

        {/* HERO */}
        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 60% 40%, #1a0a2e 0%, #0A0A0A 65%)' }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0A]" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block animate-pulse"></span>
                  <span className="text-purple-300 text-xs font-medium tracking-wider uppercase">Sistema de facturación electrónica</span>
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
                <p className="text-[#9CA3AF] text-lg lg:text-xl leading-relaxed mb-4 max-w-xl">
                  Sistema de gestión comercial y facturación electrónica para empresas y emprendedores argentinos.
                </p>
                <p className="text-[#6B7280] text-base leading-relaxed mb-10 max-w-xl">
                  Emitís facturas reales ante ARCA/AFIP, controlás tus ventas y gastos, y recibís reportes automáticos — todo desde un solo lugar, sin conocimientos técnicos.
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {['Integración real con ARCA/AFIP', 'Reportes automáticos semanales', 'Compartí facturas por WhatsApp'].map(t => (
                    <div key={t} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                      <i className="ri-check-line text-purple-400 text-sm"></i>
                      <span className="text-[#D1D5DB] text-xs font-medium">{t}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-purple-900 font-bold px-8 py-4 rounded-full transition-colors text-sm hover:bg-purple-50 whitespace-nowrap">
                    <i className="ri-play-circle-line text-lg"></i> Probá la demo gratis
                  </a>
                  <a href={AUREA_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm whitespace-nowrap">
                    Acceder a Aurea <i className="ri-external-link-line"></i>
                  </a>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm whitespace-nowrap">
                    <i className="ri-whatsapp-line text-green-400"></i> WhatsApp
                  </a>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0A0E14] border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center">
                        <span className="text-white font-black text-xs" style={{ fontFamily: 'serif' }}>A</span>
                      </div>
                      <span className="text-white text-xs font-semibold">Aurea</span>
                      <span className="text-[#6B7280] text-xs">· Panel general</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      <span className="text-green-400 text-xs">ARCA · Activo</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col gap-3">
                    <div className="grid grid-cols-3 gap-2">
                      {[{label:'Facturación del mes',val:'$448.524',color:'#a855f7'},{label:'Resultado estimado',val:'$416.384',color:'#10B981'},{label:'Saldo de caja',val:'$102.699',color:'#3B82F6'}].map((k,i)=>(
                        <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-3">
                          <p className="text-[#6B7280] text-xs mb-1">{k.label}</p>
                          <p className="font-bold text-sm" style={{color:k.color}}>{k.val}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#111827] border border-white/5 rounded-xl p-3">
                      <p className="text-white text-xs font-semibold mb-2">Comprobantes emitidos</p>
                      {[
                        {tipo:'FC A',cliente:'Distribuidora Norte S.A.',monto:'$222.606',ok:true},
                        {tipo:'FC B',cliente:'Panadería Don José',monto:'$17.424',ok:true},
                        {tipo:'TK',cliente:'Consumidor Final',monto:'$7.200',ok:false},
                      ].map((inv,i)=>(
                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">{inv.tipo}</span>
                            <p className="text-white text-xs">{inv.cliente}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-white text-xs font-semibold">{inv.monto}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${inv.ok?'bg-green-500/10 text-green-400':'bg-white/5 text-[#6B7280]'}`}>{inv.ok?'Autorizado':'No fiscal'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-[#111827] border border-white/5 rounded-xl p-3 text-center">
                        <p className="text-[#6B7280] text-xs mb-1">Cobros pendientes</p>
                        <p className="text-yellow-400 font-bold text-sm">$446.709</p>
                      </div>
                      <div className="flex-1 bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-center">
                        <p className="text-purple-400 text-xs mb-1">Estado ARCA</p>
                        <p className="text-purple-300 text-sm font-bold">Activo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MÓDULOS */}
        <section className="py-24 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-3">Módulos</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">Todo lo que tu empresa necesita en un solo sistema.</h2>
              <p className="text-[#9CA3AF] text-base leading-relaxed">Desde facturación electrónica real hasta reportes automáticos semanales, sin conocimientos técnicos.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {modulos.map((m) => (
                <div key={m.title} className="bg-[#111827] border border-white/5 hover:border-white/10 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300">
                  <span className="w-11 h-11 flex items-center justify-center rounded-xl flex-shrink-0" style={{ backgroundColor: `${m.color}15` }}>
                    <i className={`${m.icon} text-xl`} style={{ color: m.color }}></i>
                  </span>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{m.title}</h3>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="py-24 bg-[#111827]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-3">¿Cómo funciona?</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">Empezás a facturar en menos de un día.</h2>
              <p className="text-[#9CA3AF] text-base leading-relaxed">No necesitás conocimientos técnicos. El proceso es simple y el equipo de Guevara Estudio te acompaña.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {pasos.map((p, i) => (
                <div key={p.num} className="relative">
                  {i < pasos.length - 1 && <div className="hidden lg:block absolute top-5 left-full h-px bg-white/5 z-0" style={{width:'calc(100% - 2rem)'}}></div>}
                  <div className="relative z-10">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-500/10 border border-purple-500/20 rounded-xl mb-4">
                      <span className="text-purple-400 font-bold text-sm">{p.num}</span>
                    </div>
                    <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: 'ri-shield-check-line', title: 'Integración real con ARCA', desc: 'No simulada. Cada factura recibe su CAE oficial directamente de ARCA/AFIP.', color: '#10B981' },
                { icon: 'ri-lock-line', title: 'Datos seguros', desc: 'Tu información y la de tus clientes está protegida. Nunca compartimos datos.', color: '#3B82F6' },
                { icon: 'ri-customer-service-2-line', title: 'Soporte de tu contador', desc: 'Aurea es desarrollado por Guevara Estudio. Tenés soporte contable directo.', color: '#a855f7' },
              ].map((b) => (
                <div key={b.title} className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex gap-4 items-start">
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0" style={{ backgroundColor: `${b.color}15` }}>
                    <i className={`${b.icon} text-lg`} style={{ color: b.color }}></i>
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

        {/* CTA */}
        <section className="py-24 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 p-10 lg:p-16"
              style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #0f172a 100%)' }}>
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-purple-500/5 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="text-center lg:text-left max-w-xl">
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">¿Listo para facturar de forma profesional?</h2>
                  <p className="text-[#9CA3AF] text-base leading-relaxed">Probá la demo sin registrarte, o creá tu cuenta y empezá a emitir facturas reales ante ARCA en minutos.</p>
                </div>
                <div className="flex flex-col gap-4 w-full sm:w-auto flex-shrink-0">
                  <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-purple-900 font-bold px-8 py-4 rounded-full transition-colors text-sm hover:bg-purple-50 whitespace-nowrap">
                    <i className="ri-play-circle-line text-lg"></i> Probá la demo gratis
                  </a>
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

      </main>
      <Footer />
    </div>
  );
}
