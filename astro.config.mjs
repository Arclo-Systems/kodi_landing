// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

const FUERA_DEL_SITEMAP = new Set(['/og', '/invitacion', '/invitacion-perfil']);

export default defineConfig({
  site: 'https://holakodi.com',

  // Sin barra final, que es como están escritos TODOS los enlaces internos.
  // Con la barra, el canonical y el sitemap apuntaban a una URL y cada enlace
  // a otra: el rastreo se reparte entre dos formas de la misma página.
  trailingSlash: 'never',

  integrations: [
    sitemap({
      // Fuera: la imagen de OG y las páginas de invitación, que se sirven bajo
      // /u/* y /r/* y no tienen una URL propia que valga la pena indexar.
      // Se normaliza la barra final: con `trailingSlash: 'never'` las rutas
      // llegan sin ella, pero el filtro no puede depender de eso.
      filter: (page) => !FUERA_DEL_SITEMAP.has(new URL(page).pathname.replace(/\/$/, '')),
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],

    // Todas las dependencias que usan las islas, declaradas de entrada.
    //
    // Sin esto, Vite las descubre a medida que aparecen: la primera vez que se
    // visita una página con una dependencia nueva, re-optimiza y devuelve
    // `504 Outdated Optimize Dep` en todo lo que ya había servido. En el
    // navegador eso se ve como islas que no hidratan (animaciones muertas) y
    // componentes sin sus estilos, y no se arregla recargando: hay que matar
    // el servidor y borrar `node_modules/.vite`. Pasó tres veces en un día.
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'motion/react',
        'three',
        '@react-three/fiber',
        'gsap',
        'gsap/ScrollTrigger',
        'lenis',
        'lucide-react',
        'clsx',
        'tailwind-merge',
      ],
    },
  },
});
