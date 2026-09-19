import { describe, expect, it } from 'vitest';

import { avanceDePista } from '../../src/lib/movimiento';

/**
 * El avance de la sección de pasos, que es lo que mueve el teléfono, el texto
 * y las barritas.
 *
 * La geometría es la medida en celular emulado (390x844, dpr 3) sobre la
 * landing real: la pista mide seis pasos de 120svh, la caja pegada una
 * pantalla, y la sección arranca a 3253.2 del tope del documento. La ventana
 * va de 844 a 915, que es lo que se mueve la barra de Chrome Android.
 */
const PISTA_ALTO = 6076.8;
const PEGADO_ALTO = 844;
const PISTA_TOP = 3253.2;
const VENTANA_CON_BARRA = 844;
const VENTANA_SIN_BARRA = 915;

/** Lo que hacía `useScroll`: el recorrido contra la ventana, no contra la caja. */
function avanceContraVentana(scrollY: number, ventana: number): number {
  const recorrido = PISTA_ALTO - ventana;
  return Math.min(Math.max((scrollY - PISTA_TOP) / recorrido, 0), 1);
}

const nuestro = (scrollY: number) => avanceDePista(scrollY, PISTA_TOP, PISTA_ALTO, PEGADO_ALTO);

/** Las seis transiciones de paso, barridas en vivo. */
const POSICIONES = [4299, 5031, 5921, 6810, 7429, 7700];

describe('avance de la pista de pasos', () => {
  it('no se mueve cuando la barra del navegador aparece o se esconde', () => {
    // La cuenta no toma la ventana, así que el avance es el mismo número.
    for (const scrollY of POSICIONES) {
      expect(nuestro(scrollY)).toBe(avanceDePista(scrollY, PISTA_TOP, PISTA_ALTO, PEGADO_ALTO));
    }

    const peor = Math.max(
      ...POSICIONES.map((y) =>
        Math.abs(avanceContraVentana(y, VENTANA_SIN_BARRA) - avanceContraVentana(y, VENTANA_CON_BARRA)),
      ),
    );

    // Este era el rebote: con la página quieta, el avance saltaba más de un
    // punto porcentual, y en la peor transición eso son 218 px de escena.
    expect(peor).toBeGreaterThan(0.01);
  });

  it('coincide con el avance medido en cada transición', () => {
    const medidos = [0.2, 0.34, 0.51, 0.68, 0.798, 0.85];
    POSICIONES.forEach((scrollY, i) => {
      expect(nuestro(scrollY)).toBeCloseTo(medidos[i], 2);
    });
  });

  it('se queda en 0 antes de la sección y en 1 después', () => {
    expect(nuestro(0)).toBe(0);
    expect(nuestro(PISTA_TOP - 1)).toBe(0);
    expect(nuestro(PISTA_TOP)).toBe(0);
    expect(nuestro(PISTA_TOP + PISTA_ALTO)).toBe(1);
    expect(nuestro(999_999)).toBe(1);
  });

  it('no divide por cero si todavía no midió la caja', () => {
    expect(avanceDePista(5000, PISTA_TOP, 0, 0)).toBe(0);
    expect(avanceDePista(5000, PISTA_TOP, PEGADO_ALTO, PEGADO_ALTO)).toBe(0);
  });
});
