import { useState, useRef } from 'react';

const WA_LINK = 'https://wa.me/5492954321876?text=Hola!%20Usé%20la%20calculadora%20de%20rentabilidad%20y%20me%20gustaría%20una%20consulta%20profesional.';

type Periodo = 'mensual' | 'trimestral' | 'semestral' | 'anual';
type Item = { label: string; valor: number };

interface Resultado {
  totalIng: number;
  cosFijos: number;
  cosVar: number;
  totalCos: number;
  ganancia: number;
  margen: number;
  puntEq: number;
  margenContrib: number;
  margenSeg: number;
}

export default function CalculadoraRentabilidad() {
  const [periodo, setPeriodo] = useState<Periodo>('mensual');
  const [ingPrim, setIngPrim] = useState<Item[]>([{ label: 'Ventas principales', valor: 0 }]);
  const [ingOtros, setIngOtros] = useState<Item[]>([
    { label: 'Intereses recibidos', valor: 0 },
    { label: 'Venta de subproductos', valor: 0 },
  ]);
  const [cosFijos, setCosFijos] = useState<Item[]>([
    { label: 'Alquiler', valor: 0 },
    { label: 'Servicios (luz, gas, internet)', valor: 0 },
    { label: 'Sueldos y cargas sociales', valor: 0 },
  ]);
  const [cosVar, setCosVar] = useState<Item[]>([
    { label: 'Materia prima', valor: 0 },
    { label: 'Impuestos y cargas fiscales', valor: 0 },
    { label: 'Materia prima secundaria', valor: 0 },
  ]);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [analisisIA, setAnalisisIA] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const sum = (items: Item[]) => items.reduce((a, i) => a + (i.valor || 0), 0);
  const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-AR');

  const addItem = (setter: React.Dispatch<React.SetStateAction<Item[]>>, label: string) => {
    setter(prev => [...prev, { label, valor: 0 }]);
  };

  const removeItem = (setter: React.Dispatch<React.SetStateAction<Item[]>>, idx: number) => {
    setter(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  };

  const updateItem = (setter: React.Dispatch<React.SetStateAction<Item[]>>, idx: number, valor: number) => {
    setter(prev => prev.map((item, i) => i === idx ? { ...item, valor } : item));
  };

  const calcular = async () => {
    const totalIng = sum(ingPrim) + sum(ingOtros);
    const totalCosFijos = sum(cosFijos);
    const totalCosVar = sum(cosVar);
    const totalCos = totalCosFijos + totalCosVar;
    const ganancia = totalIng - totalCos;
    const margen = totalIng > 0 ? (ganancia / totalIng) * 100 : 0;
    const puntEq = totalIng > 0 && totalCosVar < totalIng ? totalCosFijos / (1 - totalCosVar / totalIng) : 0;
    const margenContrib = totalIng > 0 ? ((totalIng - totalCosVar) / totalIng) * 100 : 0;
    const margenSeg = totalIng > 0 ? ((totalIng - puntEq) / totalIng) * 100 : 0;

    const res: Resultado = { totalIng, cosFijos: totalCosFijos, cosVar: totalCosVar, totalCos, ganancia, margen, puntEq, margenContrib, margenSeg };
    setResultado(res);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

    setLoadingIA(true);
    setAnalisisIA('');
    const pl = { mensual: 'Mensual', trimestral: 'Trimestral', semestral: 'Semestral', anual: 'Anual' }[periodo];
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 900,
          messages: [{
            role: 'user',
            content: `Sos un contador público argentino especializado en análisis financiero de pymes. Analizá estos datos del período ${pl} y generá un informe técnico-formal en español rioplatense.

DATOS:
- Ingresos totales: ${fmt(totalIng)}
- Costos fijos: ${fmt(totalCosFijos)} (${totalCos > 0 ? Math.round(totalCosFijos / totalCos * 100) : 0}% del total)
- Costos variables: ${fmt(totalCosVar)} (${totalCos > 0 ? Math.round(totalCosVar / totalCos * 100) : 0}% del total)
- Ganancia neta: ${fmt(ganancia)}
- Margen de ganancia: ${margen.toFixed(1)}%
- Margen de contribución: ${margenContrib.toFixed(1)}%
- Punto de equilibrio: ${fmt(puntEq)}
- Margen de seguridad: ${margenSeg.toFixed(1)}%

Escribí 4 párrafos fluidos (sin títulos ni numeración):
1. Diagnóstico del resultado y situación general
2. Análisis del margen de contribución y estructura de costos
3. Interpretación del punto de equilibrio y margen de seguridad
4. Dos acciones concretas para los próximos 30 días

Usá lenguaje técnico-contable formal. Mencioná que un análisis más profundo requiere intervención profesional.`
          }]
        })
      });
      const data = await response.json();
      setAnalisisIA(data.content[0].text);
    } catch {
      setAnalisisIA(`Durante el período ${pl}, la empresa registró ingresos de ${fmt(totalIng)} frente a costos de ${fmt(totalCos)}, arrojando un resultado ${ganancia >= 0 ? 'positivo' : 'negativo'} de ${fmt(Math.abs(ganancia))}. ${ganancia < 0 ? 'Esta situación requiere atención inmediata.' : 'El negocio opera con resultado positivo.'}\n\nEl margen de contribución del ${margenContrib.toFixed(1)}% indica que de cada peso ingresado, ${margenContrib.toFixed(1)} centavos quedan disponibles para absorber costos fijos y generar ganancia. Los costos fijos representan el ${totalCos > 0 ? Math.round(totalCosFijos / totalCos * 100) : 0}% del total.\n\nEl punto de equilibrio operativo se ubica en ${fmt(puntEq)}, representando el ${totalIng > 0 ? Math.round(puntEq / totalIng * 100) : 0}% de los ingresos actuales. El margen de seguridad del ${margenSeg.toFixed(1)}% indica cuánto pueden caer las ventas antes de incurrir en pérdidas.\n\nSe recomienda revisar contratos de costos fijos y analizar la política de precios. Un análisis más profundo requiere la intervención de un profesional contable.`);
    } finally {
      setLoadingIA(false);
    }
  };

  const renderItems = (
    items: Item[],
    setter: React.Dispatch<React.SetStateAction<Item[]>>,
    addLabel: string
  ) => (
    <div>
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-3 mb-2 items-center">
          <span className="text-[#6B7280] text-xs w-48 flex-shrink-0">{item.label}</span>
          <input
            type="number"
            min="0"
            value={item.valor || ''}
            onChange={e => updateItem(setter, idx, parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="flex-1 bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-3 py-2 rounded-lg outline-none transition-colors"
          />
          <button
            onClick={() => removeItem(setter, idx)}
            className="text-[#6B7280] hover:text-red-400 text-lg leading-none flex-shrink-0 w-6"
          >×</button>
        </div>
      ))}
      <button
        onClick={() => addItem(setter, addLabel)}
        className="w-full border border-dashed border-white/10 hover:border-white/20 text-[#6B7280] hover:text-[#9CA3AF] text-xs py-2 rounded-lg transition-colors mt-1"
      >
        + Agregar
      </button>
    </div>
  );

  const periodos: Periodo[] = ['mensual', 'trimestral', 'semestral', 'anual'];
  const periodoLabel = { mensual: 'Mensual', trimestral: 'Trimestral', semestral: 'Semestral', anual: 'Anual' }[periodo];

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-white mb-1">Calculadora de rentabilidad</h2>
        <p className="text-[#9CA3AF] text-sm">Ingresá tus números y obtené un análisis completo con IA.</p>
      </div>

      {/* Período */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-4">
        <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3">1 · Período de análisis</p>
        <div className="flex gap-2 flex-wrap">
          {periodos.map(p => (
            <button
              key={p}
              onClick={() => setPeriodo(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${periodo === p ? 'bg-[#3B82F6] text-white' : 'bg-white/5 text-[#9CA3AF] hover:text-white'}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Ingresos */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-4">
        <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">2 · Ingresos</p>
        <p className="text-[#6B7280] text-xs mb-2 font-medium">Ingresos primarios (ventas)</p>
        {renderItems(ingPrim, setIngPrim, 'Otros ingresos primarios')}
        <p className="text-[#6B7280] text-xs mb-2 font-medium mt-4">Otros ingresos</p>
        {renderItems(ingOtros, setIngOtros, 'Otro ingreso')}
      </div>

      {/* Costos */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-4">
        <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">3 · Costos</p>
        <p className="text-[#6B7280] text-xs mb-2 font-medium">Costos fijos</p>
        {renderItems(cosFijos, setCosFijos, 'Otro costo fijo')}
        <p className="text-[#6B7280] text-xs mb-2 font-medium mt-4">Costos variables</p>
        {renderItems(cosVar, setCosVar, 'Otro costo variable')}
        <button
          onClick={calcular}
          className="w-full mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i className="ri-bar-chart-2-line"></i> Calcular resultado
        </button>
      </div>

      {/* Resultado */}
      {resultado && (
        <div ref={resultRef}>
          {/* Alertas */}
          <div className="mb-4 flex flex-col gap-2">
            {resultado.ganancia < 0 && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
                <i className="ri-alert-line mt-0.5 flex-shrink-0"></i>
                <span><strong>Resultado negativo:</strong> Estás perdiendo {fmt(Math.abs(resultado.ganancia))} en el período. Los costos superan los ingresos.</span>
              </div>
            )}
            {resultado.margenSeg < 15 && resultado.ganancia >= 0 && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
                <i className="ri-alert-line mt-0.5 flex-shrink-0"></i>
                <span><strong>Margen de seguridad crítico ({resultado.margenSeg.toFixed(1)}%):</strong> Tus ventas pueden caer solo un {resultado.margenSeg.toFixed(1)}% antes de entrar en pérdida.</span>
              </div>
            )}
            {resultado.margenSeg >= 15 && resultado.margenSeg < 30 && resultado.ganancia >= 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
                <i className="ri-error-warning-line mt-0.5 flex-shrink-0"></i>
                <span><strong>Margen de seguridad moderado ({resultado.margenSeg.toFixed(1)}%):</strong> El punto de equilibrio representa el {(100 - resultado.margenSeg).toFixed(1)}% de tus ingresos. Conviene reforzarlo.</span>
              </div>
            )}
            {resultado.cosFijos / resultado.totalCos > 0.65 && resultado.totalCos > 0 && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
                <i className="ri-error-warning-line mt-0.5 flex-shrink-0"></i>
                <span><strong>Alta carga de costos fijos ({Math.round(resultado.cosFijos / resultado.totalCos * 100)}%):</strong> Más de dos tercios de tus costos son fijos. Ante caídas en ventas, el impacto es directo.</span>
              </div>
            )}
            {resultado.margen >= 25 && resultado.margenSeg >= 30 && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-xl flex items-start gap-2">
                <i className="ri-checkbox-circle-line mt-0.5 flex-shrink-0"></i>
                <span><strong>Situación financiera saludable:</strong> Margen de ganancia y margen de seguridad en niveles adecuados.</span>
              </div>
            )}
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Ingresos totales', val: fmt(resultado.totalIng), color: '#3B82F6', sub: periodoLabel },
              { label: 'Ganancia neta', val: fmt(resultado.ganancia), color: resultado.ganancia >= 0 ? '#10B981' : '#EF4444', sub: periodoLabel },
              { label: 'Margen de ganancia', val: resultado.margen.toFixed(1) + '%', color: resultado.margen >= 20 ? '#10B981' : resultado.margen >= 10 ? '#F59E0B' : '#EF4444', sub: 'Sobre ingresos' },
              { label: 'Margen de contribución', val: resultado.margenContrib.toFixed(1) + '%', color: '#3B82F6', sub: 'Cubre costos fijos' },
              { label: 'Punto de equilibrio', val: fmt(resultado.puntEq), color: '#F59E0B', sub: 'Mínimo para no perder' },
              { label: 'Margen de seguridad', val: resultado.margenSeg.toFixed(1) + '%', color: resultado.margenSeg >= 30 ? '#10B981' : resultado.margenSeg >= 15 ? '#F59E0B' : '#EF4444', sub: 'Caída máxima soportable' },
            ].map((k, i) => (
              <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-4">
                <p className="text-[#6B7280] text-xs mb-1">{k.label}</p>
                <p className="text-xl font-bold" style={{ color: k.color }}>{k.val}</p>
                <p className="text-[#6B7280] text-xs mt-1">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Proyección anual */}
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-4">
            <p className="text-white text-sm font-semibold mb-4">Proyección anual (12 meses)</p>
            <div className="grid grid-cols-2 gap-3">
              {['mensual', 'trimestral', 'semestral', 'anual'].map((p, i) => {
                const factor = [12, 4, 2, 1][i];
                return (
                  <div key={p} className="bg-white/5 rounded-lg p-3">
                    <p className="text-[#6B7280] text-xs mb-1 capitalize">{p === 'mensual' ? 'Proyección anual' : `×${factor} períodos`}</p>
                    <p className={`font-bold text-base ${resultado.ganancia * factor >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {fmt(resultado.ganancia * factor)}
                    </p>
                    <p className="text-[#6B7280] text-xs">ganancia acumulada</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Análisis IA */}
          <div className="bg-[#111827] border border-[#3B82F6]/20 rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-sparkling-line text-[#3B82F6]"></i>
              <p className="text-[#3B82F6] text-xs font-semibold uppercase tracking-widest">Análisis financiero con IA</p>
            </div>
            {loadingIA ? (
              <p className="text-[#6B7280] text-sm">Generando análisis...</p>
            ) : (
              <div className="text-[#9CA3AF] text-sm leading-relaxed space-y-3">
                {analisisIA.split('\n').filter(p => p.trim()).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-[#0F172A] border border-[#3B82F6]/20 rounded-2xl p-6 text-center">
            <p className="text-white font-semibold mb-2">¿Querés un análisis más profundo?</p>
            <p className="text-[#9CA3AF] text-sm mb-4 leading-relaxed">
              {resultado.ganancia < 0 ? 'Tu negocio está operando con pérdidas. Un análisis profesional puede identificar dónde ajustar.' :
               resultado.margenSeg < 20 ? 'Tu margen de seguridad es bajo. Un contador puede ayudarte a estructurar mejor tus costos.' :
               'Con un análisis profesional podés optimizar tu carga fiscal y proyectar escenarios de crecimiento.'}
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              <i className="ri-whatsapp-line"></i>
              Consultar con el Cr. Guevara
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
