// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://holakodi.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/og'),
    }),
  ],
});
