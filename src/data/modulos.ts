import type { ImageMetadata } from 'astro';

import coseviAuto from '../assets/modulos/cosevi-auto.webp';
import coseviMoto from '../assets/modulos/cosevi-moto.webp';
import paa from '../assets/modulos/paa.webp';
import penPrimaria from '../assets/modulos/pne-primaria.webp';
import penSecundaria from '../assets/modulos/pne-bachillerato.webp';

/**
 * Los `examType` REALES de la tabla `modules` en producción, verificados contra
 * la base el 2026-09-14.
 *
 * ⚠️ No inventar slugs: `admision`, `pne_primaria` y `pne_bachillerato` NO
 * existen, aunque aparezcan en documentos viejos del proyecto. Este tipo es la
 * llave que une módulos, preguntas de muestra y fechas: si no coincide con
 * producción, se desincroniza todo en silencio.
 */
export type ModuloSlug =
  | 'paa'
  | 'cosevi_auto'
  | 'cosevi_moto'
  | 'estandarizada_primaria'
  | 'estandarizada_secundaria';

export interface Modulo {
  readonly slug: ModuloSlug;
  /** Como lo llama la gente, no como lo llama la base. */
  readonly nombre: string;
  /**
   * Qué cubre el examen, EN PALABRAS.
   *
   * Decisión del founder (2026-09-14): la landing no muestra cantidades de
   * preguntas en ninguna parte. La prueba de que el contenido es serio es la
   * fuente oficial, no un número que además envejece con cada banco nuevo.
   */
  readonly cubre: string;
  /** Solo en los que el producto acaba de estrenar. Se borra cuando dejan de ser noticia. */
  readonly etiqueta?: 'nuevo';
  /** El mismo arte que se ve dentro de la app. */
  readonly arte: ImageMetadata;
}

export const MODULOS: readonly Modulo[] = [
  {
    slug: 'paa',
    nombre: 'Admisión',
    cubre: 'UCR · UNA · TEC — razonamiento verbal y matemático',
    arte: paa,
  },
  {
    slug: 'cosevi_auto',
    nombre: 'COSEVI Auto',
    cubre: 'Teórico B1 — señales, prioridades, mecánica y ley de tránsito',
    etiqueta: 'nuevo',
    arte: coseviAuto,
  },
  {
    slug: 'cosevi_moto',
    nombre: 'COSEVI Moto',
    cubre: 'Prueba A1 — señales, maniobras, equipo y mantenimiento',
    etiqueta: 'nuevo',
    arte: coseviMoto,
  },
  {
    slug: 'estandarizada_primaria',
    nombre: 'PEN Primaria',
    cubre: 'Sexto grado — Español, Matemática, Ciencias y Estudios Sociales',
    arte: penPrimaria,
  },
  {
    slug: 'estandarizada_secundaria',
    nombre: 'PEN Secundaria',
    // Pendiente del founder: nombrar las cinco materias. Mientras tanto esta
    // frase es cierta y no lleva corchete, que es lo que no puede salir a prod.
    cubre: 'Quinto año — las cinco materias de la prueba',
    arte: penSecundaria,
  },
];

export function moduloDe(slug: ModuloSlug): Modulo {
  const modulo = MODULOS.find((m) => m.slug === slug);
  if (!modulo) throw new Error(`Módulo desconocido: ${slug}`);
  return modulo;
}
