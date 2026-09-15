import Device from '@/components/react-bits/device';

interface Props {
  /** URL ya resuelta por Astro (`captura.src.src`), no el import. */
  imagen: string;
  alt: string;
  /** 1 es el tamaño natural del componente. */
  escala?: number;
  /** Para capturas largas: deja rodar la pantalla dentro del marco. */
  desplazable?: boolean;
  /** Apaga la inclinación donde el teléfono es ilustración y no protagonista. */
  quieto?: boolean;
}

/**
 * EL teléfono de la landing. Uno solo para toda la página: dos marcos distintos
 * en el mismo scroll se leen como dos productos.
 *
 * Es el `device` de React Bits, que dibuja el marco con CSS y se inclina
 * siguiendo el cursor. Cuesta unos 47 KB comprimidos, pero los cobra UNA vez:
 * el empaquetador junta el componente en un trozo compartido y todas las
 * apariciones lo reusan, así que poner cinco teléfonos pesa casi lo mismo que
 * poner uno.
 *
 * El marco es decorativo; lo que describe la escena es la captura, así que el
 * `alt` viaja en el contenedor.
 */
export default function Telefono({
  imagen,
  alt,
  escala = 1,
  desplazable = false,
  quieto = false,
}: Props) {
  return (
    <div role="img" aria-label={alt}>
      <Device
        image={imagen}
        scale={escala}
        isScrollable={desplazable}
        enableParallax={!quieto}
        enableRotate={!quieto}
      />
    </div>
  );
}
