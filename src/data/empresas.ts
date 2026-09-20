/**
 * La propuesta para marcas que quieran estar dentro de Kodi.
 *
 * Las tres formas de aparecer no son inventadas: son las que el producto ya
 * soporta —cupones con sucursales en el mapa, premios de temporada y video
 * patrocinado—, así que lo que se ofrece acá es lo que hoy se puede entregar.
 */
export const EMPRESAS = {
  titulo: 'Tu marca, donde los estudiantes ya están.',
  bajada:
    'Kodi es donde se preparan para el examen teórico de manejo, la admisión universitaria y las pruebas nacionales. Vuelven todos los días, por su cuenta, porque les importa el resultado.',

  porQue: {
    titulo: 'Por qué acá',
    puntos: [
      {
        titulo: 'Vuelven solos',
        texto:
          'La racha, las ligas semanales y los duelos hacen que estudiar se sostenga durante semanas. No es una visita: es un hábito diario.',
      },
      {
        titulo: 'Se lo ganaron',
        texto:
          'Los beneficios no se regalan ni se compran: se canjean con la moneda que se gana practicando. Tu marca llega como premio, no como anuncio.',
      },
      {
        titulo: 'Momento que importa',
        texto:
          'Están sacando la licencia o entrando a la universidad. Dos decisiones que abren muchas otras, y vos estás ahí cuando pasan.',
      },
    ],
  },

  /* Reusa la sección de la home: la misma secuencia pegada con el teléfono.
     Las pantallas todavía son las de la home; las propias se arman después. */
  formas: {
    titular: 'Tres formas de estar adentro',
    // La de cupones ya tiene su pantalla en la app. Las otras dos muestran una
    // de la home mientras se arman las suyas.
    pantallas: ['beneficios', 'liga', 'racha'],
    bajada: 'Todas existen hoy en el producto. No hay que construir nada para que tu marca aparezca.',
    pasos: [
      {
        numero: '01',
        titulo: 'Cupones en Beneficios',
        texto:
          'Tu descuento aparece en la sección que se abre desde el menú principal, con tus sucursales en el mapa. Se canjea en el punto de venta, así que la visita es real.',
        ficha: {
          rotulo: 'Beneficios',
          dato: 'Canje en tienda',
          detalle: 'Con tus sucursales en el mapa',
        },
        pastilla: 'Se canjea en tu local',
      },
      {
        numero: '02',
        titulo: 'Premios de temporada',
        texto:
          'Cada mes se premia a quienes terminan arriba en su liga. El premio lo ponés vos y lleva tu nombre en las bases oficiales.',
        ficha: {
          rotulo: 'Premiaciones',
          dato: 'Una por mes',
          detalle: 'Tu marca en las bases oficiales',
        },
        pastilla: 'Tu premio, su meta',
      },
      {
        numero: '03',
        titulo: 'Video patrocinado',
        texto:
          'El video que desbloquea práctica. Se ve completo, por decisión de quien lo mira, a cambio de algo que quiere.',
        ficha: {
          rotulo: 'Video',
          dato: 'Visto entero',
          detalle: 'Lo elige quien lo mira',
        },
        pastilla: 'Nadie lo saltea',
      },
    ],
  },

  cierre: {
    titulo: '¿Hablamos?',
    texto:
      'Contanos qué marca representás y qué te gustaría lograr. Respondemos en 24 a 48 horas hábiles.',
    boton: 'Escribinos',
    // TODO: decidir si la conversión queda en correo, WhatsApp o un formulario
    // contra el backend. Por ahora entra al buzón que ya existe y se atiende.
    correo: 'soporte@holakodi.com',
    asunto: 'Kodi para empresas',
  },
} as const;
