import ScrollReveal from '../react-bits/ScrollReveal';

interface Props {
  /** El párrafo completo. El componente lo parte en palabras. */
  readonly texto: string;
}

/**
 * Puente entre Astro y el `ScrollReveal` de React Bits.
 *
 * Existe por una sola razón: ese componente parte el texto en palabras solo
 * cuando sus hijos son una cadena de React, y Astro reserva `children` para su
 * propio mecanismo de slots. Pasado desde Astro, el párrafo llegaba vacío y la
 * sección se dibujaba en blanco. Acá adentro ya es React puro y la cadena pasa
 * tal cual.
 *
 * No cambia nada del componente: solo fija sus opciones.
 *
 *   · Sin desenfoque y sin inclinación: el efecto pedido es únicamente el
 *     encendido palabra por palabra.
 *   · `baseOpacity` en 0.12, el valor de la referencia. Más abajo, el texto
 *     apagado desaparece y el párrafo parece cortado a la mitad.
 *   · `wordAnimationEnd` movido a "top 30%". Con el valor de fábrica el
 *     encendido termina apenas empieza y el párrafo se prende entero de un
 *     golpe; así el recorrido queda en media pantalla, como en la referencia.
 *   · `wordDuration` igual al escalonado, para que las palabras se enciendan
 *     una por una en vez de a ocho a la vez. Medido en la referencia: siempre
 *     hay exactamente una palabra a media luz.
 */
export default function TextoRevelado({ texto }: Props) {
  return (
    <ScrollReveal
      enableBlur={false}
      baseRotation={0}
      baseOpacity={0.12}
      wordAnimationEnd="top 30%"
      wordDuration={0.05}
      containerClassName="manifiesto__bloque"
      textClassName="manifiesto__texto"
    >
      {texto}
    </ScrollReveal>
  );
}
