/**
 * Las notas de prensa que hablaron de Kodi, para la sección "Kodi en las
 * noticias" de la home.
 *
 * Reglas de este archivo:
 *   · El titular es el literal de la nota: no se reescribe ni se resume.
 *   · La fecha es la de publicación que muestra el medio, en ISO `AAAA-MM-DD`.
 *   · El orden del arreglo no importa: la sección las ordena por fecha.
 *   · Agregar una nota es agregar un objeto acá; ninguna plantilla cambia.
 */
export interface NotaPrensa {
  readonly medio: string;
  readonly titular: string;
  /** ISO `AAAA-MM-DD`, fecha de publicación de la nota. */
  readonly fecha: string;
  readonly url: string;
}

export const NOTAS: readonly NotaPrensa[] = [
  {
    medio: 'El Financiero',
    titular:
      'Esta app puede ayudarle en sus exámenes de admisión a universidades, de manejo y del MEP',
    fecha: '2026-10-02',
    url: 'https://www.elfinancierocr.com/tecnologia/esta-app-puede-ayudarle-en-sus-examenes-de/3PFRLCUYUZAAHJ3X43TXCPDHRU/story/',
  },
  {
    medio: 'NTG Costa Rica',
    titular:
      'Talento de Tilarán crea Kodi, una aplicación que busca cambiar la forma de estudiar para los exámenes',
    fecha: '2026-09-30',
    url: 'https://ntgcostarica.com/talento-de-tilaran-crea-kodi-una-aplicacion-que-busca-cambiar-la-forma-de-estudiar-para-los-examenes/',
  },
];

/** Las fechas ISO `AAAA-MM-DD` ordenan bien como texto. */
export function notasOrdenadas(notas: readonly NotaPrensa[] = NOTAS): NotaPrensa[] {
  return [...notas].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

// `timeZone: 'UTC'` porque `new Date('AAAA-MM-DD')` es medianoche UTC: sin
// esto, en hora de Costa Rica la fecha sale un día antes.
export function fechaLegible(iso: string): string {
  return new Intl.DateTimeFormat('es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));
}
