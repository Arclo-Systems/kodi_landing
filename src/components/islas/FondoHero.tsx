import InfiniteGallery, { type GalleryImage } from '@/components/react-bits/infinite-gallery';

interface Props {
  imagenes: GalleryImage[];
  /** Fondo y niebla van al mismo color o se ve el corte del horizonte. */
  fondo: string;
}

/**
 * El fondo del hero: imágenes sueltas repartidas en el espacio, que derivan con
 * el cursor y se acercan despacio.
 *
 * Es `infinite-gallery` de React Bits.
 *
 * Lo que decide si esto se parece a la referencia NO es el componente, son tres
 * números. La referencia muestra pocas imágenes, chicas, con mucho aire entre
 * ellas y el centro despejado. Traducido a props:
 *
 *   · `density: 1`   — UNA imagen por celda. Con 5 la pantalla queda sembrada.
 *   · `cellSize` muy grande respecto de `imageSize` — ese cociente ES el aire.
 *     A 260/18 cada imagen tiene más de diez veces su ancho de espacio libre
 *     alrededor.
 *   · `viewRange: 3` — se ven más celdas, pero como casi todas están vacías, lo
 *     que se gana es profundidad y no ruido.
 */
export default function FondoHero({ imagenes, fondo }: Props) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
      <InfiniteGallery
        images={imagenes}
        width="100%"
        height="100%"
        backgroundColor={fondo}
        fogColor={fondo}
        density={1}
        imageSize={18}
        cellSize={260}
        viewRange={3}
        fogNear={120}
        fogFar={520}
        autoZoom
        autoZoomSpeed={0.003}
        driftAmount={0.45}
        imageRadius={0.12}
        allowImageFocusOnClick={false}
      />
    </div>
  );
}
