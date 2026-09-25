# Historial de deploys de la landing a producción

Registro de deploys a producción (`../../docs/standards/agent-skills-addy.md`, F7 y F8.2). Historial
reconstruido el **2026-09-25** con GitHub Deployments y la API de Vercel; desde ahí cada deploy suma una
fila según ["Regla desde ahora"](#regla-desde-ahora).

Proyecto Vercel `kodi-landing` (`prj_j3tFIRoEoSAwJgoWbxOowBDeOwGA`) · team Arclo Systems
(`team_pEivitBCkKy8SreGup1Vt8tl`) · framework `astro` · repo `Arclo-Systems/kodi_landing`, rama de
producción `main` · dominios `holakodi.com`, `www.holakodi.com` y `kodi-landing.vercel.app` (redirige a
`holakodi.com`).

## Fuentes y método

| Dato | Fuente | Cómo |
|---|---|---|
| Deploys a producción (lista completa) | API de GitHub Deployments, `environment=Production` + `statuses` | `gh api repos/Arclo-Systems/kodi_landing/deployments --paginate` → 37 Production, 10 Preview |
| Id, estado y datos en Vercel | `GET /v6/deployments?projectId=…&target=production` (vía `vercel api` y MCP `list_deployments`) | Devuelve **27**: faltan 10 de julio y agosto (ver "Rarezas") |
| Deploy actual | `GET /v9/projects/…` → `targets.production` | `dpl_4NGPMvMeSwuUDtvAUgYEumDVXBtb`, commit `f49b83b` = `origin/main` (verificado 2026-09-25) |
| Rollbacks / promotes | `lastRollbackTarget` y `lastAliasRequest` del proyecto + orden de commits | Ambos `null`; los 37 commits son ancestros de `origin/main` y cada uno desciende del anterior: la secuencia nunca retrocedió |
| Deploys fallidos | Statuses `Vercel` en los 92 commits de `origin/main` | 47 `success` (37 producción + 10 previews de `feat/landing-v2`), 0 `failure`/`error` |
| Versión | `git show <sha>:package.json`, `git tag` | `0.1.0` en los 37 (valor de plantilla, nunca se tocó); sin tags; sin `CHANGELOG` |

Semántica de Vercel consultada con `search_vercel_documentation` (vercel.com/docs/cli/list, retención;
vercel.com/docs/deployments/rollback-production-deployment). Context7 (`/openapi/openapi_vercel_sh`) no
devolvió la página de retención.

### Leyenda

- **Fecha (UTC):** alta del GitHub Deployment (≈ fin de la build).
- **Deployment:** `dpl_…` (13 primeros caracteres) si Vercel aún lo guarda; si no, el hash de su URL
  `kodi-landing-<hash>` con "(purgado)".
- **Estado:** `READY` = estado en Vercel; `GH success` = status del GitHub Deployment.
- **Versión:** `version` de `package.json` (sin significado: la landing no se versiona).
- **Tema (commits):** scope del Conventional Commit y commits que entraron respecto al deploy anterior.

## Resumen

- **37 deploys a producción**, 2026-07-31 01:05 → 2026-09-24 12:40 UTC, todos `success`, todos por push a
  `main`.
- **0 rollbacks, 0 promotes manuales, 0 builds fallidas** (DEMOSTRADA, ejecutada: ver fuentes).
- **Actual:** #37, `dpl_4NGPMvMeSwuUDtvAUgYEumDVXBtb`, `f49b83b` "política con la medición de Meta
  aprobada por el abogado".
- Etapas: pre-lanzamiento (#1-#6, 07-31) → legales, borrado de cuenta y App Links (#7-#15, agosto) →
  legales 2026-09-03.1 y `app-ads.txt` (#16-#17) → AASA de iOS (#18) → **landing v2** (#19, 31 commits,
  2026-09-19 17:06) → arreglos de scroll y alto de ventana (#20-#26) → página de empresas y OG (#27-#28) →
  SEO y 6 páginas nuevas (#29-#32) → enlaces a tiendas (#33-#36) → privacidad con Meta (#37).

## Rarezas

1. **Retención de Vercel:** `deploymentExpiration` = 30 días y `deploymentsToKeep: 10`. Vercel ya no
   lista 10 deploys (#1, #2, #3, #5, #7, #10, #12, #13, #14 y #15) pero sí conserva otros igual de viejos
   (#4, #6, #8, #9, #11). Por qué purgó unos y no otros: NO DEMOSTRADA (cerrar en Settings → Security →
   Deployment Retention). La fuente completa es GitHub Deployments.
2. **Un mes sin deploys:** entre el 2026-08-13 (#15) y el 2026-09-12 (#16).
3. **Ráfaga del 2026-09-20:** 8 deploys (#21-#28) en ~2 h (06:17-08:21) iterando en producción el rebote de scroll
   y el alto de ventana, cada uno como merge de `feat/landing-v2` a `main`. El depurador de scroll
   (`?depurar=1`, `975025e`) entró en producción en #21 (merge `1611b52`) y **sigue en `origin/main`**
   (`src/components/Depurador.astro`); que siga activo en `holakodi.com` es NO DEMOSTRADO (no se abrió el
   sitio).
4. **`package.json` en `0.1.0`** en todos los deploys y sin CHANGELOG: no hay forma de nombrar un release
   que no sea el commit.
5. **`isRollbackCandidate`** es `true` solo en #36 y #37.

## Tabla cronológica

| # | Fecha (UTC) | Deployment | Estado | Commit | Mensaje corto | Versión | Actual | Tema (commits) |
|---|---|---|---|---|---|---|---|---|
| 1 | 2026-07-31 01:05 | `kodi-landing-265pmmdff` (purgado) | GH success | `6016021` | pantalla de pre-lanzamiento de Kodi | 0.1.0 | no | feat (1) |
| 2 | 2026-07-31 01:06 | `kodi-landing-rhb2gs511` (purgado) | GH success | `080459a` | dominio holakodi.com, canonical absoluto y sitemap | 0.1.0 | no | feat (1) |
| 3 | 2026-07-31 01:20 | `kodi-landing-ot9kacqin` (purgado) | GH success | `35f91f5` | logo pegado al titular en celular y footer de derechos | 0.1.0 | no | fix (1) |
| 4 | 2026-07-31 01:23 | `dpl_3sZPzFupj` | READY · GH success | `8af4cf5` | redes sociales en una sola fila en movil | 0.1.0 | no | style (1) |
| 5 | 2026-07-31 01:27 | `kodi-landing-fyhiags78` (purgado) | GH success | `61b42ee` | redes apiladas en movil | 0.1.0 | no | style (1) |
| 6 | 2026-07-31 01:29 | `dpl_5t7Lxko9o` | READY · GH success | `140426a` | tarjetas de redes con ancho parejo y centradas en movil | 0.1.0 | no | style (1) |
| 7 | 2026-08-06 00:33 | `kodi-landing-f2qetun3x` (purgado) | GH success | `866e543` | comparación de versiones robusta y estilos del refresco | 0.1.0 | no | legal (3) |
| 8 | 2026-08-06 02:20 | `dpl_B6cJeYXPP` | READY · GH success | `63ec8e3` | página pública de bases de premiaciones | 0.1.0 | no | legal (1) |
| 9 | 2026-08-06 02:58 | `dpl_EpqU9VTXC` | READY · GH success | `929c3a1` | copy sin países ni instituciones y permiso parental solo bajo 13 | 0.1.0 | no | legal (1) |
| 10 | 2026-08-06 03:59 | `kodi-landing-k9qde7zjo` (purgado) | GH success | `7711b35` | umbral real de 18 años en la sección de publicidad | 0.1.0 | no | legal (1) |
| 11 | 2026-08-08 20:18 | `dpl_4Eehgvofr` | READY · GH success | `f829d5f` | social link (instagram) | 0.1.0 | no | — (1) |
| 12 | 2026-08-12 08:11 | `kodi-landing-gc9roa224` (purgado) | GH success | `8781f45` | comentarios al día y aviso de pestaña nueva en el pie | 0.1.0 | no | estilos (11) |
| 13 | 2026-08-13 04:55 | `kodi-landing-osx6sdo7t` (purgado) | GH success | `584336d` | página de eliminación de cuenta | 0.1.0 | no | legal (1) |
| 14 | 2026-08-13 05:19 | `kodi-landing-g9t7dul0b` (purgado) | GH success | `3ba610b` | assetlinks.json para verificar App Links de Android | 0.1.0 | no | deeplinks (1) |
| 15 | 2026-08-13 06:12 | `kodi-landing-w6h1g81kd` (purgado) | GH success | `d6753dc` | las 4 huellas reales (firma clásica y poscuántica, carga y firma anterior) | 0.1.0 | no | deeplinks (1) |
| 16 | 2026-09-12 22:46 | `dpl_49CJRftjL` | READY · GH success | `56e96c8` | privacidad y términos 2026-09-03.1 (permisos, IA, menores de 13) | 0.1.0 | no | legal (2) |
| 17 | 2026-09-12 23:32 | `dpl_Dy2yTsC2z` | READY · GH success | `fdcd9fa` | app-ads.txt para verificar la app en AdMob | 0.1.0 | no | admob (1) |
| 18 | 2026-09-19 08:23 | `dpl_12YtDJjs5` | READY · GH success | `fbf71a6` | apple-app-site-association con el Team ID real, no el marcador TEAMID | 0.1.0 | no | ios (1) |
| 19 | 2026-09-19 17:06 | `dpl_Coc28cQ3Y` | READY · GH success | `3b34d77` | la landing nueva a producción | 0.1.0 | no | landing (31) |
| 20 | 2026-09-19 17:41 | `dpl_4HBf3cCPF` | READY · GH success | `497cc65` | el rebote en celular y el chequeo de tipos en verde | 0.1.0 | no | merge (3) |
| 21 | 2026-09-20 06:17 | `dpl_2rn2zcRT5` | READY · GH success | `1611b52` | revert del campo, arreglo del video y depurador de scroll | 0.1.0 | no | merge (4) |
| 22 | 2026-09-20 06:25 | `dpl_3N3SSPDiK` | READY · GH success | `39c3596` | el depurador distingue el montaje de la isla | 0.1.0 | no | merge (2) |
| 23 | 2026-09-20 06:36 | `dpl_BNv5Sf2Si` | READY · GH success | `3a15b51` | la isla de los pasos deja de recolocar la página | 0.1.0 | no | merge (2) |
| 24 | 2026-09-20 06:43 | `dpl_GsU6b7m3k` | READY · GH success | `e82c9b5` | respaldo vh en el hero y depurador del hero | 0.1.0 | no | merge (2) |
| 25 | 2026-09-20 06:56 | `dpl_BGbQWoXge` | READY · GH success | `2f1774f` | se quitan los respaldos vh que el build borraba | 0.1.0 | no | merge (2) |
| 26 | 2026-09-20 07:17 | `dpl_8yeQFP5pH` | READY · GH success | `99ee0a5` | alto de ventana estable sin depender de svh | 0.1.0 | no | merge (2) |
| 27 | 2026-09-20 08:19 | `dpl_HHovXQUdL` | READY · GH success | `ff2133f` | la página de empresas | 0.1.0 | no | merge (2) |
| 28 | 2026-09-20 08:21 | `dpl_AHm8wB8Fg` | READY · GH success | `dce77e7` | la imagen nueva para compartir | 0.1.0 | no | og (2) |
| 29 | 2026-09-21 06:48 | `dpl_5By3qGJ1A` | READY · GH success | `50eeb0d` | lastmod en el sitemap, www al apex y descripción que no se corta | 0.1.0 | no | landing (1) |
| 30 | 2026-09-21 06:49 | `dpl_92qRmTKWw` | READY · GH success | `ece0c1d` | la raíz de www también va al apex | 0.1.0 | no | redirect (1) |
| 31 | 2026-09-21 07:27 | `dpl_Bg1RhKgwH` | READY · GH success | `f3d4ff4` | las cuatro páginas usan el encabezado de la landing | 0.1.0 | no | legales (1) |
| 32 | 2026-09-21 08:12 | `dpl_E3TzHec5t` | READY · GH success | `9e9a530` | seis páginas nuevas, una por examen y el catálogo de señales | 0.1.0 | no | seo (1) |
| 33 | 2026-09-22 21:20 | `dpl_EqCwAaCeq` | READY · GH success | `6805dea` | enlace real de App Store | 0.1.0 | no | tiendas (1) |
| 34 | 2026-09-23 00:15 | `dpl_H851GSYs9` | READY · GH success | `e80e92e` | enlaces cortos /app, /android e /ios hacia las tiendas | 0.1.0 | no | tiendas (1) |
| 35 | 2026-09-23 00:27 | `dpl_D91hPDEkd` | READY · GH success | `50d9d94` | quita la lista de espera de iPhone | 0.1.0 | no | hero (1) |
| 36 | 2026-09-23 00:29 | `dpl_AJ7yZV1nk` | READY · GH success | `352b9d8` | quita la pregunta de cuándo sale para iPhone | 0.1.0 | no | faq (1) |
| 37 | 2026-09-24 12:40 | `dpl_4NGPMvMeS` | READY · GH success | `f49b83b` | política con la medición de Meta aprobada por el abogado | 0.1.0 | **sí** | privacidad (1) |

## Regla desde ahora

La landing **no lleva versión** (estándar, F7 "Versionamiento": "landing: sin versión; la referencia es
el commit desplegado en Vercel").

1. **La referencia de cada release es el commit desplegado** en `main` y su `dpl_…`. No se crean tags ni
   se sube `package.json`.
2. **Todo deploy a producción** (push o merge a `main`) suma una fila a este registro: fecha UTC, `dpl_…`
   completo, commit, mensaje y tema. Vercel purga a los 30 días; el registro no.
3. Antes del push, el aviso de la regla 4 del estándar dice qué rutas cambian (y si toca legales, que el
   texto está aprobado): un merge a `main` publica.
4. Rollback: `vercel rollback <url>` o promover el anterior; después hay que volver a promover para que los
   push a `main` lleguen a producción. Se anota acá con su motivo.
5. Iterar en producción (como el 2026-09-20) se evita: primero el preview de la rama; a `main` cuando el
   founder dio el OK visual.
6. Para reconstruir o auditar: `gh api repos/Arclo-Systems/kodi_landing/deployments --paginate` (filtrar
   `environment == "Production"`).
