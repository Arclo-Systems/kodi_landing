import { expect, test } from '@playwright/test';

/**
 * El rebote de la sección de pasos.
 *
 * En un teléfono, la barra del navegador aparece y desaparece al hacer scroll:
 * `window.innerHeight` cambia varias decenas de píxeles mientras el layout,
 * escrito en `svh`, se queda igual. Si el avance de la pista se mide contra la
 * ventana, la escena salta con la página completamente quieta.
 *
 * Para aislar eso, la prueba congela en píxeles lo que va en `svh` —que es
 * justo lo que la barra NO mueve— y recién ahí cambia el alto de la ventana.
 * Así lo único que se mueve es `innerHeight`.
 */
const SUBIDA_DE_BARRA = 71;

test('la barra del navegador no mueve la escena de los pasos', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'el síntoma sale de la barra de un navegador de teléfono');

  await page.goto('/');
  // La isla es `client:visible`: la pista no existe hasta que la sección asoma.
  await page.locator('#como').scrollIntoViewIfNeeded();
  await page.locator('.pasos-pista').waitFor({ state: 'attached' });

  const ventana = page.viewportSize();
  if (!ventana) throw new Error('la prueba necesita una ventana de tamaño conocido');

  const congelado = await page.evaluate(() => {
    const alto = (sel: string) => {
      const nodo = document.querySelector(sel);
      if (!nodo) throw new Error(`falta ${sel}`);
      return nodo.getBoundingClientRect().height;
    };
    const pista = document.querySelector('.pasos-pista');
    if (!pista) throw new Error('falta .pasos-pista');
    return {
      hero: alto('.hero'),
      pista: alto('.pasos-pista'),
      pegado: alto('.pasos-pegado'),
      pantalla: getComputedStyle(pista).getPropertyValue('--pantalla').trim(),
      top: pista.getBoundingClientRect().top + window.scrollY,
    };
  });

  await page.addStyleTag({
    content: `
      .hero { height: ${congelado.hero}px !important; min-height: 0 !important; }
      .pasos-pista { height: ${congelado.pista}px !important; --pantalla: ${congelado.pantalla} !important; }
      .pasos-pegado { height: ${congelado.pegado}px !important; }
    `,
  });

  // La peor transición medida cae al 80 % de la pista.
  const posicion = Math.round(congelado.top + (congelado.pista - congelado.pegado) * 0.8);
  const leer = async () =>
    page.evaluate(
      (y) => {
        window.scrollTo(0, y);
        return new Promise<{ innerHeight: number; barritas: string[]; pista: number }>((listo) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(() =>
              listo({
                innerHeight: window.innerHeight,
                barritas: Array.from(
                  document.querySelectorAll<HTMLElement>('.barrita__llenado'),
                ).map((n) => n.style.transform),
                pista: document.querySelector('.pasos-pista')!.getBoundingClientRect().height,
              }),
            ),
          ),
        );
      },
      posicion,
    );

  const conBarra = await leer();
  await page.setViewportSize({ width: ventana.width, height: ventana.height + SUBIDA_DE_BARRA });
  const sinBarra = await leer();

  // Si esto falla, el congelado no aisló la barra y la prueba no prueba nada.
  expect(sinBarra.innerHeight).toBe(conBarra.innerHeight + SUBIDA_DE_BARRA);
  expect(sinBarra.pista).toBeCloseTo(conBarra.pista, 0);

  // Si el avance quedara clavado, todas las barritas serían iguales y la
  // comparación de abajo pasaría sin probar nada. A media pista hay una a medio
  // llenar.
  expect(conBarra.barritas.some((t) => /^scaleX\(0\.\d+\)$/.test(t))).toBe(true);
  expect(sinBarra.barritas).toEqual(conBarra.barritas);
});
