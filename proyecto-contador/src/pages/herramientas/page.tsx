import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import CalculadoraRentabilidad from './components/CalculadoraRentabilidad';
import CalculadoraPrecios from './components/CalculadoraPrecios';
import { useState } from 'react';

const herramientas = [
  {
    id: 'rentabilidad',
    icon: 'ri-bar-chart-2-line',
    title: 'Calculadora de rentabilidad',
    desc: 'Analizá ingresos, costos, margen de ganancia y punto de equilibrio de tu negocio con análisis de IA.',
    color: '#3B82F6',
  },
  {
    id: 'precios',
    icon: 'ri-price-tag-3-line',
    title: 'Calculadora de precios',
    desc: 'Determiná el precio ideal para tu producto o servicio según costos, competencia o valor percibido.',
    color: '#10B981',
  },
];

export default function Herramientas() {
  const [activa, setActiva] = useState<string | null>(null);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Header */}
          <div className="max-w-2xl mb-14">
            <p className="text-[#3B82F6] text-xs font-semibold tracking-widest uppercase mb-3">
              Herramientas gratuitas
            </p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Tomá mejores decisiones con números reales.
            </h1>
            <p className="text-[#9CA3AF] text-base leading-relaxed">
              Herramientas diseñadas para emprendedores y pymes. Gratis, sin registro, con análisis de inteligencia artificial. Para un análisis más profundo y personalizado, estoy a disposición.
            </p>
          </div>

          {/* Cards selector */}
          {!activa && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {herramientas.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiva(h.id)}
                  className="bg-[#111827] border border-white/5 hover:border-white/15 rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 text-left group"
                >
                  <span
                    className="w-12 h-12 flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${h.color}15` }}
                  >
                    <i className={`${h.icon} text-2xl`} style={{ color: h.color }}></i>
                  </span>
                  <div>
                    <h2 className="text-white font-bold text-xl mb-2">{h.title}</h2>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">{h.desc}</p>
                  </div>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-semibold mt-2"
                    style={{ color: h.color }}
                  >
                    Usar herramienta
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Herramienta activa */}
          {activa && (
            <div>
              <button
                onClick={() => setActiva(null)}
                className="flex items-center gap-2 text-[#9CA3AF] hover:text-white text-sm mb-8 transition-colors"
              >
                <i className="ri-arrow-left-line"></i>
                Volver a herramientas
              </button>

              {activa === 'rentabilidad' && <CalculadoraRentabilidad />}
              {activa === 'precios' && <CalculadoraPrecios />}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
}
