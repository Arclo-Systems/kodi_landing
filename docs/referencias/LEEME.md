# Componentes de referencia

Islas y componentes de React Bits que se probaron y no quedaron en la landing.
Vivían en `src/` sin una sola referencia desde ninguna página, plantilla o
prueba: unas 2.900 líneas que el editor, el `tsc` y las búsquedas seguían
tratando como código vivo.

Se guardan acá tal cual, por si alguna idea vuelve. **No se compilan**: la
carpeta `docs/` está fuera de `src/` y excluida de `tsconfig.json`.

| Archivo                | Qué era                                                | Vivía en                     |
| ---------------------- | ------------------------------------------------------ | ---------------------------- |
| `Telefono.tsx`         | Isla del marco de teléfono, sobre `device.tsx`.        | `src/components/islas/`      |
| `FondoHero.tsx`        | Isla del fondo del hero, sobre `infinite-gallery.tsx`. | `src/components/islas/`      |
| `PruebaPortal.tsx`     | Andamio de `scroll-portal.tsx`.                        | `src/components/islas/`      |
| `DriftWall.tsx`        | Muro de tarjetas a la deriva.                          | `src/components/react-bits/` |
| `tile-reveal.tsx`      | Revelado por mosaicos.                                 | `src/components/react-bits/` |
| `dolly-gallery.tsx`    | Galería con travelling de cámara.                      | `src/components/react-bits/` |
| `device.tsx`           | Marco de teléfono dibujado con CSS.                    | `src/components/react-bits/` |
| `infinite-gallery.tsx` | Galería infinita en WebGL.                             | `src/components/react-bits/` |
| `scroll-portal.tsx`    | Portal que se abre con el scroll.                      | `src/components/react-bits/` |

Si alguno vuelve, vuelve a `src/` y hay que revisarle los imports: varios usan
el alias `@/`, que sigue apuntando a `src/`.
