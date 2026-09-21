import type { ModuloSlug } from './modulos';

/**
 * Una página por examen. Lo que hay acá se publica: son las páginas que
 * responden lo que la gente teclea en Google ("cuántas preguntas trae el examen
 * del COSEVI", "temario admisión UCR") y que hoy no existen.
 *
 * Reglas que NO se rompen:
 *
 * · Cantidades del banco, NUNCA. Decisión del founder del 2026-09-14: la
 *   landing no dice cuántas preguntas tiene Kodi en ninguna parte. La prueba de
 *   que el contenido es serio es la fuente oficial, no un número que envejece.
 * · Nota de aprobación, tampoco. `modules.approvalThreshold` vale 70 en
 *   producción, pero ese valor no viene de una ficha oficial: el COSEVI no la
 *   publica. Preguntas y minutos sí están verificados y ya salen en la home.
 * · Las materias son las de `subjects` en producción, en su orden. Si el panel
 *   cambia una, se vuelve a copiar.
 */

interface Pregunta {
  readonly pregunta: string;
  readonly respuesta: string;
}

export interface PaginaExamen {
  /** La URL, sin barra: `/cosevi-auto`. */
  readonly slug: string;
  /** El módulo del que salen las materias, para poder verificarlas contra la base. */
  readonly modulo: ModuloSlug;
  readonly title: string;
  readonly description: string;
  readonly h1: string;
  /** Dos o tres frases: qué es el examen y para qué sirve la página. */
  readonly entrada: string;
  readonly preguntas: number;
  readonly minutos: number;
  /** Cómo se llama el examen en la vida real, para el bloque de formato. */
  readonly comoLeLlaman: string;
  readonly materias: readonly string[];
  /** Qué mira el examen, en palabras. No es la lista de materias otra vez. */
  readonly deQueVa: string;
  readonly faq: readonly Pregunta[];
}

export const PAGINAS_EXAMEN: readonly PaginaExamen[] = [
  {
    slug: 'cosevi-auto',
    modulo: 'cosevi_auto',
    title: 'Examen teórico del COSEVI: cómo es y cómo practicarlo',
    description:
      'Cuántas preguntas trae el examen teórico de conducir en Costa Rica, cuánto dura y qué temas entran. Practicá con preguntas hechas desde el manual oficial.',
    h1: 'El examen teórico del COSEVI, para licencia de automóvil',
    entrada:
      'Es la prueba escrita que hay que aprobar antes del examen práctico para sacar la licencia B-1. Se hace en la sede del COSEVI o en una oficina autorizada, en computadora, y el resultado sale al terminar. Acá está cómo es, qué entra y de dónde salen las preguntas con las que podés practicar.',
    preguntas: 40,
    minutos: 50,
    comoLeLlaman: 'el teórico',
    materias: [
      'Fundamentos de Tránsito',
      'Legislación de Tránsito',
      'Señales de Tránsito',
      'Normas de Circulación',
      'Factor Humano',
      'Seguridad Vial',
      'Rotondas',
      'Primeros Auxilios',
      'Conducción Técnica',
    ],
    deQueVa:
      'No mide si sabés manejar: mide si conocés las reglas. Las señales son la parte más grande, y después pesan la ley de tránsito, las normas de circulación y lo que hay que hacer ante un accidente.',
    faq: [
      {
        pregunta: '¿Cuántas preguntas trae el examen teórico del COSEVI?',
        respuesta:
          'Cuarenta preguntas de selección única, con cincuenta minutos para resolverlas. Son poco más de un minuto por pregunta, así que conviene llegar reconociendo las señales sin tener que pensarlas.',
      },
      {
        pregunta: '¿De dónde salen las preguntas?',
        respuesta:
          'Del manual de educación vial que publica el COSEVI. Las de Kodi están escritas desde ese mismo material, y cada una lleva la explicación de por qué la respuesta correcta es la correcta.',
      },
      {
        pregunta: '¿Qué pasa si lo pierdo?',
        respuesta:
          'Se puede repetir. Hay que pedir una cita nueva y pagar otra vez el trámite, así que sale más barato llegar practicado.',
      },
      {
        pregunta: '¿El examen de moto es el mismo?',
        respuesta:
          'El formato es igual —cuarenta preguntas en cincuenta minutos— pero el temario cambia: la moto tiene sus propios contenidos de equipo de protección, controles y manejo.',
      },
    ],
  },
  {
    slug: 'cosevi-moto',
    modulo: 'cosevi_moto',
    title: 'Examen teórico de moto del COSEVI: cómo es y qué entra',
    description:
      'Cuántas preguntas trae el examen teórico para licencia de motocicleta en Costa Rica, cuánto dura y qué temas cubre. Practicá con preguntas del material oficial.',
    h1: 'El examen teórico del COSEVI, para licencia de motocicleta',
    entrada:
      'Es la prueba escrita para la licencia A. Tiene el mismo formato que la de automóvil, pero el temario es otro: entra todo lo que es propio de andar en moto, del equipo de protección al mantenimiento.',
    preguntas: 40,
    minutos: 50,
    comoLeLlaman: 'el teórico de moto',
    materias: [
      'Seguridad Vial',
      'Entorno Vial',
      'Licencia y Documentos',
      'Señales de Tránsito',
      'Controles y Sistemas',
      'Mantenimiento Mecánico',
      'Manejo de Moto',
      'Equipo de Protección',
      'Riesgos y Emergencias',
      'Sanciones y Multas',
    ],
    deQueVa:
      'Además de las señales y la ley, pregunta lo que solo aplica a la moto: qué equipo es obligatorio, cómo responden los frenos, qué revisar antes de salir y cómo se toma una curva.',
    faq: [
      {
        pregunta: '¿El examen de moto es distinto al de carro?',
        respuesta:
          'El formato es el mismo, cuarenta preguntas en cincuenta minutos, pero el contenido es propio: equipo de protección, controles de la moto, mantenimiento y maniobras.',
      },
      {
        pregunta: '¿Sirve el manual del automóvil para estudiar?',
        respuesta:
          'Solo en parte. Las señales y la legislación se comparten, pero el COSEVI publica un manual de motocicleta aparte, y de ahí sale lo que no está en el otro.',
      },
      {
        pregunta: '¿Puedo tener las dos licencias?',
        respuesta:
          'Sí, pero cada una lleva su propio examen teórico y su propio práctico.',
      },
    ],
  },
  {
    slug: 'admision-ucr',
    modulo: 'paa',
    title: 'Prueba de Aptitud Académica UCR y UNA: cómo es y cómo practicar',
    description:
      'Cuántas preguntas trae la PAA de la UCR y la UNA, cuánto dura y qué evalúa. Practicá razonamiento verbal y matemático con explicación en cada respuesta.',
    h1: 'La Prueba de Aptitud Académica de la UCR y la UNA',
    entrada:
      'La UCR y la UNA aplican la misma prueba: un solo examen sirve para las dos. No pregunta materia de colegio, mide razonamiento, y por eso no se estudia de memoria: se practica.',
    preguntas: 45,
    minutos: 110,
    comoLeLlaman: 'la PAA',
    materias: ['Razonamiento Verbal', 'Razonamiento Matemático', 'Razonamiento Lógico'],
    deQueVa:
      'Mide cómo pensás, no cuánto memorizaste. La parte verbal trabaja con lectura y relaciones entre palabras; la matemática, con problemas que se resuelven razonando más que calculando; y la lógica, con series y deducciones que no piden ninguna fórmula.',
    faq: [
      {
        pregunta: '¿La UCR y la UNA hacen el mismo examen?',
        respuesta:
          'Sí. Es el mismo instrumento y la misma aplicación, así que con una sola prueba quedás en el proceso de las dos universidades.',
      },
      {
        pregunta: '¿Cuántas preguntas trae la PAA?',
        respuesta:
          'Cuarenta y cinco preguntas, con ciento diez minutos. Desde 2025 son esas cifras: antes eran cincuenta preguntas en ciento veinte minutos.',
      },
      {
        pregunta: '¿Se puede estudiar para la PAA?',
        respuesta:
          'No hay temario que memorizar, pero sí se puede entrenar. Lo que mejora el puntaje es reconocer los tipos de pregunta y acostumbrarse al tiempo por ítem.',
      },
      {
        pregunta: '¿El examen del TEC es el mismo?',
        respuesta:
          'No. El TEC tiene su propia prueba, más larga: setenta preguntas en tres horas, y se inscribe aparte.',
      },
    ],
  },
  {
    slug: 'admision-tec',
    modulo: 'paa',
    title: 'Examen de admisión del TEC: cuántas preguntas trae y cómo es',
    description:
      'Cómo es el examen de admisión del Tecnológico de Costa Rica: cuántas preguntas, cuánto dura y qué evalúa. Practicá con explicación en cada respuesta.',
    h1: 'El examen de admisión del TEC',
    entrada:
      'El Tecnológico aplica su propia prueba, aparte de la que comparten la UCR y la UNA. Es más larga que la PAA y reparte el peso entre la parte matemática y la verbal.',
    preguntas: 70,
    minutos: 180,
    comoLeLlaman: 'el examen del TEC',
    // Dos, no tres: el TEC no evalúa razonamiento lógico. En el orden del panel.
    materias: ['Razonamiento Verbal', 'Razonamiento Matemático'],
    deQueVa:
      'De las setenta preguntas, cuarenta y cuatro son de razonamiento matemático y veintiséis de verbal. Esa proporción es la diferencia más grande con la PAA: acá la matemática pesa bastante más.',
    faq: [
      {
        pregunta: '¿Cuántas preguntas trae el examen del TEC?',
        respuesta:
          'Setenta preguntas en tres horas: cuarenta y cuatro de razonamiento matemático y veintiséis de razonamiento verbal.',
      },
      {
        pregunta: '¿Puedo hacer el del TEC y la PAA?',
        respuesta:
          'Sí, son procesos separados y muchas personas hacen los dos. Cada uno tiene su inscripción y su fecha.',
      },
      {
        pregunta: '¿En qué se diferencia de la PAA?',
        respuesta:
          'Es más larga y carga más la parte matemática. Además la PAA evalúa razonamiento lógico y el examen del TEC no: acá son solo verbal y matemático.',
      },
    ],
  },
  {
    slug: 'pruebas-nacionales',
    modulo: 'estandarizada_secundaria',
    title: 'Pruebas Nacionales Estandarizadas: cómo son y qué entra',
    description:
      'Cuántas preguntas traen las Pruebas Nacionales del MEP, cuánto duran y qué materias evalúan en primaria y en secundaria. Practicá con explicación en cada respuesta.',
    h1: 'Las Pruebas Nacionales Estandarizadas del MEP',
    entrada:
      'Son las pruebas que aplica el MEP a sexto de primaria y a quinto de secundaria. Desde 2026 son sesenta preguntas por materia, con dos horas de aplicación.',
    preguntas: 60,
    minutos: 120,
    comoLeLlaman: 'las Pruebas Nacionales',
    // En el orden del panel. Cívica es la que solo entra en secundaria.
    materias: ['Estudios Sociales', 'Matemáticas', 'Ciencias', 'Español', 'Cívica'],
    deQueVa:
      'Evalúan lo que se vio en clase, materia por materia. En secundaria entra además Cívica, que en primaria no se aplica.',
    faq: [
      {
        pregunta: '¿Cuántas preguntas traen las Pruebas Nacionales?',
        respuesta:
          'Desde 2026 son sesenta ítems por materia. El conteo cambió varias veces en años anteriores, así que conviene confirmarlo con la circular del año.',
      },
      {
        pregunta: '¿Qué materias entran?',
        respuesta:
          'Español, Matemáticas, Ciencias y Estudios Sociales en los dos niveles. En secundaria se suma Cívica.',
      },
      {
        pregunta: '¿Son iguales en primaria y en secundaria?',
        respuesta:
          'El formato es el mismo, pero el contenido corresponde al nivel: sexto de primaria y quinto de secundaria tienen sus propios programas.',
      },
    ],
  },
];

export const paginaDe = (slug: string): PaginaExamen | undefined =>
  PAGINAS_EXAMEN.find((pagina) => pagina.slug === slug);
