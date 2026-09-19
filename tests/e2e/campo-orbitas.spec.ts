import { expect, test } from '@playwright/test';

/**
 * El campo de órbitas del hero, comprobado en un navegador de verdad.
 *
 * El proyecto `movil` de `playwright.config.ts` usa el perfil de un Pixel 5, que
 * sí declara puntero grueso y táctil. La emulación a mano por tamaño de ventana
 * NO lo hace, y por eso estas comprobaciones viven acá y no en las unitarias.
 */

test('el lienzo se dibuja a la densidad de la pantalla, no a la de sus atributos', async ({
  page,
}) => {
  await page.goto('/');
  const lienzo = page.locator('.hero canvas');
  await expect(lienzo).toBeVisible();

  const medidas = await lienzo.evaluate((c: HTMLCanvasElement) => {
    const caja = c.getBoundingClientRect();
    return {
      anchoCss: Math.round(caja.width),
      anchoBuffer: c.width,
      anchoContenedor: (c.parentElement as HTMLElement).offsetWidth,
      dpr: window.devicePixelRatio,
    };
  });

  // El canvas es elemento reemplazado: sin alto y ancho explícitos toma su
  // tamaño intrínseco, que va en píxeles de dispositivo, y se dibuja el triple
  // de grande en una pantalla de triple densidad.
  expect(medidas.anchoCss).toBe(medidas.anchoContenedor);
  expect(medidas.anchoBuffer).toBeGreaterThanOrEqual(medidas.anchoCss);
});

test('el puntero grueso se detecta donde lo hay', async ({ page, isMobile }) => {
  await page.goto('/');
  const grueso = await page.evaluate(() => window.matchMedia('(pointer: coarse)').matches);

  // De esta consulta depende cuánto empuja el scroll al campo: con el divisor
  // de la rueda, un arrastre con el dedo estiraba los anillos casi al tope.
  expect(grueso).toBe(Boolean(isMobile));
});

test('el campo se queda quieto si se pide menos movimiento', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const hero = page.locator('.hero');
  await expect(page.locator('.hero canvas')).toBeVisible();
  await page.waitForTimeout(3000);

  const antes = await hero.screenshot();
  await page.waitForTimeout(900);
  const despues = await hero.screenshot();

  expect(antes.equals(despues)).toBe(true);
});
