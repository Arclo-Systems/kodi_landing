/**
 * ÚNICO lugar del sitio donde viven las URLs de las tiendas.
 *
 * Mientras `url` sea `null`, la tarjeta de esa tienda se pinta sin enlace: se
 * ve, pero no lleva a ninguna parte. Es a propósito — un botón que cae en un
 * 404 de la tienda es peor que uno que dice "muy pronto".
 *
 * Android salió primero (agosto 2026). iPhone todavía no: su tarjeta sigue en
 * `null` y la home ofrece la lista de espera. EL DÍA QUE SALGA iOS se pega la
 * URL acá y listo — ninguna página se toca, el rótulo cambia solo de
 * "Muy pronto en" a "Descargala en".
 *
 *   App Store    https://apps.apple.com/cr/app/<slug>/id<ID_NUMERICO>
 */
interface Tienda {
  /** Nombre del icono en `components/Icono.astro`. */
  readonly icono: 'appstore' | 'googleplay';
  readonly nombre: string;
  readonly url: string | null;
}

export const TIENDAS: readonly Tienda[] = [
  {
    icono: 'googleplay',
    nombre: 'Google Play',
    url: 'https://play.google.com/store/apps/details?id=com.holakodi.app',
  },
  { icono: 'appstore', nombre: 'App Store', url: null },
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
