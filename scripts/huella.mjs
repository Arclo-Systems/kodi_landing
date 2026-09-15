// Huella del texto visible de cada página construida.
//
// Sirve para probar que una actualización de framework no cambió lo que la
// gente lee. Compara TEXTO, no HTML: el `href` de la hoja de estilos lleva
// hash de contenido y cambia en cada build aunque nada más cambie, así que
// comparar el HTML crudo siempre daría distinto y no probaría nada.
//
//   node scripts/huella.mjs guardar   → escribe ../.landing-huella.json
//   node scripts/huella.mjs comparar  → compara el build de ahora contra ese archivo
//
// Se borra en la tarea 12: es andamio de la actualización, no del producto.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const PAGINAS = [
  ['index', 'dist/index.html'],
  ['privacidad', 'dist/privacidad/index.html'],
  ['terminos', 'dist/terminos/index.html'],
  ['eliminar-cuenta', 'dist/eliminar-cuenta/index.html'],
  ['bases', 'dist/bases/index.html'],
  ['invitacion', 'dist/invitacion/index.html'],
  ['invitacion-perfil', 'dist/invitacion-perfil/index.html'],
];

const SALIDAS = [
  'dist/sitemap-index.xml',
  'dist/app-ads.txt',
  'dist/robots.txt',
  'dist/og.png',
  'dist/favicon.svg',
  'dist/.well-known/assetlinks.json',
];

const ARCHIVO = '../.landing-huella.json';

function textoVisible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function huella() {
  const paginas = {};
  for (const [nombre, ruta] of PAGINAS) {
    if (!existsSync(ruta)) {
      paginas[nombre] = { falta: true };
      continue;
    }
    const texto = textoVisible(readFileSync(ruta, 'utf8'));
    paginas[nombre] = {
      chars: texto.length,
      sha: createHash('sha256').update(texto).digest('hex').slice(0, 16),
      inicio: texto.slice(0, 90),
    };
  }
  const salidas = Object.fromEntries(SALIDAS.map((f) => [f, existsSync(f)]));
  return { paginas, salidas };
}

const modo = process.argv[2];

if (modo === 'guardar') {
  const h = huella();
  writeFileSync(ARCHIVO, JSON.stringify(h, null, 2));
  for (const [nombre, d] of Object.entries(h.paginas)) {
    console.log(d.falta ? `FALTA  ${nombre}` : `${String(d.chars).padStart(6)} chars  ${nombre}`);
  }
  console.log('\nGuardado en', ARCHIVO);
} else if (modo === 'comparar') {
  if (!existsSync(ARCHIVO)) {
    console.error('No hay huella guardada. Corré primero: node scripts/huella.mjs guardar');
    process.exit(1);
  }
  const antes = JSON.parse(readFileSync(ARCHIVO, 'utf8'));
  const ahora = huella();
  let problemas = 0;

  for (const [nombre, a] of Object.entries(antes.paginas)) {
    const b = ahora.paginas[nombre];
    if (!b || b.falta) {
      console.log(`FALTA   ${nombre}  <-- la página desapareció`);
      problemas++;
    } else if (a.sha === b.sha) {
      console.log(`IGUAL   ${nombre}`);
    } else {
      console.log(`CAMBIÓ  ${nombre}  (${a.chars} -> ${b.chars} chars)`);
      problemas++;
    }
  }

  for (const [f, existia] of Object.entries(antes.salidas)) {
    const existe = ahora.salidas[f];
    if (existia && !existe) {
      console.log(`FALTA   ${f}  <-- salida perdida`);
      problemas++;
    }
  }

  console.log(problemas === 0 ? '\nSin diferencias.' : `\n${problemas} diferencia(s) que revisar.`);
  process.exit(problemas === 0 ? 0 : 1);
} else {
  console.error('Uso: node scripts/huella.mjs guardar|comparar');
  process.exit(1);
}
