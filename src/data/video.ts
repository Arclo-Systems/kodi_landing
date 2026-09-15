/**
 * El video de la app que crece con el scroll.
 *
 * MIENTRAS `archivo` SEA `null`, LA SECCIÓN NO SE DIBUJA. Es a propósito: un
 * recuadro vacío con la palabra "video" es peor que no tener sección, y así la
 * página nunca muestra un hueco esperando material.
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
  portada: null,
  rotulo: 'Mirá la app por dentro',
  descripcion:
    'Grabación de Kodi: se responde una pregunta, Pixel explica el error y la liga sube de puesto.',
};
