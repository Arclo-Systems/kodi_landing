import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';

// Prueba de andamio: confirma que el corredor arranca, que el alias `@/*`
// resuelve y que `cn()` hace lo suyo. Si esta se cae, no vale la pena mirar
// ninguna otra.
describe('cn', () => {
  it('une clases', () => {
    expect(cn('p-2', 'text-red-500')).toBe('p-2 text-red-500');
  });

  it('resuelve el conflicto quedándose con la última', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('ignora lo falso', () => {
    expect(cn('p-2', false && 'p-4', undefined)).toBe('p-2');
  });
});
