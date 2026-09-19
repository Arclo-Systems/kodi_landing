/**
 * Reduce las imágenes de la landing al tamaño que de verdad se dibuja.
 *
 * Los avatares del campo de órbitas venían a 801px para fichas de 50, y los
 * iconos de módulo a 1501 para dibujarse a 230 como mucho. Se guardan aparte
 * para no tocar los originales, que son copia de los de la app.
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

// El lado sale de lo que se dibuja: la ficha del campo mide 131px como mucho
// y su recuadro 1,5 veces eso, y el arte de módulo llega a 230 en la vista
// previa. El doble de eso cubre las pantallas de mucha densidad.
const TAREAS = [
  {
    desde: 'public/app/perfil',
    hacia: 'public/app/campo',
    lado: 256,
    calidad: 65,
    filtro: (n) => n.endsWith('.webp'),
  },
  {
    desde: 'public/app',
    hacia: 'public/app/chico',
    lado: 512,
    calidad: 72,
    filtro: (n) => n.startsWith('modulo-') && n.endsWith('.webp'),
  },
];

const kb = (n) => Math.round(n / 102.4) / 10;

for (const tarea of TAREAS) {
  await mkdir(tarea.hacia, { recursive: true });
  const nombres = (await readdir(tarea.desde)).filter(tarea.filtro);
  let antes = 0;
  let despues = 0;

  for (const nombre of nombres) {
    const origen = join(tarea.desde, nombre);
    const destino = join(tarea.hacia, nombre);
    antes += (await stat(origen)).size;
    await sharp(origen)
      .resize(tarea.lado, tarea.lado, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: tarea.calidad, effort: 6 })
      .toFile(destino);
    despues += (await stat(destino)).size;
  }

  console.log(`${tarea.hacia}: ${nombres.length} imágenes, ${kb(antes)} kB → ${kb(despues)} kB`);
}
