export interface ItemFaq {
  readonly pregunta: string;
  readonly respuesta: string;
}

/**
 * Las seis dudas que frenan la instalación, en el orden en que aparecen en la
 * cabeza de quien está por instalar.
 *
 * Es además el único contenido de la landing que Google puede indexar con las
 * palabras que la gente de verdad busca ("examen COSEVI", "prueba de admisión
 * UCR"), así que las preguntas se escriben como las escribiría una persona, no
 * como las escribiría la empresa.
 *
 * Regla: ninguna respuesta promete una fecha que no esté confirmada, y ninguna
 * garantiza el contenido del examen real.
 */
export const FAQ: readonly ItemFaq[] = [
  {
    pregunta: '¿Me sirve si mi examen es en dos semanas?',
    respuesta:
      'Sí. Elegís el examen, ponés la fecha y Kodi reparte los temas hasta ese día. Cada día sabés exactamente qué practicar, sin decidirlo vos.',
  },
  {
    pregunta: '¿De dónde salen las preguntas?',
    respuesta:
      'Del material oficial de cada examen: los manuales nuevos del COSEVI, el material que publica el MEP para las Pruebas Nacionales, y el temario que publican la UCR, la UNA y el TEC para admisión. En admisión las universidades publican el temario y no las preguntas, así que esas las escribe el equipo de contenido de Kodi a partir de ese temario.',
  },
  {
    pregunta: '¿Es gratis de verdad?',
    respuesta:
      'Sí. La app se descarga y se estudia gratis. Tiene anuncios y compras opcionales, y no hay que pagar nada para practicar.',
  },
  {
    pregunta: '¿Funciona sin internet?',
    respuesta:
      'Por ahora no: hace falta conexión para practicar. Estamos trabajando en que se pueda sin internet.',
  },
  {
    pregunta: 'Si ya tengo licencia de auto, ¿me sirve para moto?',
    respuesta:
      'Son dos módulos distintos. La prueba A1 de moto tiene sus propias preguntas, con las maniobras, el equipo de protección y el mantenimiento que el examen de auto no toca.',
  },
  {
    pregunta: '¿Cuándo sale para iPhone?',
    respuesta:
      'A finales de este mes. Dejanos tu correo y te escribimos el día que salga.',
  },
];
