/**
 * Los cinco módulos activos en producción, tal como están en `modules` y
 * `subjects` (leídos el 2026-09-15): nombre, formato del examen y materias en
 * su orden. El ícono es el arte original del módulo, el mismo que dibuja la app.
 *
 * Nada de acá se inventa: si el panel cambia un módulo, se vuelve a copiar.
 */
export interface Examen {
  readonly nombre: string;
  /** Preguntas y minutos del examen real, como los configura el panel. */
  readonly formato: string;
  /** Versión de una línea para teléfono, solo donde el formato largo no entra. */
  readonly formatoCorto?: string;
  /** Materias del módulo, en el orden del panel. */
  readonly materias: readonly string[];
  readonly icono: string;
}

export const EXAMENES: readonly Examen[] = [
  {
    nombre: 'COSEVI Auto',
    formato: '40 preguntas · 50 min',
    materias: [
      'Fundamentos de Tránsito',
      'Legislación de Tránsito',
      'Señales de Tránsito',
      'Normas de Circulación',
      'Factor Humano',
      'Seguridad Vial',
      'Rotondas',
      'Primeros Auxilios',
      'Conducción Técnica',
    ],
    icono: '/app/chico/modulo-cosevi-auto.webp',
  },
  {
    nombre: 'COSEVI Moto',
    formato: '40 preguntas · 50 min',
    materias: [
      'Seguridad Vial',
      'Entorno Vial',
      'Licencia y Documentos',
      'Señales de Tránsito',
      'Controles y Sistemas',
      'Mantenimiento Mecánico',
      'Manejo de Moto',
      'Equipo de Protección',
      'Riesgos y Emergencias',
      'Sanciones y Multas',
    ],
    icono: '/app/chico/modulo-cosevi-moto.webp',
  },
  {
    nombre: 'Prueba de Admisión',
    // UCR y UNA comparten prueba (45 · 110); el TEC tiene la suya (70 · 180).
    formato: 'UCR · UNA: 45 preguntas · 110 min. TEC: 70 preguntas · 180 min',
    formatoCorto: '45 o 70 preguntas',
    materias: ['Razonamiento Verbal', 'Razonamiento Matemático', 'Razonamiento Lógico'],
    icono: '/app/chico/modulo-paa.webp',
  },
  {
    nombre: 'PNE Primaria',
    formato: '60 preguntas · 120 min',
    materias: ['Estudios Sociales', 'Ciencias', 'Matemáticas', 'Español'],
    icono: '/app/chico/modulo-pen-primaria.webp',
  },
  {
    nombre: 'PNE Secundaria',
    formato: '60 preguntas · 120 min',
    materias: ['Estudios Sociales', 'Matemáticas', 'Ciencias', 'Español', 'Cívica'],
    icono: '/app/chico/modulo-pen-secundaria.webp',
  },
];
