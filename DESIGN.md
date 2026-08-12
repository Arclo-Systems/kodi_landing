# DESIGN.md — landing de Kodi

Tokens y reglas de la landing (`holakodi.com`). Todo vive en `src/styles/global.css` (`:root`).
Si un valor no está acá, no se escribe a mano en una regla: primero se agrega el token.

## Color

| Token | Valor | Uso |
|---|---|---|
| `--superficie` | `#fafafa` | fondo de página |
| `--tarjeta` | `#ffffff` | fondo de tarjeta |
| `--tinta` | `#141f25` | texto principal y **fondo de la banda del pie** |
| `--tinta-suave` | `#525252` | texto secundario (7.49:1 sobre superficie) |
| `--borde` | `#e5e5e5` | bordes y reglas finas |
| `--teal` | `#408d99` | marca: titulares ≥24 px, wordmark, `:focus-visible` |
| `--teal-texto` | `#2c6a74` | **todo texto teal por debajo de 24 px** (5.9:1 sobre superficie, AA) |
| `--tiktok` / `--instagram` / `--facebook` | — | acentos de tarjeta de red |

Regla de contraste: **nada de teal `--teal` en texto menor a 24 px** — no llega a 4.5:1.

## Espaciado

Escala base 4 px, progresión ~1.5x. Nueve pasos, `--e-1` … `--e-9`:
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px.

Ritmo semántico, **siempre en `vw`, nunca en `vh`** (el aire de la página no depende
del alto de la ventana):

| Token | Rango | Cuándo |
|---|---|---|
| `--ritmo-grupo` | 12→16 | entre elementos del mismo grupo (titular ↔ bajada, rótulo ↔ tarjetas) |
| `--ritmo-bloque` | 24→32 | entre grupos (hero ↔ tiendas ↔ redes) |
| `--ritmo-seccion` | 48→64 | entre secciones (contenido ↔ pie) |
| `--pad-x` / `--pad-y` | 24→64 / 32→48 | canaleta de `.pantalla`; **sin padding inferior**: el que cierra la página es el del pie |

Los rangos están calibrados para que el desktop siga viéndose como el sitio original
(ahí el ritmo estaba bien) y el que gana aire sea el móvil, que era donde todo se
amontonaba a 16 px planos.

`--ritmo-grupo` es **exactamente la mitad** de `--ritmo-bloque` en cualquier viewport
(12/24 · 2vw/4vw · 16/32). Solo existen esos dos niveles: en el inspector de gaps las
bandas se leen sistemáticas, la chica adentro de cada grupo y la grande idéntica entre
grupos. Eso es lo que hace que se lea qué va junto y qué va aparte.

Cuidado con el titular: `line-height: 0.88` recorta su caja por encima de la tinta, así
que los descendentes se comen la banda del gap. `.titular` lleva `padding-bottom: 0.08em`
(el sobrante medido con las métricas reales de Nunito 900) para que la caja termine donde
termina la tinta.

## Tipografía

- Familia única: **Nunito Variable** (`--sub`, `--hero` para los pasos fluidos).
- Cuerpo 16 px / `line-height` 1.5; medida de línea tope ~72ch (`36rem` en las legales).
- Escala con ratio ≥1.25 entre pasos. Título de sección legal 20 px contra cuerpo de 16.
- `text-wrap: balance` en titulares y bajadas de 2–3 líneas.

## Interacción

- Área táctil mínima **44 px** en todo lo que se toque (padding, nunca agrandando el texto).
- `:focus-visible` con outline de 3 px teal y offset de 4.
- Transiciones solo en `transform` / `opacity`, con `--salida`; `prefers-reduced-motion` las apaga.

## Reglas del founder

Sin negro puro, sin café, sin píldoras decorativas, sin assets pesados, "Kodi" sin tilde,
voseo. El copy de marketing lo decide el founder: no se reescribe titular ni bajada sin su OK.
