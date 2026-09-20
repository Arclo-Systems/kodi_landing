import { describe, expect, it } from 'vitest';

import { EMPUJE_MAX, VELOCIDAD_POR_PUNTO, empujeDeVelocidad } from '../../src/lib/movimiento';

/**
 * El campo de órbitas del hero estira sus anillos según la velocidad del
 * scroll. Los dos picos son medidos en https://holakodi.com/ con el mismo
 * gesto: una pestaña con rueda de ratón y otra con emulación de teléfono.
 *
 * Estas pruebas existen por un error concreto. Se subió el divisor a 1300 en
 * táctil creyendo que el dedo saturaba el tope, porque su pico instantáneo es
 * cuatro veces y media más alto. Pero el bucle suaviza esa velocidad antes de
 * llegar a los anillos, así que nunca saturaba: el cambio dejó el campo 4,33
 * veces más débil y el hero se sintió muerto. De ahí el piso de acá abajo.
 */
const PICO_RUEDA = 728;
const PICO_DEDO = 3231;

describe('empuje del campo de órbitas', () => {
  it('reacciona de verdad a un gesto normal', () => {
    // El piso es lo que faltaba: sin él, cualquier divisor grande pasa la
    // prueba, incluidos los que dejan el campo quieto.
    expect(empujeDeVelocidad(PICO_RUEDA)).toBeGreaterThan(EMPUJE_MAX / 8);
    expect(empujeDeVelocidad(PICO_DEDO)).toBeGreaterThan(EMPUJE_MAX / 2);
  });

  it('usa el divisor de la referencia', () => {
    expect(VELOCIDAD_POR_PUNTO).toBe(300);
    expect(empujeDeVelocidad(PICO_RUEDA)).toBeCloseTo(PICO_RUEDA / 300, 5);
  });

  it('no reacciona cuando la página está quieta', () => {
    expect(empujeDeVelocidad(0)).toBe(0);
  });

  it('trata igual subir que bajar', () => {
    expect(empujeDeVelocidad(-PICO_DEDO)).toBe(empujeDeVelocidad(PICO_DEDO));
  });

  it('nunca pasa del tope, por rápido que se mueva', () => {
    expect(empujeDeVelocidad(999_999)).toBe(EMPUJE_MAX);
  });
});
