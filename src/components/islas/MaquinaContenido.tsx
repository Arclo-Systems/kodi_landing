import { useEffect, useRef, useState } from 'react';
import MagicTransform from '../react-bits/magic-transform';

/**
 * El `magic-transform` de React Bits con la metáfora de Kodi: por la izquierda
 * entra el material oficial, en el centro lo procesa el equipo de contenido, y
 * por la derecha salen las piezas de cada pregunta.
 *
 * Dos cosas que conviene saber del componente antes de tocarlo:
 *
 *   · Las fichas de salida son BARRAS DE COLOR, nada más. El tipo pide un
 *     `label` y un `textColor`, pero el render no los dibuja: son datos que el
 *     componente ignora. Por eso lo que se lee va en el copy de la sección, no
 *     en las fichas, y los textos de acá solo sirven para nombrarlas en el
 *     código.
 *   · `client:visible` decide cuándo MONTA, no cuándo anima: una vez montado
 *     sigue con sus keyframes, su `setInterval` y sus re-renders aunque la
 *     sección quede diez pantallas arriba. Por eso se pausa con su propio
 *     observador, además de con la preferencia de movimiento.
 */

// Los colores salen de los tokens del sitio, no de hexes copiados: la paleta
// clara sobre el fondo oscuro se veía apagada. Son decoración: ningún texto se
// apoya en ellos, así que no hay contraste que cumplir.
const PIEZAS = [
  { id: 'pregunta', label: 'pregunta', token: '--teal-texto' },
  { id: 'opciones', label: 'opciones', token: '--teal' },
  { id: 'respuesta', label: 'respuesta correcta', token: '--lima-texto' },
  { id: 'explicacion', label: 'explicación', token: '--coral-texto' },
  { id: 'tema', label: 'tema', token: '--tinta-suave' },
] as const;

const TOKEN_EJE = '--teal';

// El alto del escenario. Lo reserva también el div de afuera: `client:visible`
// observa a los hijos de la isla y un hijo de alto cero nunca intersecta, así
// que sin esto la máquina no llega a hidratar nunca.
const ALTO = 460;

const MATERIALES = [{ id: 'doc-0' }, { id: 'doc-1' }, { id: 'doc-2' }, { id: 'doc-3' }];

const leerToken = (estilos: CSSStyleDeclaration, token: string) =>
  estilos.getPropertyValue(token).trim();

export default function MaquinaContenido() {
  const marco = useRef<HTMLDivElement>(null);
  const [quieto, setQuieto] = useState(false);
  const [enCuadro, setEnCuadro] = useState(false);
  const [paleta, setPaleta] = useState<readonly string[]>([]);
  const [eje, setEje] = useState('');
  const [entrada, setEntrada] = useState(false);

  // La isla monta cuando la sección asoma, y hasta acá la máquina aparecía de
  // golpe donde antes no había nada. Un cuadro de espera para que el navegador
  // pinte el estado de partida y de ahí la transición.
  useEffect(() => {
    if (paleta.length === 0) return;
    const id = requestAnimationFrame(() => setEntrada(true));
    return () => cancelAnimationFrame(id);
  }, [paleta]);

  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
    const aplicar = () => setQuieto(consulta.matches);
    aplicar();
    consulta.addEventListener('change', aplicar);
    return () => consulta.removeEventListener('change', aplicar);
  }, []);

  useEffect(() => {
    const nodo = marco.current;
    if (!nodo) return;
    const vigia = new IntersectionObserver(([e]) => setEnCuadro(e.isIntersecting), {
      rootMargin: '10% 0px',
    });
    vigia.observe(nodo);
    return () => vigia.disconnect();
  }, []);

  // El tema se escucha, no se consulta cada tanto: mismo mecanismo que el
  // campo de órbitas.
  useEffect(() => {
    const raiz = document.documentElement;
    const oscuroDelSistema = window.matchMedia('(prefers-color-scheme: dark)');

    const leer = () => {
      const estilos = getComputedStyle(raiz);
      setPaleta(PIEZAS.map((pieza) => leerToken(estilos, pieza.token)));
      setEje(leerToken(estilos, TOKEN_EJE));
    };

    leer();
    const vigia = new MutationObserver(leer);
    vigia.observe(raiz, { attributes: true, attributeFilter: ['data-tema'] });
    oscuroDelSistema.addEventListener('change', leer);
    return () => {
      vigia.disconnect();
      oscuroDelSistema.removeEventListener('change', leer);
    };
  }, []);

  // Sin paleta no se dibuja: el componente compone sus sombras pegándole un
  // par de dígitos de alfa al hex, y un color de respaldo inventado sería un
  // sexto teal. El hueco ya lo reserva la sección.
  return (
    <div
      ref={marco}
      className="maquina"
      data-entra={entrada ? '' : undefined}
      style={{ height: ALTO }}
    >
      {paleta.length > 0 && (
        <MagicTransform
          documents={MATERIALES}
          results={PIEZAS.map((pieza, i) => ({
            id: pieza.id,
            label: pieza.label,
            color: paleta[i] ?? eje,
          }))}
          paused={quieto || !enCuadro}
          height={ALTO}
          documentWidth={170}
          documentHeight={240}
          axisColor={eje}
          centerSize={44}
          centerContent={<img src="/favicon.svg" alt="" width={44} height={44} />}
        />
      )}
    </div>
  );
}
