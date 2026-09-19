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
 * mueva la página. La referencia divide la velocidad entre 300, pero está
 * calibrada para rueda de ratón: medido en producción con el mismo gesto, la
 * rueda pica en 728 px/s y un dedo en 3231, cuatro veces y media más. Con un
 * solo divisor, en teléfono el empuje se iba casi al tope y el campo se
 * estiraba y volvía de golpe en cada arrastre.
 *
 * Los dos divisores salen de esa medición: 3231/1300 y 728/300 dan
 * prácticamente el mismo empuje, que es lo que la prueba comprueba.
 */
export const VELOCIDAD_POR_PUNTO = { fino: 300, grueso: 1300 } as const;

/** Tope del empuje. Por encima, el estirón dejaría de leerse como tal. */
export const EMPUJE_MAX = 14;

export function empujeDeVelocidad(velocidad: number, punteroGrueso: boolean): number {
  const divisor = punteroGrueso ? VELOCIDAD_POR_PUNTO.grueso : VELOCIDAD_POR_PUNTO.fino;
  return Math.min(Math.abs(velocidad) / divisor, EMPUJE_MAX);
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
