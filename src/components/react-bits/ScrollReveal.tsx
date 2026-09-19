/**
 * ScrollReveal — React Bits (text-animations/scroll-reveal).
 *
 * ⚠️ MODIFICADO. Si se reinstala con `shadcn add @reactbits/ScrollReveal-TS-TW`
 * hay que volver a aplicar estos tres cambios:
 *
 *   1. Se agregó la prop opcional `wordDuration`. Sin ella el componente se
 *      comporta igual que de fábrica.
 *
 *      Por qué: de fábrica cada palabra tarda medio segundo en encenderse y las
 *      siguientes arrancan cada 0,05, así que hay ocho palabras a media luz al
 *      mismo tiempo y el borde entre lo leído y lo que falta queda difuso. La
 *      referencia le da a cada palabra exactamente su tramo del recorrido, sin
 *      solaparse: medido en su página, siempre hay UNA sola palabra a media
 *      luz. Igualando la duración al escalonado se obtiene lo mismo.
 *
 *   2. La inclinación solo se registra si `baseRotation` no es 0. De fábrica
 *      monta un `ScrollTrigger` con scrub que interpola de 0° a 0°: una capa
 *      de composición y un cálculo por cuadro de scroll para no mover nada.
 *
 *   3. `will-change: opacity` se retira al salir del tramo. GSAP lo escribe
 *      en línea en cada palabra y nunca lo saca, así que el párrafo entero se
 *      quedaba con una capa de composición por palabra para toda la visita.
 */
import React, { useEffect, useRef, useMemo, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  /** Cuánto dura el encendido de cada palabra. Igualarlo al escalonado (0.05)
   *  hace que no se solapen. Sin valor, GSAP usa su medio segundo. */
  wordDuration?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  wordDuration,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    if (baseRotation !== 0) {
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: true,
          },
        },
      );
    }

    const wordElements = el.querySelectorAll<HTMLElement>('.word');
    const soltarCapas = () => gsap.set(wordElements, { clearProps: 'willChange' });

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity' },
      {
        ease: 'none',
        opacity: 1,
        stagger: 0.05,
        ...(wordDuration !== undefined && { duration: wordDuration }),
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: wordAnimationEnd,
          scrub: true,
          onLeave: soltarCapas,
          onLeaveBack: soltarCapas,
        },
      },
    );

    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: 'none',
          filter: 'blur(0px)',
          stagger: 0.05,
          ...(wordDuration !== undefined && { duration: wordDuration }),
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      );
    }

    // MODIFICADO. GSAP lleva su propio reloj: sin este aviso el texto se
    // enciende uno o dos cuadros después de que el scroll suave mueve la
    // página. Vivía en un `<script>` de la sección, que metía GSAP en el
    // camino crítico de toda la landing; acá viaja con el componente.
    const avisar = () => ScrollTrigger.update();
    window.addEventListener('scroll-suave', avisar);

    return () => {
      window.removeEventListener('scroll-suave', avisar);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    wordDuration,
  ]);

  return (
    // MODIFICADO. Era un `h2` que envolvía un `p`: marcado inválido, y metía un
    // párrafo entero en el esquema de encabezados como el h2 de más peso de la
    // página. El tamaño lo da el CSS, no la etiqueta.
    <div ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>
        {splitText}
      </p>
    </div>
  );
};

export default ScrollReveal;
