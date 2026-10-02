import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { NOTAS, fechaLegible, notasOrdenadas } from '@/data/prensa';

// Las notas de prensa de la home. Lo que tiene que ser cierto: que se muestren
// de la más nueva a la más vieja sin tocar los datos, que la fecha no se corra
// un día según la zona horaria de quien construye el sitio, y que cada dato
// cargado a mano sea válido.

const zonaPrevia = Intl.DateTimeFormat().resolvedOptions().timeZone;

describe('notasOrdenadas', () => {
  const desordenadas = [
    { medio: 'B', titular: 'Vieja', fecha: '2026-09-01', url: 'https://b.example/' },
    { medio: 'A', titular: 'Nueva', fecha: '2026-10-02', url: 'https://a.example/' },
    { medio: 'C', titular: 'Media', fecha: '2026-09-30', url: 'https://c.example/' },
  ] as const;

  it('ordena de la más reciente a la más vieja', () => {
    expect(notasOrdenadas(desordenadas).map((nota) => nota.fecha)).toEqual([
      '2026-10-02',
      '2026-09-30',
      '2026-09-01',
    ]);
  });

  it('no muta el arreglo de entrada', () => {
    const entrada = [...desordenadas];
    notasOrdenadas(entrada);
    expect(entrada.map((nota) => nota.fecha)).toEqual(['2026-09-01', '2026-10-02', '2026-09-30']);
  });
});

describe('fechaLegible', () => {
  // Honolulu (UTC−10, sin horario de verano) y no Costa Rica: esta máquina ya
  // está en hora de Costa Rica, y con esa zona el test pasaría aunque el cambio
  // de zona no se aplicara. Se restaura asignando: en Windows borrar `TZ` no
  // devuelve la zona original.
  beforeAll(() => {
    process.env.TZ = 'Pacific/Honolulu';
  });

  afterAll(() => {
    process.env.TZ = zonaPrevia;
  });

  it('corre con la zona del proceso cambiada (precondición)', () => {
    // Si el pool pasa a `threads`, cambiar `TZ` no tiene efecto y esto falla a
    // la vista en vez de dejar pasar en falso el test de abajo.
    expect(new Date('2026-10-02').getTimezoneOffset()).toBe(600);
  });

  it('da la fecha del día escrito, sin correrse por la zona horaria', () => {
    expect(fechaLegible('2026-10-02')).toBe('2 de octubre de 2026');
  });
});

describe('NOTAS', () => {
  it.each(NOTAS)('$medio: la fecha es ISO y real', ({ fecha }) => {
    expect(fecha).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(new Date(fecha).getTime())).toBe(false);
  });

  it.each(NOTAS)('$medio: la URL es https', ({ url }) => {
    expect(new URL(url).protocol).toBe('https:');
  });
});
