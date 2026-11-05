// Lógica de la calculadora de deudas (sin React, para poder probarla aparte).

export type ModoInteres = 'simple' | 'compuesto';
export type UnidadTasa = 'dia' | 'mes';

export interface Cuota {
  id: number;
  nombre: string;
  capital: number; // importe original de la cuota (sin intereses)
  vto: string; // AAAA-MM-DD
  deudaOrg: number; // deuda total hoy según el organismo (opcional, 0 = calcularla)
}

export interface Config {
  tasa: number; // en %
  unidad: UnidadTasa;
  modo: ModoInteres;
  hoy: string; // AAAA-MM-DD
  presupuesto: number;
  parcial: boolean; // permite pagar una parte de una cuota
}

export interface FilaCuota {
  cuota: Cuota;
  dias: number; // días de mora hoy (0 si no venció)
  vencida: boolean;
  interes: number; // interés estimado hoy
  costo: number; // lo que hay que pagar hoy para cancelarla
  porDia: number; // interés que suma por día (hoy)
  acc30: number; // interés que suma en los próximos 30 días
  eficiencia: number; // interés de 30 días frenado por cada peso pagado
}

export interface Pago {
  fila: FilaCuota;
  fraccion: number; // 1 = completa, <1 = pago parcial
}

export interface Estrategia {
  id: 'mejor' | 'nuevas' | 'viejas';
  titulo: string;
  pagos: Pago[];
  usado: number;
  sobrante: number;
  evitado30: number; // interés de 30 días que se frena
  queda30: number; // interés que sigue sumando en 30 días
  deudaRestante: number;
}

const DIA = 86400000;

export function parseISO(s: string): number {
  const [y, m, d] = s.split('-').map(Number);
  return Date.UTC(y, (m || 1) - 1, d || 1);
}

export function diasEntre(a: string, b: string): number {
  return Math.round((parseISO(b) - parseISO(a)) / DIA);
}

export function isoMasDias(iso: string, n: number): string {
  const d = new Date(parseISO(iso) + n * DIA);
  return d.toISOString().slice(0, 10);
}

export function tasaDiaria(c: Pick<Config, 'tasa' | 'unidad' | 'modo'>): number {
  const t = (c.tasa || 0) / 100;
  if (c.unidad === 'dia') return t;
  return c.modo === 'simple' ? t / 30 : Math.pow(1 + t, 1 / 30) - 1;
}

function interesA(cuota: Cuota, fecha: string, r: number, modo: ModoInteres): number {
  const d = Math.max(0, diasEntre(cuota.vto, fecha));
  if (d === 0) return 0;
  return modo === 'simple' ? cuota.capital * r * d : cuota.capital * (Math.pow(1 + r, d) - 1);
}

export function calcularFilas(cuotas: Cuota[], cfg: Config): FilaCuota[] {
  const r = tasaDiaria(cfg);
  const en30 = isoMasDias(cfg.hoy, 30);
  const manana = isoMasDias(cfg.hoy, 1);
  return cuotas.map((cuota) => {
    const dias = Math.max(0, diasEntre(cuota.vto, cfg.hoy));
    const vencida = diasEntre(cuota.vto, cfg.hoy) > 0;
    const interes = interesA(cuota, cfg.hoy, r, cfg.modo);
    const costo = cuota.deudaOrg > 0 ? cuota.deudaOrg : cuota.capital + interes;
    const porDia = interesA(cuota, manana, r, cfg.modo) - interes;
    const acc30 = interesA(cuota, en30, r, cfg.modo) - interes;
    return {
      cuota,
      dias,
      vencida,
      interes,
      costo,
      porDia,
      acc30,
      eficiencia: costo > 0 ? acc30 / costo : 0,
    };
  });
}

const EPS = 1e-9;

function armar(
  id: Estrategia['id'],
  titulo: string,
  vencidas: FilaCuota[],
  pagos: Pago[],
  presupuesto: number,
): Estrategia {
  const usado = pagos.reduce((a, p) => a + p.fila.costo * p.fraccion, 0);
  const evitado30 = pagos.reduce((a, p) => a + p.fila.acc30 * p.fraccion, 0);
  const total30 = vencidas.reduce((a, f) => a + f.acc30, 0);
  const totalCosto = vencidas.reduce((a, f) => a + f.costo, 0);
  return {
    id,
    titulo,
    pagos,
    usado,
    sobrante: Math.max(0, presupuesto - usado),
    evitado30,
    queda30: Math.max(0, total30 - evitado30),
    deudaRestante: Math.max(0, totalCosto - usado),
  };
}

function pagarEnOrden(orden: FilaCuota[], presupuesto: number, parcial: boolean): Pago[] {
  const pagos: Pago[] = [];
  let rem = presupuesto;
  for (const f of orden) {
    if (rem <= EPS) break;
    if (f.costo <= rem + EPS) {
      pagos.push({ fila: f, fraccion: 1 });
      rem -= f.costo;
    } else if (parcial) {
      pagos.push({ fila: f, fraccion: rem / f.costo });
      rem = 0;
    }
  }
  return pagos;
}

// Mejor combinación de cuotas completas (búsqueda exacta; se usa con pocas cuotas).
function mejorCombinacion(items: FilaCuota[], presupuesto: number): FilaCuota[] {
  let mejor = -1;
  let mejorSet: number[] = [];
  const actual: number[] = [];
  const rec = (i: number, rem: number, val: number) => {
    if (i === items.length) {
      if (val > mejor + EPS) {
        mejor = val;
        mejorSet = actual.slice();
      }
      return;
    }
    if (items[i].costo <= rem + EPS) {
      actual.push(i);
      rec(i + 1, rem - items[i].costo, val + items[i].acc30);
      actual.pop();
    }
    rec(i + 1, rem, val);
  };
  rec(0, presupuesto, 0);
  return mejorSet.map((i) => items[i]);
}

export function calcularEstrategias(filas: FilaCuota[], cfg: Config): Estrategia[] {
  const vencidas = filas.filter((f) => f.vencida && f.costo > 0);
  if (vencidas.length === 0 || cfg.presupuesto <= 0) return [];
  const porFecha = (a: FilaCuota, b: FilaCuota) => parseISO(a.cuota.vto) - parseISO(b.cuota.vto);

  const viejas = vencidas.slice().sort(porFecha);
  const nuevas = vencidas.slice().sort((a, b) => porFecha(b, a));

  let pagosMejor: Pago[];
  if (cfg.parcial) {
    const porEf = vencidas
      .slice()
      .sort((a, b) => (Math.abs(a.eficiencia - b.eficiencia) > 1e-9 ? b.eficiencia - a.eficiencia : porFecha(a, b)));
    pagosMejor = pagarEnOrden(porEf, cfg.presupuesto, true);
  } else {
    pagosMejor = mejorCombinacion(viejas, cfg.presupuesto)
      .sort(porFecha)
      .map((f) => ({ fila: f, fraccion: 1 }));
  }

  return [
    armar('mejor', 'La combinación que más interés frena', vencidas, pagosMejor, cfg.presupuesto),
    armar('nuevas', 'Las más nuevas primero', vencidas, pagarEnOrden(nuevas, cfg.presupuesto, cfg.parcial), cfg.presupuesto),
    armar('viejas', 'Las más viejas primero', vencidas, pagarEnOrden(viejas, cfg.presupuesto, cfg.parcial), cfg.presupuesto),
  ];
}

// ---- Detección automática de la tasa a partir de lo que informa el organismo ----

export interface Deteccion {
  modo: ModoInteres;
  tasaDia: number; // fracción diaria, ej. 0.001 = 0,1% por día
  n: number; // cuotas usadas
  dispersion: number; // (máx - mín) / promedio entre cuotas; 0 = idéntica en todas
  porCuota: { nombre: string; tasaDia: number }[];
}

export function detectarTasa(cuotas: Cuota[], hoy: string): Deteccion | null {
  const filas = cuotas
    .map((c) => ({ c, d: diasEntre(c.vto, hoy) }))
    .filter((x) => x.d > 0 && x.c.capital > 0 && x.c.deudaOrg > x.c.capital * 1.000001);
  if (filas.length === 0) return null;

  const tasas = (modo: ModoInteres) =>
    filas.map(({ c, d }) => {
      const q = c.deudaOrg / c.capital;
      return modo === 'simple' ? (q - 1) / d : Math.pow(q, 1 / d) - 1;
    });
  const resumen = (v: number[]) => {
    const media = v.reduce((a, b) => a + b, 0) / v.length;
    return { media, disp: media > 0 ? (Math.max(...v) - Math.min(...v)) / media : 0 };
  };

  const ts = tasas('simple');
  const tk = tasas('compuesto');
  const rs = resumen(ts);
  const rk = resumen(tk);
  const compuesto = filas.length >= 2 && rk.disp + 1e-9 < rs.disp;
  const elegido = compuesto ? tk : ts;
  const r = compuesto ? rk : rs;
  return {
    modo: compuesto ? 'compuesto' : 'simple',
    tasaDia: r.media,
    n: filas.length,
    dispersion: r.disp,
    porCuota: filas.map((x, i) => ({ nombre: x.c.nombre, tasaDia: elegido[i] })),
  };
}
