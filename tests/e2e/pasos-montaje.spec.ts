import { expect, test } from '@playwright/test';

/**
 * La isla de los pasos es `client:visible`: monta cuando la sección asoma, o
 * sea con la persona leyendo.
 *
 * Su estado arrancaba en "movimiento reducido", así que el servidor pintaba una
 * lista corta y al montar la reemplazaba por la pista pegada. El documento
 * crecía 3646 px en móvil y 2727 en escritorio de un cuadro al otro, y lo que
 * se estaba leyendo se corría de golpe. Se reportó como que el teléfono de la
 * sección "salta para abajo para ajustarse".
 */
test('montar la isla de los pasos no cambia el alto del documento', async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __altos: number[] };
    w.__altos = [];
    const medir = () => {
      w.__altos.push(document.documentElement.scrollHeight);
      requestAnimationFrame(medir);
    };
    requestAnimationFrame(medir);
  });

  await page.goto('/');
  await expect(page.locator('#como')).toBeAttached();

  // Bajar como lo haría alguien leyendo, hasta pasar la sección. La medición
  // arranca acá: los primeros cuadros de la carga tienen el documento a medio
  // armar y no son lo que esta prueba vigila.
  await page.evaluate(async () => {
    (window as unknown as { __altos: number[] }).__altos.length = 0;
    const seccion = document.querySelector('#como');
    if (!seccion) throw new Error('falta #como');
    const destino = seccion.getBoundingClientRect().top + window.scrollY + 400;
    for (let y = window.scrollY; y < destino; y += 40) {
      window.scrollTo(0, y);
      await new Promise((listo) => requestAnimationFrame(listo));
    }
  });
  await page.waitForTimeout(800);

  const altos = await page.evaluate(
    () => (window as unknown as { __altos: number[] }).__altos,
  );
  expect(altos.length).toBeGreaterThan(20);
  // La pista pegada tiene que estar: si no, la prueba pasaría sobre una página
  // que nunca montó la isla.
  await expect(page.locator('.pasos-pista')).toBeAttached();

  // Con tolerancia y no igualdad exacta: una imagen que se asienta tarde puede
  // mover el alto unos píxeles, y eso no es lo que esta prueba vigila. El
  // defecto que cazamos movía el documento miles.
  const menor = Math.min(...altos);
  const mayor = Math.max(...altos);
  expect(mayor - menor, `el documento fue de ${menor} a ${mayor}`).toBeLessThan(100);
});
