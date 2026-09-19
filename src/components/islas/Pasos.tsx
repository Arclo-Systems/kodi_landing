import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import {
  cubicBezier,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { PANTALLAS } from './pantallas';
import { CAJON } from '../../lib/movimiento';

/**
 * Los pasos con el teléfono central: la sección se queda pegada y el scroll
 * cambia el paso, la pantalla del teléfono y la ficha de la derecha.
 *
 * La mecánica es la de la referencia, leída de su código. Lo que se copió y por
 * qué importa cada valor:
 *
 *   · El avance de scroll se reparte en tramos iguales, uno por paso.
 *   · El texto y la ficha se cruzan: el que sale se va hacia arriba mientras el
 *     que entra sube desde abajo. La ficha viaja el doble que el texto, y esa
 *     diferencia es la que da sensación de profundidad.
 *   · La pantalla del teléfono NO se cruza: la nueva sube por encima de la
 *     anterior, que se encoge un poco y se oscurece. Son naipes, no diapositivas.
 *   · La curva `(0.32, 0.72, 0, 1)` sale de su código. Arranca rápido y frena
 *     largo, que es lo que hace que la pantalla se sienta pesada.
 */

interface Ficha {
  readonly rotulo: string;
  readonly dato: string;
  readonly detalle: string;
}

export interface Paso {
  readonly numero: string;
  readonly titulo: string;
  readonly texto: string;
  readonly ficha: Ficha;
  readonly pastilla: string;
}

interface Props {
  readonly pasos: readonly Paso[];
}

/**
 * Las pantallas se importan acá y NO llegan por props desde Astro.
 *
 * Astro serializa las props de una isla para mandarlas al navegador, y un
 * elemento de React no sobrevive ese viaje: llega como un objeto plano y React
 * se niega a dibujarlo ("Objects are not valid as a React child"). Como las
 * pantallas son fijas, importarlas directamente es además lo más simple.
 */

const CURVA = cubicBezier(...CAJON);

/**
 * Interpola `v` sobre una escalera de puntos, recortando en los extremos.
 *
 * Existe porque el mapeo por rangos de Motion —`useTransform(valor, entrada,
 * salida)`— devolvía el valor SIN transformar en el primer paso: con el avance
 * en 0,87 su opacidad valía 0,847 en vez de 0. Se comprobó que los rangos que
 * recibía eran correctos y que el avance era correcto, y que cambiarlos de
 * largo o de valores no lo arreglaba. Con la cuenta escrita acá el
 * comportamiento es el mismo y además es verificable.
 */
const interpolar = (v: number, entrada: number[], salida: number[]) => {
  if (v <= entrada[0]) return salida[0];
  const ultimo = entrada.length - 1;
  if (v >= entrada[ultimo]) return salida[ultimo];
  for (let k = 0; k < ultimo; k += 1) {
    if (v >= entrada[k] && v <= entrada[k + 1]) {
      const t = (v - entrada[k]) / (entrada[k + 1] - entrada[k]);
      return salida[k] + t * (salida[k + 1] - salida[k]);
    }
  }
  return salida[ultimo];
};

/**
 * Cuándo se ve el paso `i`: entra al empezar su tramo y se va al terminarlo.
 *
 * Las ventanas van en FRACCIÓN DEL TRAMO, no en valores fijos. La referencia
 * los tiene fijos (0.02 y 0.06) porque son cuatro pasos y el tramo mide 0.25;
 * con seis pasos el tramo baja a 0.1667 y esos mismos números se comen casi
 * medio tramo, así que había huecos en los que no se veía ningún paso. Las
 * proporciones de acá son las suyas: 8% y 24% del tramo.
 */
const ADELANTO = 0.08;
const ENTRADA = 0.24;

const rangoOpacidad = (i: number, total: number) => {
  const tramo = 1 / total;
  const a = tramo * ADELANTO;
  const e = tramo * ENTRADA;
  const desde = i * tramo;
  const hasta = (i + 1) * tramo;
  if (i === 0) return { input: [hasta - e, hasta - a], output: [1, 0] };
  if (i === total - 1) return { input: [desde - a, desde + e], output: [0, 1] };
  return { input: [desde - a, desde + e, hasta - e, hasta - a], output: [0, 1, 1, 0] };
};

/** Cuánto sube y baja el paso `i`. `viaje` es la amplitud en píxeles. */
const rangoViaje = (i: number, total: number, viaje: number) => {
  const tramo = 1 / total;
  const a = tramo * ADELANTO;
  const desde = i * tramo;
  const hasta = (i + 1) * tramo;
  if (i === 0) return { input: [0, hasta], output: [0, -viaje] };
  if (i === total - 1) return { input: [desde - a, 1], output: [viaje, 0] };
  return { input: [desde - a, hasta], output: [viaje, -viaje] };
};

function TextoPaso({
  avance,
  i,
  total,
  paso,
}: {
  avance: MotionValue<number>;
  i: number;
  total: number;
  paso: Paso;
}) {
  // `useTransform` se queda con los arrays de la primera vez. Si se le pasan
  // literales nuevos en cada render, una de las dos animaciones se queda con
  // los viejos y el paso termina con la opacidad de un avance y el
  // desplazamiento de otro. Se vio en vivo: opacidad de avance 0.1 con
  // desplazamiento de avance 0.6, en el mismo elemento.
  const o = useMemo(() => rangoOpacidad(i, total), [i, total]);
  const v = useMemo(() => rangoViaje(i, total, 36), [i, total]);
  const opacidad = useTransform(avance, (x) => interpolar(x, o.input, o.output));
  const y = useTransform(avance, (x) => interpolar(x, v.input, v.output));

  return (
    <motion.div style={{ opacity: opacidad, y }} className="paso">
      <div className="paso__numero">
        <span>{paso.numero}</span>
        {/* La raya crece con el paso, no está simplemente dibujada. */}
        <motion.span style={{ scaleX: opacidad, originX: 0 }} className="paso__raya" />
      </div>
      <h3 className="paso__titulo">{paso.titulo}</h3>
      <p className="paso__texto">{paso.texto}</p>
    </motion.div>
  );
}

function FichaPaso({
  avance,
  i,
  total,
  paso,
}: {
  avance: MotionValue<number>;
  i: number;
  total: number;
  paso: Paso;
}) {
  const o = useMemo(() => rangoOpacidad(i, total), [i, total]);
  const v = useMemo(() => rangoViaje(i, total, 70), [i, total]);
  const opacidad = useTransform(avance, (x) => interpolar(x, o.input, o.output));
  const y = useTransform(avance, (x) => interpolar(x, v.input, v.output));

  return (
    <motion.div style={{ opacity: opacidad, y }} aria-hidden="true" className="ficha">
      <div className="ficha__caja">
        <p className="ficha__rotulo">{paso.ficha.rotulo}</p>
        <p className="ficha__dato">{paso.ficha.dato}</p>
        <p className="ficha__detalle">{paso.ficha.detalle}</p>
      </div>
      <span className="ficha__pastilla">{paso.pastilla}</span>
    </motion.div>
  );
}

function Escena({
  avance,
  i,
  total,
  children,
}: {
  avance: MotionValue<number>;
  i: number;
  total: number;
  children: ReactNode;
}) {
  const r = useMemo(() => {
    const tramo = 1 / total;
    const e = tramo * ENTRADA;
    const desde = i * tramo;
    const hasta = (i + 1) * tramo;
    const primera = i === 0;
    const ultima = i === total - 1;
    return {
      entradaY: primera ? [0, 1] : [desde - e, desde + e],
      salidaY: primera ? ['0%', '0%'] : ['103%', '0%'],
      entradaFin: ultima ? [0, 1] : [hasta - e, hasta + e],
      salidaEscala: ultima ? [1, 1] : [1, 0.93],
      salidaSombra: ultima ? [0, 0] : [0, 0.42],
    };
  }, [i, total]);

  const y = useTransform(avance, r.entradaY, r.salidaY, { ease: CURVA });
  const escala = useTransform(avance, r.entradaFin, r.salidaEscala);
  const sombra = useTransform(avance, r.entradaFin, r.salidaSombra);

  // La escena es lo más grande que se mueve en la página (272x574 por seis).
  // Compuesta a mano en una sola propiedad va a la GPU; con los atajos `y` y
  // `scale` de Motion, no siempre.
  const transformar = useMotionTemplate`translate3d(0, ${y}, 0) scale(${escala})`;

  return (
    <motion.div style={{ transform: transformar }} className="escena">
      {children}
      <motion.div style={{ opacity: sombra }} aria-hidden="true" className="escena__sombra" />
    </motion.div>
  );
}

function Barrita({ avance, i, total }: { avance: MotionValue<number>; i: number; total: number }) {
  const tramo = useMemo(() => [i / total, (i + 1) / total], [i, total]);
  const llenado = useTransform(avance, tramo, [0, 1]);
  return (
    <span className="barrita">
      <motion.span style={{ scaleX: llenado, originX: 0 }} className="barrita__llenado" />
    </span>
  );
}

/**
 * La secuencia pegada. Vive en su propio componente a propósito.
 *
 * `useScroll` se queda con el elemento que encuentra en el ref la primera vez
 * que corre. Llamado desde el componente de arriba —que en su primer render
 * todavía no dibujó la pista, porque espera a saber el ancho de la ventana— se
 * engancha a nada y no se recupera nunca: se veía como que un mismo paso
 * mostraba la opacidad de un avance y la posición de otro. Acá el ref y la
 * llamada nacen en el mismo montaje.
 */
function Secuencia({ pasos, escenas }: { pasos: readonly Paso[]; escenas: ReactNode[] }) {
  const pista = useRef<HTMLDivElement>(null);
  const { scrollYProgress: avance } = useScroll({
    target: pista,
    offset: ['start start', 'end end'],
  });
  const total = pasos.length;

  return (
    <div ref={pista} className="pasos-pista" style={{ '--pasos': total } as CSSProperties}>
      <div className="pasos-pegado">
        <div className="pasos-reja">
          <div className="pasos-columna">
            {pasos.map((paso, i) => (
              <TextoPaso key={paso.numero} avance={avance} i={i} total={total} paso={paso} />
            ))}
          </div>

          <div className="pasos-centro">
            <Marco>
              <div className="marco__escenas">
                {escenas.map((pantalla, i) => (
                  <Escena key={pasos[i]?.numero ?? i} avance={avance} i={i} total={total}>
                    {pantalla}
                  </Escena>
                ))}
              </div>
            </Marco>
            <div className="barritas" aria-hidden="true">
              {pasos.map((paso, i) => (
                <Barrita key={paso.numero} avance={avance} i={i} total={total} />
              ))}
            </div>
          </div>

          <div className="pasos-columna pasos-columna--ficha">
            {pasos.map((paso, i) => (
              <FichaPaso key={paso.numero} avance={avance} i={i} total={total} paso={paso} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Pasos({ pasos }: Props) {
  const escenas: ReactNode[] = pasos.map(
    (paso, i) => PANTALLAS[i] ?? <Hueco key={paso.numero} numero={paso.numero} />,
  );

  // La secuencia pegada va en todas las pantallas; lo que cambia es la reja,
  // que en angosto apila el teléfono sobre el texto y guarda la ficha. Lo único
  // que la apaga es pedir menos movimiento: ahí la idea misma sobra.
  const [conMovimiento, setConMovimiento] = useState(false);

  useEffect(() => {
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)');
    const revisar = () => setConMovimiento(!quieto.matches);
    revisar();
    quieto.addEventListener('change', revisar);
    return () => quieto.removeEventListener('change', revisar);
  }, []);

  if (!conMovimiento) {
    // Con menos movimiento: el teléfono una sola vez arriba y los pasos como
    // lista. Dice lo mismo sin secuencia.
    return (
      <div className="pasos-lista">
        <div className="pasos-lista__telefono">
          <Marco>{escenas[0]}</Marco>
        </div>
        <ol className="pasos-lista__items">
          {pasos.map((paso) => (
            <li key={paso.numero}>
              <div className="paso__numero">
                <span>{paso.numero}</span>
                <span className="paso__raya paso__raya--fija" />
              </div>
              <h3 className="paso__titulo">{paso.titulo}</h3>
              <p className="paso__texto">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return <Secuencia pasos={pasos} escenas={escenas} />;
}

/** Lo que se ve mientras no haya pantalla para ese paso. */
function Hueco({ numero }: { numero: string }) {
  return (
    <div className="hueco">
      <span className="hueco__numero">{numero}</span>
    </div>
  );
}

/** El marco del teléfono. Mismas medidas que la referencia. */
function Marco({ children }: { children: ReactNode }) {
  return (
    <div className="marco">
      {/* Ilustración: sin esto el lector de pantalla lee las seis maquetas
          enteras, con sus ligas, sus metas y sus preguntas de ejemplo. */}
      <div className="marco__pantalla" aria-hidden="true">
        {children}
        <div className="marco__isla" aria-hidden="true" />
      </div>
    </div>
  );
}
