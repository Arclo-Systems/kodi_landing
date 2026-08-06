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

/** Los documentos legales que el API público sirve por slug. */
export type LegalDocSlug = 'terms' | 'privacy' | 'raffle_rules';

/** Documento vigente: `{ data: { doc, version, last_updated, sections } }`. */
export function legalDocumentUrl(doc: LegalDocSlug): string {
  return `${API_BASE_URL}/v1/public/legal/${doc}`;
}
