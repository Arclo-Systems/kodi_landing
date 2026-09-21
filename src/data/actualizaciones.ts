import { PRIVACY_DOC, RAFFLE_RULES_DOC, TERMS_DOC } from './legal';

/**
 * Cuándo cambió por última vez el contenido de cada página, en `YYYY-MM-DD`.
 *
 * Alimenta el `lastmod` del sitemap, que es con lo que Google decide si vale
 * la pena volver a rastrear una URL. Por eso NO puede ser la fecha del build:
 * si las cinco páginas dicen "hoy" en cada despliegue, la señal es ruido y
 * Google deja de mirarla.
 *
 * Las legales la sacan de la versión de su propio documento, que ya se mueve
 * cuando cambia el texto. Las otras dos van declaradas: al editar su copy de
 * verdad, mover la fecha acá.
 */
const fechaDeVersion = (version: string): string => version.split('.')[0];

export const ULTIMA_ACTUALIZACION: Readonly<Record<string, string>> = {
  '/': '2026-09-20',
  '/senales-de-transito': '2026-09-21',
  '/cosevi-auto': '2026-09-21',
  '/cosevi-moto': '2026-09-21',
  '/admision-ucr': '2026-09-21',
  '/admision-tec': '2026-09-21',
  '/pruebas-nacionales': '2026-09-21',
  '/eliminar-cuenta': '2026-09-19',
  '/bases': fechaDeVersion(RAFFLE_RULES_DOC.version),
  '/privacidad': fechaDeVersion(PRIVACY_DOC.version),
  '/terminos': fechaDeVersion(TERMS_DOC.version),
};

/** Medianoche en Costa Rica, que es donde se publica. */
export function lastmodDe(ruta: string): string | undefined {
  const fecha = ULTIMA_ACTUALIZACION[ruta];
  return fecha ? new Date(`${fecha}T00:00:00-06:00`).toISOString() : undefined;
}
