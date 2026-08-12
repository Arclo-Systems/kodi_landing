# Enlaces universales (iOS) y App Links (Android)

Los archivos que hacen que `holakodi.com/u/*` y `holakodi.com/r/*` abran la app viven en
`public/.well-known/` y se publican tal cual al desplegar:

| Archivo | URL pública | Plataforma |
| --- | --- | --- |
| `public/.well-known/apple-app-site-association` | `https://holakodi.com/.well-known/apple-app-site-association` | iOS |
| `public/.well-known/assetlinks.json` | `https://holakodi.com/.well-known/assetlinks.json` | Android |

El primero va **sin extensión** a propósito y `vercel.json` le fuerza el
`Content-Type: application/json` que exige Apple.

## Pendiente 1 — Team ID de Apple

`apple-app-site-association` tiene el placeholder literal `TEAMID`:

```json
"appIDs": ["TEAMID.com.holakodi.app"]
```

Se reemplaza por el Team ID de la cuenta de Apple Developer (10 caracteres
alfanuméricos, por ejemplo `A1B2C3D4E5`). Dónde encontrarlo:

- <https://developer.apple.com/account> → **Membership details** → *Team ID*, o
- App Store Connect → **Users and Access** → *Integrations* → el prefijo del App ID.

El resultado queda `A1B2C3D4E5.com.holakodi.app`. Es el único cambio: el bundle
identifier `com.holakodi.app` ya es el definitivo.

> Bloqueado hasta que se complete el enrollment de Apple Developer.

Ojo con el orden: iOS no lee el archivo desde el dominio, lo lee desde la CDN de
Apple (`app-site-association.cdn-apple.com`) y fija la asociación al instalar o
actualizar la app. Un archivo publicado con `TEAMID` puede quedar cacheado ahí, así
que después de poner el Team ID real hay que volver a consultar la CDN (comando más
abajo) y no dar por bueno el `curl` al dominio propio. Para probar sin esperar a la
CDN, en la app se usa `applinks:holakodi.com?mode=developer`.

## ~~Pendiente 2~~ — Huella SHA-256 de Android ✅ resuelto

`assetlinks.json` ya lleva la huella real del keystore de EAS (clave de subida), así
que del lado de Android no queda nada por rellenar. Para volver a obtenerla:

```bash
eas credentials
# → plataforma: Android
# → perfil de build: production
# → Keystore: Download / View existing → "SHA256 Fingerprint"
```

Formato: 32 pares hexadecimales separados por dos puntos, en mayúsculas
(`AB:CD:EF:...`).

`sha256_cert_fingerprints` es un arreglo y admite varias huellas a la vez. Hoy tiene
una sola, y hay que **sumar** —no reemplazar— en estos casos:

1. Si se activa **Play App Signing**, la del certificado con el que Google refirma:
   Play Console → *Release* → *Setup* → *App signing* → **App signing key
   certificate** → SHA-256. Sin esta, los enlaces dejan de verificar en las
   instalaciones bajadas de Play, aunque funcionen en el APK propio.
2. Opcionalmente la del keystore de debug, para probar en desarrollo.

## Verificación después de desplegar

```bash
# 200, application/json y sin redirects (Android no sigue redirects)
curl -sSI https://holakodi.com/.well-known/apple-app-site-association
curl -sSI https://holakodi.com/.well-known/assetlinks.json

# Lo que realmente cachea Apple
curl -sS https://app-site-association.cdn-apple.com/a/v1/holakodi.com

# Validador de Google
curl -sS "https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://holakodi.com&relation=delegate_permission/common.handle_all_urls"
```

## Antes de completar los placeholders: dos cosas que arreglar en la app

Mientras el `appID` diga `TEAMID`, este archivo no matchea ninguna app y por lo tanto
no hace nada. Ese es el margen que hay para cerrar estos dos puntos, **que viven en
`frontend/app.json`, no acá**. Si se rellenan los placeholders sin resolverlos, los
enlaces salen peor que hoy.

### 1. `www` no puede servir estos archivos

`www.holakodi.com` no está asignado al proyecto `kodi-landing` en Vercel: hoy responde
307 hacia el apex y su certificado solo cubre `holakodi.com` (falla el handshake TLS).
Ni Apple ni Google siguen redirects para estos archivos.

Sin embargo la app ya declara ese host en los dos lados:

- `ios.associatedDomains`: `applinks:www.holakodi.com`
- `android.intentFilters`: host `www.holakodi.com` con `autoVerify: true`

En Android 11 y anteriores la verificación es todo-o-nada: si **algún** host declarado
no resuelve su `assetlinks.json`, falla también el apex, que está perfecto. Salidas:
sacar `www` de `app.json` (lo barato), o asignar `www.holakodi.com` al proyecto en
Vercel → *Settings* → *Domains* sin redirect, para que sirva el sitio directo.

### 2. `/r/` está reclamado acá pero la app no lo atiende

Este AASA reclama `/r/*`, pero `frontend/src/lib/deepLinks.ts` decide explícitamente
no resolver `/r/` (la app no sabe canjear un código de referido) y en Android el
intent filter solo declara `pathPrefix: "/u/"`. Con el Team ID puesto, un enlace de
referido en iOS abriría la app y caería en una ruta sin match, y de paso la web ya no
lo recibiría.

Antes de poner el Team ID: o la app aprende a canjear referidos (resolver + pantalla +
`pathPrefix: "/r/"` en Android), o se borra el bloque `/r/*` de este AASA.

Ahora que `/r/*` tiene página propia, borrarlo del AASA salió barato: quien abra una
invitación en iOS cae en una página que le muestra el código, no en una ruta sin match
adentro de la app.

## Página de aterrizaje para quien no tiene la app

`holakodi.com/u/*` y `/r/*` ya no devuelven el 404 en texto plano de Vercel: sirven una
página de invitación. Es lo que ve quien abre el enlace **sin** la app instalada
(escritorio, navegador embebido de WhatsApp, Android antes de verificar). Los enlaces
universales no se ven afectados: iOS y Android matchean por patrón de URL y actúan
antes de que el navegador pida nada.

| Ruta pública | Rewrite en `vercel.json` | Página que la genera |
| --- | --- | --- |
| `/u/<código>` | `/invitacion-perfil/index.html` | `src/pages/invitacion-perfil.astro` |
| `/r/<código>` | `/invitacion/index.html` | `src/pages/invitacion.astro` |

Las dos usan el mismo componente (`src/components/Invitacion.astro`) y solo cambian el
copy, que vive en `src/data/invitacion.ts`.

Detalles que conviene no romper:

- El sitio es **estático**: no hay rutas dinámicas de Astro que puedan resolver un
  código arbitrario. Por eso la traducción `/r/<lo que sea>` → página fija se hace con
  rewrites de Vercel, no con `getStaticPaths`.
- El destino apunta al archivo (`/invitacion/index.html`) y no a la ruta limpia
  (`/invitacion`) a propósito: es un archivo que existe literalmente en `dist/`, así que
  no depende de cómo Vercel resuelva los índices de directorio después del rewrite.
- Los rewrites **no tocan `/.well-known/*`** (los `source` empiezan por `/u/` y `/r/`) y
  además solo se evalúan cuando ningún archivo estático matcheó. Los headers de
  `Content-Type` de los dos archivos de arriba siguen igual, en el mismo `vercel.json`.
- Las dos rutas llevan un código de amigo (`friendLink()` en
  `frontend/src/lib/links.ts` comparte `holakodi.com/u/KODI-XXXXXX`), así que las dos
  páginas lo rescatan de `location.pathname` con un script inline mínimo, sin llamar a
  ninguna API. Se **valida el formato canónico** —`KODI-` + 6 caracteres del alfabeto
  sin I, L, O, 0 ni 1, el que genera `backend/src/modules/auth/auth.service.ts`— en vez
  de limpiar lo que venga: si no calza, no se muestra nada. Así `/r/PREMIUM-GRATIS` no
  puede pintar el texto que se le antoje con la tipografía y el dominio de Kodi. Lo que
  sí calza se pinta por `textContent`, nunca como marcado.
- Las dos páginas van con `noindex`, fuera del sitemap y **sin `canonical` ni `og:url`**:
  son una misma página servida bajo infinitas URLs de compartir, y declarar la URL del
  archivo (`/invitacion`) haría que las redes sociales compartieran un enlace sin el
  código.

## El día que la app se publique: dónde van las URLs de las tiendas

En **un solo lugar**: `src/data/tiendas.ts`.

```ts
export const TIENDAS: readonly Tienda[] = [
  { icono: 'appstore', nombre: 'App Store', url: null },
  { icono: 'googleplay', nombre: 'Google Play', url: null },
];
```

Se reemplazan los dos `null` por las URLs reales y no hay que tocar ninguna página: la
home y las dos páginas de invitación leen de ahí. Mientras sean `null`, las tarjetas se
pintan sin enlace (se ven, pero no llevan a ningún lado) y en las páginas de invitación
el rótulo dice "Muy pronto en"; con URL cambia solo a "Descargala en".
