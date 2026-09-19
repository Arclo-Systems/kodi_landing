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

import { SOCIAL } from './social';

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

  // ─── Manifiesto ────────────────────────────────────────────────────────────
  // Un solo párrafo que se enciende palabra por palabra con el scroll. Es el
  // único lugar de la página donde Kodi dice para qué existe, así que va en
  // primera persona del producto y sin listas.
  //
  // Largo: entre 180 y 260 caracteres. Por debajo, la animación no alcanza a
  // notarse; por encima, la última línea queda apagada cuando ya pasaste.
  //
  // El tema es la desigualdad, no las funciones del producto: prepararse bien
  // cuesta plata y un examen decide demasiado. Lo que hace Kodi se cuenta en
  // las otras secciones; acá se dice por qué existe.
  //
  // El remate va al final a propósito. Como las palabras se encienden en
  // orden, la última frase se lee cuando el resto ya está prendido, y es la
  // que tiene que quedar.
  manifiesto:
    'Prepararse bien casi siempre cuesta: cursos, tutores, material. Y un examen puede decidir lo que viene después. Kodi nació para cambiar eso: que aprobar dependa de cuántas ganas le ponés, no de cuánto podés pagar.',

  // ─── Planes ────────────────────────────────────────────────────────────────
  // ⚠️ TODOS los montos salen de producción (tablas `subscription_prices` y
  // `promo_offer_prices`), leídos el 2026-09-15. Son los de Costa Rica para UN
  // examen: es el caso del estudiante que prepara un solo examen, y el más
  // barato de cada plan. Los packs de hasta cuatro se mencionan en la letra
  // chica, no se listan: cuatro planes por tres períodos por cuatro tamaños son
  // cuarenta y ocho números, y esta página vende, no cotiza.
  //
  // Los beneficios son el copy literal de la app (`plansData.ts`), no un
  // resumen: si cambian allá, cambian acá.
  //
  // Lo que NO se muestra y es decisión pendiente del founder: la Oferta
  // Fundador (precio congelado, 300 cupos). Los cupos se agotan y esta página
  // es estática, así que anunciarlos sin dato en vivo es prometer algo que
  // puede ya no existir.
  precios: {
    // El sujeto se cae a propósito: en la sección de precios ya se sabe de qué
    // se está hablando, y la comparación es lo único que tiene que quedar.
    titular: 'Menos que una hora de tutor',
    bajada:
      'Todos los planes abren el examen completo. Vas subiendo cuando querés simulacros, ruta de estudio o que Pixel te explique cada error.',
    etiquetaSelector: 'Cada cuánto pagás',
    insignia: 'Recomendado',
    moneda: '₡',
    // `meses` no es decoración: con él la sección calcula el ahorro de cada
    // período contra el mensual, igual que la app. Una tabla de porcentajes
    // fija queda mintiendo en cuanto se toca un precio.
    periodos: [
      { id: 'mes', etiqueta: 'Mensual', meses: 1 },
      { id: 'trimestre', etiqueta: 'Trimestral', meses: 3 },
      { id: 'anio', etiqueta: 'Anual', meses: 12 },
    ],
    planes: [
      {
        nombre: 'Free',
        resumen: 'Probá el examen sin pagar nada.',
        gratis: true,
        destacado: false,
        precios: {
          mes: { monto: 'Gratis', unidad: '', nota: 'Para siempre' },
          trimestre: { monto: 'Gratis', unidad: '', nota: 'Para siempre' },
          anio: { monto: 'Gratis', unidad: '', nota: 'Para siempre' },
        },
        incluye: [
          'Práctica diaria',
          'Rankings y ligas',
          'Partida Kodi 1v1',
          'Arena de Supervivencia',
          'Estadísticas básicas',
        ],
        cta: 'Descargar gratis',
        href: URL_PLAY,
      },
      {
        nombre: 'Básico',
        resumen: 'Empezá a prepararte.',
        gratis: false,
        destacado: false,
        precios: {
          mes: { monto: '2.500', unidad: '/ mes', nota: 'Se cobra cada mes' },
          trimestre: { monto: '6.000', unidad: '/ trimestre', nota: 'Se cobra cada tres meses' },
          anio: { monto: '18.000', unidad: '/ año', nota: 'Se cobra una vez al año' },
        },
        incluye: [
          'Práctica ilimitada',
          'Modos rápidos ilimitados',
          'Partida Kodi ilimitada',
          'Sin publicidad',
        ],
        cta: 'Empezar con Básico',
        href: URL_PLAY,
      },
      {
        nombre: 'Plus',
        resumen: 'Preparación seria.',
        gratis: false,
        destacado: true,
        precios: {
          mes: { monto: '4.500', unidad: '/ mes', nota: 'Se cobra cada mes' },
          trimestre: { monto: '10.800', unidad: '/ trimestre', nota: 'Se cobra cada tres meses' },
          anio: { monto: '32.400', unidad: '/ año', nota: 'Se cobra una vez al año' },
        },
        incluye: [
          'Simulacros completos',
          'Ruta de estudio adaptativa',
          'Examen sorpresa',
          'Todo lo de Básico',
          // Verificado en producción: la prueba existe SOLO en Plus, dura siete
          // días y se puede usar una vez por examen.
          'Siete días de prueba gratis',
        ],
        cta: 'Empezar con Plus',
        href: URL_PLAY,
      },
      {
        nombre: 'Pro',
        resumen: 'Todo incluido.',
        gratis: false,
        destacado: false,
        precios: {
          mes: { monto: '7.000', unidad: '/ mes', nota: 'Se cobra cada mes' },
          trimestre: { monto: '16.800', unidad: '/ trimestre', nota: 'Se cobra cada tres meses' },
          anio: { monto: '50.400', unidad: '/ año', nota: 'Se cobra una vez al año' },
        },
        incluye: [
          'Plan de estudio',
          'Profesor IA personal',
          'Predictor de nota',
          'Todo lo de Plus',
        ],
        cta: 'Empezar con Pro',
        href: URL_PLAY,
      },
    ],
    // Las dos primeras frases son las condiciones reales de compra, tomadas de
    // la hoja de términos de la app.
    legal:
      'Precios en colones, por un examen. Con dos o más exámenes en el mismo plan el precio por examen baja. Los pagos los procesa la tienda, no Kodi, y cancelás cuando querrás: mantenés el acceso hasta el final del período que ya pagaste.',
  },

  hero: {
    cta: 'Descargar gratis en Google Play',
    // Lo que la ficha de Play declara y la landing callaba. Decirlo acá cuesta
    // una línea; que se descubra al apretar "Instalar" cuesta la instalación.
    microcopy: 'Gratis, con anuncios y compras opcionales.',
    iphone: '¿iPhone? Dejanos tu correo',
  },

  // ─── 2. Franja de confianza ───────────────────────────────────────────────
  // Responde "¿quién hizo estas preguntas?", que es la pregunta del adulto que
  // instala y la segunda del estudiante que ya se quemó con un PDF pirata.
  fuentes: {
    titular: 'Con el material oficial, no con apuntes de internet',
    columnas: [
      { examen: 'COSEVI', fuente: 'Los manuales nuevos de auto y moto' },
      { examen: 'Admisión', fuente: 'El temario que publican las universidades' },
      { examen: 'Pruebas Nacionales', fuente: 'El material oficial que publica el MEP' },
    ],
    // Se dice quién las escribe y de qué material: ninguna institución publica
    // su banco de preguntas y llamarlas "oficiales" sería falso.
    autoria:
      'Las preguntas las escribe el equipo de contenido de Kodi con ese material: el manual del COSEVI, el temario que publican las universidades y el que publica el MEP. Mismo temario y mismo formato que el examen real, con la explicación de cada respuesta.',
    deslinde:
      'Kodi es un producto independiente. No está afiliada ni respaldada por estas instituciones.',
  },

  // ─── 3. Exámenes ──────────────────────────────────────────────────────────
  modulos: 'Exámenes',
  examenes: {
    titular: 'Cinco exámenes, el temario completo de cada uno',
    // "el mismo temario y el mismo formato" en vez de "lo que practicás es lo
    // que te van a preguntar", que garantizaba el contenido de un examen
    // estatal que Kodi no administra.
    bajada:
      'Cada módulo se arma con el material oficial vigente: el mismo temario y el mismo formato que el examen real.',
  },

  // ─── 4. Cómo funciona ─────────────────────────────────────────────────────
  como: {
    // No es un recorrido de principio a fin: son seis funciones sueltas de la
    // app. El titular anterior ("De la primera pregunta al día del examen")
    // prometía una secuencia que estas pantallas no cuentan.
    titular: 'No es solo responder preguntas',
    bajada:
      'Estas seis son una muestra de lo que trae Kodi: practicar, entender por qué fallaste, jugar con amigos, competir cada semana y llevarte algo por hacerlo.',
    // Cada paso lleva, además del texto, la ficha que aparece al lado del
    // teléfono. `rotulo` es el título chico de la ficha, `dato` la línea
    // fuerte, `detalle` la de abajo, y `pastilla` el chip suelto.
    // El orden y los títulos son los de las seis capturas de la ficha de Play,
    // que el founder ya aprobó. Cada paso describe LO QUE SE VE en su pantalla,
    // no una función suelta.
    pasos: [
      {
        numero: '01',
        titulo: 'Aprobá sin quemarte',
        texto:
          'No hace falta encerrarse a estudiar. Diez minutos al día, ordenados por tema, y llegás listo sin haber sufrido.',
        ficha: {
          rotulo: 'Hoy',
          dato: 'Tu meta del día',
          detalle: 'Un poco todos los días, no todo la noche antes',
        },
        pastilla: 'Diez minutos alcanzan',
      },
      {
        numero: '02',
        // NO nombra a Pixel: esta es la explicación que trae CADA pregunta, y
        // la tienen todos los planes. Pixel es el tutor con IA y es de Pro.
        titulo: 'Fallá, entendé, aprobá',
        texto:
          'Respondés mal y en el momento sabés por qué. La explicación viene con la pregunta: no hay que pedirla ni buscarla.',
        ficha: {
          rotulo: 'Explicación',
          dato: 'Por qué esta y no la otra',
          detalle: 'Escrita junto con la pregunta',
        },
        pastilla: 'En el momento, no después',
      },
      {
        numero: '03',
        titulo: 'Retá a tus amigos',
        // Partida Kodi es POR TURNOS, no contrarreloj: el turno dura horas y
        // cada quien responde cuando puede. Los modos con reloj son otros.
        texto:
          'Elegís a un amigo y juegan uno contra uno, materia por materia. No hay que coincidir: cada quien responde cuando puede.',
        ficha: {
          rotulo: 'Partida Kodi',
          dato: 'Uno contra uno',
          detalle: 'Materia por materia',
        },
        pastilla: 'Sin tener que coincidir',
      },
      {
        numero: '04',
        titulo: 'Subí de liga cada semana',
        texto:
          'Cada semana arranca una liga nueva de tu examen. El domingo, los primeros de la división ascienden y los últimos bajan.',
        ficha: {
          rotulo: 'Liga',
          dato: 'Arranca de nuevo cada lunes',
          detalle: 'Los primeros suben, los últimos bajan',
        },
        pastilla: 'Tu EXP te sube o te baja',
      },
      {
        numero: '05',
        titulo: 'No rompás la racha',
        // Verificado en la app: un protector gratis por semana, que se renueva
        // los lunes.
        texto:
          'Cada día que practicás suma a la racha. Si un día no podés, tenés un protector gratis por semana.',
        ficha: {
          rotulo: 'Racha',
          dato: 'Un día a la vez',
          detalle: 'Un protector gratis cada semana',
        },
        pastilla: 'Se corta si faltás un día',
      },
      {
        numero: '06',
        titulo: 'Estudiar tiene premio',
        // Los Kolones NO se pagan por acierto suelto: salen de cumplir las
        // misiones del día y de sostener la racha. Y las misiones se cumplen
        // justamente practicando y jugando, así que la frase las agrupa sin
        // prometer que cada respuesta pague.
        texto:
          'Practicás, jugás, cumplís las misiones del día: todo eso te deja Kolones. Se juntan y se cambian por cupones que mostrás en el negocio.',
        ficha: {
          rotulo: 'Kolones',
          dato: 'No son plata de verdad',
          detalle: 'Se cambian por cupones',
        },
        pastilla: 'Se canjean en el negocio',
      },
    ],
  },

  // ─── Países ───────────────────────────────────────────────────────────────
  // Los países viven en `paises.ts` (copia de `country_rollouts`); acá solo el
  // encabezado y los dos rótulos de estado. BORRADOR: el founder afina el copy.
  paises: {
    titular: 'Pronto en más países',
    bajada: 'Kodi ya está en Costa Rica. Estos son los que siguen.',
    disponible: 'Disponible',
    pronto: 'Muy pronto',
  },

  // ─── 7. Preguntas frecuentes ──────────────────────────────────────────────
  faq: {
    titular: 'Preguntas que nos hacen siempre',
    // Las preguntas viven en `faq.ts`, no acá: las consume también el bloque de
    // datos estructurados que lee Google.
    bajada: 'Si te queda otra, escribinos a',
    correo: 'soporte@holakodi.com',
  },

  // ─── 8. Descargá ──────────────────────────────────────────────────────────
  descarga: {
    // El mejor titular de la página, que antes estaba enterrado al final.
    // Se queda acá porque es el cierre, y el hero ya tiene el suyo.
    titular: ['Estudiá.', 'Competí.', 'Aprobá.'],
    // Dos líneas llenas a 28rem: la versión corta dejaba "hoy." colgando solo
    // en la segunda.
    bajada:
      'Gratis en Android. Elegí tu examen entre los cinco que hay, hacé la primera pregunta hoy y empezá a ver cuánto te falta.',
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
  empresas: {},

  pie: {
    copyright: '© 2026 Kodi',
    marca: 'Arclo Systems',
    marcaUrl: 'https://www.arclosystems.com/es',
    expansion: 'Hoy en Costa Rica. Pronto, en la región.',
    // El deslinde de no afiliación con MOPT, COSEVI, MEP, UCR, UNA y TEC se
    // quitó del pie por decisión del founder el 2026-09-15. El texto sigue en
    // el spec (§4.9) por si hay que volver a ponerlo.

    // Lo que acompaña al logotipo en la columna de la izquierda. Dos líneas
    // como mucho: la columna mide 20rem y abajo va el botón.
    frase: 'Practicá para tu examen desde el teléfono, con preguntas hechas del material oficial.',

    // Cuatro columnas de enlaces. `href` en `null` significa que el destino
    // todavía no existe: se dibuja el rótulo apagado y sin enlace, porque un
    // enlace muerto en el pie es peor que no ofrecerlo.
    columnas: [
      {
        titulo: 'Producto',
        enlaces: [
          { texto: 'Exámenes', href: '/#examenes' },
          { texto: 'Cómo funciona', href: '/#como' },
          { texto: 'Descargar', href: URL_PLAY },
        ],
      },
      {
        titulo: 'Kodi',
        enlaces: [
          { texto: 'Kodi para empresas', href: null },
          { texto: 'Soporte', href: 'mailto:soporte@holakodi.com' },
          { texto: 'Arclo Systems', href: 'https://www.arclosystems.com/es' },
        ],
      },
      {
        titulo: 'Legal',
        enlaces: [
          { texto: 'Términos de uso', href: '/terminos' },
          { texto: 'Política de privacidad', href: '/privacidad' },
          { texto: 'Bases de premiaciones', href: '/bases' },
          { texto: 'Eliminar cuenta', href: '/eliminar-cuenta' },
        ],
      },
      {
        titulo: 'Redes',
        enlaces: [
          { texto: 'Instagram', href: SOCIAL.instagram.href },
          { texto: 'TikTok', href: SOCIAL.tiktok.href },
          { texto: 'Facebook', href: SOCIAL.facebook.href },
          { texto: 'WhatsApp', href: SOCIAL.whatsapp.href },
        ],
      },
    ],
  },
} as const;
