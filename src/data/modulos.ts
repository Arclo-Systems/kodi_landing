import type { ImageMetadata } from 'astro';

import coseviAuto from '../assets/modulos/cosevi-auto.webp';
import coseviMoto from '../assets/modulos/cosevi-moto.webp';
import paa from '../assets/modulos/paa.webp';
import penPrimaria from '../assets/modulos/pne-primaria.webp';
import penSecundaria from '../assets/modulos/pne-bachillerato.webp';

/**
 * Los exámenes que la app cubre hoy en Costa Rica, con el MISMO arte que se ve
 * adentro: los archivos salen de `frontend/assets/modules/` y los nombres son
 * los `shortName` de la tabla `modules` en producción. Si el producto da de
 * alta o retira un módulo, esta lista se actualiza a mano — la landing es
 * estática y no consulta el API para esto.
 *
 * Acá va SOLO imagen y nombre del examen. Nada de tamaño de mercado, cantidad
 * de personas que lo presentan, precios ni ningún otro dato del negocio: es
 * información interna y la página es pública.
 *
 * Las imágenes se importan (no viven en `public/`) para que Astro las
 * redimensione en el build: el arte original mide 1501 px y en la página se ve
 * a 56–64, así que servirla tal cual sería un asset pesado por gusto.
 */
export interface Modulo {
  readonly nombre: string;
  /** Una línea, para saber de cuál examen se trata sin abrir nada. */
  readonly nota: string;
  /**
   * Cierra la línea de la nota, después del punto medio y en rojo. Solo lo
   * llevan los exámenes que el producto acaba de estrenar; cuando dejan de ser
   * noticia se borra el campo y la nota vuelve sola a ser una frase normal.
   */
  readonly etiqueta?: string;
  readonly arte: ImageMetadata;
}

export const MODULOS: readonly Modulo[] = [
  { nombre: 'Admisión', nota: 'UCR · UNA · TEC', arte: paa },
  { nombre: 'COSEVI Auto', nota: 'Teórico B1', etiqueta: 'nuevo', arte: coseviAuto },
  { nombre: 'COSEVI Moto', nota: 'Prueba A1', etiqueta: 'nuevo', arte: coseviMoto },
  // Cortas a propósito: en una tarjeta de 280 px la nota tiene 184 para ella, y
  // la que se pasa parte en dos renglones y estira su tarjeta sola.
  { nombre: 'PEN Primaria', nota: 'Sexto grado · 4 materias', arte: penPrimaria },
  { nombre: 'PEN Secundaria', nota: 'Quinto año · 5 materias', arte: penSecundaria },
];
