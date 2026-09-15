/**
 * TODO el texto visible de la landing vive acá y solo acá.
 *
 * Por qué: para que el founder pueda leer y corregir la página entera en un
 * archivo, sin abrir una sola plantilla. Ningún `.astro` ni `.tsx` escribe
 * texto suyo.
 *
 * Reglas que no se rompen (spec §2):
 *   · voseo · sin emojis · "EXP", nunca "XP" · "Kodi" sin tilde
 *   · Koko es la mascota; Pixel es el tutor con IA
 *   · NUNCA cantidades de preguntas
 *   · NUNCA garantizar el contenido del examen real: se promete temario y
 *     formato, que es lo que sí podemos sostener
 *   · se describe la MECÁNICA de los modos, nunca quién está del otro lado
 *   · ningún corchete `[...]` puede llegar a producción
 */

/** La URL viva, para que el copy del CTA y el destino no se separen nunca. */
export const URL_PLAY = 'https://play.google.com/store/apps/details?id=com.holakodi.app';

export const COPY = {
  // ─── Metadatos ────────────────────────────────────────────────────────────
  // El título viejo era "Kodi · ya en Android": cero palabras de lo que la
  // gente busca. Este nombra los tres exámenes, que es lo que se teclea en
  // Google.
  titulo: 'Kodi — practicá para el COSEVI, admisión y Pruebas Nacionales',
  descripcion:
    'Practicá tu examen con preguntas hechas desde el material oficial: COSEVI auto y moto, admisión UCR · UNA · TEC y Pruebas Nacionales. Cada error viene con su explicación. Gratis en Android.',

  // ─── Cabecera ─────────────────────────────────────────────────────────────
  nav: {
    examenes: 'Exámenes',
    como: 'Cómo funciona',
    // El botón de la cabecera va DIRECTO a la tienda. Antes hacía scroll al
    // fondo, que es agregar un paso justo cuando la persona ya se decidió.
    descargar: 'Descargar',
  },

  // ─── 1. Hero ──────────────────────────────────────────────────────────────
  // `titular` y `bajada` quedan en la raíz porque los consumen `og.astro` (la
  // imagen que se ve al compartir el enlace) e `Invitacion.astro`. Cambiarles
  // el nombre rompe esas dos páginas.
  // "hasta que te salga" describia el esfuerzo repetido, no el premio. Esta
  // conserva la forma —dos lineas del mismo largo, que es lo que hace que el
  // bloque se vea parejo— y cambia el final por el momento en que el examen
  // deja de dar miedo.
  titular: 'Practicá tu examen hasta que sea fácil',
  bajada:
    'COSEVI auto y moto, admisión UCR · UNA · TEC y Pruebas Nacionales. Preguntas hechas desde el material oficial, cada una con su explicación.',

  hero: {
    ceja: 'Costa Rica · COSEVI · Admisión · Pruebas Nacionales',
    cta: 'Descargar gratis en Google Play',
    // Lo que la ficha de Play declara y la landing callaba. Decirlo acá cuesta
    // una línea; que se descubra al apretar "Instalar" cuesta la instalación.
    microcopy: 'Gratis, con anuncios y compras opcionales.',
    iphone: '¿iPhone? Dejanos tu correo',

    // La pregunta jugable. El texto de alrededor, no la pregunta.
    prueba: {
      invitacion: 'Probá una pregunta de verdad:',
      elegiExamen: 'Elegí tu examen',
      correcto: '¡Correcto!',
      incorrecto: 'Casi',
      exp: '+10 EXP',
      pixel: 'Pixel te explica',
      // Cierre cualitativo: no se puede decir "te quedan N preguntas" porque
      // la landing no muestra cantidades.
      cierre: 'Así es toda la app. Descargala gratis.',
      otra: 'Probá otra',
    },

    // Cuenta regresiva. Sale de `fechas-examenes.ts`; si el examen no tiene
    // fecha confirmada, no se pinta nada.
    cuenta: (dias: number, nombre: string) =>
      dias === 0 ? `Hoy es ${nombre}` : `Faltan ${dias} días para ${nombre}`,
    // COSEVI no lleva cuenta regresiva: la cita la agenda cada persona.
    sinFecha: 'Tu examen es cuando vos lo agendés. Practicá hasta estar listo.',
  },

  // ─── 2. Franja de confianza ───────────────────────────────────────────────
  // Responde "¿quién hizo estas preguntas?", que es la pregunta del adulto que
  // instala y la segunda del estudiante que ya se quemó con un PDF pirata.
  fuentes: {
    titular: 'Con el material oficial, no con apuntes de internet',
    columnas: [
      { examen: 'COSEVI auto y moto', fuente: 'Los manuales nuevos del COSEVI' },
      { examen: 'Admisión', fuente: 'El temario que publican la UCR, la UNA y el TEC' },
      { examen: 'Pruebas Nacionales', fuente: 'El material oficial que publica el MEP' },
    ],
    // El matiz de admisión NO se puede omitir: las universidades publican
    // temario, no banco de preguntas. Decir "preguntas oficiales de admisión"
    // sería falso.
    autoria:
      'Las preguntas las escribe el equipo de contenido de Kodi a partir de ese material: del manual cuando el examen tiene manual, y del temario oficial cuando la universidad publica el temario y no las preguntas. Cada una lleva su explicación.',
    deslinde:
      'Kodi es un producto independiente. No está afiliada ni respaldada por estas instituciones.',
  },

  // ─── 3. Exámenes ──────────────────────────────────────────────────────────
  modulos: 'Exámenes',
  examenes: {
    ceja: 'Exámenes',
    titular: 'Cinco exámenes, el temario completo de cada uno',
    // "el mismo temario y el mismo formato" en vez de "lo que practicás es lo
    // que te van a preguntar", que garantizaba el contenido de un examen
    // estatal que Kodi no administra.
    bajada:
      'Cada módulo se arma con el material oficial vigente: el mismo temario y el mismo formato que el examen real.',
    cta: 'Abrí tu examen en Kodi',
    nuevo: 'nuevo',
  },

  // ─── 4. Cómo funciona ─────────────────────────────────────────────────────
  como: {
    ceja: 'Cómo funciona',
    titular: 'De la primera pregunta al día del examen',
    bajada: 'Cuatro pasos. Diez minutos al día alcanzan.',
    pasos: [
      {
        numero: '01',
        titulo: 'Elegí tu examen',
        texto:
          'COSEVI, admisión o Pruebas Nacionales. Podés llevar más de uno a la vez y cambiar cuando querrás.',
      },
      {
        numero: '02',
        titulo: 'Practicá por tema',
        texto:
          'Preguntas del material oficial, ordenadas por tema. Cada acierto suma EXP y te acerca a la meta del día.',
      },
      {
        numero: '03',
        titulo: 'Pixel te explica el error',
        texto:
          'Respondés mal y en el momento sabés por qué, paso a paso, con la trampa en la que cae casi todo el mundo.',
      },
      {
        numero: '04',
        titulo: 'Medite en la liga',
        // Describe la LIGA, no a los jugadores. La versión anterior decía
        // "competís contra gente de tu mismo examen", que es una afirmación
        // sobre quién está del otro lado.
        texto:
          'Cada semana arranca una liga nueva de tu examen. El domingo, los primeros de la división ascienden y los últimos bajan.',
      },
    ],
    cta: 'Hacé la primera pregunta hoy',
  },

  // ─── 5. Jugá ──────────────────────────────────────────────────────────────
  jugar: {
    ceja: 'Jugá',
    // "volvé cada día" era el objetivo de Kodi, no el del estudiante. Nadie
    // instala una app para volver todos los días; instala para aprobar.
    titular: 'Ligas, racha y Kolones en cada acierto',
    bajada:
      'Kodi no te pide fuerza de voluntad: te pide volver mañana. Una liga cada semana, una racha cada día y Kolones que se canjean.',
    cajas: {
      amigos: {
        titulo: 'Retá a tus amigos',
        texto:
          'Girás la ruleta, cae una materia y respondés. Tres aciertos seguidos y la corona es tuya. O entrá a Arena y empezá a jugar al instante.',
      },
      liga: {
        titulo: 'Una liga cada semana',
        texto:
          'Cada respuesta suma EXP. El domingo, los primeros de tu división ascienden y los últimos bajan. Cuatro divisiones.',
        cabecera: 'Aprendiz',
        cierra: 'Termina en 2 días 20 h',
        zona: 'Zona de ascenso',
        vos: 'vos',
      },
      racha: {
        titulo: 'La racha te sostiene',
        texto:
          'Cumplí la meta del día y la racha sigue viva. Kodi te avisa antes de que se te vaya el día.',
        unidad: 'días de racha',
      },
      kolones: {
        titulo: 'Los Kolones se canjean',
        // La aclaración va en la MISMA frase, no en otra sección: "Kolones"
        // está a una letra de la moneda nacional y el mecanismo se lee como
        // "la app le paga a mi hijo".
        texto:
          'Cada acierto suma Kolones, la moneda de Kodi: no es dinero real. Se juntan y se cambian por cupones que mostrás con un QR en el negocio.',
        // Cupón simulado SIN marca inventada. Lleva la palabra "ejemplo" a la
        // vista: un negocio falso con QR es lo que hace que una página se lea
        // como no terminada.
        ejemplo: 'ejemplo',
        marca: 'Cupón de una marca aliada',
        costo: 'Se canjea con Kolones',
      },
    },
    cta: 'Empezá a sumar EXP hoy',
  },

  // ─── 6. Antes de instalar ─────────────────────────────────────────────────
  // La sección que le habla al papá o la mamá que aprieta "Instalar". Sin
  // ilustración y sin adornos: es información, no venta.
  antes: {
    titular: 'Lo que un papá quiere saber antes',
    puntos: [
      {
        pregunta: '¿Quién hace las preguntas?',
        respuesta:
          'El equipo de contenido de Kodi, a partir del material oficial vigente de cada examen. Cada pregunta lleva su explicación.',
      },
      { pregunta: '¿Desde qué edad?', respuesta: 'Desde los 13 años.' },
      {
        pregunta: '¿Cuánto cuesta?',
        respuesta:
          'La app es gratis. Tiene anuncios y compras opcionales; no hay que pagar nada para estudiar.',
      },
      {
        pregunta: '¿Los Kolones son plata?',
        respuesta:
          'No. Son puntos de la app y se canjean por cupones, nunca por efectivo.',
      },
    ],
    privacidad: 'Leé la política de privacidad',
  },

  // ─── 7. Preguntas frecuentes ──────────────────────────────────────────────
  faq: {
    titular: 'Preguntas que nos hacen siempre',
  },

  // ─── 8. Descargá ──────────────────────────────────────────────────────────
  descarga: {
    // El mejor titular de la página, que antes estaba enterrado al final.
    // Se queda acá porque es el cierre, y el hero ya tiene el suyo.
    titular: ['Estudiá.', 'Competí.', 'Aprobá.'],
    bajada: 'Gratis en Android. Elegí tu examen y hacé la primera pregunta hoy.',
    redes: 'Redes sociales',
  },
  redes: 'Redes sociales',

  // ─── Lista de espera de iPhone ────────────────────────────────────────────
  // La consume `ListaEspera.astro`, que ya pega contra el backend y maneja los
  // cinco estados. Solo cambia el texto.
  lista: {
    // ⚠️ Promesa con fecha de vencimiento: si el 30 de setiembre de 2026 la app
    // de iPhone no salió, esta línea hay que cambiarla ese mismo día.
    titulo: 'Para iPhone, a finales de este mes.',
    bajada: 'Dejanos tu correo y te escribimos el día que salga.',
    etiqueta: 'Tu correo electrónico',
    marcador: 'tu@correo.com',
    boton: 'Avisame',
    // Dice para qué se usa el dato, en el punto donde se pide. Quien deja el
    // correo puede ser menor de edad.
    finalidad: 'Solo lo usamos para avisarte del lanzamiento.',
    estados: {
      enviando: 'Enviando…',
      ok: 'Listo, quedaste en la lista.',
      duplicado: 'Ese correo ya estaba en la lista.',
      invalido: 'Ese correo está incompleto.',
      error: 'No se pudo guardar. Probá de nuevo o escribinos a soporte@holakodi.com.',
    },
  },

  // ─── Puente a empresas y pie ──────────────────────────────────────────────
  // El bloque de empresas sale del cuerpo de la página: interrumpe el camino a
  // la descarga justo antes del cierre, y su vocabulario es de agencia leído
  // por chicos de 17. Queda como un enlace en el pie.
  empresas: {
    enlace: 'Kodi para empresas',
  },

  pie: {
    copyright: '© 2026 Kodi',
    marca: 'Arclo Systems',
    marcaUrl: 'https://www.arclosystems.com/es',
    expansion: 'Hoy en Costa Rica. Pronto, en la región.',
    deslinde:
      'Kodi es un producto independiente de Arclo Systems. No está afiliada ni respaldada por el MOPT, el COSEVI, el MEP, la UCR, la UNA ni el TEC.',
  },
} as const;
