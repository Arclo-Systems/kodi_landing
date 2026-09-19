import type { ModuloSlug } from './modulos';

export interface PreguntaMuestra {
  readonly enunciado: string;
  readonly opciones: readonly [string, string, string, string];
  /** Índice de la correcta dentro de `opciones`. */
  readonly correcta: 0 | 1 | 2 | 3;
  /** La explicación real de la pregunta en la app. No se reescribe. */
  readonly explicacion: string;
}

/**
 * Las preguntas que se pueden responder en el hero.
 *
 * Salen del MAZO DE DEMO de producción (`questions.isDemoPool = true`), que el
 * equipo curó justo para esto: el backend lo excluye de todo modo que acredite
 * EXP, moneda o liga, así que mostrarlas acá no quema contenido del banco real.
 * Consultado en solo lectura el 2026-09-14.
 *
 * Criterio de selección: enunciado corto, sin tabla y sin fórmulas (la landing
 * no monta el renderizador de matemáticas), con explicación propia y con
 * distractores en los que de verdad se cae.
 *
 * ⚠️ Ninguna se inventa ni se reescribe. Si una no sirve, se cambia por otra
 * del mismo mazo. `Partial` porque un módulo puede quedarse sin pregunta: en
 * ese caso el hero muestra la captura y no el bloque interactivo.
 */
export const PREGUNTAS_MUESTRA: Partial<Record<ModuloSlug, PreguntaMuestra>> = {
  paa: {
    enunciado:
      'En una cuadrícula de 4×4 casillas, ¿cuántos cuadrados de cualquier tamaño (incluyendo el 4×4 completo) se pueden contar en total?',
    opciones: ['30', '16', '20', '25'],
    correcta: 0,
    explicacion:
      'El total de cuadrados es 4²+3²+2²+1²=16+9+4+1=30 (contando cuadrados de tamaño 1×1 hasta 4×4).',
  },
  cosevi_auto: {
    enunciado: '¿Qué es una rotonda?',
    opciones: [
      'Un cruce a desnivel en el que una vía pasa por encima de otra para que los vehículos no se detengan.',
      'Una intersección donde varias vías se encuentran alrededor de un círculo con una isla en el centro.',
      'Un tramo de carretera con separación física central que permite dar vuelta en U con seguridad.',
      'Una intersección de dos vías controlada por semáforos que asignan el paso por turnos.',
    ],
    correcta: 1,
    explicacion:
      'La rotonda es una intersección en la que varias vías confluyen alrededor de un círculo con una isla central. No es un paso a desnivel ni un retorno, y no depende de semáforos para asignar el paso.',
  },
  cosevi_moto: {
    enunciado: '¿Con cuál direccional se señaliza la intención de adelantar?',
    opciones: [
      'Con el direccional derecho',
      'Con las luces de emergencia',
      'Con el direccional izquierdo',
      'No se requiere señalizar si el carril está libre',
    ],
    correcta: 2,
    explicacion:
      'La maniobra se anuncia con el direccional izquierdo, que es el lado por donde se adelanta.',
  },
  estandarizada_primaria: {
    enunciado:
      'Un equipo conserva variedades de una misma especie de planta con características heredables distintas. ¿Qué dimensión de la biodiversidad está considerando?',
    opciones: [
      'La riqueza total de especies del ecosistema.',
      'La diversidad genética dentro de una especie.',
      'La cantidad de factores abióticos del terreno.',
      'La variedad de ecosistemas de una región.',
    ],
    correcta: 1,
    explicacion:
      'La biodiversidad incluye variación genética dentro de las especies, además de diversidad de especies y ecosistemas. Conservar variedades de una misma especie atiende a esa primera dimensión.',
  },
  estandarizada_secundaria: {
    enunciado:
      'Una población de venados cola blanca en Guanacaste tiene tasa de natalidad de 0,12 y tasa de mortalidad de 0,05 por año. ¿Cuál es la tasa de crecimiento neto de esta población?',
    opciones: ['0,17 por año', '0,05 por año', '0,07 por año', '0,12 por año'],
    correcta: 2,
    explicacion: 'Tasa de crecimiento neto = natalidad − mortalidad = 0,12 − 0,05 = 0,07 por año.',
  },
};

export function preguntaDe(slug: ModuloSlug): PreguntaMuestra | null {
  return PREGUNTAS_MUESTRA[slug] ?? null;
}
