/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

/**
 * Pruebas unitarias: datos, utilidades y las islas de React.
 *
 * `getViteConfig` reusa la configuración del proyecto, así que los alias (`@/*`)
 * y el plugin de Tailwind funcionan igual que en el sitio. Escribir una
 * configuración de Vite aparte llevaría a que una prueba pase con resoluciones
 * distintas a las del build.
 *
 * `tests/e2e` queda FUERA a propósito: eso es Playwright, que levanta un
 * navegador de verdad. Mezclarlos hace que cada corredor intente ejecutar los
 * archivos del otro.
 */
export default getViteConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.test.{ts,tsx}'],
  },
});
