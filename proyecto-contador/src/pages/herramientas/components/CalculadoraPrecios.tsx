import { useState, useRef } from 'react';

const WA_LINK = 'https://wa.me/5492954321876?text=Hola!%20Usé%20la%20calculadora%20de%20precios%20y%20quisiera%20asesoramiento%20profesional.';

type TipoNegocio = 'reventa' | 'producto_unico' | 'servicio_profesional' | 'servicio_estandar' | '';
type Metodo = 'costos' | 'competencia' | 'valor' | '';
type SubtipoComp = 'hora' | 'proyecto' | 'mes' | 'unidad';
type Posicion = 'bajo' | 'similar' | 'premium';

interface RecomendacionIA {
  metodo_principal: Metodo;
  razon: string;
  tip: string;
  subtipo_competencia: SubtipoComp;
}

interface Resultado {
  precio: number;
  costo: number;
  ganancia: number;
  margenPct: number;
  metodo: Metodo;
  subtipo?: SubtipoComp;
  extras: Record<string, number | string>;
}

export default function CalculadoraPrecios() {
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState<TipoNegocio>('');
  const [recomendacion, setRecomendacion] = useState<RecomendacionIA | null>(null);
  const [loadingRec, setLoadingRec] = useState(false);
  const [metodo, setMetodo] = useState<Metodo>('');
  const [subtipoComp, setSubtipoComp] = useState<SubtipoComp>('hora');
  const [posicion, setPosicion] = useState<Posicion>('similar');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [analisisIA, setAnalisisIA] = useState('');
  const [loadingIA, setLoadingIA] = useState(false);

  // Costos
  const [cosDirectos, setCosDirectos] = useState([
    { label: 'Materia prima / insumos', valor: 0 },
    { label: 'Mano de obra', valor: 0 },
    { label: 'Packaging / embalaje', valor: 0 },
  ]);
  const [cosIndirectos, setCosIndirectos] = useState([
    { label: 'Alquiler proporcional', valor: 0 },
    { label: 'Servicios proporcionales', valor: 0 },
  ]);
  const [margenDeseado, setMargenDeseado] = useState(40);

  // Competencia
  const [refsComp, setRefsComp] = useState([{ valor: 0 }, { valor: 0 }]);
  const [costoUnidad, setCostoUnidad] = useState(0);
  const [horasProm, setHorasProm] = useState(0);

  // Valor percibido
  const [valRef, setValRef] = useState(0);
  const [valCosto, setValCosto] = useState(0);
  const [scores, setScores] = useState([5, 5, 5, 5, 5]);
  const scoreLabels = ['Exclusividad / unicidad', 'Calidad percibida', 'Experiencia / atención', 'Personalización', 'Reputación / trayectoria'];

  const resultRef = useRef<HTMLDivElement>(null);
  const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-AR');
  const sum = (items: { valor: number }[]) => items.reduce((a, i) => a + (i.valor || 0), 0);

  const tiposNegocio = [
    { id: 'reventa' as TipoNegocio, icon: 'ri-arrows-exchange-line', label: 'Reventa' },
    { id: 'producto_unico' as TipoNegocio, icon: 'ri-palette-line', label: 'Producto único / artesanal' },
    { id: 'servicio_profesional' as TipoNegocio, icon: 'ri-briefcase-line', label: 'Servicio profesional' },
    { id: 'servicio_estandar' as TipoNegocio, icon: 'ri-tools-line', label: 'Servicio / oficio' },
  ];

  const subtiposLabels: Record<SubtipoComp, string> = { hora: 'Por hora', proyecto: 'Por proyecto', mes: 'Abono mensual', unidad: 'Por unidad' };
  const posLabels: Record<Posicion, string> = { bajo: 'Debajo del mercado', similar: 'En línea con el mercado', premium: 'Premium / más experiencia' };

  const analizar = async () => {
    if (!descripcion.trim()) { alert('Por favor describí tu producto o servicio.'); return; }
    setLoadingRec(true);
    setRecomendacion(null);
    setResultado(null);

    const tipoHints: Record<string, string> = {
      servicio_profesional: 'Es un servicio profesional basado en conocimiento. En servicios profesionales el precio lo determina el mercado y la experiencia, no los costos. SIEMPRE recomendar competencia.',
      reventa: 'Es reventa de productos existentes. SIEMPRE recomendar competencia.',
      producto_unico: 'Es un producto único o artesanal con fuerte componente creativo. Recomendar valor percibido.',
      servicio_estandar: 'Es un servicio u oficio con materiales. Puede ser costos o competencia.',
    };

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: `Sos un contador y consultor de negocios argentino experto en estrategia de precios.

Un emprendedor describe lo que vende: "${descripcion}"
Contexto: ${tipoHints[tipo] || 'Sin tipo especificado.'}

Respondé SOLO con JSON válido sin markdown:
{"metodo_principal":"costos"|"competencia"|"valor","razon":"2-3 oraciones explicando el método","tip":"consejo específico para este negocio (2 oraciones)","subtipo_competencia":"hora"|"proyecto"|"mes"|"unidad"}`
          }]
        })
      });
      const data = await res.json();
      const txt = data.content[0].text.trim().replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(txt);
      setRecomendacion(parsed);
      setMetodo(parsed.metodo_principal);
      if (parsed.subtipo_competencia) setSubtipoComp(parsed.subtipo_competencia);
    } catch {
      let m: Metodo = 'costos';
      let sub: SubtipoComp = 'unidad';
      if (tipo === 'servicio_profesional') { m = 'competencia'; sub = 'hora'; }
      else if (tipo === 'reventa') { m = 'competencia'; sub = 'unidad'; }
      else if (tipo === 'producto_unico') m = 'valor';
      setRecomendacion({
        metodo_principal: m,
        razon: m === 'competencia' ? 'Para este tipo de negocio, el precio lo determina el mercado. Lo más importante es conocer qué cobran otros con similar experiencia o qué ofrece la competencia.' : m === 'valor' ? 'Tu producto tiene características únicas que el cliente valora más allá del costo. El precio debe reflejar esa percepción.' : 'El método por costos es el más adecuado, te permite asegurar rentabilidad en cada venta.',
        tip: m === 'competencia' ? 'Consultá con colegas, revisá referencias del mercado local y considerá tu experiencia al posicionarte.' : 'Revisá periódicamente tus costos para mantener el margen.',
        subtipo_competencia: sub,
      });
      setMetodo(m);
      setSubtipoComp(sub);
    } finally {
      setLoadingRec(false);
    }
  };

  const calcularPrecio = async () => {
    let precio = 0, costo = 0, ganancia = 0;
    const extras: Record<string, number | string> = {};

    if (metodo === 'costos') {
      const dir = sum(cosDirectos), ind = sum(cosIndirectos);
      costo = dir + ind;
      precio = costo * (1 + margenDeseado / 100);
      ganancia = precio - costo;
      extras.dir = dir; extras.ind = ind; extras.margenPct = margenDeseado + '%';
    } else if (metodo === 'competencia') {
      const vals = refsComp.map(r => r.valor).filter(v => v > 0);
      if (vals.length === 0) { alert('Ingresá al menos una referencia de precio.'); return; }
      const prom = vals.reduce((a, b) => a + b, 0) / vals.length;
      extras.prom = prom; extras.min = Math.min(...vals); extras.max = Math.max(...vals); extras.pos = posicion;
      precio = posicion === 'bajo' ? prom * 0.88 : posicion === 'premium' ? prom * 1.18 : prom;
      costo = costoUnidad;
      ganancia = precio - costo;
    } else if (metodo === 'valor') {
      if (!valRef) { alert('Ingresá el precio de referencia.'); return; }
      const total = scores.reduce((a, b) => a + b, 0);
      const maxScore = scores.length * 10;
      const factor = total / maxScore;
      precio = valRef + valRef * factor * 0.7;
      costo = valCosto;
      ganancia = precio - costo;
      extras.ref = valRef; extras.total = total; extras.max = maxScore;
    }

    const margenPct = precio > 0 ? (ganancia / precio) * 100 : 0;
    const res: Resultado = { precio, costo, ganancia, margenPct, metodo, subtipo: subtipoComp, extras };
    setResultado(res);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

    setLoadingIA(true);
    setAnalisisIA('');
    const metNombres = { costos: 'costos más margen', competencia: 'referencia al mercado', valor: 'valor percibido' };
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: `Sos un contador público argentino. Un emprendedor calculó el precio de su producto.

PRODUCTO: ${descripcion}
MÉTODO: ${metNombres[metodo as keyof typeof metNombres]}${metodo === 'competencia' ? ' (' + subtiposLabels[subtipoComp] + ')' : ''}
PRECIO: ${fmt(precio)}${metodo === 'competencia' && subtipoComp === 'hora' ? ' por hora' : ''}
${costo > 0 ? 'COSTO: ' + fmt(costo) : ''}
MARGEN: ${margenPct.toFixed(1)}%
${metodo === 'competencia' ? 'POSICIONAMIENTO: ' + posicion : ''}

Escribí 3 párrafos cortos en español formal rioplatense (sin títulos):
1. Evaluación del precio y coherencia con el mercado
2. Principal riesgo o consideración para este tipo de negocio
3. Acción concreta para validar el precio

Mencioná que una estrategia profesional requiere análisis más profundo.`
          }]
        })
      });
      const data = await response.json();
      setAnalisisIA(data.content[0].text);
    } catch {
      setAnalisisIA(`El precio de ${fmt(precio)}${metodo === 'competencia' && subtipoComp === 'hora' ? ' por hora' : ''} resulta ${margenPct > 15 ? 'coherente con el mercado y permite sostener la actividad con rentabilidad razonable' : 'ajustado, lo que puede dificultar la sustentabilidad a mediano plazo'}.\n\nEl principal riesgo es no revisar el precio ante cambios en el mercado o los costos, lo que puede deteriorar la rentabilidad sin que sea evidente de inmediato.\n\nSe recomienda consultar con 3 a 5 referencias del mercado antes de establecerlo definitivamente. Una estrategia de precios profesional requiere el acompañamiento de un asesor especializado.`);
    } finally {
      setLoadingIA(false);
    }
  };

  const metodosInfo = [
    { id: 'costos' as Metodo, icon: 'ri-calculator-line', label: 'Por costos' },
    { id: 'competencia' as Metodo, icon: 'ri-group-line', label: 'Por competencia' },
    { id: 'valor' as Metodo, icon: 'ri-vip-diamond-line', label: 'Por valor percibido' },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-white mb-1">Calculadora de precios</h2>
        <p className="text-[#9CA3AF] text-sm">La IA identifica el mejor método para tu negocio y te guía paso a paso.</p>
      </div>

      {/* Paso 1: Descripción */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-4">
        <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">1 · ¿Qué vendés?</p>
        <textarea
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          rows={3}
          placeholder="Ej: Soy contador público y ofrezco servicios de liquidación de impuestos y asesoramiento financiero para pymes..."
          className="w-full bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-4 py-3 rounded-xl outline-none transition-colors resize-none mb-4"
        />
        <p className="text-[#6B7280] text-xs font-medium mb-2">¿Qué tipo es?</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {tiposNegocio.map(t => (
            <button
              key={t.id}
              onClick={() => setTipo(t.id)}
              className={`py-3 px-2 rounded-xl border text-xs text-center transition-colors ${tipo === t.id ? 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6] font-medium' : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:text-white'}`}
            >
              <i className={`${t.icon} text-lg block mb-1`}></i>
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={analizar}
          disabled={loadingRec}
          className="w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
        >
          <i className="ri-sparkling-line"></i>
          {loadingRec ? 'Analizando...' : 'Analizar y recomendar método'}
        </button>
      </div>

      {/* Paso 2: Recomendación */}
      {recomendacion && (
        <div className="bg-[#0F172A] border border-[#3B82F6]/20 rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-sparkling-line text-[#3B82F6]"></i>
            <p className="text-[#3B82F6] text-xs font-semibold uppercase tracking-widest">Método recomendado</p>
          </div>
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full mb-3">
            <i className="ri-checkbox-circle-line"></i>
            {metodosInfo.find(m => m.id === recomendacion.metodo_principal)?.label}
          </div>
          <p className="text-[#9CA3AF] text-sm leading-relaxed mb-3">{recomendacion.razon}</p>
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#9CA3AF] leading-relaxed">
            <i className="ri-lightbulb-line text-[#F59E0B]"></i> <strong className="text-white">Tip:</strong> {recomendacion.tip}
          </div>
          <div className="mt-4">
            <p className="text-[#6B7280] text-xs font-medium mb-2">Explorar otros métodos:</p>
            <div className="flex gap-2 flex-wrap">
              {metodosInfo.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setMetodo(m.id); setResultado(null); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-colors ${metodo === m.id ? 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]' : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:text-white'}`}
                >
                  <i className={m.icon}></i> {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Paso 3: Formulario */}
      {metodo && (
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-4">
          <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">
            3 · {metodosInfo.find(m => m.id === metodo)?.label}
          </p>

          {/* COSTOS */}
          {metodo === 'costos' && (
            <div>
              <p className="text-[#6B7280] text-xs font-medium mb-2">Costos directos por unidad</p>
              {cosDirectos.map((c, i) => (
                <div key={i} className="flex gap-2 mb-2 items-center">
                  <span className="text-[#6B7280] text-xs w-44 flex-shrink-0">{c.label}</span>
                  <input type="number" min="0" value={c.valor || ''} onChange={e => setCosDirectos(prev => prev.map((x, j) => j === i ? { ...x, valor: parseFloat(e.target.value) || 0 } : x))} placeholder="0" className="flex-1 bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-3 py-2 rounded-lg outline-none transition-colors" />
                  {cosDirectos.length > 1 && <button onClick={() => setCosDirectos(prev => prev.filter((_, j) => j !== i))} className="text-[#6B7280] hover:text-red-400 text-lg w-6">×</button>}
                </div>
              ))}
              <button onClick={() => setCosDirectos(prev => [...prev, { label: 'Otro costo directo', valor: 0 }])} className="w-full border border-dashed border-white/10 text-[#6B7280] text-xs py-2 rounded-lg mb-4">+ Agregar costo directo</button>
              <p className="text-[#6B7280] text-xs font-medium mb-2">Costos indirectos por unidad</p>
              {cosIndirectos.map((c, i) => (
                <div key={i} className="flex gap-2 mb-2 items-center">
                  <span className="text-[#6B7280] text-xs w-44 flex-shrink-0">{c.label}</span>
                  <input type="number" min="0" value={c.valor || ''} onChange={e => setCosIndirectos(prev => prev.map((x, j) => j === i ? { ...x, valor: parseFloat(e.target.value) || 0 } : x))} placeholder="0" className="flex-1 bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-3 py-2 rounded-lg outline-none transition-colors" />
                  {cosIndirectos.length > 1 && <button onClick={() => setCosIndirectos(prev => prev.filter((_, j) => j !== i))} className="text-[#6B7280] hover:text-red-400 text-lg w-6">×</button>}
                </div>
              ))}
              <button onClick={() => setCosIndirectos(prev => [...prev, { label: 'Otro costo indirecto', valor: 0 }])} className="w-full border border-dashed border-white/10 text-[#6B7280] text-xs py-2 rounded-lg mb-4">+ Agregar costo indirecto</button>
              <p className="text-[#6B7280] text-xs font-medium mb-2">Margen de ganancia deseado: <span className="text-white">{margenDeseado}%</span></p>
              <input type="range" min="5" max="200" step="5" value={margenDeseado} onChange={e => setMargenDeseado(parseInt(e.target.value))} className="w-full mb-4" />
            </div>
          )}

          {/* COMPETENCIA */}
          {metodo === 'competencia' && (
            <div>
              <p className="text-[#6B7280] text-xs font-medium mb-2">¿Cómo cobrás habitualmente?</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {(Object.entries(subtiposLabels) as [SubtipoComp, string][]).map(([k, v]) => (
                  <button key={k} onClick={() => setSubtipoComp(k)} className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${subtipoComp === k ? 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]' : 'bg-white/5 border-white/10 text-[#9CA3AF]'}`}>{v}</button>
                ))}
              </div>
              <p className="text-[#6B7280] text-xs font-medium mb-2">Referencias del mercado</p>
              {refsComp.map((r, i) => (
                <div key={i} className="flex gap-2 mb-2 items-center">
                  <span className="text-[#6B7280] text-xs w-28 flex-shrink-0">Referencia {i + 1}</span>
                  <input type="number" min="0" value={r.valor || ''} onChange={e => setRefsComp(prev => prev.map((x, j) => j === i ? { valor: parseFloat(e.target.value) || 0 } : x))} placeholder="0" className="flex-1 bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-3 py-2 rounded-lg outline-none transition-colors" />
                  {refsComp.length > 1 && <button onClick={() => setRefsComp(prev => prev.filter((_, j) => j !== i))} className="text-[#6B7280] hover:text-red-400 text-lg w-6">×</button>}
                </div>
              ))}
              <button onClick={() => setRefsComp(prev => [...prev, { valor: 0 }])} className="w-full border border-dashed border-white/10 text-[#6B7280] text-xs py-2 rounded-lg mb-4">+ Agregar referencia</button>
              <p className="text-[#6B7280] text-xs font-medium mb-2">Tu posicionamiento</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {(Object.entries(posLabels) as [Posicion, string][]).map(([k, v]) => (
                  <button key={k} onClick={() => setPosicion(k)} className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${posicion === k ? 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#3B82F6]' : 'bg-white/5 border-white/10 text-[#9CA3AF]'}`}>{v}</button>
                ))}
              </div>
              {subtipoComp === 'hora' && (
                <div className="flex gap-2 mb-2 items-center">
                  <span className="text-[#6B7280] text-xs w-44 flex-shrink-0">Horas promedio por trabajo</span>
                  <input type="number" min="0" value={horasProm || ''} onChange={e => setHorasProm(parseFloat(e.target.value) || 0)} placeholder="0" className="flex-1 bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-3 py-2 rounded-lg outline-none transition-colors" />
                </div>
              )}
              {subtipoComp === 'unidad' && (
                <div className="flex gap-2 mb-2 items-center">
                  <span className="text-[#6B7280] text-xs w-44 flex-shrink-0">Tu costo por unidad</span>
                  <input type="number" min="0" value={costoUnidad || ''} onChange={e => setCostoUnidad(parseFloat(e.target.value) || 0)} placeholder="0" className="flex-1 bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-3 py-2 rounded-lg outline-none transition-colors" />
                </div>
              )}
            </div>
          )}

          {/* VALOR PERCIBIDO */}
          {metodo === 'valor' && (
            <div>
              <div className="flex gap-2 mb-4 items-center">
                <span className="text-[#6B7280] text-xs w-52 flex-shrink-0">Precio de referencia del mercado</span>
                <input type="number" min="0" value={valRef || ''} onChange={e => setValRef(parseFloat(e.target.value) || 0)} placeholder="0" className="flex-1 bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-3 py-2 rounded-lg outline-none transition-colors" />
              </div>
              <p className="text-[#6B7280] text-xs font-medium mb-3">Factores de valor percibido</p>
              {scoreLabels.map((l, i) => (
                <div key={i} className="flex items-center gap-3 mb-3">
                  <span className="text-[#6B7280] text-xs w-48 flex-shrink-0">{l}</span>
                  <input type="range" min="0" max="10" step="1" value={scores[i]} onChange={e => setScores(prev => prev.map((s, j) => j === i ? parseInt(e.target.value) : s))} className="flex-1" />
                  <span className="text-white text-xs font-medium w-10 text-right">{scores[i]}/10</span>
                </div>
              ))}
              <div className="flex gap-2 mt-4 items-center">
                <span className="text-[#6B7280] text-xs w-52 flex-shrink-0">Tu costo por unidad</span>
                <input type="number" min="0" value={valCosto || ''} onChange={e => setValCosto(parseFloat(e.target.value) || 0)} placeholder="0" className="flex-1 bg-white/5 border border-white/10 focus:border-[#3B82F6] text-white placeholder-[#6B7280] text-sm px-3 py-2 rounded-lg outline-none transition-colors" />
              </div>
            </div>
          )}

          <button onClick={calcularPrecio} className="w-full mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
            <i className="ri-price-tag-3-line"></i> Calcular precio
          </button>
        </div>
      )}

      {/* Resultado */}
      {resultado && (
        <div ref={resultRef}>
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-4">
            <p className="text-[#6B7280] text-xs mb-1">Precio recomendado{resultado.subtipo === 'hora' ? ' por hora' : ''}</p>
            <p className="text-4xl font-bold text-[#3B82F6] mb-1">{fmt(resultado.precio)}</p>
            {resultado.subtipo === 'hora' && resultado.extras.horas && Number(resultado.extras.horas) > 0 && (
              <p className="text-[#6B7280] text-xs mb-4">Ingreso estimado por {resultado.extras.horas}hs: {fmt(resultado.precio * Number(resultado.extras.horas))}</p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {resultado.costo > 0 && <div className="bg-white/5 rounded-xl p-3"><p className="text-[#6B7280] text-xs mb-1">Costo por unidad</p><p className="text-white font-semibold">{fmt(resultado.costo)}</p></div>}
              <div className="bg-white/5 rounded-xl p-3"><p className="text-[#6B7280] text-xs mb-1">Ganancia por unidad</p><p className={`font-semibold ${resultado.ganancia >= 0 ? 'text-green-400' : 'text-red-400'}`}>{fmt(resultado.ganancia)}</p></div>
              <div className="bg-white/5 rounded-xl p-3"><p className="text-[#6B7280] text-xs mb-1">Margen sobre precio</p><p className="text-[#3B82F6] font-semibold">{resultado.margenPct.toFixed(1)}%</p></div>
              {resultado.metodo === 'competencia' && resultado.extras.prom && <div className="bg-white/5 rounded-xl p-3"><p className="text-[#6B7280] text-xs mb-1">Promedio mercado</p><p className="text-white font-semibold">{fmt(Number(resultado.extras.prom))}</p></div>}
              {resultado.metodo === 'valor' && resultado.extras.ref && <div className="bg-white/5 rounded-xl p-3"><p className="text-[#6B7280] text-xs mb-1">Prima por valor</p><p className="text-[#3B82F6] font-semibold">{fmt(resultado.precio - Number(resultado.extras.ref))}</p></div>}
            </div>
          </div>

          <div className="bg-[#111827] border border-[#3B82F6]/20 rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-sparkling-line text-[#3B82F6]"></i>
              <p className="text-[#3B82F6] text-xs font-semibold uppercase tracking-widest">Análisis del precio</p>
            </div>
            {loadingIA ? (
              <p className="text-[#6B7280] text-sm">Generando análisis...</p>
            ) : (
              <div className="text-[#9CA3AF] text-sm leading-relaxed space-y-3">
                {analisisIA.split('\n').filter(p => p.trim()).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            )}
          </div>

          <div className="bg-[#0F172A] border border-[#3B82F6]/20 rounded-2xl p-6 text-center">
            <p className="text-white font-semibold mb-2">¿Querés una estrategia de precios profesional?</p>
            <p className="text-[#9CA3AF] text-sm mb-4 leading-relaxed">La fijación de precios es una de las decisiones más críticas de tu negocio. Con asesoramiento profesional podés definir una estrategia sólida y sostenible.</p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm">
              <i className="ri-whatsapp-line"></i>
              Consultar con el Cr. Guevara
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
