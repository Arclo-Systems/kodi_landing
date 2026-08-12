/**
 * ÚNICO lugar del sitio donde viven las URLs de las tiendas.
 *
 * Mientras `url` sea `null`, todas las tarjetas de descarga (la home y las
 * páginas de invitación) se pintan sin enlace: se ven, pero no llevan a
 * ninguna parte. Es a propósito — la app todavía no está publicada y un botón
 * que cae en un 404 de la tienda es peor que uno que dice "muy pronto".
 *
 * EL DÍA QUE LA APP SE PUBLIQUE: se pegan las dos URLs acá y listo. No hay que
 * tocar ninguna página; el rótulo de las tarjetas de invitación cambia solo de
 * "Muy pronto en" a "Descargala en".
 *
 *   App Store    https://apps.apple.com/cr/app/<slug>/id<ID_NUMERICO>
 *   Google Play  https://play.google.com/store/apps/details?id=com.holakodi.app
 */
export interface Tienda {
  /** Nombre del icono en `components/Icono.astro`. */
  readonly icono: 'appstore' | 'googleplay';
  readonly nombre: string;
  readonly url: string | null;
}

export const TIENDAS: readonly Tienda[] = [
  { icono: 'appstore', nombre: 'App Store', url: null },
  { icono: 'googleplay', nombre: 'Google Play', url: null },
];

const ROTULO_DISPONIBLE = 'Descargala en';
const ROTULO_PENDIENTE = 'Muy pronto en';

/**
 * El rótulo sale del estado de la tienda, nunca escrito a mano en la página: el
 * día que se peguen las URLs, ninguna superficie puede quedar diciendo "pronto"
 * con el enlace vivo. `rotuloPendiente` existe solo porque la home usa una
 * variante más corta que las páginas de invitación.
 */
export function rotuloDeTienda(tienda: Tienda, rotuloPendiente = ROTULO_PENDIENTE): string {
  return tienda.url ? ROTULO_DISPONIBLE : rotuloPendiente;
}

/** Rótulo para hablar de las dos tiendas juntas (el lema del pie). */
export function rotuloDeTiendas(): string {
  return TIENDAS.every((tienda) => tienda.url) ? ROTULO_DISPONIBLE : ROTULO_PENDIENTE;
}
