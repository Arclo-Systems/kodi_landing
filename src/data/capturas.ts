import type { ImageMetadata } from 'astro';

import elegirExamen from '../assets/capturas/elegir-examen.webp';
import liga from '../assets/capturas/liga.webp';
import partidaKodi from '../assets/capturas/partida-kodi.webp';
import practica from '../assets/capturas/practica.webp';
import racha from '../assets/capturas/racha.webp';
import tienda from '../assets/capturas/tienda.webp';

/**
 * Las pantallas reales de la app, las mismas que están en la ficha de Google
 * Play. Un solo lugar para que ninguna sección las importe suelta y se
 * dupliquen en el build.
 *
 * El `alt` vive acá pegado a la imagen: si describe lo que se ve, tiene que
 * viajar con ella y no escribirse de nuevo en cada sección.
 *
 * ⚠️ Falta una: la pantalla de Pixel explicando un error. Hoy el paso 03 de
 * "Cómo funciona" no tiene captura propia; ver el plan, tarea 7.
 */
export interface Captura {
  readonly src: ImageMetadata;
  readonly alt: string;
}

export const CAPTURAS = {
  elegirExamen: {
    src: elegirExamen,
    alt: 'Pantalla de Kodi para elegir el examen, con los cinco disponibles',
  },
  practica: {
    src: practica,
    alt: 'Una pregunta de admisión respondida en Kodi, con su explicación',
  },
  partidaKodi: {
    src: partidaKodi,
    alt: 'La ruleta de materias de Partida Kodi',
  },
  liga: {
    src: liga,
    alt: 'Tabla de la liga semanal de Kodi, con la zona de ascenso',
  },
  racha: {
    src: racha,
    alt: 'Calendario de racha de Kodi con cinco días cumplidos',
  },
  tienda: {
    src: tienda,
    alt: 'Tienda de Kodi con paquetes de Kokos y avatares',
  },
} as const satisfies Record<string, Captura>;
