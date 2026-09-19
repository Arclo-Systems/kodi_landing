/**
 * Las preguntas frecuentes de la landing.
 *
 * NO son las mismas que las de la app (`frontend/app/(tabs)/perfil/ayuda.tsx`,
 * ocho preguntas). Aquellas son de soporte para quien ya instaló: cómo
 * funcionan las ligas, cómo proteger la racha, qué hacer si falló un pago. Acá
 * el que lee todavía no descargó nada, así que las dudas son otras: si le
 * sirve, si puede confiar, y qué le va a costar.
 *
 * Reglas de este archivo:
 *   · Ninguna respuesta promete una fecha que no esté confirmada.
 *   · Ninguna respuesta dice cantidades de preguntas.
 *   · Si un dato cambia en producción, cambia acá: no se adivina.
 */
export interface ItemFaq {
  readonly id: string;
  readonly pregunta: string;
  readonly respuesta: string;
}

export const FAQ: readonly ItemFaq[] = [
  {
    id: 'sin-internet',
    pregunta: '¿Funciona sin internet?',
    // Sin fecha a propósito: prometer un mes concreto para algo que todavía no
    // está construido es la clase de promesa que después hay que borrar.
    respuesta:
      'Por ahora no: necesitás conexión para practicar. Estamos trabajando en que se pueda sin internet.',
  },
  {
    id: 'quien-escribe',
    pregunta: '¿Quién hace las preguntas?',
    // El matiz de admisión NO se puede omitir: la UCR, la UNA y el TEC
    // publican temario, no banco de preguntas. Decir "preguntas oficiales de
    // admisión" sería falso.
    respuesta:
      'El equipo de contenido de Kodi, a partir del material oficial de cada examen: los manuales del COSEVI, el material que publica el MEP para las Pruebas Nacionales, y el temario de la UCR, la UNA y el TEC. Las universidades publican temario y no preguntas, así que las de admisión las escribimos nosotros desde ese temario. Cada una lleva su explicación.',
  },
  {
    id: 'iphone',
    pregunta: '¿Cuándo sale para iPhone?',
    // ⚠️ Vence el 30 de setiembre de 2026. Si ese día la app no salió, esta
    // línea se cambia el mismo día.
    respuesta:
      'A finales de este mes. Dejanos tu correo en la sección de descarga y te escribimos el día que salga.',
  },
  {
    id: 'auto-moto',
    pregunta: 'Si ya tengo licencia de auto, ¿me sirve para moto?',
    respuesta:
      'Son dos exámenes distintos: la prueba A1 tiene sus propias preguntas, sus propias señales y su propio manual. En Kodi son dos módulos separados.',
  },
  {
    id: 'kolones',
    pregunta: '¿Los Kolones son plata de verdad?',
    respuesta:
      'No. Los Kolones son puntos de la app: se ganan practicando y se cambian por cupones de marcas aliadas, que mostrás con un código en el negocio. Nunca se convierten en efectivo.',
  },
];
