# Video de la app

Acá va el video que crece con el scroll en la portada.

## Para encenderlo

1. Dejá el archivo en esta carpeta, por ejemplo `kodi.mp4`.
2. Dejá un fotograma de portada al lado, por ejemplo `kodi-portada.jpg`.
3. Abrí `src/data/video.ts` y cambiá las dos líneas:

   ```ts
   archivo: '/video/kodi.mp4',
   portada: '/video/kodi-portada.jpg',
   ```

La sección aparece sola en su lugar. Mientras `archivo` sea `null`, no se
dibuja nada: la página no muestra un hueco esperando material.

## Qué conviene grabar

- **Apaisado, 16:9.** El marco es horizontal: una grabación de teléfono entera
  quedaría con dos franjas negras a los lados. Grabá la pantalla del teléfono
  dentro de un encuadre horizontal.
- **Sin depender del audio.** Se reproduce en silencio y en bucle, porque
  ningún navegador deja arrancar con sonido sin que la persona lo pida.
- **De 10 a 20 segundos**, y que el corte del bucle no se note.
- **Que muestre lo que vende:** responder una pregunta, fallar, que Pixel
  explique el error, subir en la liga.
- **Liviano.** Por encima de unos 3 MB se nota en datos móviles. `mp4` con
  H.264 es lo que todos los navegadores reproducen.
