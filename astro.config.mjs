// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const FUERA_DEL_SITEMAP = new Set(['/og/', '/invitacion/', '/invitacion-perfil/']);

export default defineConfig({
  site: 'https://holakodi.com',
  integrations: [
    sitemap({
      // Fuera: la imagen de OG y las páginas de invitación, que se sirven bajo
      // /u/* y /r/* y no tienen una URL propia que valga la pena indexar.
      filter: (page) => !FUERA_DEL_SITEMAP.has(new URL(page).pathname),
    }),
  ],
});
