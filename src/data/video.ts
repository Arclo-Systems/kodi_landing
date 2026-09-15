/**
 * El video de la app que crece con el scroll.
 *
 * La sección se dibuja si hay VIDEO o si hay PORTADA. Con solo la portada se
 * ve el efecto completo —el recuadro crece con el scroll— pero con una imagen
 * quieta en vez de una grabación. Sirve para juzgar el efecto antes de que el
 * video exista.
 *
 * Si los dos son `null`, la sección no se dibuja: un recuadro vacío con la
 * palabra "video" es peor que no tener sección.
 *
 * Para encenderla, cuando el video exista:
 *   1. Poné el archivo en `landing/public/video/` (por ejemplo `kodi.mp4`).
 *   2. Poné un fotograma de portada al lado (`kodi-portada.jpg`).
 *   3. Cambiá `archivo` y `portada` acá abajo. Nada más: la sección aparece
 *      sola en su lugar.
 *
 * Qué video conviene, por si sirve al grabarlo:
 *   · Vertical o cuadrado NO: el marco es apaisado y una grabación de teléfono
 *     entera quedaría con dos franjas negras. Mejor 16:9, con la pantalla del
 *     teléfono adentro.
 *   · Sin audio que haga falta: se reproduce en silencio y en bucle, porque
 *     ningún navegador deja arrancar con sonido sin que la persona lo pida.
 *   · Corto, de 10 a 20 segundos, y que el bucle no se note.
 *   · Que muestre lo que vende: responder, fallar, que Pixel explique, subir
 *     de liga.
 *   · Liviano: por encima de unos 3 MB, en datos móviles se nota.
 */
export interface VideoApp {
  /** Ruta desde `public/`, o `null` mientras no exista. */
  readonly archivo: string | null;
  /** Fotograma que se ve antes de que el video arranque. */
  readonly portada: string | null;
  /** El rótulo chico de arriba. */
  readonly rotulo: string;
  /** Descripción para quien no puede ver el video. */
  readonly descripcion: string;
}

export const VIDEO: VideoApp = {
  archivo: null,
  // PROVISIONAL: una captura de la app sobre fondo de marca, solo para ver el
  // efecto. Se reemplaza por el fotograma real del video.
  portada: '/video/portada-provisional.jpg',
  rotulo: 'Mirá la app por dentro',
  descripcion:
    'Grabación de Kodi: se responde una pregunta, Pixel explica el error y la liga sube de puesto.',
};
