import { useRef } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react';

import { PAISES, type Pais } from '../../data/paises';

interface Props {
  disponible: string;
  pronto: string;
}

/**
 * Dos filas de chips que se desplazan con el scroll, en sentidos opuestos.
 *
 * Es el mismo mecanismo de la referencia, medido: mientras la sección cruza el
 * viewport —de asomar por abajo a salir por arriba— la primera fila viaja de
 * -160 a +160 px y la segunda al revés, lineal y con tope en los extremos. No
 * es un carrusel en bucle: sin scroll no se mueve nada.
 *
 * Cada fila lleva sus chips y una copia oculta al lector de pantalla, para que
 * al desplazarse no se le vea el final. Con movimiento reducido no hay viaje y
 * la copia tampoco hace falta: sobrarían chips repetidos y quietos.
 */
export default function Paises({ disponible, pronto }: Props) {
  const seco = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const viaje: [number, number] = seco ? [0, 0] : [-160, 160];
  const haciaDerecha = useTransform(scrollYProgress, [0, 1], viaje);
  const haciaIzquierda = useTransform(scrollYProgress, [0, 1], [viaje[1], viaje[0]]);

  // Compuesto a mano y no con el atajo `x` de Motion: el atajo va por el hilo
  // principal, el mismo que lleva el scroll suave, y en teléfono las dos filas
  // se arrastraban. En una sola propiedad esto se va a la GPU.
  const derecha = useMotionTemplate`translate3d(${haciaDerecha}px, 0, 0)`;
  const izquierda = useMotionTemplate`translate3d(${haciaIzquierda}px, 0, 0)`;

  const mitad = Math.ceil(PAISES.length / 2);
  const filas = [PAISES.slice(0, mitad), PAISES.slice(mitad)];

  const rotulo = (pais: Pais) => (pais.estado === 'live' ? disponible : pronto);

  return (
    <div ref={ref} className="paises-filas">
      {filas.map((fila, i) => (
        <div key={i} className="paises-fila">
          <motion.div className="paises-pista" style={{ transform: i === 0 ? derecha : izquierda }}>
            {fila.map((pais) => (
              <Chip key={pais.codigo} pais={pais} rotulo={rotulo(pais)} />
            ))}
            {!seco && (
              <div className="paises-copia" aria-hidden="true">
                {fila.map((pais) => (
                  <Chip key={`copia-${pais.codigo}`} pais={pais} rotulo={rotulo(pais)} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function Chip({ pais, rotulo }: { pais: Pais; rotulo: string }) {
  return (
    <div className={`paises-chip${pais.estado === 'live' ? ' paises-chip--live' : ''}`}>
      {/* Bandera redonda (circle-flags, SVG): el equivalente al ícono de
          marca que la referencia pone en este hueco. Decorativa: el nombre
          va al lado. */}
      <img
        className="paises-chip__bandera"
        src={`/app/banderas/${pais.codigo.toLowerCase()}.svg`}
        alt=""
        width={20}
        height={20}
      />
      <span className="paises-chip__nombre">{pais.nombre}</span>
      <span className="paises-chip__rotulo">{rotulo}</span>
    </div>
  );
}
