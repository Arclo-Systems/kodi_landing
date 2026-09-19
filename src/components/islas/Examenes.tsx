import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';

import type { Examen } from '../../data/examenes';

interface Props {
  examenes: readonly Examen[];
}

// Los tres muelles de la referencia, leídos de su bundle: uno por eje para
// seguir al cursor, uno para la inclinación (que sale de la velocidad
// horizontal: ±1200 px/s → ±8°) y uno para la entrada de la tarjeta.
const MUELLE_SEGUIMIENTO = { stiffness: 200, damping: 24, mass: 0.6 };
const MUELLE_GIRO = { stiffness: 260, damping: 30 };
const MUELLE_ENTRADA = { type: 'spring', stiffness: 320, damping: 28 } as const;
const FUNDIDO_HOJA = { duration: 0.25 };

/** Dos filas que asoman con menos de esto entre medio cuentan como una tanda. */
const VENTANA_ESCALON = 120;

/** El escalón de la fila, que el CSS convierte en retraso de entrada. */
type ConIndice = CSSProperties & { readonly ['--i']: number };

function listar(materias: readonly string[]): string {
  if (materias.length === 1) return materias[0];
  return `${materias.slice(0, -1).join(', ')} y ${materias[materias.length - 1]}`;
}

/**
 * La grilla numerada de la referencia ("Built for the last one percent"): una
 * fila por módulo y, en escritorio, una tarjeta con el arte del módulo
 * señalado que sigue al cursor con muelle y se inclina según la velocidad.
 *
 * Es una isla porque el seguimiento es el mismo mecanismo de la referencia
 * (`useSpring` sobre la posición y `useVelocity` para el giro); una
 * interpolación a mano se sentía rígida. Con movimiento reducido no hay
 * tarjeta, como allá.
 */
export default function Examenes({ examenes }: Props) {
  const seco = useReducedMotion();
  const marco = useRef<HTMLDivElement>(null);
  const [activa, setActiva] = useState<number | null>(null);

  const filas = useRef<(HTMLAnchorElement | null)[]>([]);
  const [escalones, setEscalones] = useState<ReadonlyMap<number, number>>(new Map());

  // Cada fila entra cuando asoma ella: en teléfono caben dos y media, así que
  // el resto de la escalera se ve al ir bajando. Las que asoman juntas se
  // reparten el escalón; una sola que entra tarde no espera a nadie.
  useEffect(() => {
    const nodos = filas.current.filter((n): n is HTMLAnchorElement => n !== null);
    if (nodos.length === 0) return;

    let anterior = -Infinity;
    let escalon = 0;

    const vigia = new IntersectionObserver(
      (entradas, obs) => {
        const vistas = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vistas.length === 0) return;

        const nuevos = new Map<number, number>();
        for (const entrada of vistas) {
          const ahora = performance.now();
          escalon = ahora - anterior < VENTANA_ESCALON ? escalon + 1 : 0;
          anterior = ahora;
          nuevos.set(filas.current.indexOf(entrada.target as HTMLAnchorElement), escalon);
          obs.unobserve(entrada.target);
        }
        setEscalones((previos) => new Map([...previos, ...nuevos]));
      },
      // Apenas asoma, no cuando ya está adentro. Con -10% la fila arrancaba su
      // entrada con media pantalla encima y se veía animar algo que el lector
      // ya estaba mirando.
      { rootMargin: '0px 0px -2% 0px' },
    );

    nodos.forEach((nodo) => vigia.observe(nodo));
    return () => vigia.disconnect();
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xMuelle = useSpring(x, MUELLE_SEGUIMIENTO);
  const yMuelle = useSpring(y, MUELLE_SEGUIMIENTO);
  const velocidad = useVelocity(xMuelle);
  const inclinacion = useTransform(velocidad, [-1200, 1200], [-8, 8]);
  const giro = useSpring(inclinacion, MUELLE_GIRO);

  const seguir = (e: MouseEvent<HTMLDivElement>) => {
    const rect = marco.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={marco}
      className="examenes__filas"
      onMouseMove={seco ? undefined : seguir}
      onMouseLeave={() => setActiva(null)}
    >
      {examenes.map((examen, i) => (
        <a
          key={examen.nombre}
          ref={(nodo) => {
            filas.current[i] = nodo;
          }}
          className="examen"
          href="#descargar"
          data-dentro={escalones.has(i) ? '' : undefined}
          style={{ '--i': escalones.get(i) ?? 0 } as ConIndice}
          onMouseEnter={() => setActiva(i)}
        >
          <div className="examen__interior">
            <span className="examen__numero">{String(i + 1).padStart(2, '0')}</span>

            <div className="examen__cuerpo">
              <h3 className="examen__nombre">{examen.nombre}</h3>
              {/* Dos redacciones del mismo dato: el CSS enciende la corta en teléfono,
                  donde la lista entera de materias se iba a cuatro líneas. */}
              <p className="examen__detalle">
                <span className="examen__largo">
                  <span className="examen__formato">{examen.formato}.</span>{' '}
                  {listar(examen.materias)}.
                </span>
                <span className="examen__corto">
                  <span className="examen__formato">{examen.formatoCorto ?? examen.formato}</span> ·{' '}
                  {examen.materias.length} materias
                </span>
              </p>
            </div>

            <img
              className="examen__miniatura"
              src={examen.icono}
              alt=""
              width={112}
              height={112}
              loading="lazy"
            />
            <ArrowUpRight
              className="examen__flecha"
              size={24}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        </a>
      ))}

      {!seco && (
        <motion.div
          style={{ x: xMuelle, y: yMuelle, rotate: giro }}
          aria-hidden="true"
          className="previa"
        >
          <motion.div
            initial={false}
            animate={{ opacity: activa === null ? 0 : 1, scale: activa === null ? 0.85 : 1 }}
            transition={MUELLE_ENTRADA}
            className="previa__tarjeta"
          >
            {examenes.map((examen, i) => (
              <motion.img
                key={examen.nombre}
                initial={false}
                animate={{ opacity: activa === i ? 1 : 0 }}
                transition={FUNDIDO_HOJA}
                className="previa__hoja"
                src={examen.icono}
                alt=""
                width={230}
                height={230}
                loading="lazy"
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
