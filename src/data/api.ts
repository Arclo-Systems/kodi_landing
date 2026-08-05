// Base del API público de Kodi.
//
// La landing es 100% estática (`astro build` → HTML), así que este valor se
// hornea en el bundle en tiempo de build. Solo se usa para endpoints PÚBLICOS y
// de solo lectura: acá no viaja ninguna credencial.
//
// Se puede sobreescribir con `PUBLIC_KODI_API_URL` al construir (preview,
// staging). Sin variable, apunta a producción.
export const API_BASE_URL = (
  import.meta.env.PUBLIC_KODI_API_URL ?? 'https://api.holakodi.com'
).replace(/\/$/, '');

/** Términos o privacidad vigentes: `{ data: { doc, version, last_updated, sections } }`. */
export function legalDocumentUrl(doc: 'terms' | 'privacy'): string {
  return `${API_BASE_URL}/v1/public/legal/${doc}`;
}
