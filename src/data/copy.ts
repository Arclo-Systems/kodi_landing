export const COPY = {
  titulo: 'Kodi · ya en Android',
  titular: '¡ya está en android!',
  bajada:
    'Descargala y preparate para COSEVI, Pruebas Estandarizadas y admisión, de una manera diferente.',
  modulos: 'Exámenes',
  redes: 'Redes sociales',
  /**
   * Captura de correo para avisar el día que salga la versión de iPhone.
   * Los mensajes de estado viajan al script como `data-*` del formulario: el
   * copy del sitio vive acá y solo acá, también el que aparece después de
   * apretar el botón.
   */
  lista: {
    titulo: 'Para iPhone falta poquito.',
    bajada: 'Dejanos tu correo y te avisamos apenas esté — es cuestión de días.',
    etiqueta: 'Tu correo electrónico',
    marcador: 'tu@correo.com',
    boton: 'Avisame',
    estados: {
      enviando: 'Enviando…',
      ok: 'Listo, quedaste en la lista.',
      duplicado: 'Ese correo ya estaba en la lista.',
      invalido: 'Ese correo está incompleto.',
      error: 'No se pudo guardar. Probá de nuevo o escribinos a soporte@holakodi.com.',
    },
  },
  // La marca, no la sociedad: la razón social numerada vive en las páginas
  // legales, que es donde es el dato vinculante.
  pie: {
    copyright: '© 2026 Kodi',
    marca: 'Arclo Systems',
    marcaUrl: 'https://www.arclosystems.com/es',
  },
} as const;
