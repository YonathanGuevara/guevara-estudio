import { useState } from 'react';

const tabs = [
  { id: 'facturacion', label: 'Facturación', icon: 'ri-file-list-3-line' },
  { id: 'dashboard', label: 'Dashboard', icon: 'ri-bar-chart-2-line' },
  { id: 'compartir', label: 'Compartir', icon: 'ri-share-line' },
  { id: 'resumen', label: 'Resumen semanal', icon: 'ri-mail-send-line' },
];

function ScreenFacturacion() {
  return (
    <div className="bg-[#0D1117] rounded-xl overflow-hidden border border-white/10">
      <div className="bg-[#0A0E14] px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="ri-file-list-3-line text-purple-400 text-sm"></i>
          <span className="text-white text-xs font-semibold">Nueva Factura</span>
        </div>
        <span className="text-xs bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">FC A · PV 0001</span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <p className="text-[#6B7280] text-xs mb-1">Cliente / Razón social</p>
          <div className="bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-white text-sm">Distribuidora Norte S.R.L.</div>
        </div>
        <div>
          <p className="text-[#6B7280] text-xs mb-1">CUIT</p>
          <div className="bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-white text-sm">30-71234567-9</div>
        </div>
        <div>
          <p className="text-[#6B7280] text-xs mb-1">Condición IVA</p>
          <div className="bg-[#111827] border border-purple-500/20 rounded-lg px-3 py-2 text-purple-300 text-sm">Responsable Inscripto</div>
        </div>
        <div className="col-span-2">
          <div className="bg-[#111827] border border-white/5 rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 gap-2 px-3 py-2 border-b border-white/5 text-[#6B7280] text-xs font-medium">
              <span className="col-span-2">Descripción</span><span>Cantidad</span><span>Subtotal</span>
            </div>
            {[{desc:'Servicio de asesoramiento contable',qty:1,sub:'$150.000'},{desc:'Liquidación de impuestos mensual',qty:1,sub:'$30.000'}].map((item,i)=>(
              <div key={i} className="grid grid-cols-4 gap-2 px-3 py-2 border-b border-white/5 text-xs text-white last:border-0">
                <span className="col-span-2 text-[#9CA3AF]">{item.desc}</span><span>{item.qty}</span><span className="font-medium">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 flex justify-between items-center bg-purple-500/10 border border-purple-500/20 rounded-lg px-4 py-3">
          <span className="text-purple-300 text-sm font-semibold">Total a facturar</span>
          <span className="text-white text-xl font-bold">$180.000</span>
        </div>
        <button className="col-span-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
          <i className="ri-send-plane-line"></i> Emitir ante ARCA/AFIP
        </button>
      </div>
    </div>
  );
}

function ScreenDashboard() {
  const meses = ['Ene','Feb','Mar','Abr','May','Jun'];
  const ventas = [1200,1450,980,1680,1920,2840];
  const max = Math.max(...ventas);
  return (
    <div className="bg-[#0D1117] rounded-xl overflow-hidden border border-white/10">
      <div className="bg-[#0A0E14] px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2"><i className="ri-bar-chart-2-line text-purple-400 text-sm"></i><span className="text-white text-xs font-semibold">Dashboard</span></div>
        <span className="text-[#6B7280] text-xs">Junio 2026</span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {[{label:'Ventas',val:'$2.840.000',color:'#a855f7'},{label:'Gastos',val:'$1.200.000',color:'#EF4444'},{label:'Resultado',val:'$1.640.000',color:'#10B981'}].map((k,i)=>(
            <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-3 text-center">
              <p className="text-[#6B7280] text-xs mb-1">{k.label}</p>
              <p className="font-bold text-sm" style={{color:k.color}}>{k.val}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#111827] border border-white/5 rounded-xl p-3">
          <p className="text-white text-xs font-semibold mb-3">Ventas últimos 6 meses</p>
          <div className="flex items-end gap-2 h-24">
            {meses.map((m,i)=>(
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-sm" style={{height:`${(ventas[i]/max)*80}px`,backgroundColor:i===5?'#a855f7':'#a855f720'}}></div>
                <span className="text-[#6B7280] text-xs">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenCompartir() {
  return (
    <div className="bg-[#0D1117] rounded-xl overflow-hidden border border-white/10">
      <div className="bg-[#0A0E14] px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
        <i className="ri-share-line text-purple-400 text-sm"></i>
        <span className="text-white text-xs font-semibold">Comprobante emitido · FC A 0001-00000047</span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="bg-[#111827] border border-green-500/20 rounded-xl p-4 text-center">
          <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="ri-checkbox-circle-line text-green-400 text-xl"></i>
          </div>
          <p className="text-white font-bold text-sm mb-1">Factura emitida con éxito</p>
          <p className="text-[#6B7280] text-xs">CAE: 74123456789012 · Vence: 10/06/2026</p>
        </div>
        <div className="bg-[#111827] border border-white/5 rounded-xl p-4">
          <p className="text-[#6B7280] text-xs mb-3 font-medium">Compartir con el cliente</p>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold py-3 rounded-xl">
              <i className="ri-whatsapp-line text-lg"></i> WhatsApp
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] text-sm font-semibold py-3 rounded-xl">
              <i className="ri-mail-line text-lg"></i> Email
            </button>
          </div>
        </div>
        <div className="bg-[#111827] border border-white/5 rounded-xl p-3">
          <p className="text-[#6B7280] text-xs mb-2 font-medium">Link para ver / descargar</p>
          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
            <i className="ri-link text-purple-400 text-sm"></i>
            <span className="text-[#9CA3AF] text-xs font-mono truncate">aurea.guevara-estudio.com.ar/c/tk8x2p...</span>
            <button className="ml-auto text-purple-400 text-xs flex-shrink-0">Copiar</button>
          </div>
          <p className="text-[#6B7280] text-xs mt-2">El cliente puede ver, descargar e imprimir sin iniciar sesión.</p>
        </div>
      </div>
    </div>
  );
}

function ScreenResumen() {
  return (
    <div className="bg-[#0D1117] rounded-xl overflow-hidden border border-white/10">
      <div className="bg-[#0A0E14] px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
        <i className="ri-mail-send-line text-purple-400 text-sm"></i>
        <span className="text-white text-xs font-semibold">Resumen semanal automático</span>
      </div>
      <div className="p-4">
        <div className="bg-[#111827] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm" style={{fontFamily:'serif'}}>A</span>
            </div>
            <div>
              <p className="text-white text-sm font-bold">Resumen semanal · Distribuidora Norte</p>
              <p className="text-[#6B7280] text-xs">Semana del 2 al 8 de junio · Enviado hoy</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[{label:'Ventas',val:'$680.000',color:'#a855f7'},{label:'Gastos',val:'$280.000',color:'#EF4444'},{label:'Por cobrar',val:'$500.000',color:'#F59E0B'},{label:'Por pagar',val:'$120.000',color:'#6B7280'}].map((k,i)=>(
              <div key={i} className="bg-white/5 rounded-lg p-2.5">
                <p className="text-[#6B7280] text-xs mb-1">{k.label}</p>
                <p className="font-bold text-sm" style={{color:k.color}}>{k.val}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] bg-white/5 rounded-lg px-3 py-2">
            <i className="ri-information-line text-purple-400"></i>
            Este resumen llega todos los lunes a tu email automáticamente.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AureaDemo() {
  const [tab, setTab] = useState('facturacion');
  const screens: Record<string, JSX.Element> = {
    facturacion: <ScreenFacturacion />,
    dashboard: <ScreenDashboard />,
    compartir: <ScreenCompartir />,
    resumen: <ScreenResumen />,
  };
  return (
    <section className="py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-3">El sistema por dentro</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">Así se ve Aurea en acción.</h2>
          <p className="text-[#9CA3AF] text-base leading-relaxed">Simple, rápido y profesional. Diseñado para que cualquier emprendedor pueda usarlo sin capacitación.</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${tab===t.id?'bg-purple-600/20 border-purple-500/40 text-purple-300':'bg-white/5 border-white/10 text-[#9CA3AF] hover:text-white'}`}>
              <i className={t.icon}></i> {t.label}
            </button>
          ))}
        </div>
        <div className="max-w-xl mx-auto">{screens[tab]}</div>
      </div>
    </section>
  );
}
