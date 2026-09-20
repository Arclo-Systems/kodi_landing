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

/**
 * Cuánto empuje recibe el campo de órbitas por la velocidad del scroll.
 *
 * El campo estira sus anillos y los acelera en proporción a lo rápido que se
 * mueva la página. El divisor es el de la referencia.
 *
 * Hubo un intento de subirlo a 1300 en táctil, porque un dedo pica cuatro
 * veces y media más rápido que la rueda. La cuenta cerraba sobre el pico
 * instantáneo, pero no sobre lo que el suavizado deja llegar a los anillos:
 * medido después, el campo quedó 4,33 veces más débil y el hero se sintió
 * muerto. Revertido. Si se vuelve a intentar, hay que calibrar contra el
 * estirón en píxeles, no contra el pico de `useVelocity`.
 */
export const VELOCIDAD_POR_PUNTO = 300;

/** Tope del empuje. Por encima, el estirón dejaría de leerse como tal. */
export const EMPUJE_MAX = 14;

export function empujeDeVelocidad(velocidad: number): number {
  return Math.min(Math.abs(velocidad) / VELOCIDAD_POR_PUNTO, EMPUJE_MAX);
}

/**
 * Cuánto avanzó una pista de scroll con una caja pegada adentro, de 0 a 1.
 *
 * La cuenta existe porque `useScroll` mide el recorrido contra
 * `window.innerHeight`, y la pista y la caja pegada están escritas en `svh`.
 * En teléfono esos dos números no son el mismo: `svh` es fijo, `innerHeight`
 * sube y baja con la barra del navegador. Medido en celular emulado, esconder
 * la barra (844 → 915) movía el avance hasta 0.011 con la página quieta, y en
 * la peor transición eso corría la escena 218 px de golpe: el rebote.
 *
 * Acá los dos términos salen del propio DOM, los dos en `svh`, así que la
 * barra no puede moverlos.
 */
export function avanceDePista(
  scrollY: number,
  pistaTop: number,
  altoPista: number,
  altoPegado: number,
): number {
  const recorrido = altoPista - altoPegado;
  if (recorrido <= 0) return 0;
  return Math.min(Math.max((scrollY - pistaTop) / recorrido, 0), 1);
}
