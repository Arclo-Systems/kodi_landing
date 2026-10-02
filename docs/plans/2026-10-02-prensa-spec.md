# Spec: sección "Kodi en las noticias"

Estado: aprobada por el founder el 2026-10-02 (defaults: `noopener noreferrer`, sin entrada en el
menú). Auditada el mismo día (ver "Auditoría (F1)").

## Objetivo

Mostrar en la home de `holakodi.com` las notas de prensa que hablaron de Kodi, como prueba social
para quien todavía no descargó la app. Cada nota enlaza a la publicación original del medio.

Notas iniciales (datos leídos de cada página el 2026-10-02):

| Medio          | Titular de la nota                                                                                    | Fecha      | URL                                                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| El Financiero  | Esta app puede ayudarle en sus exámenes de admisión a universidades, de manejo y del MEP              | 2026-10-02 | https://www.elfinancierocr.com/tecnologia/esta-app-puede-ayudarle-en-sus-examenes-de/3PFRLCUYUZAAHJ3X43TXCPDHRU/story/         |
| NTG Costa Rica | Talento de Tilarán crea Kodi, una aplicación que busca cambiar la forma de estudiar para los exámenes | 2026-09-30 | https://ntgcostarica.com/talento-de-tilaran-crea-kodi-una-aplicacion-que-busca-cambiar-la-forma-de-estudiar-para-los-examenes/ |

## Decisiones del founder (2026-10-02)

- Ubicación: después del Manifiesto, antes de Exámenes.
- Tratamiento: solo texto (medio, titular de la nota, fecha, enlace). Sin fotos ni logos de terceros.
- Titular de la sección: "Kodi en las noticias".

## Criterios de aceptación

1. La home muestra una `<section id="prensa">` con un `<h2 class="titular-seccion">` "Kodi en las
   noticias", entre `Manifiesto` y `Examenes` (AUD-S-5). Sin bajada.
2. Cada nota muestra el nombre del medio, el titular literal de la nota y la fecha en formato
   legible en español (p. ej. "2 de octubre de 2026"), dentro de `<time datetime="AAAA-MM-DD">`.
   Las notas van en `<ul role="list">` / `<li>` (patrón de `[examen].astro:67`).
3. Toda la nota es un único enlace a la URL original, con `target="_blank"` y
   `rel="noopener noreferrer"` (convención del sitio, AUD-S-1). El aviso de pestaña nueva va como
   `<span class="oculto">` dentro del enlace (patrón de `Pie.astro:64` y `Tarjeta.astro:25`), con el
   texto en `copy.ts`; **sin `aria-label`**, para que el nombre accesible sea el texto visible más el
   aviso (AUD-S-2).
4. Las notas se ordenan de la más reciente a la más vieja, sin depender del orden en el archivo y
   sin mutar el arreglo de datos.
5. Agregar una nota nueva = agregar un objeto en `src/data/prensa.ts`; ninguna plantilla cambia.
6. Si la lista está vacía, la sección no se renderiza (guarda `notas.length > 0` en la plantilla;
   se verifica en la revisión del diff, AUD-S-8).
7. Área táctil ≥ 44 px, `:focus-visible` del sitio, contraste AA, tokens de `src/styles/global.css`
   (`--caja`, `--pad-seccion`, `--aire-seccion`, `--ritmo-*`, `--e-*`, colores; sin valores a mano,
   AUD-S-7), legible a 360 px sin scroll horizontal; señal de presión con la clase existente
   `.pulsable--texto` (ya trae `transform`/`opacity` y su `prefers-reduced-motion`); cualquier
   transición propia, solo `transform`/`opacity` con `--salida` y apagada con
   `prefers-reduced-motion`.
8. Sin assets nuevos, sin dependencias nuevas, sin JS en cliente (componente Astro estático, sin
   `client:*` ni `<script>`).

## Stack

Astro 7 (componente `.astro` sin isla), TypeScript, CSS con tokens de `src/styles/global.css`,
Vitest (jsdom) y Playwright.

## Comandos

- Typecheck: `npm run check`
- Unit: `npm test` (o puntual: `npx vitest run tests/unit/prensa.test.ts`)
- E2E humo: `npx playwright test tests/e2e/humo.spec.ts` (con OK, regla 7; el `webServer` de
  `playwright.config.ts` hace `build` + `preview` en :4321 y reusa un server ya levantado ahí)
- Formato: `npm run formato:revisar`
- Sin secretos: `npm run verificar`
- Build (checkpoint): `npm run build`
- Lint: **no existe** script ni configuración de ESLint en la landing (AUD-S-6); el gate de la regla 7
  queda en typecheck + formato + tests + build.

## Estructura

- `src/data/prensa.ts` — datos, `notasOrdenadas(notas = NOTAS)` (copia ordenada por fecha
  descendente; las fechas ISO `AAAA-MM-DD` ordenan como texto) y `fechaLegible()` con
  `Intl.DateTimeFormat('es-CR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })`
  (AUD-S-3). No hay helper reutilizable en el repo (AUD-S-4).
- `src/data/copy.ts` — `prensa.titular` ("Kodi en las noticias") y `prensa.pestanaNueva`
  ("(se abre en una pestaña nueva)", mismo texto que el resto del sitio).
- `src/components/secciones/Prensa.astro` — la sección. Caja como las vecinas: `max-width:
var(--caja)`, `padding-inline: var(--pad-seccion)`, `padding-bottom: var(--aire-seccion)` y sin
  padding superior (`Fuentes.astro:44-48`, `Preguntas.astro:57-61`); el `scroll-margin-top` del ancla
  ya lo pone `section[id]` (`global.css:569`).
- `src/pages/index.astro` — se monta `<Prensa />` después de `<Manifiesto />` y se actualiza el
  comentario de cabecera ("Diez secciones" → once, nombrando la de prensa).
- `tests/unit/prensa.test.ts` — orden, no mutación, formato de fecha, fechas válidas y URLs https.

## Estilo de código

Igual que `faq.ts` / `tiendas.ts`: `interface` con campos `readonly`, arreglo `readonly`, nombres en
español, sin `any`. Texto visible solo en `src/data/` (regla de `copy.ts`).

```ts
interface NotaPrensa {
  readonly medio: string;
  readonly titular: string;
  /** ISO `AAAA-MM-DD`, fecha de publicación de la nota. */
  readonly fecha: string;
  readonly url: string;
}
```

## Estrategia de pruebas

- Unit (TDD, rojo → verde), en `tests/unit/` (único `include` de `vitest.config.ts`):
  - `notasOrdenadas` ordena descendente con datos de prueba desordenados y no muta la entrada;
  - `fechaLegible('2026-10-02')` → "2 de octubre de 2026" con cualquier zona del proceso (el test
    tiene que fallar si se quita `timeZone: 'UTC'`: en una máquina en hora de Costa Rica da
    "1 de octubre de 2026", AUD-S-3);
  - cada `fecha` de `NOTAS` cumple `/^\d{4}-\d{2}-\d{2}$/` y es una fecha real (no `NaN`);
  - cada `url` de `NOTAS` parsea con `new URL()` y tiene `protocol === 'https:'`.
- Sin test de componente: la Container API de Astro es experimental y pide entorno `node` en vez de
  `jsdom`; sumarla es infraestructura nueva (preguntar). El criterio 6 se verifica en el diff.
- E2E: el humo existente sigue verde (sin enlaces muertos, sin corchetes).
- Visual: la hace el founder.

## Límites

- Siempre: copy literal de los medios (no se reescriben titulares ajenos); voseo en el copy propio.
- Preguntar: agregar fotos/logos de medios, agregar la sección al menú del encabezado, cambiar el
  titular de la sección.
- Nunca: hotlinkear imágenes de los medios, citar texto que no esté en la nota, agregar dependencias.

## Canal de entrega

Landing → F8.2 (Vercel, push a `main`). Sin backend ni app.

## Preguntas abiertas

- ~~¿Se agrega "Noticias" al menú del encabezado?~~ Cerrada 2026-10-02: no.

## Auditoría (F1)

2026-10-02. Skills invocadas: `spec-driven-development`, `source-driven-development`,
`security-and-hardening`, `code-review-and-quality`. Context7: `/mdn/content`, `/withastro/docs`.
Stack leído de `package.json`: `astro ^7.3.2`, `vitest ^5.0.0`, `@playwright/test ^1.63.0`,
`typescript ^6.0.3`.

**Seis áreas:** objetivo, comandos, estructura, estilo, pruebas y límites presentes. Criterios 1-5 y 8
verificables por test o diff; 6 por diff (AUD-S-8); 7 lo cierra la revisión visual del founder.

| ID       | Sev.  | Hallazgo                                                                                                                                                                                                                                                                                                            | Etiqueta y evidencia                                                                                                                                                                                                                                                                                                             | Cambio en la spec                                                                                                                                     |
| -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| AUD-S-1  | Media | La spec pedía `rel="noopener"`; el sitio usa `noopener noreferrer` en todo enlace externo. `target="_blank"` ya implica `noopener`; `noreferrer` además omite el `Referer` (el medio no ve que la visita vino de holakodi.com). Se elige consistencia con el sitio                                                  | DEMOSTRADA (por código): `Pie.astro:60,79`, `Tarjeta.astro:16`, `islas/MenuPildora.tsx:244`. DEMOSTRADA (docs): Context7 `/mdn/content`, `web/html/reference/attributes/rel/noopener` ("Setting `target="_blank"` … implicitly provides the same `rel` behavior as … `noopener`") y `rel/noreferrer`                             | Criterio 3. Si el founder quiere que los medios vean el tráfico referido, sería solo `noopener`: decisión suya                                        |
| AUD-S-2  | Media | "Nombre accesible que diga que abre otra pestaña" sin mecanismo. Un `aria-label` en el enlace reemplazaría el texto visible (WCAG 2.5.3, nombre que contiene la etiqueta). El sitio ya resuelve esto con `<span class="oculto">(se abre en una pestaña nueva)</span>`                                               | DEMOSTRADA (por código): `Pie.astro:64,81`, `Tarjeta.astro:25`, `.oculto` en `global.css:210`                                                                                                                                                                                                                                    | Criterio 3 y `copy.ts` → `prensa.pestanaNueva`. FYI: ese texto está escrito a mano en 3 plantillas (contra la regla de `copy.ts:1-6`); no se toca acá |
| AUD-S-3  | Alta  | `new Date('2026-10-02')` es medianoche UTC; formateado sin `timeZone` en hora de Costa Rica da el día anterior. Con `timeZone: 'UTC'` da la fecha correcta                                                                                                                                                          | DEMOSTRADA (ejecutada, Node v24.13.0, zona `America/Costa_Rica`): sin `timeZone` → "1 de octubre de 2026"; `UTC` → "2 de octubre de 2026". DEMOSTRADA (docs): Context7 `/mdn/content`, `Date.parse` ("Date-only strings imply UTC") e `Intl.DateTimeFormat` (opción `timeZone`). Mismo criterio que `DocumentoLegal.astro:69-77` | Estructura (`fechaLegible`) y test que falla sin `timeZone`                                                                                           |
| AUD-S-4  | Baja  | DRY: ¿hay helper de fechas reutilizable? `fechas-examenes.ts` solo cuenta días (`diasRestantes`), no formatea. El único formateador (`FORMATO_FECHA`) vive dentro del `<script>` de cliente de `DocumentoLegal.astro`, no importable. Con dos usos no se justifica extraer un módulo común                          | DEMOSTRADA (por código): `src/data/fechas-examenes.ts:51-54`, `DocumentoLegal.astro:46,72`; `grep Intl\.` en `src/` → solo ese                                                                                                                                                                                                   | `fechaLegible` va en `prensa.ts`. Si aparece un tercer uso, extraer a `src/lib/`                                                                      |
| AUD-S-5  | Media | Convención de anclas: toda sección con titular visible lleva `id` (`inicio`, `examenes`, `fuentes`, `como`, `paises`, `precios`, `faq`, `descargar`); solo `Manifiesto` (sin titular) usa `aria-label`. La spec no daba `id`                                                                                        | DEMOSTRADA (por código): `grep "<section" src/components/secciones`; `section[id]` aplica `scroll-margin-top` en `global.css:569-571`                                                                                                                                                                                            | Criterio 1: `id="prensa"`                                                                                                                             |
| AUD-S-6  | Media | No hay lint en la landing: ni script `lint` ni config de ESLint. La regla 7 pide "typecheck + lint + tests"                                                                                                                                                                                                         | DEMOSTRADA (ejecutada): `package.json` (scripts) sin `lint`; `ls eslint.config.* .eslintrc*` → nada                                                                                                                                                                                                                              | Comandos: se declara el hueco y se suma `npm run verificar`. Agregar ESLint es dependencia nueva: preguntar aparte, fuera de esta tarea               |
| AUD-S-7  | Baja  | "Tokens de `DESIGN.md`": los de caja de sección (`--caja`, `--pad-seccion`, `--aire-seccion`) están en `global.css` y no en `DESIGN.md`. `.titular-seccion` y `.bajada-seccion` existen                                                                                                                             | DEMOSTRADA (por código): `global.css:106-108`, `:546`, `:558`; `DESIGN.md` sin esos tokens. FYI: `DESIGN.md` "Tipografía" dice familia única Nunito, pero los titulares usan Geist (`global.css:63`); doc desactualizado, fuera de alcance                                                                                       | Criterio 7 y Estructura (caja como `Fuentes`/`Preguntas`)                                                                                             |
| AUD-S-8  | Baja  | El criterio 6 (lista vacía) no tiene prueba: el componente lee los datos del módulo y testearlo pide la Container API de Astro, experimental y con entorno `node` (el proyecto usa `jsdom`)                                                                                                                         | DEMOSTRADA (docs): Context7 `/withastro/docs`, `guides/testing` y `reference/container-reference` (`experimental_AstroContainer`); `vitest.config.ts` (`environment: 'jsdom'`)                                                                                                                                                   | Criterio 6 y Pruebas: verificación en el diff                                                                                                         |
| AUD-S-9  | Info  | Astro 7: un `.astro` sin `client:*` ni `<script>` no envía JS                                                                                                                                                                                                                                                       | DEMOSTRADA (docs): Context7 `/withastro/docs`, `basics/astro-components` ("they don't render on the client … zero JavaScript footprint added by default")                                                                                                                                                                        | Criterio 8 precisado                                                                                                                                  |
| AUD-S-10 | Info  | Seguridad: no hay input de usuario; datos estáticos versionados. Las expresiones `{}` de Astro escapan el texto; la spec no usa `set:html`. Superficie: solo los enlaces externos (AUD-S-1) y que una URL mal escrita apunte a otro esquema, cubierto por el test `https:`. Sin PII, sin secretos, sin dependencias | DEMOSTRADA (por código): la spec no agrega `set:html` ni `<script>`. DEMOSTRADA (docs): Context7 `/withastro/docs`, `reference/directives-reference` (`{texto}` sale escapado; `set:html` "is not automatically escaped")                                                                                                        | Pruebas: test de URL con `new URL()`                                                                                                                  |
| AUD-S-11 | Info  | Titulares y fechas de las dos notas coinciden con las páginas                                                                                                                                                                                                                                                       | DEMOSTRADA (ejecutada, WebFetch 2026-10-02): NTG → h1 literal, "30 de septiembre de 2026"; El Financiero → h1 literal, "02 de octubre 2026, 07:00 a. m." (resumido por el fetcher; el founder lo confirma a ojo)                                                                                                                 | —                                                                                                                                                     |
| AUD-S-12 | Nit   | El comentario de cabecera de `index.astro` dice "Diez secciones" y las enumera                                                                                                                                                                                                                                      | DEMOSTRADA (por código): `src/pages/index.astro:2-4`                                                                                                                                                                                                                                                                             | Estructura: actualizarlo                                                                                                                              |
| AUD-S-13 | Info  | Orden de secciones y comandos de la spec                                                                                                                                                                                                                                                                            | DEMOSTRADA (por código): `index.astro` monta `Hero, Video, Manifiesto, Examenes, …`; `check`, `test`, `build`, `formato:revisar` existen en `package.json`; `tests/e2e/humo.spec.ts` existe                                                                                                                                      | —                                                                                                                                                     |
