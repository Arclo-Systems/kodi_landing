/**
 * Los países del plan de lanzamiento, tal como están en la tabla
 * `country_rollouts` de producción (leída el 2026-09-15). El orden es el del
 * panel de Lanzamientos: por público anual, de mayor a menor. Costa Rica es el
 * único `live`; el resto está `planned` sin fecha.
 *
 * Si el panel cambia (un país pasa a live, entra uno nuevo), se vuelve a
 * copiar de ahí: esta lista no se inventa ni se reordena a mano.
 */
export interface Pais {
  /** ISO 3166-1 alfa-2, el mismo que usa el panel como insignia. */
  readonly codigo: string;
  readonly nombre: string;
  readonly estado: 'live' | 'planned';
}

export const PAISES: readonly Pais[] = [
  { codigo: 'CO', nombre: 'Colombia', estado: 'planned' },
  { codigo: 'ES', nombre: 'España', estado: 'planned' },
  { codigo: 'EC', nombre: 'Ecuador', estado: 'planned' },
  { codigo: 'PE', nombre: 'Perú', estado: 'planned' },
  { codigo: 'CL', nombre: 'Chile', estado: 'planned' },
  { codigo: 'AR', nombre: 'Argentina', estado: 'planned' },
  { codigo: 'MX', nombre: 'México', estado: 'planned' },
  { codigo: 'GT', nombre: 'Guatemala', estado: 'planned' },
  { codigo: 'DO', nombre: 'R. Dominicana', estado: 'planned' },
  { codigo: 'CR', nombre: 'Costa Rica', estado: 'live' },
  { codigo: 'SV', nombre: 'El Salvador', estado: 'planned' },
  { codigo: 'HN', nombre: 'Honduras', estado: 'planned' },
  { codigo: 'PA', nombre: 'Panamá', estado: 'planned' },
  // Puerto Rico está en `country_rollouts` pero el founder lo dejó fuera de la
  // landing (2026-09-15).
];
