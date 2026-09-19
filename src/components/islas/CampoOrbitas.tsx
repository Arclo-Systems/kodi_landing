import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useReducedMotion, useScroll, useVelocity } from 'motion/react';
import * as THREE from 'three';

/**
 * El campo de órbitas del hero.
 *
 * Es la réplica del fondo de la referencia (`rbp-ai-app-template`), leída de
 * su bundle: cuatro anillos concéntricos de fichas redondeadas girando a
 * distinta velocidad, cada ficha con un recorte de una imagen tomado en
 * coordenadas del mundo —por eso el arte se corre dentro de la ficha mientras
 * la ficha viaja—, el centro difuminado para que el titular se lea limpio, y
 * un empujón a la rotación proporcional a la velocidad del scroll.
 *
 * Todos los números —radios, cantidades, duraciones, los tramos del
 * difuminado— son los suyos. Lo nuestro son las imágenes: los avatares de
 * Koko de la tienda. Por eso la ficha va cuadrada y no 4:3, y la ventana de
 * recorte apenas por encima del lado: su arte son fotos, que aguantan
 * cualquier recorte; el nuestro es una figura centrada sobre un fondo liso, y
 * recortada de costados se lee como una mancha.
 */

const GRADO = Math.PI / 180;

// Los 27 avatares del catálogo de producción. El orden importa: cada anillo se
// lleva un tramo en exclusiva (ver `ANILLOS.artes`), así que van mezclados para
// que ningún anillo quede con todos los oficios parecidos.
const IMAGENES = [
  'koko-sabanero',
  'koko-doctor',
  'koko-surfista',
  'koko-programador',
  'koko-cafetalero',
  'koko-brujo',
  'koko-arquitecto',
  'koko-caribeno',
  'koko-chef',
  'koko-motociclista',
  'koko-artista',
  'koko-economista',
  'koko-faroles',
  'koko-cientifico',
  'koko-al-volante',
  'koko-veterinario',
  'koko-marimbero',
  'koko-ing-civil',
  'koko-navideno',
  'koko-explorador',
  'koko-abogado',
  'koko-scooter',
  'koko-profesor',
  'koko-mecatronica',
  'koko-pura-vida',
  'koko-conductor',
  'koko-ing-industrial',
].map((nombre) => `/app/campo/${nombre}.webp`);

interface Anillo {
  /** Radio en vmax y su tope en píxeles: el campo crece con la ventana. */
  readonly radioVmax: number;
  readonly radioMax: number;
  /** Segundos que tarda una vuelta entera. */
  readonly duracion: number;
  readonly cantidad: number;
  /** Corrimiento del anillo, para que las fichas no se alineen entre anillos. */
  readonly fase: number;
  /** Cuántos Kokos le tocan en exclusiva. Ninguno sale en otro anillo. */
  readonly artes: number;
}

// Su configuración trae cuatro anillos, pero el cuarto (1076 px de radio en
// una ventana de 1440x900, contra 849 de la diagonal a la esquina) nunca entra
// en cuadro: en pantalla se ven tres. Se deja tal cual porque en una ventana
// alta y angosta sí asoma.
// `artes` suma 27 y ninguno salta de un anillo a otro. OJO al elegirlos:
// `cantidad % artes` NO puede dar 1, o la última ficha del anillo repite la
// arte de la primera y las dos quedan pegadas.
const ANILLOS: readonly Anillo[] = [
  { radioVmax: 20, radioMax: 280, duracion: 50, cantidad: 9, fase: 0, artes: 5 },
  { radioVmax: 38.5, radioMax: 580, duracion: 85, cantidad: 13, fase: 24, artes: 7 },
  { radioVmax: 57, radioMax: 880, duracion: 120, cantidad: 17, fase: 42, artes: 7 },
  { radioVmax: 75.5, radioMax: 1180, duracion: 155, cantidad: 21, fase: 60, artes: 8 },
];

/** Dónde empieza el juego de cada anillo dentro de `IMAGENES`. */
const PRIMERA_ARTE = ANILLOS.reduce<number[]>(
  (acc, anillo, i) => [...acc, (acc[i] ?? 0) + anillo.artes],
  [0],
);

const VERTEX = `
  uniform vec2 uQuadSize;
  varying vec2 vLocal;
  varying vec2 vWorld;
  void main() {
    vLocal = position.xy * uQuadSize;
    vec4 world = modelMatrix * vec4(vLocal, 0.0, 1.0);
    vWorld = world.xy;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const FRAGMENT = `
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform float uAparicion;
  uniform vec2 uTileHalf;
  uniform float uRadius;
  uniform float uImgSize;
  uniform vec4 uBorder;
  uniform vec4 uFade;       // radio x, radio y, centro y, sin usar
  uniform vec2 uBottomFade; // borde inferior, alto del difuminado
  varying vec2 vLocal;
  varying vec2 vWorld;

  float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    float d = sdRoundRect(vLocal, uTileHalf, uRadius);
    float shape = 1.0 - smoothstep(-0.75, 0.75, d);
    if (shape <= 0.001) discard;

    // Recorte anclado a la ficha, no al mundo: el Koko es una figura centrada
    // y corrido queda cortado.
    vec2 uv = vLocal / uImgSize + 0.5;
    vec4 tex = texture2D(uMap, uv);
    vec3 rgb = mix(vec3(0.0), tex.rgb, uHasMap);
    // La ficha no salta de invisible a opaca en un cuadro: uAparicion la
    // funde en 360 ms desde que su textura esta lista.
    float alpha = uHasMap * uAparicion;

    // Filete de ~1px por dentro del borde.
    float border = (1.0 - smoothstep(0.5, 1.5, abs(d + 1.0))) * uBorder.a;
    rgb = mix(rgb, uBorder.rgb, border);
    alpha = max(alpha, border);

    // Difuminado radial del centro, por tramos.
    vec2 q = vec2(vWorld.x / uFade.x, (vWorld.y - uFade.z) / uFade.y);
    float t = length(q);
    float fade = t < 0.42
      ? mix(0.0, 0.5, clamp((t - 0.24) / 0.18, 0.0, 1.0))
      : t < 0.62
        ? mix(0.5, 0.9, clamp((t - 0.42) / 0.20, 0.0, 1.0))
        : mix(0.9, 1.0, clamp((t - 0.62) / 0.16, 0.0, 1.0));

    // Difuminado del borde de abajo: ninguna ficha se corta contra el video.
    float bottom = clamp((vWorld.y - uBottomFade.x) / uBottomFade.y, 0.0, 1.0);

    gl_FragColor = vec4(rgb, shape * alpha * fade * bottom);
  }
`;

interface Ficha {
  anillo: number;
  /** Ángulo propio dentro del anillo; no cambia. */
  angulo: number;
  redondeo: number;
  imagen: number;
  uniforms: Record<string, THREE.IUniform>;
  material: THREE.ShaderMaterial;
}

/**
 * La ficha gira, y con el arte derecho sus esquinas piden píxeles que están
 * fuera de la imagen: el muestreo se pega al último y el filo pega un brinco.
 * La salida no es recortar el Koko —eso es el zoom— sino darle margen: se
 * dibuja sobre un lienzo un 50 % más grande, con el mismo arte estirado y
 * desenfocado de fondo. Así el Koko se ve entero y a su tamaño, y lo que
 * asoma en las esquinas es su propio color, no una franja estirada.
 */
const MARGEN = 1.5;

function texturaConMargen(img: HTMLImageElement): THREE.Texture {
  const arte = Math.max(img.naturalWidth, img.naturalHeight);
  const lado = Math.round(arte * MARGEN);
  const lienzo = document.createElement('canvas');
  lienzo.width = lado;
  lienzo.height = lado;

  const ctx = lienzo.getContext('2d');
  if (ctx) {
    ctx.filter = 'blur(24px)';
    ctx.drawImage(img, -lado * 0.1, -lado * 0.1, lado * 1.2, lado * 1.2);
    ctx.filter = 'none';
    const borde = (lado - arte) / 2;
    ctx.drawImage(img, borde, borde, arte, arte);
  }

  return new THREE.CanvasTexture(lienzo);
}

/** El color del filete sale del token `--borde`, leído del canvas. */
function leerColor(elemento: HTMLElement): [number, number, number, number] {
  const lienzo = document.createElement('canvas');
  lienzo.width = 1;
  lienzo.height = 1;
  const ctx = lienzo.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [0, 0, 0, 0.15];
  ctx.fillStyle = getComputedStyle(elemento).color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255, a / 255];
}

function Fichas({ imagenes }: { imagenes: readonly HTMLImageElement[] }) {
  const seco = useReducedMotion();
  const { scrollY } = useScroll();
  const velocidad = useVelocity(scrollY);
  const { size, gl, invalidate } = useThree();

  const mallas = useRef<(THREE.Mesh | null)[]>([]);
  const texturas = useRef<(THREE.Texture | undefined)[]>([]);
  const giro = useRef({
    angulos: ANILLOS.map(() => 0),
    empujes: ANILLOS.map(() => 0),
  });

  const geometria = useMemo(() => new THREE.PlaneGeometry(1, 1), []);
  useEffect(() => () => geometria.dispose(), [geometria]);
  useEffect(() => {
    const guardadas = texturas.current;
    return () => guardadas.forEach((t) => t?.dispose());
  }, []);

  const fichas = useMemo<Ficha[]>(
    () =>
      ANILLOS.flatMap((anillo, i) =>
        Array.from({ length: anillo.cantidad }, (_, j) => {
          const semilla = 53 * i + 17 * j;
          // La ficha se reparte pareja en su anillo, corrida por la fase del
          // anillo para que no queden alineadas de un anillo al otro. La
          // semilla no da la posición: da el redondeo de las esquinas.
          const angulo = ((360 / anillo.cantidad) * j + anillo.fase) * GRADO;
          const uniforms: Record<string, THREE.IUniform> = {
            uMap: { value: null },
            uHasMap: { value: 0 },
            uAparicion: { value: 0 },
            uQuadSize: { value: new THREE.Vector2(1, 1) },
            uTileHalf: { value: new THREE.Vector2(1, 1) },
            uRadius: { value: 20 },
            uImgSize: { value: 1 },
            uBorder: { value: new THREE.Vector4(0, 0, 0, 0.15) },
            uFade: { value: new THREE.Vector4(1, 1, 0, 0) },
            uBottomFade: { value: new THREE.Vector2(0, 1) },
          };
          return {
            anillo: i,
            angulo,
            redondeo: 20 + (semilla % 14),
            imagen: (PRIMERA_ARTE[i] ?? 0) + (j % anillo.artes),
            uniforms,
            material: new THREE.ShaderMaterial({
              uniforms,
              vertexShader: VERTEX,
              fragmentShader: FRAGMENT,
              transparent: true,
              depthWrite: false,
            }),
          };
        }),
      ),
    [],
  );

  useEffect(() => () => fichas.forEach((f) => f.material.dispose()), [fichas]);

  const medidas = useMemo(() => {
    const vmax = Math.max(size.width, window.innerHeight) / 100;
    const lado = Math.min(131, 0.128 * size.width);
    return {
      radios: ANILLOS.map((a) => Math.min(a.radioVmax * vmax, a.radioMax)),
      ancho: lado,
      alto: lado,
      // La ventana abarca el lienzo entero, margen incluido: el Koko queda a
      // su tamaño natural, ocupando la ficha, sin recorte.
      arte: lado * MARGEN,
    };
  }, [size.width, size.height]);

  useEffect(() => {
    const { ancho, alto, arte } = medidas;
    const anchoDifuminado = 1.2 * Math.min(size.width, 1800);
    const altoDifuminado = 1.05 * size.height;
    const alturaPie = Math.min(340, 0.28 * size.height);
    const bordeInferior = -size.height / 2;

    fichas.forEach((f) => {
      (f.uniforms.uQuadSize.value as THREE.Vector2).set(ancho + 2, alto + 2);
      (f.uniforms.uTileHalf.value as THREE.Vector2).set(ancho / 2, alto / 2);
      f.uniforms.uRadius.value = Math.min(f.redondeo, alto / 2);
      f.uniforms.uImgSize.value = arte;
      (f.uniforms.uFade.value as THREE.Vector4).set(anchoDifuminado, altoDifuminado, 0, 0);
      (f.uniforms.uBottomFade.value as THREE.Vector2).set(bordeInferior, alturaPie);
    });
  }, [fichas, medidas, size.width, size.height]);

  // El filete sigue al tema. Se escucha el cambio en vez de consultarlo cada
  // segundo: con el reloj, al apretar el botón las fichas se quedaban hasta un
  // segundo con el borde del tema anterior y se veía roto.
  useEffect(() => {
    const raiz = document.documentElement;
    const oscuroDelSistema = window.matchMedia('(prefers-color-scheme: dark)');

    const pintar = () => {
      const color = leerColor(gl.domElement);
      fichas.forEach((f) => (f.uniforms.uBorder.value as THREE.Vector4).set(...color));
      invalidate();
    };

    pintar();
    const vigia = new MutationObserver(pintar);
    vigia.observe(raiz, { attributes: true, attributeFilter: ['data-tema'] });
    oscuroDelSistema.addEventListener('change', pintar);
    return () => {
      vigia.disconnect();
      oscuroDelSistema.removeEventListener('change', pintar);
    };
  }, [fichas, gl, invalidate]);

  // Con movimiento reducido el lienzo dibuja por pedido: hay que pedirle un
  // cuadro cada vez que llega una textura nueva.
  useEffect(() => {
    if (!seco) return;
    invalidate();
    const avisar = () => invalidate();
    imagenes.forEach((img) => img.addEventListener('load', avisar));
    return () => imagenes.forEach((img) => img.removeEventListener('load', avisar));
  }, [seco, imagenes, invalidate]);

  useFrame((_, delta) => {
    const paso = Math.min(delta, 0.064);
    const objetivo = seco ? 0 : Math.min(Math.abs(velocidad.get()) / 300, 14);
    const { angulos, empujes } = giro.current;

    ANILLOS.forEach((anillo, i) => {
      const previo = empujes[i] ?? 0;
      // Cada anillo reacciona más lento que el de adentro.
      const empuje = previo + (objetivo - previo) * (1 - Math.exp(-paso / (0.1 + 0.14 * i)));
      empujes[i] = empuje;
      if (seco) return;
      const porSegundo = (360 / anillo.duracion) * GRADO;
      angulos[i] = (angulos[i] ?? 0) + paso * porSegundo * (1 + empuje * (1 + 0.6 * i));
    });

    fichas.forEach((ficha, i) => {
      const malla = mallas.current[i];
      if (!malla) return;

      const empuje = empujes[ficha.anillo] ?? 0;
      const estiron = 1 + (empuje / 14) * (0.08 + 0.06 * ficha.anillo);
      const radio = (medidas.radios[ficha.anillo] ?? 0) * estiron;
      const angulo = (angulos[ficha.anillo] ?? 0) + ficha.angulo;
      const x = radio * Math.sin(angulo);
      const y = radio * Math.cos(angulo);

      malla.position.set(x, y, 0);
      malla.rotation.z = -(angulo + Math.PI / 2);

      if (!ficha.uniforms.uMap.value) {
        let textura = texturas.current[ficha.imagen];
        if (!textura) {
          const img = imagenes[ficha.imagen];
          if (img?.complete && img.naturalWidth > 0) {
            textura = texturaConMargen(img);
            // Sin decodificar: este shader no hace cuentas de luz y three solo
            // vuelve a codificar a sRGB en sus propios materiales.
            textura.colorSpace = THREE.NoColorSpace;
            textura.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy());
            textura.needsUpdate = true;
            texturas.current[ficha.imagen] = textura;
          }
        }
        if (textura) {
          ficha.uniforms.uMap.value = textura;
          ficha.uniforms.uHasMap.value = 1;
        }
      }

      const aparicion = ficha.uniforms.uAparicion.value as number;
      if (ficha.uniforms.uHasMap.value === 1 && aparicion < 1) {
        ficha.uniforms.uAparicion.value = seco ? 1 : Math.min(1, aparicion + paso / 0.36);
      }
    });
  });

  return (
    <>
      {fichas.map((ficha, i) => (
        <mesh
          key={i}
          geometry={geometria}
          frustumCulled={false}
          ref={(m: THREE.Mesh | null) => {
            mallas.current[i] = m;
          }}
        >
          <primitive object={ficha.material} attach="material" />
        </mesh>
      ))}
    </>
  );
}

/**
 * Cuánta resolución pide el lienzo, con un presupuesto de píxeles en vez de un
 * techo fijo.
 *
 * Con 1.5 fijo, un teléfono que pide 3 dibujaba a la mitad y el navegador
 * estiraba: las fichas se veían borrosas. El coste va con el ÁREA, y el hero
 * de un teléfono es seis veces más chico que el de un monitor, así que con el
 * mismo trabajo para la GPU el teléfono llega a 3 y el monitor se queda en 1.5.
 */
const PRESUPUESTO = 3_000_000;

function techoDpr(): number {
  if (typeof window === 'undefined') return 1.5;
  const area = window.innerWidth * window.innerHeight;
  // El 1.5 de piso es el techo que había antes: en pantallas grandes el
  // presupuesto pedía bajar de ahí y no hay razón para empeorarlas.
  return Math.min(window.devicePixelRatio, Math.max(1.5, Math.sqrt(PRESUPUESTO / area)));
}

export default function CampoOrbitas() {
  const seco = useReducedMotion();
  const contenedor = useRef<HTMLDivElement>(null);
  const [enCuadro, setEnCuadro] = useState(false);
  const [imagenes, setImagenes] = useState<readonly HTMLImageElement[]>([]);
  const [techo, setTecho] = useState(techoDpr);

  // Al girar el teléfono cambia el área y con ella el techo.
  useEffect(() => {
    const revisar = () => setTecho(techoDpr());
    window.addEventListener('resize', revisar);
    return () => window.removeEventListener('resize', revisar);
  }, []);

  // Las 27 descargas van en un efecto y no en el cuerpo: ahí se disparaban en
  // cada render, y en un teléfono —donde el campo está en `display: none`—
  // también.
  useEffect(() => {
    setImagenes(
      IMAGENES.map((url) => {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.src = url;
        return img;
      }),
    );
  }, []);

  // Fuera de cuadro no se dibuja: el hero es una pantalla y debajo hay seis
  // más, y el lienzo recorría sus 60 fichas en todas.
  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;
    const vigia = new IntersectionObserver(([e]) => setEnCuadro(e.isIntersecting));
    vigia.observe(nodo);
    return () => vigia.disconnect();
  }, []);

  return (
    <div ref={contenedor} className="campo" aria-hidden="true">
      <Canvas
        orthographic
        flat
        dpr={[1, techo]}
        // Quieto: un cuadro por pedido, el justo para dejar el campo dibujado.
        frameloop={seco ? 'demand' : enCuadro ? 'always' : 'never'}
        camera={{ position: [0, 0, 100], zoom: 1, near: 0.1, far: 1000 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        resize={{ scroll: false, offsetSize: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Fichas imagenes={imagenes} />
      </Canvas>
    </div>
  );
}
