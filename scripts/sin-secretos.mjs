// Guardarraíl: la licencia de React Bits no puede terminar en el sitio
// publicado. Se comprueba sobre `dist/`, que es lo que de verdad se sube, y no
// sobre el código: un import descuidado o una variable con prefijo público la
// hornearían en el bundle sin que nadie lo note.
//
//   node scripts/sin-secretos.mjs
//
// Corre en la última tarea antes de dar nada por terminado.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const PATRONES = [
  [/RBPS-[0-9A-F]{8}/i, 'licencia de React Bits'],
  [/REACTBITS_LICENSE_KEY\s*[:=]\s*["'][^"']+["']/i, 'variable de licencia con valor'],
];

const BINARIOS = /\.(png|jpe?g|webp|avif|gif|ico|woff2?|ttf|otf|mp4|pdf)$/i;

function* archivos(dir) {
  for (const entrada of readdirSync(dir)) {
    const ruta = join(dir, entrada);
    if (statSync(ruta).isDirectory()) yield* archivos(ruta);
    else if (!BINARIOS.test(entrada)) yield ruta;
  }
}

let fugas = 0;
for (const ruta of archivos('dist')) {
  const contenido = readFileSync(ruta, 'utf8');
  for (const [patron, nombre] of PATRONES) {
    if (patron.test(contenido)) {
      console.error(`FUGA: ${nombre} en ${ruta}`);
      fugas++;
    }
  }
}

if (fugas > 0) {
  console.error(`\n${fugas} fuga(s). NO publicar.`);
  process.exit(1);
}
console.log('dist limpio: ningún secreto en el sitio construido.');
