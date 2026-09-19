import { defineConfig, devices } from '@playwright/test';

/**
 * Pruebas de navegador contra el sitio CONSTRUIDO, no contra el modo de
 * desarrollo: lo que se verifica es lo que se va a publicar.
 *
 * `webServer` levanta la vista previa solo; si ya hay una corriendo, la reusa.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'escritorio', use: { ...devices['Desktop Chrome'] } },
    { name: 'movil', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
