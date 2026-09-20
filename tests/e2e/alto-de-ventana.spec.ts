import { expect, test } from '@playwright/test';

/**
 * El layout no puede medirse contra el alto vivo de la ventana.
 *
 * `svh` tendría que ser el viewport chico y fijo, pero en un navegador dentro
 * de una app en iPhone se comporta como `dvh`: al retraerse la barra,
 * `innerHeight` pasó de 659 a 745 y en el mismo cuadro el hero creció 86 px,
 * la caja pegada 86 y la pista de los pasos 617.
 *
 * Desde Windows no se puede levantar ese navegador, así que la prueba no imita
 * su barra: cambia el alto de la ventana, que es el caso MÁS fuerte —ahí se
 * mueven todas las unidades de viewport a la vez— y exige que el layout no se
 * entere. Lo que vigila es la invariante, no el síntoma.
 *
 * Solo en táctil: en escritorio la ventana manda a propósito y el alto SÍ se
 * sigue, igual que antes del arreglo.
 */
const SUBIDA_DE_BARRA = 86;

test('el alto de la ventana no cambia el tamaño del hero ni de la pista', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'en escritorio el alto de la ventana manda a propósito');

  await page.goto('/');
  // La pista ya viene del servidor; la señal de que la isla hidrató es que
  // Motion haya escrito el primer `transform` en las barritas.
  await page.locator('#como').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const barra = document.querySelector<HTMLElement>('.barrita__llenado');
    return Boolean(barra && barra.style.transform);
  });

  const ventana = page.viewportSize();
  if (!ventana) throw new Error('la prueba necesita una ventana de tamaño conocido');

  const leer = () =>
    page.evaluate(
      () =>
        new Promise<{
          innerHeight: number;
          hero: number;
          pista: number;
          pegado: number;
          marco: number;
        }>((listo) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              const alto = (sel: string) => {
                const nodo = document.querySelector(sel);
                if (!nodo) throw new Error(`falta ${sel}`);
                return nodo.getBoundingClientRect().height;
              };
              listo({
                innerHeight: window.innerHeight,
                hero: alto('.hero'),
                pista: alto('.pasos-pista'),
                pegado: alto('.pasos-pegado'),
                marco: alto('.marco'),
              });
            }),
          ),
        ),
    );

  const conBarra = await leer();
  await page.setViewportSize({ width: ventana.width, height: ventana.height + SUBIDA_DE_BARRA });
  const sinBarra = await leer();

  // Si esto falla, la ventana no cambió y la prueba no prueba nada.
  expect(sinBarra.innerHeight).toBe(conBarra.innerHeight + SUBIDA_DE_BARRA);

  expect(sinBarra.hero, 'el hero siguió al alto de la ventana').toBeCloseTo(conBarra.hero, 0);
  expect(sinBarra.pista, 'la pista siguió al alto de la ventana').toBeCloseTo(conBarra.pista, 0);
  expect(sinBarra.pegado).toBeCloseTo(conBarra.pegado, 0);
  // El teléfono se dimensiona con la misma variable, y en el aparato del
  // founder pasó de 371 a 444 de alto.
  expect(sinBarra.marco).toBeCloseTo(conBarra.marco, 0);
});

test('al rotar, el alto de la ventana sí se vuelve a medir', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'la rotación solo existe donde hay barra que se retrae');

  await page.goto('/');
  const ventana = page.viewportSize();
  if (!ventana) throw new Error('la prueba necesita una ventana de tamaño conocido');

  const alto = () => page.locator('.hero').evaluate((n) => n.getBoundingClientRect().height);

  const enPie = await alto();
  // Rotar es intercambiar ancho y alto: cambia el ancho, así que la medida
  // tiene que rehacerse o el hero quedaría más alto que la pantalla.
  await page.setViewportSize({ width: ventana.height, height: ventana.width });
  await page.waitForFunction(
    (previo) =>
      Math.abs(document.querySelector('.hero')!.getBoundingClientRect().height - previo) > 1,
    enPie,
  );

  const acostado = await alto();
  expect(acostado).not.toBeCloseTo(enPie, 0);
  // Acostado el piso de 640 px manda sobre la ventana, que es más baja.
  expect(acostado).toBeCloseTo(Math.max(ventana.width, 640), 0);
});
