import { useMemo, useRef, useState } from 'react';
import {
  calcularEstrategias,
  calcularFilas,
  detectarTasa,
  isoMasDias,
  type Config,
  type Cuota,
  type Estrategia,
  type ModoInteres,
  type UnidadTasa,
} from './deudasCalc';

const WA_NUMBER = '5491150069106';
const MAX_CUOTAS = 20;

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-AR');
const fmtFecha = (iso: string) => (iso ? iso.split('-').reverse().join('/') : '');

const fmtPct = (n: number) => n.toLocaleString('es-AR', { maximumFractionDigits: 4 });
const mensual = (r: number, modo: ModoInteres) => (modo === 'simple' ? r * 30 : Math.pow(1 + r, 30) - 1);

function hoyISO(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function ejemplo(hoy: string): Cuota[] {
  const datos: [string, number, number][] = [
    ['Cuota 1', 25000, 400],
    ['Cuota 2', 30000, 340],
    ['Cuota 3', 35000, 280],
    ['Cuota 4', 40000, 220],
    ['Cuota 5', 45000, 160],
    ['Cuota 6', 50000, 100],
    ['Cuota 7', 50000, -20],
  ];
  return datos.map(([nombre, capital, mora], i) => ({
    id: i + 1,
    nombre,
    capital,
    vto: isoMasDias(hoy, -mora),
    // En el ejemplo, la deuda "que informa el organismo" sale de un 0,1% diario simple.
    deudaOrg: mora > 0 ? Math.round(capital * (1 + 0.001 * mora) * 100) / 100 : 0,
  }));
}

const inputCls =
  'w-full bg-white/5 border border-white/10 focus:border-[#F59E0B] text-white placeholder-[#6B7280] text-sm px-3 py-2 rounded-lg outline-none transition-colors [color-scheme:dark]';
const labelCls = 'block text-[#6B7280] text-[11px] font-medium mb-1';
const pill = (activo: boolean) =>
  `px-3 py-1.5 rounded-full border text-xs transition-colors ${
    activo
      ? 'bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#F59E0B] font-medium'
      : 'bg-white/5 border-white/10 text-[#9CA3AF] hover:text-white'
  }`;

export default function CalculadoraDeudas() {
  const [hoy, setHoy] = useState(hoyISO);
  const [cuotas, setCuotas] = useState<Cuota[]>(() => ejemplo(hoyISO()));
  const [esEjemplo, setEsEjemplo] = useState(true);
  const [tasaModo, setTasaModo] = useState<'auto' | 'manual'>('auto');
  const [tasa, setTasa] = useState(0.1);
  const [unidad, setUnidad] = useState<UnidadTasa>('dia');
  const [modo, setModo] = useState<ModoInteres>('simple');
  const [presupuesto, setPresupuesto] = useState(120000);
  const [parcial, setParcial] = useState(false);
  const [nombre, setNombre] = useState('');
  const nextId = useRef(100);

  const det = useMemo(() => detectarTasa(cuotas, hoy), [cuotas, hoy]);
  const usaDet = tasaModo === 'auto' && det !== null;
  const efTasa = usaDet ? det.tasaDia * 100 : tasa;
  const efUnidad: UnidadTasa = usaDet ? 'dia' : unidad;
  const efModo: ModoInteres = usaDet ? det.modo : modo;

  const cfg: Config = { tasa: efTasa, unidad: efUnidad, modo: efModo, hoy, presupuesto, parcial };

  const filas = useMemo(
    () => calcularFilas(cuotas, { tasa: efTasa, unidad: efUnidad, modo: efModo, hoy, presupuesto, parcial }),
    [cuotas, efTasa, efUnidad, efModo, hoy, presupuesto, parcial],
  );
  const vencidas = filas.filter((f) => f.vencida && f.costo > 0);
  const totalDeuda = vencidas.reduce((a, f) => a + f.costo, 0);
  const alcanzaTodo = vencidas.length > 0 && presupuesto >= totalDeuda - 0.005;

  const estrategias = useMemo<Estrategia[]>(
    () => (alcanzaTodo ? [] : calcularEstrategias(filas, cfg)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filas, alcanzaTodo],
  );

  const editar = (id: number, campo: keyof Cuota, valor: string | number) => {
    setEsEjemplo(false);
    setCuotas((prev) => prev.map((c) => (c.id === id ? { ...c, [campo]: valor } : c)));
  };
  const agregar = () => {
    if (cuotas.length >= MAX_CUOTAS) return;
    setEsEjemplo(false);
    setCuotas((prev) => [
      ...prev,
      { id: nextId.current++, nombre: `Cuota ${prev.length + 1}`, capital: 0, vto: '', deudaOrg: 0 },
    ]);
  };
  const quitar = (id: number) => {
    setEsEjemplo(false);
    setCuotas((prev) => prev.filter((c) => c.id !== id));
  };
  const limpiar = () => {
    setEsEjemplo(false);
    setCuotas([{ id: nextId.current++, nombre: 'Cuota 1', capital: 0, vto: '', deudaOrg: 0 }]);
    setPresupuesto(0);
  };
  const cargarEjemplo = () => {
    setEsEjemplo(true);
    setCuotas(ejemplo(hoy));
    setPresupuesto(120000);
    setTasa(0.1);
    setUnidad('dia');
    setModo('simple');
    setTasaModo('auto');
  };
  const pasarAManual = () => {
    if (det) {
      setTasa(Number((det.tasaDia * 100).toPrecision(4)));
      setUnidad('dia');
      setModo(det.modo);
    }
    setTasaModo('manual');
  };

  // ---- Recomendación ----
  const maxEvitado = estrategias.length ? Math.max(...estrategias.map((e) => e.evitado30)) : 0;
  const minEvitado = estrategias.length ? Math.min(...estrategias.map((e) => e.evitado30)) : 0;
  const casiIgual = estrategias.length > 0 && maxEvitado - minEvitado <= maxEvitado * 0.02;
  const nuevas = estrategias.find((e) => e.id === 'nuevas');
  const viejas = estrategias.find((e) => e.id === 'viejas');
  const mejor = estrategias.find((e) => e.id === 'mejor');
  // Si da casi lo mismo, se recomienda empezar por las más viejas (son las primeras en llegar a juicio).
  const recomendada: Estrategia | undefined = casiIgual ? viejas : mejor;

  const nombresPago = (e: Estrategia) =>
    e.pagos
      .slice()
      .sort(
        (x, y) =>
          Number(x.fraccion < 0.9999) - Number(y.fraccion < 0.9999) || (x.fila.cuota.vto < y.fila.cuota.vto ? -1 : x.fila.cuota.vto > y.fila.cuota.vto ? 1 : 0),
      )
      .map((p) => (p.fila.cuota.nombre || 'Cuota') + (p.fraccion < 0.9999 ? ` (una parte: ${Math.round(p.fraccion * 100)}%)` : ''));
  const unir = (xs: string[]) => (xs.length <= 1 ? xs.join('') : xs.slice(0, -1).join(', ') + ' y ' + xs[xs.length - 1]);

  const razones: string[] = [];
  if (recomendada && recomendada.pagos.length > 0 && viejas && nuevas) {
    if (casiIgual) {
      razones.push(
        `Con tus datos, el orden casi no cambia cuánto interés frenás: la diferencia es de menos de ${fmt(Math.max(maxEvitado - minEvitado, 1))} por mes.`,
      );
      razones.push('Cuando da parecido, conviene empezar por las más viejas: son las primeras que pueden pasar a apremio o juicio, con costas y honorarios.');
      if (efModo === 'compuesto') {
        razones.push('Con interés sobre interés, cada peso que adeudás genera lo mismo sin importar de qué cuota sea.');
      }
    } else {
      razones.push(`Son las cuotas que más interés frenan con el dinero que tenés: ${fmt(recomendada.evitado30)} menos de intereses por mes.`);
      const dif = recomendada.evitado30 - viejas.evitado30;
      if (recomendada.id !== 'viejas' && dif >= 1) {
        razones.push(`Si empezaras por las más viejas frenarías ${fmt(viejas.evitado30)} por mes: ${fmt(dif)} menos.`);
      }
      razones.push(
        efModo === 'simple' && recomendada.id !== 'viejas'
          ? 'Las cuotas viejas ya acumularon mucho interés, pero ese interés no sigue creciendo solo: lo que suma cada día es un porcentaje del importe original. Como las más nuevas arrastran menos intereses acumulados, cada peso que pagás en ellas frena más interés diario.'
          : 'Es la combinación que mejor aprovecha tu dinero: con lo mismo que pagás, frena más interés.',
      );
    }
  }
  const restantes = recomendada
    ? vencidas.filter((f) => !recomendada.pagos.some((p) => p.fila === f && p.fraccion >= 0.9999)).length
    : 0;

  const detalleTabla = (
    <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-1">Detalle por cuota</p>
            <p className="text-[#6B7280] text-xs mb-4">Ordenadas de mayor a menor interés frenado por cada $1.000 que pagás.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[560px]">
                <thead>
                  <tr className="text-left text-[#6B7280]">
                    <th className="font-medium pb-2 pr-3">Cuota</th>
                    <th className="font-medium pb-2 pr-3">Vence</th>
                    <th className="font-medium pb-2 pr-3 text-right">Días de mora</th>
                    <th className="font-medium pb-2 pr-3 text-right">Deuda hoy</th>
                    <th className="font-medium pb-2 pr-3 text-right">Interés por día</th>
                    <th className="font-medium pb-2 text-right">Frenás por mes c/ $1.000</th>
                  </tr>
                </thead>
                <tbody className="text-[#D1D5DB]">
                  {filas
                    .slice()
                    .sort((a, b) => Number(b.vencida) - Number(a.vencida) || b.eficiencia - a.eficiencia)
                    .map((f) => (
                      <tr key={f.cuota.id} className="border-t border-white/5">
                        <td className="py-2 pr-3 text-white">{f.cuota.nombre || 'Cuota'}</td>
                        <td className="py-2 pr-3 tabular-nums">{fmtFecha(f.cuota.vto) || '—'}</td>
                        {f.vencida ? (
                          <>
                            <td className="py-2 pr-3 text-right tabular-nums">{f.dias}</td>
                            <td className="py-2 pr-3 text-right tabular-nums">{fmt(f.costo)}</td>
                            <td className="py-2 pr-3 text-right tabular-nums">{fmt(f.porDia)}</td>
                            <td className="py-2 text-right tabular-nums text-green-400 font-medium">{fmt(f.eficiencia * 1000)}</td>
                          </>
                        ) : (
                          <td colSpan={4} className="py-2 text-right text-[#6B7280]">No vencida: todavía no genera interés</td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
    </div>
  );

  const waTexto = `Hola!${nombre.trim() ? ' Soy ' + nombre.trim() + '.' : ''} Usé la calculadora de deudas de tu web. Tengo ${
    vencidas.length
  } cuota${vencidas.length === 1 ? '' : 's'} vencida${vencidas.length === 1 ? '' : 's'} por ${fmt(
    totalDeuda,
  )} y puedo pagar ${fmt(presupuesto)}. Me gustaría que me asesores.`;
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waTexto)}`;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-white mb-1">Calculadora de deudas: ¿qué cuota pagar primero?</h2>
        <p className="text-[#9CA3AF] text-sm leading-relaxed">
          Si no llegás a pagar toda la deuda de una vez, cargá tus cuotas y compará qué conviene cancelar primero para frenar la mayor cantidad de intereses.
          Sirve para patentes, rentas, tasas municipales, monotributo atrasado o cualquier deuda en cuotas con interés por día.
        </p>
      </div>

      {/* Paso 1: cuotas */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <p className="text-white text-xs font-semibold uppercase tracking-widest">1 · Tus cuotas</p>
          <div className="flex gap-2">
            <button onClick={cargarEjemplo} className="text-xs text-[#9CA3AF] hover:text-white border border-white/10 rounded-full px-3 py-1 transition-colors">
              Cargar ejemplo
            </button>
            <button onClick={limpiar} className="text-xs text-[#9CA3AF] hover:text-white border border-white/10 rounded-full px-3 py-1 transition-colors">
              Empezar con las mías
            </button>
          </div>
        </div>

        {esEjemplo && (
          <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs rounded-xl px-4 py-2.5 mb-4 flex items-start gap-2">
            <i className="ri-information-line mt-0.5"></i>
            <span>Estos son datos de ejemplo. Tocá “Empezar con las mías” o modificalos para cargar tu deuda real.</span>
          </div>
        )}

        <div className="space-y-3">
          {cuotas.map((c) => (
            <div key={c.id} className="grid grid-cols-2 sm:grid-cols-[1.1fr_1fr_1fr_1fr_auto] gap-2 items-end bg-white/[0.02] border border-white/5 rounded-xl p-3">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor={`n-${c.id}`} className={labelCls}>Cuota / período</label>
                <input id={`n-${c.id}`} type="text" value={c.nombre} onChange={(e) => editar(c.id, 'nombre', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor={`c-${c.id}`} className={labelCls}>Importe original ($)</label>
                <input id={`c-${c.id}`} type="number" min="0" step="any" inputMode="decimal" value={c.capital || ''} onChange={(e) => editar(c.id, 'capital', parseFloat(e.target.value) || 0)} placeholder="0" className={inputCls} />
              </div>
              <div>
                <label htmlFor={`v-${c.id}`} className={labelCls}>Vencimiento</label>
                <input id={`v-${c.id}`} type="date" value={c.vto} onChange={(e) => editar(c.id, 'vto', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor={`d-${c.id}`} className={labelCls}>Deuda hoy según el organismo ($)</label>
                <input id={`d-${c.id}`} type="number" min="0" step="any" inputMode="decimal" value={c.deudaOrg || ''} onChange={(e) => editar(c.id, 'deudaOrg', parseFloat(e.target.value) || 0)} placeholder="Calcular" className={inputCls} />
              </div>
              <button
                onClick={() => quitar(c.id)}
                disabled={cuotas.length <= 1}
                aria-label={`Quitar ${c.nombre || 'cuota'}`}
                className="col-span-2 sm:col-span-1 text-[#6B7280] hover:text-red-400 disabled:opacity-30 disabled:hover:text-[#6B7280] text-xs sm:text-lg sm:w-8 py-2 transition-colors"
              >
                <span className="sm:hidden">Quitar cuota</span>
                <span className="hidden sm:inline">×</span>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={agregar}
          disabled={cuotas.length >= MAX_CUOTAS}
          className="w-full mt-3 border border-dashed border-white/10 text-[#6B7280] hover:text-white text-xs py-2 rounded-lg disabled:opacity-40"
        >
          {cuotas.length >= MAX_CUOTAS ? `Máximo ${MAX_CUOTAS} cuotas` : '+ Agregar cuota'}
        </button>
        <p className="text-[#6B7280] text-[11px] leading-relaxed mt-3">
          Tip: cargá “Deuda hoy” (con intereses, como te la muestra el organismo) en 2 o 3 cuotas vencidas y la herramienta descubre sola la tasa de interés. En las cuotas donde lo dejes vacío, la calcula con esa tasa.
        </p>
      </div>

      {/* Paso 2: condiciones */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-4">
        <p className="text-white text-xs font-semibold uppercase tracking-widest mb-4">2 · Condiciones</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="deu-presupuesto" className={labelCls}>¿Cuánto podés pagar ahora? ($)</label>
            <input id="deu-presupuesto" type="number" min="0" step="any" inputMode="decimal" value={presupuesto || ''} onChange={(e) => setPresupuesto(parseFloat(e.target.value) || 0)} placeholder="0" className={inputCls} />
          </div>
          <div>
            <label htmlFor="deu-hoy" className={labelCls}>Fecha de pago</label>
            <input id="deu-hoy" type="date" value={hoy} onChange={(e) => setHoy(e.target.value || hoyISO())} className={inputCls} />
          </div>
        </div>

        <div className="mb-4">
          <span className={labelCls}>Tasa de interés por mora</span>
          <div className="flex gap-2 flex-wrap mb-3">
            <button onClick={() => setTasaModo('auto')} className={pill(tasaModo === 'auto')}>Detectarla de mis cuotas (recomendado)</button>
            <button onClick={pasarAManual} className={pill(tasaModo === 'manual')}>Ya la sé</button>
          </div>

          {tasaModo === 'auto' && (
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
              {!det && (
                <p className="text-[#F59E0B] text-xs leading-relaxed">
                  Todavía no puedo detectarla: cargá en “Deuda hoy según el organismo” lo que te figura (con intereses) en 2 o 3 cuotas vencidas, y usá como fecha de pago el día en que el organismo calculó esos importes. Mientras tanto estoy usando {String(tasa).replace('.', ',')}% {unidad === 'dia' ? 'por día' : 'por mes'}; si la sabés, tocá “Ya la sé”.
                </p>
              )}
              {det && (
                <div>
                  <p className="text-white text-sm font-semibold mb-1">
                    Tasa detectada: {fmtPct(det.tasaDia * 100)}% por día
                    <span className="text-[#9CA3AF] font-normal"> · {fmtPct(mensual(det.tasaDia, det.modo) * 100)}% por mes aprox. · {det.modo === 'simple' ? 'interés simple' : 'interés sobre interés'}</span>
                  </p>
                  <p className={'text-xs leading-relaxed mb-3 ' + (det.n === 1 ? 'text-[#F59E0B]' : det.dispersion <= 0.03 ? 'text-green-400' : det.dispersion <= 0.15 ? 'text-[#F59E0B]' : 'text-red-400')}>
                    {det.n === 1
                      ? 'Salió de una sola cuota, así que no puedo comprobar que sea un patrón. Cargá 2 o 3 cuotas para estar seguros.'
                      : det.dispersion <= 0.03
                        ? `Coincide en las ${det.n} cuotas que cargaste: el patrón es consistente.`
                        : det.dispersion <= 0.15
                          ? 'Es parecida en todas las cuotas pero no exacta: puede que la tasa haya cambiado con el tiempo. Tomá el número como aproximado.'
                          : 'Las cuotas no siguen una tasa constante (puede haber recargos fijos o cambios de tasa). Revisá los importes cargados o usá “Ya la sé”.'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {det.porCuota.map((x, i) => (
                      <span key={i} className="text-[11px] text-[#D1D5DB] bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                        {x.nombre || 'Cuota'}: {fmtPct(x.tasaDia * 100)}%/día
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tasaModo === 'manual' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="deu-tasa" className={labelCls}>Tasa (%)</label>
                <div className="flex gap-2">
                  <input id="deu-tasa" type="number" min="0" step="any" inputMode="decimal" value={tasa || ''} onChange={(e) => setTasa(parseFloat(e.target.value) || 0)} placeholder="0,1" className={inputCls} />
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => setUnidad('dia')} className={pill(unidad === 'dia')}>por día</button>
                    <button onClick={() => setUnidad('mes')} className={pill(unidad === 'mes')}>por mes</button>
                  </div>
                </div>
                <p className="text-[#6B7280] text-[11px] mt-1">Figura en la boleta o en la web del organismo. Ej.: 0,1% por día.</p>
              </div>
              <div>
                <span className={labelCls}>¿Cómo se calcula el interés?</span>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => setModo('simple')} className={pill(modo === 'simple')}>Simple (sobre la cuota original)</button>
                  <button onClick={() => setModo('compuesto')} className={pill(modo === 'compuesto')}>Interés sobre interés</button>
                </div>
                <p className="text-[#6B7280] text-[11px] mt-1">En la duda, dejá “Simple”: es lo más común en impuestos.</p>
              </div>
            </div>
          )}
        </div>

        <label className="flex items-start gap-2 text-[#9CA3AF] text-xs cursor-pointer">
          <input type="checkbox" checked={parcial} onChange={(e) => setParcial(e.target.checked)} className="mt-0.5 accent-[#F59E0B]" />
          <span>El organismo me deja pagar una parte de una cuota (pago parcial). Si no estás seguro, dejalo sin tildar: se pagan cuotas completas.</span>
        </label>
      </div>

      {/* Resultados */}
      <div className="mb-4">
        {vencidas.length === 0 && (
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 text-[#9CA3AF] text-sm">
            Cargá al menos una cuota vencida (con importe y fecha de vencimiento anterior a la fecha de pago) para ver la comparación.
          </div>
        )}

        {vencidas.length > 0 && presupuesto <= 0 && (
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 text-[#9CA3AF] text-sm">
            Tenés {vencidas.length} cuota{vencidas.length === 1 ? '' : 's'} vencida{vencidas.length === 1 ? '' : 's'} por {fmt(totalDeuda)} en total. Indicá cuánto podés pagar ahora para ver qué conviene.
          </div>
        )}

        {alcanzaTodo && presupuesto > 0 && (
          <div className="bg-[#111827] border border-green-500/20 rounded-2xl p-6">
            <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2">Te alcanza para todo</p>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              Con {fmt(presupuesto)} cubrís toda la deuda vencida ({fmt(totalDeuda)}). Si podés, conviene cancelarla completa y dejar de acumular intereses.
            </p>
          </div>
        )}

        {estrategias.length > 0 && recomendada && (
          <div>
            <p className="text-white text-xs font-semibold uppercase tracking-widest mb-1">3 · Qué te conviene pagar</p>
            <p className="text-[#6B7280] text-xs mb-4">
              Deuda vencida total: {fmt(totalDeuda)} · Pagando {fmt(presupuesto)} el {fmtFecha(hoy)}
            </p>

            {recomendada.pagos.length === 0 ? (
              <div className="bg-[#111827] border border-[#F59E0B]/30 rounded-2xl p-6 sm:p-8 mb-4">
                <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-2">Con ese monto no alcanza</p>
                <p className="text-white text-xl font-bold leading-snug mb-2">
                  No llegás a cancelar ninguna cuota completa: la más chica cuesta {fmt(Math.min(...vencidas.map((f) => f.costo)))}.
                </p>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  Si el organismo acepta pagos parciales, tildá esa opción arriba y te digo cómo repartir el dinero. Si no, juntá ese monto y pagá primero la cuota más conveniente.
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-500/10 to-[#111827] border border-green-500/30 rounded-2xl p-6 sm:p-8 mb-4">
                <p className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2">Pagá primero</p>
                <p className="text-white text-3xl sm:text-4xl font-extrabold leading-tight mb-2">{unir(nombresPago(recomendada))}</p>
                <p className="text-[#9CA3AF] text-sm mb-6">
                  Son {fmt(recomendada.usado)} de los {fmt(presupuesto)} que podés pagar.
                </p>

                <p className="text-white text-sm font-semibold mb-3">¿Por qué?</p>
                <ul className="space-y-3 mb-6">
                  {razones.map((r, i) => (
                    <li key={i} className="flex gap-3 text-[#D1D5DB] text-sm leading-relaxed">
                      <i className="ri-checkbox-circle-fill text-green-400 mt-0.5 flex-shrink-0"></i>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-white/10 pt-4 text-[#9CA3AF] text-xs leading-relaxed space-y-1.5">
                  {recomendada.sobrante >= 1 && (
                    <p>
                      Te sobran {fmt(recomendada.sobrante)}: no alcanzan para otra cuota completa. Si el organismo acepta pagos parciales, tildá esa opción arriba y te digo cómo usarlos.
                    </p>
                  )}
                  <p>
                    Después de pagar, te quedan {restantes} cuota{restantes === 1 ? '' : 's'} vencida{restantes === 1 ? '' : 's'} por {fmt(recomendada.deudaRestante)}, que seguirán sumando unos {fmt(recomendada.queda30)} de interés por mes.
                  </p>
                  <p>Antes de pagar, leé los puntos a tener en cuenta más abajo.</p>
                </div>
              </div>
            )}

            <details className="bg-[#111827] border border-white/5 rounded-2xl mb-4">
              <summary className="cursor-pointer text-[#9CA3AF] hover:text-white text-sm px-6 py-4">
                Ver cómo se comparó con otras formas de pagar y el detalle por cuota
              </summary>
              <div className="px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
              {estrategias.map((e) => {
                const destacado = !casiIgual && e.evitado30 >= maxEvitado - 0.005;
                return (
                  <div
                    key={e.id}
                    className={`rounded-2xl p-5 border flex flex-col ${destacado ? 'bg-[#111827] border-green-500/30' : 'bg-[#111827] border-white/5'}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <p className="text-white font-semibold text-sm leading-snug">{e.titulo}</p>
                      {destacado && (
                        <span className="flex-shrink-0 text-[10px] font-semibold text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">
                          Frena más
                        </span>
                      )}
                    </div>

                    <p className="text-[#6B7280] text-[11px] font-medium mb-1.5">Pagarías</p>
                    <div className="flex flex-wrap gap-1.5 mb-4 min-h-[28px]">
                      {e.pagos.length === 0 && <span className="text-[#6B7280] text-xs">Ninguna cuota entra completa con ese monto.</span>}
                      {e.pagos.map((p) => (
                        <span key={p.fila.cuota.id} className="text-xs text-[#D1D5DB] bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                          {p.fila.cuota.nombre || 'Cuota'}
                          {p.fraccion < 0.9999 ? ` (parcial ${Math.round(p.fraccion * 100)}%)` : ''}
                        </span>
                      ))}
                    </div>

                    <dl className="space-y-2 text-xs mt-auto">
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#6B7280]">Usás</dt>
                        <dd className="text-white font-medium tabular-nums">{fmt(e.usado)}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#6B7280]">Interés que frenás por mes</dt>
                        <dd className="text-green-400 font-semibold tabular-nums">{fmt(e.evitado30)}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#6B7280]">Interés que sigue sumando por mes</dt>
                        <dd className="text-[#F59E0B] font-medium tabular-nums">{fmt(e.queda30)}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-[#6B7280]">Deuda vencida que queda</dt>
                        <dd className="text-white font-medium tabular-nums">{fmt(e.deudaRestante)}</dd>
                      </div>
                    </dl>
                  </div>
                );
              })}
            </div>

                {detalleTabla}
              </div>
            </details>
          </div>
        )}

        {alcanzaTodo && filas.length > 0 && (
          <details className="bg-[#111827] border border-white/5 rounded-2xl mb-4">
            <summary className="cursor-pointer text-[#9CA3AF] hover:text-white text-sm px-6 py-4">Ver el detalle por cuota</summary>
            <div className="px-6 pb-6">{detalleTabla}</div>
          </details>
        )}
      </div>

      {/* Advertencias */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl p-6 mb-4">
        <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3">Antes de pagar, tené en cuenta</p>
        <ul className="space-y-2 text-[#9CA3AF] text-xs leading-relaxed list-disc pl-4">
          <li>Muchos organismos imputan el pago primero a intereses y a la deuda más antigua, sin dejarte elegir. Confirmá si podés pagar cuota por cuota.</li>
          <li>Las cuotas más viejas son las primeras que pueden pasar a apremio o ejecución fiscal, con costas y honorarios. Eso puede inclinar la balanza hacia cancelarlas antes, aunque los intereses indiquen otra cosa.</li>
          <li>Si vas a vender o transferir el bien, normalmente vas a necesitar el libre deuda: hay que cancelar todo.</li>
          <li>Consultá si existe una moratoria o plan de pagos vigente: a veces reducen o perdonan parte del interés.</li>
          <li>Es una estimación orientativa con la tasa que cargues; los importes oficiales pueden diferir. No reemplaza el asesoramiento profesional.</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="bg-[#0F172A] border border-[#F59E0B]/20 rounded-2xl p-6 text-center">
        <p className="text-white font-semibold mb-2">¿Querés que lo revisemos juntos?</p>
        <p className="text-[#9CA3AF] text-sm mb-4 leading-relaxed">
          Cada deuda tiene sus reglas. Si me escribís, lo analizo con tus datos reales y te digo cómo conviene ordenarla.
        </p>
        <div className="max-w-xs mx-auto mb-4">
          <label htmlFor="deu-nombre" className={labelCls + ' text-left'}>Tu nombre (opcional, va en el mensaje)</label>
          <input id="deu-nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: María" className={inputCls} />
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
        >
          <i className="ri-whatsapp-line"></i>
          Consultar con el Cr. Guevara
        </a>
      </div>
    </div>
  );
}
