const modulos = [
  { icon: 'ri-file-list-3-line', title: 'Facturación electrónica real', desc: 'Emitís Facturas A, B y C directamente ante ARCA/AFIP con CAE en segundos. Sin intermediarios, sin errores. Integración directa con WSFEv1.', tags: ['Factura A · B · C', 'CAE automático', 'Integración ARCA'], color: '#a855f7' },
  { icon: 'ri-share-line', title: 'Compartir comprobantes', desc: 'Con un clic enviás la factura por WhatsApp o email. El cliente recibe un link para ver, descargar e imprimir su comprobante sin necesidad de cuenta.', tags: ['WhatsApp', 'Email', 'Link público'], color: '#10B981' },
  { icon: 'ri-mail-send-line', title: 'Resumen semanal automático', desc: 'Cada lunes tu empresa recibe un resumen de ventas, gastos y cuentas por cobrar/pagar del período. Sin hacer nada, llega solo.', tags: ['Ventas', 'Gastos', 'Cuentas por cobrar'], color: '#3B82F6' },
  { icon: 'ri-money-dollar-circle-line', title: 'Gastos y compras', desc: 'Registrá todos tus gastos y compras para tener un cuadro de resultado real de tu negocio. Qué entra y qué sale, siempre visible.', tags: ['Registro de gastos', 'Proveedores', 'Resultado'], color: '#F59E0B' },
  { icon: 'ri-group-line', title: 'Clientes y cuentas corrientes', desc: 'Llevá el registro de cada cliente, sus facturas emitidas y el saldo pendiente. Sabés en todo momento quién te debe y cuánto.', tags: ['Cuentas por cobrar', 'Historial', 'Saldos'], color: '#EC4899' },
  { icon: 'ri-settings-3-line', title: 'Multi-empresa y multi-punto de venta', desc: 'Gestionás varias empresas o puntos de venta desde una sola cuenta. Cada uno con su propio logo, nombre y numeración de comprobantes.', tags: ['Multi-empresa', 'Multi-PV', 'Logo propio'], color: '#8B5CF6' },
];

export default function AureaModulos() {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-3">Módulos</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">Todo lo que tu empresa necesita en un solo sistema.</h2>
          <p className="text-[#9CA3AF] text-base leading-relaxed">Aurea integra facturación electrónica real con ARCA, gestión de clientes, control de gastos y reportes automáticos — sin necesidad de conocimientos técnicos.</p>
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
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                {m.tags.map(t => (<span key={t} className="text-xs font-medium text-[#6B7280] bg-white/5 px-3 py-1 rounded-full">{t}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
