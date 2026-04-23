import { Link } from 'react-router-dom';

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
const ingresos = [2100, 1850, 2450, 2200, 2680, 2840];
const egresos = [1450, 1380, 1600, 1520, 1590, 1650];
const MAX_VAL = 3000;

const products = [
  { name: 'Dashboard Financiero', margin: 81, change: '+23%', positive: true },
  { name: 'Liquidación de Sueldos', margin: 72, change: '+5%', positive: true },
  { name: 'Servicio Contable Mensual', margin: 68, change: '+12%', positive: true },
  { name: 'Consultoría Puntual', margin: 65, change: '+3%', positive: true },
  { name: 'Asesoría Impositiva', margin: 55, change: '-2%', positive: false },
];

const costs = [
  { label: 'Personal / Honorarios', pct: 35, color: '#3B82F6' },
  { label: 'Servicios y Alquileres', pct: 22, color: '#8B5CF6' },
  { label: 'Impuestos y Cargas', pct: 18, color: '#F59E0B' },
  { label: 'Marketing y Publicidad', pct: 12, color: '#10B981' },
  { label: 'Otros gastos', pct: 13, color: '#6B7280' },
];

const cashflow = [
  { mes: 'Julio 2025', valor: '$1.280.000', estado: 'Positivo', color: '#10B981' },
  { mes: 'Agosto 2025', valor: '$1.190.000', estado: 'Positivo', color: '#10B981' },
  { mes: 'Septiembre 2025', valor: '$980.000', estado: 'Atención', color: '#F59E0B' },
];

const kpis = [
  { label: 'Ingresos del mes', value: '$2.840.000', change: '+6% vs mes anterior', icon: 'ri-funds-line', color: '#10B981', up: true },
  { label: 'Egresos del mes', value: '$1.650.000', change: '+4% vs mes anterior', icon: 'ri-arrow-down-circle-line', color: '#EF4444', up: false },
  { label: 'Margen neto', value: '41,9%', change: '+2.1 puntos vs mes anterior', icon: 'ri-percent-line', color: '#3B82F6', up: true },
  { label: 'Servicio más rentable', value: 'Dashboard', change: 'Margen del 81%', icon: 'ri-trophy-line', color: '#F59E0B', up: true },
];

const insights = [
  { icon: 'ri-search-eye-line', color: '#3B82F6', title: '¿En qué gastás tu plata?', desc: 'Desglosamos cada egreso para que sepas exactamente a dónde va tu dinero cada mes.' },
  { icon: 'ri-line-chart-line', color: '#10B981', title: '¿Cuál es tu margen real?', desc: 'No lo que facturás, sino lo que realmente te queda después de costos e impuestos.' },
  { icon: 'ri-medal-line', color: '#F59E0B', title: '¿Qué producto te deja más?', desc: 'Identificamos qué parte de tu negocio es más rentable para que puedas potenciarla.' },
  { icon: 'ri-calendar-line', color: '#8B5CF6', title: '¿Cuándo puede faltar caja?', desc: 'Te avisamos con anticipación para que nunca te agarre desprevenido un mes difícil.' },
];

export default function DashboardPreview() {
  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <p className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-4">Gestión Financiera Real</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
            Vas a saber exactamente<br />qué pasa con tu dinero.
          </h2>
          <p className="text-[#9CA3AF] text-base leading-relaxed">
            No más &ldquo;creo que me fue bien este mes&rdquo;. Te armo un dashboard
            personalizado para que sepas en tiempo real cuánto ganás, en qué gastás
            y qué parte de tu negocio es la más rentable.
          </p>
        </div>

        {/* Insight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {insights.map((ins) => (
            <div key={ins.title} className="bg-[#111827] border border-white/5 rounded-xl p-5 flex flex-col gap-3">
              <span className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: `${ins.color}15` }}>
                <i className={`${ins.icon} text-lg`} style={{ color: ins.color }}></i>
              </span>
              <div>
                <p className="text-white font-semibold text-sm mb-1">{ins.title}</p>
                <p className="text-[#9CA3AF] text-xs leading-relaxed">{ins.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard mockup */}
        <div className="bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-[#0A0E14]">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center text-[#3B82F6]">
                <i className="ri-bar-chart-2-line"></i>
              </span>
              <span className="text-white text-sm font-semibold">Dashboard Financiero</span>
              <span className="text-[#6B7280] text-xs hidden sm:inline">· Empresa Demo S.R.L. · Junio 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-green-400 text-xs">Actualizado hoy</span>
              </div>
              <span className="bg-[#3B82F6]/20 border border-[#3B82F6]/30 rounded-full px-3 py-0.5">
                <span className="text-[#3B82F6] text-xs font-bold tracking-widest">EJEMPLO</span>
              </span>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-5">
            {/* KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {kpis.map((kpi) => (
                <div key={kpi.label} className="bg-[#111827] border border-white/5 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[#6B7280] text-xs">{kpi.label}</p>
                    <span className="w-6 h-6 flex items-center justify-center flex-shrink-0" style={{ color: kpi.color }}>
                      <i className={`${kpi.icon} text-sm`}></i>
                    </span>
                  </div>
                  <p className="text-white font-bold text-xl mb-1.5">{kpi.value}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 flex items-center justify-center" style={{ color: kpi.color }}>
                      <i className={`${kpi.up ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} text-xs`}></i>
                    </span>
                    <span className="text-xs" style={{ color: kpi.color }}>{kpi.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {/* Bar chart */}
              <div className="lg:col-span-3 bg-[#111827] border border-white/5 rounded-xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-white font-semibold text-sm">Ingresos vs Egresos · últimos 6 meses</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]"></span>
                      <span className="text-[#9CA3AF] text-xs">Ingresos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#EF4444]/70"></span>
                      <span className="text-[#9CA3AF] text-xs">Egresos</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-end gap-2" style={{ height: '130px' }}>
                  {months.map((m, i) => (
                    <div key={m} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end gap-0.5 justify-center" style={{ height: '110px' }}>
                        <div className="w-[45%] bg-[#3B82F6] rounded-t-sm" style={{ height: `${(ingresos[i] / MAX_VAL) * 100}%` }}></div>
                        <div className="w-[45%] bg-[#EF4444]/70 rounded-t-sm" style={{ height: `${(egresos[i] / MAX_VAL) * 100}%` }}></div>
                      </div>
                      <span className="text-[#6B7280] text-xs">{m}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <p className="text-[#9CA3AF] text-xs">Ganancia acumulada 6 meses</p>
                  <p className="text-green-400 font-bold text-sm">$3.830.000</p>
                </div>
              </div>

              {/* Top products */}
              <div className="lg:col-span-2 bg-[#111827] border border-white/5 rounded-xl p-5">
                <p className="text-white font-semibold text-sm mb-1">Rentabilidad por servicio</p>
                <p className="text-[#6B7280] text-xs mb-4">Margen neto por área</p>
                <div className="flex flex-col gap-3">
                  {products.map((p) => (
                    <div key={p.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[#9CA3AF] text-xs truncate">{p.name}</span>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className={`text-xs font-medium ${p.positive ? 'text-green-400' : 'text-red-400'}`}>{p.change}</span>
                          <span className="text-white text-xs font-bold">{p.margin}%</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${p.margin}%`,
                            backgroundColor: p.positive ? '#3B82F6' : '#EF4444',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Cost breakdown */}
              <div className="bg-[#111827] border border-white/5 rounded-xl p-5">
                <p className="text-white font-semibold text-sm mb-4">Estructura de costos</p>
                <div className="flex flex-col gap-2.5">
                  {costs.map((c) => (
                    <div key={c.label} className="flex items-center gap-3">
                      <div className="h-2 rounded-full flex-1 bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.color }}></div>
                      </div>
                      <span className="text-[#9CA3AF] text-xs w-32 truncate">{c.label}</span>
                      <span className="text-white text-xs font-bold w-8 text-right">{c.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cashflow forecast */}
              <div className="bg-[#111827] border border-white/5 rounded-xl p-5">
                <p className="text-white font-semibold text-sm mb-1">Proyección de flujo de fondos</p>
                <p className="text-[#6B7280] text-xs mb-4">Próximos 3 meses</p>
                <div className="flex flex-col gap-3">
                  {cashflow.map((cf) => (
                    <div key={cf.mes} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">
                      <div>
                        <p className="text-white text-sm font-medium">{cf.mes}</p>
                        <p className="text-[#6B7280] text-xs">Saldo proyectado</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-sm">{cf.valor}</p>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: cf.color, backgroundColor: `${cf.color}15` }}>
                          {cf.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-4 rounded-full transition-colors cursor-pointer text-sm"
          >
            Quiero mi dashboard personalizado
            <span className="w-4 h-4 flex items-center justify-center"><i className="ri-arrow-right-line"></i></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
