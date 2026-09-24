import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { PRIVACY_DOC } from '@/data/legal';

// La app y la landing publican la misma política y ninguna puede importar de
// la otra; la fuente de verdad es el panel legal. La misma constante vive en
// `frontend/src/lib/legal/privacy.test.ts`: si cambia una sola punta, falla
// ese repo y hay que copiar el texto al otro y actualizar el hash en los dos a
// mano.
const PRIVACY_DOC_SHA256 = '9aa37c3f3ab850f7c10ca7bc9f5f5ae1392411b83e66bbe9f7812b3127166ea4';

function privacyDocHash(): string {
  const { version, lastUpdated, title, sections } = PRIVACY_DOC;
  const canonical = JSON.stringify({
    version,
    lastUpdated,
    title,
    sections: sections.map((s) => ({ title: s.title, body: s.body })),
  });
  return createHash('sha256').update(canonical).digest('hex');
}

// La política de la landing es espejo de la de la app y el copy de Meta
// (secciones 3, 6 y 7) es el que aprobó el abogado. Si alguien lo edita sin
// subir la versión o lo reformula, estas frases dejan de estar.

function bodyOf(prefix: string): string {
  const section = PRIVACY_DOC.sections.find((s) => s.title.startsWith(prefix));
  if (!section) throw new Error(`No existe la sección ${prefix}`);
  return section.body;
}

describe('PRIVACY_DOC', () => {
  it('es idéntica a la de la app', () => {
    expect(privacyDocHash()).toBe(PRIVACY_DOC_SHA256);
  });

  it('está en la versión 2026-09-23.2', () => {
    expect(PRIVACY_DOC.version).toBe('2026-09-23.2');
    expect(PRIVACY_DOC.lastUpdated).toBe('23 de septiembre, 2026');
  });

  it('mantiene las 12 secciones', () => {
    expect(PRIVACY_DOC.sections).toHaveLength(12);
  });

  it('la sección 3 nombra a Meta con el copy aprobado', () => {
    expect(bodyOf('3.')).toContain(
      'Meta Platforms (Facebook e Instagram), para medir qué anuncios de Kodi llevan a instalar o abrir la app, crear una cuenta o comprar (ver sección 7),',
    );
  });

  it('la sección 6 limita a eventos de uso y de compra lo que no se envía a Meta', () => {
    const body = bodyOf('6.');
    expect(body).toContain(
      'Al registrarte te pedimos tu edad y, por debajo de 13 años, no se puede crear una cuenta',
    );
    expect(body).toContain(
      'necesita el consentimiento de su madre, padre o encargado, y desde ese teléfono no le enviamos a Meta eventos de uso ni de compra (ver sección 7).',
    );
    expect(body).not.toContain('no le enviamos ningún dato a Meta');
  });

  it('la sección 7 reconoce la conexión técnica del kit y el corte desde el próximo arranque', () => {
    const body = bodyOf('7.');
    expect(body).toContain('Cada vez que abrís la app, el kit se conecta con Meta para funcionar');
    expect(body).toContain('la conexión técnica del kit al abrir la app sigue ocurriendo.');
    expect(
      body.endsWith('las aperturas dejan de enviarse desde la próxima vez que abras Kodi.'),
    ).toBe(true);
    expect(body).not.toContain('De las cuentas de menores de 13 años no enviamos nada');
  });
});
