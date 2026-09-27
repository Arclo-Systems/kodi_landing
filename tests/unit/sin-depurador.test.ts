import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

// El recuadro de diagnóstico del scroll viajaba en la home de producción desde
// 975025e: se abría con cualquier URL que tuviera `depurar` y colgaba la
// instancia de Lenis en `window`. Esta guardia impide que vuelva.
const SRC = join(__dirname, '..', '..', 'src');

function archivos(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entrada) => {
    const ruta = join(dir, entrada.name);
    return entrada.isDirectory() ? archivos(ruta) : [ruta];
  });
}

describe('la landing no lleva el depurador de scroll', () => {
  const fuentes = archivos(SRC);

  it('no existe el componente', () => {
    expect(fuentes.some((ruta) => ruta.endsWith('Depurador.astro'))).toBe(false);
  });

  it('ningún archivo de src/ lo monta ni expone la instancia de Lenis', () => {
    const conRastros = fuentes
      .filter((ruta) => /Depurador|lenisDepuracion|['"]depurar['"]/.test(readFileSync(ruta, 'utf8')))
      .map((ruta) => relative(SRC, ruta));

    expect(conRastros).toEqual([]);
  });
});
