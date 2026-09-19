/**
 * Instalado desde el registro de React Bits (`BounceCards-TS-TW`) y MODIFICADO.
 *
 * Lo que se agregó, todo opcional y con el valor de siempre por defecto:
 *   · `cardWidth`, `cardAspect`, `cardRadius`, `cardBorder`, `cardShadow`:
 *     la tarjeta del original mide 200 cuadrada, con borde blanco de 8 y radio
 *     30. El cierre de la landing replica el abanico de la referencia, que va
 *     a 120 de ancho, 3:4, radio 16, borde de 1 al 20% y sombra larga.
 *   · `backgrounds`: color de fondo por tarjeta. Los íconos de módulo llevan
 *     transparencia y van sobre el color de identidad de su módulo.
 *   · `imageFit`: `contain` para que el ícono no se recorte.
 *   · `alt` vacío: las tarjetas son decorativas; el original ponía `card-0`.
 *   · `fromStyles`, `fromOpacity`, `duration`: un estado de PARTIDA. El
 *     original entra con escala 0→1 y rebote elástico; el cierre de la landing
 *     replica la entrada de la referencia, donde las tarjetas arrancan
 *     apiladas al centro e invisibles y viajan cada una a su lugar del abanico
 *     mientras aparecen. Con `fromStyles` la animación es transform+opacidad
 *     desde ese estado; el SSR pinta el estado de partida para que no se vea el
 *     abanico abierto antes de hidratar.
 *   · `hoverStyles`: transform de cada tarjeta al pasar el mouse. El original
 *     solo sabe empujar a las vecinas (`enableHover`); la referencia hace otra
 *     cosa —levanta la tarjeta y endereza su giro— y eso se describe mejor con
 *     el transform de destino que con una fórmula adentro del componente.
 *     `hoverShadow` alarga la sombra mientras está levantada.
 *   · `staggerFrom: 'center'`: el escalonado de la entrada arranca por la
 *     tarjeta del medio y sigue por parejas hacia afuera, que es como se abre
 *     un abanico. El original (y la referencia) van de izquierda a derecha.
 *   · Con `prefers-reduced-motion` no hay entrada ni hover animado: las
 *     tarjetas aparecen y cambian de estado en seco, y sin puntero fino no hay
 *     hover en absoluto: en táctil el `mouseenter` sintético levantaba la
 *     tarjeta y la dejaba levantada para siempre.
 *   · Cada tarjeta publica su transform del abanico en `--abanico`, para que
 *     una hoja de estilos pueda devolverla a su lugar sin repetir los valores
 *     (el cierre de la landing lo usa cuando no hay JavaScript).
 * Sin ninguna de esas props el componente se comporta exactamente como el
 * original.
 */
import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';

/** El transform de destino de la tarjeta, publicado para el CSS. */
type EstiloTarjeta = CSSProperties & { readonly ['--abanico']: string };

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
  cardWidth?: number;
  cardAspect?: string;
  cardRadius?: number;
  cardBorder?: string;
  cardShadow?: string;
  backgrounds?: string[];
  imageFit?: 'cover' | 'contain';
  fromStyles?: string[];
  fromOpacity?: number;
  duration?: number;
  hoverStyles?: string[];
  hoverDuration?: number;
  hoverShadow?: string;
  staggerFrom?: 'start' | 'center';
}

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)',
  ],
  enableHover = false,
  cardWidth = 200,
  cardAspect = '1 / 1',
  cardRadius = 30,
  cardBorder = '8px solid #fff',
  cardShadow = '0 4px 10px rgba(0, 0, 0, 0.2)',
  backgrounds = [],
  imageFit = 'cover',
  fromStyles,
  fromOpacity = 0,
  duration = 0.85,
  hoverStyles,
  hoverDuration = 0.35,
  hoverShadow,
  staggerFrom = 'start',
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sinMovimiento = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conPuntero = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (fromStyles) {
        // Con movimiento reducido no hay entrada: las tarjetas aparecen ya en
        // su lugar, igual que hace el titular con su revelado.
        if (sinMovimiento()) {
          images.forEach((_, i) => {
            gsap.set(`.card-${i}`, { transform: transformStyles[i] || 'none', opacity: 1 });
          });
          return;
        }
        // Cada tarjeta viaja de su transform de partida al del abanico. Se
        // tuenea una por una porque el destino es distinto para cada una.
        // Desde el centro, el abanico se ABRE: primero la del medio, después
        // cada pareja hacia afuera.
        const centro = (images.length - 1) / 2;
        images.forEach((_, i) => {
          const paso = staggerFrom === 'center' ? Math.abs(i - centro) : i;
          gsap.fromTo(
            `.card-${i}`,
            { transform: fromStyles[i] || 'none', opacity: fromOpacity },
            {
              transform: transformStyles[i] || 'none',
              opacity: 1,
              duration,
              ease: easeType,
              delay: animationDelay + paso * animationStagger,
            },
          );
        });
        return;
      }
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        },
      );
    }, containerRef);
    return () => ctx.revert();
    // Se anima UNA vez, al montar. `images` y `transformStyles` son arrays
    // nuevos en cada render: tenerlos como dependencia hacía que cualquier
    // re-render reprodujera la entrada desde el estado de partida.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNoRotationTransform = (transformStr: string): string => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)');
    } else if (transformStr === 'none') {
      return 'rotate(0deg)';
    } else {
      return `${transformStr} rotate(0deg)`;
    }
  };

  const getPushedTransform = (baseTransform: string, offsetX: number): string => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
      const currentX = parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
      return baseTransform === 'none'
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`;
    }
  };

  const pushSiblings = (hoveredIdx: number) => {
    const q = gsap.utils.selector(containerRef);
    if (!enableHover || !containerRef.current) return;

    images.forEach((_, i) => {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || 'none';

      if (i === hoveredIdx) {
        const noRotation = getNoRotationTransform(baseTransform);
        gsap.to(selector, {
          transform: noRotation,
          duration: 0.4,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);

        const distance = Math.abs(hoveredIdx - i);
        const delay = distance * 0.05;

        gsap.to(selector, {
          transform: pushedTransform,
          duration: 0.4,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto',
        });
      }
    });
  };

  // Lleva UNA tarjeta a un transform, sin tocar a las vecinas. Si se levanta,
  // la sombra se alarga con ella: una carta que sube proyecta más lejos.
  const alzar = (idx: number, destino: string, levantada: boolean) => {
    if (!containerRef.current || !conPuntero()) return;
    const q = gsap.utils.selector(containerRef);
    const sombra = levantada && hoverShadow ? hoverShadow : cardShadow;
    if (sinMovimiento()) {
      gsap.set(q(`.card-${idx}`), { transform: destino, boxShadow: sombra });
      return;
    }
    gsap.to(q(`.card-${idx}`), {
      transform: destino,
      boxShadow: sombra,
      duration: hoverDuration,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const selector = q(`.card-${i}`);
      gsap.killTweensOf(selector);

      const baseTransform = transformStyles[i] || 'none';
      gsap.to(selector, {
        transform: baseTransform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      });
    });
  };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      ref={containerRef}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((src, idx) => {
        const estilo: EstiloTarjeta = {
          '--abanico': transformStyles[idx] || 'none',
          width: cardWidth,
          aspectRatio: cardAspect,
          borderRadius: cardRadius,
          border: cardBorder,
          boxShadow: cardShadow,
          backgroundColor: backgrounds[idx],
          // Con estado de partida, el HTML del servidor ya sale en él.
          transform: fromStyles ? fromStyles[idx] || 'none' : transformStyles[idx] || 'none',
          opacity: fromStyles ? fromOpacity : undefined,
        };
        return (
          <div
            key={idx}
            className={`card card-${idx} absolute overflow-hidden`}
            style={estilo}
            onMouseEnter={
              hoverStyles
                ? () => alzar(idx, hoverStyles[idx] || 'none', true)
                : enableHover
                  ? () => pushSiblings(idx)
                  : undefined
            }
            onMouseLeave={
              hoverStyles
                ? () => alzar(idx, transformStyles[idx] || 'none', false)
                : enableHover
                  ? resetSiblings
                  : undefined
            }
          >
            <img className="w-full h-full" style={{ objectFit: imageFit }} src={src} alt="" />
          </div>
        );
      })}
    </div>
  );
}
