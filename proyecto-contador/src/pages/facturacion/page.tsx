import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';

const AUREA_URL = 'https://aurea.guevara-estudio.com.ar';
const DEMO_URL = 'https://aurea.guevara-estudio.com.ar/demo';
const WA_LINK = 'https://wa.me/5491150069106?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20el%20sistema%20Aurea.';

const modulos = [
  { icon: 'ri-file-list-3-line', title: 'Facturación electrónica real', desc: 'Emitís Facturas A, B y C directamente ante ARCA/AFIP con CAE en segundos. Sin intermediarios.' },
  { icon: 'ri-share-line', title: 'Compartir comprobantes', desc: 'Un clic y la factura llega al cliente por WhatsApp o email, con link para ver, descargar e imprimir.' },
  { icon: 'ri-mail-send-line', title: 'Resumen semanal automático', desc: 'Cada lunes recibís un resumen de ventas, gastos y cuentas por cobrar/pagar. Sin hacer nada.' },
  { icon: 'ri-money-dollar-circle-line', title: 'Gastos y compras', desc: 'Registrá todos tus gastos para tener el cuadro de resultado real de tu negocio siempre actualizado.' },
  { icon: 'ri-group-line', title: 'Clientes y cuentas corrientes', desc: 'Seguimiento de cada cliente, sus facturas y saldo pendiente. Sabés en todo momento quién te debe.' },
  { icon: 'ri-settings-3-line', title: 'Multi-empresa y multi-punto de venta', desc: 'Varias empresas o puntos de venta desde una sola cuenta, cada uno con su logo y datos.' },
];

const pasos = [
  { num: '01', title: 'Creás tu cuenta', desc: 'Registrate con tu email y datos de tu empresa. Menos de 5 minutos.' },
  { num: '02', title: 'Configurás tu CUIT en ARCA', desc: 'Habilitás un Punto de Venta Web Services y delegás Facturación Electrónica. Te guiamos paso a paso.' },
  { num: '03', title: 'Empezás a facturar', desc: 'Cargás la factura, la emitís y el CAE llega en segundos. Compartila por WhatsApp al instante.' },
  { num: '04', title: 'Recibís reportes automáticos', desc: 'Todos los lunes te llega un resumen completo de tu semana sin hacer nada extra.' },
];

const Botones = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
    <a href={DEMO_URL} target="_blank" rel="noopener noreferrer"
      className="px-8 py-4 bg-white text-[#0A0A0A] font-bold rounded-xl text-lg hover:bg-gray-100 transition-all shadow-lg">
      Probá la demo gratis
    </a>
    <a href={AUREA_URL} target="_blank" rel="noopener noreferrer"
      className="px-8 py-4 bg-[#a855f7] text-white font-bold rounded-xl text-lg hover:bg-[#9333ea] transition-all shadow-lg">
      Acceder a Aurea
    </a>
    <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
      className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl text-lg hover:border-white/60 transition-all">
      Consultar por WhatsApp
    </a>
  </div>
);

export default function Facturacion() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />

      <section className="pt-28 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#a855f7]/10 border border-[#a855f7]/30 rounded-full px-5 py-2 mb-8">
            <span className="text-[#a855f7] font-semibold text-sm tracking-wide uppercase">Sistema de Facturación</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Facturá electrónicamente{' '}
            <span className="text-[#a855f7]">sin complicaciones</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Aurea es el sistema que desarrollamos para que nuestros clientes emitan facturas ante ARCA/AFIP,
            compartan comprobantes y controlen su negocio — todo desde un solo lugar.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Facturas A, B y C', 'CAE en segundos', 'Comparte por WhatsApp', 'Reportes automáticos'].map(f => (
              <span key={f} className="bg-[#a855f7]/10 border border-[#a855f7]/20 text-[#a855f7] px-4 py-2 rounded-full text-sm font-medium">{f}</span>
            ))}
          </div>
          <Botones />
        </div>
      </section>

      <section className="py-16 px-4 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">El sistema en acción</h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Mirá cómo funciona Aurea en tiempo real, sin instalaciones ni configuraciones complejas.
          </p>
          <div className="space-y-12">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-gray-500 text-xs ml-2">Aurea — Nueva factura</span>
              </div>
              <img src="/aurea-gif1-nueva-factura" alt="Crear una nueva factura en Aurea" className="w-full" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-gray-500 text-xs ml-2">Aurea — Navegación del sistema</span>
              </div>
              <img src="/aurea-gif2-navegacion-sistema" alt="Navegación y módulos de Aurea" className="w-full" />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-gray-500 text-xs ml-2">Aurea — Dashboard de facturación</span>
              </div>
              <img src="/aurea-facturacion-demo" alt="Dashboard de facturación en Aurea" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Todo lo que necesitás</h2>
          <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
            Diseñado para negocios que quieren ordenarse y crecer sin depender de planillas.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modulos.map(m => (
              <div key={m.title} className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-[#a855f7]/40 transition-all group">
                <div className="w-12 h-12 bg-[#a855f7]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#a855f7]/20 transition-all">
                  <i className={`${m.icon} text-[#a855f7] text-xl`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{m.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Cómo empezar</h2>
          <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
            Desde cero hasta tu primera factura electrónica en menos de una hora.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {pasos.map(p => (
              <div key={p.num} className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
                <span className="text-4xl font-black text-[#a855f7]/20 block mb-3">{p.num}</span>
                <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-center text-center">
            {[
              { icon: 'ri-shield-check-line', label: 'Integración real con ARCA/AFIP' },
              { icon: 'ri-customer-service-line', label: 'Soporte de tu contador' },
              { icon: 'ri-time-line', label: 'Configuración en menos de 1 hora' },
            ].map(b => (
              <div key={b.label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-[#a855f7]/10 rounded-full flex items-center justify-center">
                  <i className={`${b.icon} text-[#a855f7] text-xl`} />
                </div>
                <span className="text-sm text-gray-300 font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Querés empezar a usar Aurea?</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Probá la demo sin registrarte o escribinos por WhatsApp para configurarlo con vos.
          </p>
          <Botones />
        </div>
      </section>

      <Footer />
    </div>
  );
}
