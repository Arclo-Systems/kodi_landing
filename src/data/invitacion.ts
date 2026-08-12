/**
 * Copy de las dos páginas de aterrizaje que ve alguien SIN la app instalada
 * cuando le comparten un enlace de Kodi:
 *
 *   holakodi.com/u/<código>  → perfil compartido   → /invitacion-perfil
 *   holakodi.com/r/<código>  → invitación de un amigo → /invitacion
 *
 * Las rutas reales las resuelve `vercel.json` con rewrites (ver
 * docs/enlaces-universales.md). Los dos enlaces llevan el mismo formato de
 * código (`KODI-` + 6 caracteres), que la página rescata de la URL.
 */
export interface CopyInvitacion {
  /** <title> y meta description de la página. */
  readonly titulo: string;
  readonly descripcion: string;
  readonly titular: string;
  readonly bajada: string;
  /**
   * Textos del código que viene en la URL. El bloque solo aparece si la URL
   * traía un código con el formato válido, así que lo que se diga acá no puede
   * dar por sentado que el resto de la página lo menciona.
   */
  readonly codigo: {
    readonly rotulo: string;
    readonly nota: string;
  };
}

export const INVITACION_PERFIL: CopyInvitacion = {
  titulo: 'Te compartieron un perfil de Kodi',
  descripcion:
    'Alguien te compartió su perfil de Kodi, la app que te prepara para tus exámenes de una manera diferente.',
  titular: 'te compartieron un perfil',
  bajada:
    'Alguien quiere que veás cómo le va estudiando. Los perfiles se ven adentro de la app, y todavía la estamos terminando.',
  codigo: {
    rotulo: 'Código de este perfil',
    nota: 'Con este código se busca el perfil adentro de la app.',
  },
};

export const INVITACION_REFERIDO: CopyInvitacion = {
  titulo: 'Te invitaron a Kodi',
  descripcion:
    'Te invitaron a Kodi, la app que te prepara para tus exámenes de una manera diferente.',
  titular: 'te invitaron a kodi',
  bajada:
    'Alguien que ya está estudiando con Kodi se acordó de vos. Todavía estamos terminando la app, pero falta poco.',
  codigo: {
    rotulo: 'Código de invitación',
    nota: 'Guardalo para tenerlo a mano.',
  },
};

export const PITCH = {
  rotulo: 'Qué es Kodi',
  puntos: [
    'Practicás con preguntas de verdad, en ratos cortos.',
    'Competís en ligas, sumás rachas y ganás premios.',
    'Sabés en qué vas bien y en qué te falta, sin adivinar.',
  ],
} as const;
