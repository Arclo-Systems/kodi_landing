import { expect, test } from '@playwright/test';

const PLAY = 'https://play.google.com/store/apps/details?id=com.holakodi.app';

// Guardarraíles que valen para cualquier versión de la landing: lo que se
// comprueba acá no es el diseño, es que la página no salga rota a producción.

test('la portada responde y tiene título propio', async ({ page }) => {
  const r = await page.goto('/');
  expect(r?.status()).toBe(200);
  await expect(page).toHaveTitle(/Kodi/);
});

test('no hay ningún enlace muerto', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('a[href="#"], a[href=""]').count()).toBe(0);
});

test('no se publica ningún corchete de marcador', async ({ page }) => {
  await page.goto('/');
  const texto = await page.locator('body').innerText();
  expect(texto).not.toMatch(/\[(confirmar|Nombre|N|TODO|TBD)\]/);
});

test('el botón de descarga lleva a Google Play', async ({ page }) => {
  await page.goto('/');
  const play = page.locator(`a[href="${PLAY}"]`);
  await expect(play.first()).toBeAttached();
});

test('las páginas legales siguen respondiendo', async ({ page }) => {
  for (const ruta of ['/privacidad', '/terminos', '/bases', '/eliminar-cuenta']) {
    const r = await page.goto(ruta);
    expect(r?.status(), `ruta ${ruta}`).toBe(200);
  }
});
