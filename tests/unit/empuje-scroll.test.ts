import { describe, expect, it } from 'vitest';

import { EMPUJE_MAX, empujeDeVelocidad } from '../../src/lib/movimiento';

/**
 * El campo de órbitas del hero estira sus anillos en proporción a la velocidad
 * del scroll. El founder reportó que en celular se sentía "un rebote al bajar y
 * subir" que en escritorio no está.
 *
 * Los dos números de abajo NO son inventados: son el pico de velocidad medido
 * en https://holakodi.com/ con el mismo gesto, en una pestaña de Chrome con
 * emulación de teléfono y otra sin ella. La prueba existe para que el empuje no
 * vuelva a depender del aparato con el que se navega.
 */
const PICO_RUEDA = 728;
const PICO_DEDO = 3231;

describe('empuje del campo de órbitas', () => {
  it('da prácticamente el mismo empuje con rueda y con dedo', () => {
    const conRueda = empujeDeVelocidad(PICO_RUEDA, false);
    const conDedo = empujeDeVelocidad(PICO_DEDO, true);

    // Menos de medio punto de los catorce: el gesto se siente igual en los dos.
    expect(Math.abs(conDedo - conRueda)).toBeLessThan(0.5);
  });

  it('no satura el tope con un arrastre normal en teléfono', () => {
    // Este era el fallo: con el divisor de la rueda, un dedo llegaba a 10.8 de
    // 14 y el estirón se iba al máximo en cada arrastre.
    expect(empujeDeVelocidad(PICO_DEDO, true)).toBeLessThan(EMPUJE_MAX / 3);
    expect(empujeDeVelocidad(PICO_DEDO, false)).toBeGreaterThan(EMPUJE_MAX / 2);
  });

  it('no reacciona cuando la página está quieta', () => {
    expect(empujeDeVelocidad(0, true)).toBe(0);
    expect(empujeDeVelocidad(0, false)).toBe(0);
  });

  it('trata igual subir que bajar', () => {
    expect(empujeDeVelocidad(-PICO_DEDO, true)).toBe(empujeDeVelocidad(PICO_DEDO, true));
  });

  it('nunca pasa del tope, por rápido que se mueva', () => {
    expect(empujeDeVelocidad(999_999, true)).toBe(EMPUJE_MAX);
    expect(empujeDeVelocidad(999_999, false)).toBe(EMPUJE_MAX);
  });
});
