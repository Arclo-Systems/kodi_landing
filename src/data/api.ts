// Base del API público de Kodi.
//
// La landing es 100% estática (`astro build` → HTML), así que este valor se
// hornea en el bundle en tiempo de build. Solo se usa para endpoints PÚBLICOS y
// de solo lectura: acá no viaja ninguna credencial.
//
// Se puede sobreescribir con `PUBLIC_KODI_API_URL` al construir (preview,
// staging). Sin variable, apunta a producción.
//
// `||` y no `??`: una variable declarada pero VACÍA (lo normal en un preview mal
// configurado) es `''`, que `??` daría por buena y dejaría la URL en `/v1/...`
// contra el propio dominio de la landing.
export const API_BASE_URL = (
  import.meta.env.PUBLIC_KODI_API_URL || 'https://api.holakodi.com'
).replace(/\/$/, '');

/**
 * A dónde manda el correo la lista de espera de iPhone.
 *
 * Variable propia y no una ruta calculada sobre `API_BASE_URL`: todavía no está
 * decidido quién recibe el correo (el backend de Kodi, una función de Vercel o
 * un proveedor de correo) y cada uno vive en un origen distinto. Con
 * `PUBLIC_KODI_LISTA_ESPERA_URL` se apunta a donde sea sin tocar código.
 *
 * El valor por defecto es el endpoint público del backend, que es la opción
 * recomendada. Mientras no exista, el POST devuelve 404 y el formulario cae en
 * su estado de error, que ofrece el correo de soporte: nadie se queda sin
 * manera de avisar. El día que exista, la landing ya está lista.
 */
export const LISTA_ESPERA_URL =
  import.meta.env.PUBLIC_KODI_LISTA_ESPERA_URL?.trim() || `${API_BASE_URL}/v1/public/waitlist`;

/** Los documentos legales que el API público sirve por slug. */
export type LegalDocSlug = 'terms' | 'privacy' | 'raffle_rules';

/** Documento vigente: `{ data: { doc, version, last_updated, sections } }`. */
export function legalDocumentUrl(doc: LegalDocSlug): string {
  return `${API_BASE_URL}/v1/public/legal/${doc}`;
}
