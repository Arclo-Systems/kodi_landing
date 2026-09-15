import { useEffect, useState } from 'react';
import Preloader from '@/components/react-bits/preloader';

interface Props {
  /** El rótulo grande: "Cargando…". */
  texto: string;
  fondo: string;
  /** Techo de seguridad: pase lo que pase, la cortina se levanta. */
  techoMs?: number;
}

/**
 * La cortina de carga: rótulo grande y contador de porcentaje, como en la
 * referencia que aprobó el founder. Es `preloader` de React Bits, variante
 * `percentage`.
 *
 * Cómo funciona el componente, que no es obvio: cuenta solo hasta 99 y ahí se
 * queda esperando. Es el consumidor quien decide cuándo terminó, bajando
 * `loading`; recién entonces salta a 100 y se va. Si uno espera a su aviso de
 * "completado" para bajar la bandera, se queda clavado en 99 para siempre.
 *
 * Acá el final es la carga REAL de la página (`window.load`, o sea con sus
 * imágenes), que es lo que el contador debería estar representando. Con un
 * techo de seguridad: si algo se cuelga, la cortina se levanta igual y nadie
 * se queda mirando un número.
 *
 * La página de abajo ya está pintada y es HTML estático: esto es una cortina,
 * no una pantalla que tape contenido inexistente. Si el JavaScript falla, el
 * visitante ve la landing igual.
 */
export default function Carga({ texto, fondo, techoMs = 4000 }: Props) {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const listo = () => setCargando(false);

    if (document.readyState === 'complete') {
      // Ya cargó antes de que montáramos: un respiro para que el contador se
      // vea moverse en vez de parpadear de 0 a 100.
      const t = setTimeout(listo, 600);
      return () => clearTimeout(t);
    }

    window.addEventListener('load', listo);
    const techo = setTimeout(listo, techoMs);
    return () => {
      window.removeEventListener('load', listo);
      clearTimeout(techo);
    };
  }, [techoMs]);

  return (
    <Preloader
      loading={cargando}
      variant="percentage"
      percentagePosition="bottom-left"
      position="fixed"
      loadingText={texto}
      bgColor={fondo}
      zIndex={100}
      respectReducedMotion
      reducedMotionFallback="fade"
      ariaLabel={texto}
      ariaLive="polite"
    />
  );
}
