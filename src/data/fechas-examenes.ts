import type { ModuloSlug } from './modulos';

interface FechaExamen {
  /** ISO con offset de Costa Rica. */
  readonly fecha: string;
  /** Cómo se nombra el examen dentro de la cuenta regresiva. */
  readonly nombre: string;
}

/**
 * Fechas CONFIRMADAS por el founder (2026-09-14). Un módulo que no aparezca acá
 * no pinta cuenta regresiva: no decir nada es mejor que decir una fecha falsa.
 *
 * `cosevi_auto` y `cosevi_moto` no están a propósito: la cita del teórico la
 * agenda cada persona cuando registra su examen, así que no hay un día común
 * que contar.
 *
 * `estandarizada_secundaria` tiene dos ventanas — técnicos del 21 al 25 de
 * setiembre, académicos del 26 al 30 de octubre. Se cuenta hacia la de
 * ACADÉMICOS, que es la mayoría del público, y el nombre lo dice para que a
 * nadie de un técnico le quede un número que no es el suyo.
 *
 * `estandarizada_primaria` todavía no tiene fecha publicada.
 */
export const FECHAS: Partial<Record<ModuloSlug, FechaExamen>> = {
  paa: {
    fecha: '2026-10-03T07:00:00-06:00',
    nombre: 'la prueba de admisión de la UCR y la UNA',
  },
  estandarizada_secundaria: {
    fecha: '2026-10-26T07:00:00-06:00',
    nombre: 'las Pruebas Nacionales en colegios académicos',
  },
};

export function fechaDe(slug: ModuloSlug): FechaExamen | null {
  return FECHAS[slug] ?? null;
}

const MS_POR_DIA = 86_400_000;
const OFFSET_CR_MS = 6 * 3_600_000;

/**
 * Días completos que faltan, contados en el calendario de Costa Rica.
 *
 * El detalle que importa: a las 23:00 en Costa Rica ya es el día siguiente en
 * UTC. Contando en UTC, entre las 18:00 y la medianoche el sitio mostraría un
 * día de menos. Costa Rica es UTC-6 todo el año, sin horario de verano, así que
 * alcanza con correr el reloj seis horas antes de quedarse con el día.
 */
export function diasRestantes(fechaIso: string, hoy: Date = new Date()): number {
  const diaCR = (d: Date) => Math.floor((d.getTime() - OFFSET_CR_MS) / MS_POR_DIA);
  return diaCR(new Date(fechaIso)) - diaCR(hoy);
}
