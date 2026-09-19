/**
 * Las curvas del sitio, iguales a los tokens `--salida`, `--entre` y `--cajon`
 * de `global.css`. Las islas no pueden leer un token, así que lo comparten por
 * acá: un solo juego de números para el CSS y para Motion.
 */

/** Arranca rápido y frena largo. Lo que sale de pantalla y lo que se acomoda. */
export const SALIDA = [0.23, 1, 0.32, 1] as const;

/** Entra y sale con la misma fuerza. Lo que se mueve DENTRO de la pantalla. */
export const ENTRE = [0.77, 0, 0.175, 1] as const;

/** La del cajón: pesada al frenar. Los naipes de los pasos y el cierre. */
export const CAJON = [0.32, 0.72, 0, 1] as const;
