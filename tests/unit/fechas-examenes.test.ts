import { describe, expect, it } from 'vitest';
import { diasRestantes, fechaDe } from '@/data/fechas-examenes';

// La cuenta regresiva del hero sale de acá. Dos cosas tienen que ser ciertas:
// que los días se cuenten en hora de Costa Rica (si no, entre las 18:00 y la
// medianoche el sitio muestra un día de más), y que un examen sin fecha NO
// devuelva nada, porque inventar una fecha es peor que no mostrarla.

describe('diasRestantes', () => {
  it('cuenta días completos en hora de Costa Rica', () => {
    const hoy = new Date('2026-09-15T23:00:00-06:00');
    expect(diasRestantes('2026-10-03T07:00:00-06:00', hoy)).toBe(18);
  });

  it('no se adelanta un día por la tarde-noche de Costa Rica', () => {
    // 23:00 en CR es el día siguiente en UTC. Contar en UTC daría 17.
    const tarde = new Date('2026-09-15T23:30:00-06:00');
    const manana = new Date('2026-09-16T08:00:00-06:00');
    expect(diasRestantes('2026-10-03T07:00:00-06:00', tarde)).toBe(18);
    expect(diasRestantes('2026-10-03T07:00:00-06:00', manana)).toBe(17);
  });

  it('da 0 el mismo día del examen', () => {
    expect(diasRestantes('2026-10-03T07:00:00-06:00', new Date('2026-10-03T05:00:00-06:00'))).toBe(
      0,
    );
  });

  it('da negativo cuando el examen ya pasó', () => {
    expect(diasRestantes('2026-09-01T07:00:00-06:00', new Date('2026-09-15T12:00:00-06:00'))).toBe(
      -14,
    );
  });
});

describe('fechaDe', () => {
  it('no da fecha para COSEVI: la cita la agenda cada persona', () => {
    expect(fechaDe('cosevi_auto')).toBeNull();
    expect(fechaDe('cosevi_moto')).toBeNull();
  });

  it('no da fecha para PEN Primaria mientras no exista', () => {
    expect(fechaDe('estandarizada_primaria')).toBeNull();
  });

  it('da la fecha de admisión', () => {
    expect(fechaDe('paa')?.nombre).toContain('admisión');
  });

  it('para PEN Secundaria cuenta hacia colegios académicos, y lo dice', () => {
    expect(fechaDe('estandarizada_secundaria')?.nombre).toContain('académicos');
  });
});
