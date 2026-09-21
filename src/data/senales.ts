import fichas from './senales.json';

export type CategoriaSenal = 'reglamentacion' | 'prevencion';

export interface Senal {
  readonly id: string;
  readonly categoria: CategoriaSenal;
  /** Cómo se llama la señal: "Alto adelante", "No ciclistas". */
  readonly nombre: string;
  /** Qué ordena o advierte, en una línea. */
  readonly significado: string;
  /** Por qué se reconoce: la forma, el color, el símbolo. */
  readonly detalle: string;
  /**
   * El dibujo del manual oficial. Los `id` internos van prefijados con el de
   * la ficha porque varias señales traían los mismos (`placa`, `panel`): con
   * ochenta y seis SVG en una página, todos los `clip-path` apuntarían al
   * primero y media docena de señales se dibujaría mal.
   */
  readonly svg: string;
}

/**
 * Las señales salen del banco de producción, de la materia "Señales de
 * Tránsito" del módulo COSEVI Auto.
 *
 * Solo están las de reglamentación y prevención: son las que el banco trae con
 * nombre propio, y las que alguien busca cuando quiere saber qué significa un
 * dibujo. Las de información y las horizontales (demarcaciones del pavimento)
 * están escritas como respuesta a una pregunta —"Blanco", "Que no se permite
 * adelantar"— y necesitan que alguien les ponga nombre antes de publicarlas.
 */
export const SENALES = fichas as readonly Senal[];

interface Categoria {
  readonly id: CategoriaSenal;
  readonly nombre: string;
  /** Qué tienen en común, para el encabezado del grupo. */
  readonly que: string;
}

export const CATEGORIAS: readonly Categoria[] = [
  {
    id: 'reglamentacion',
    nombre: 'Señales de reglamentación',
    que: 'Mandan. Indican una obligación, una prohibición o una norma que hay que cumplir, y no acatarlas es una infracción.',
  },
  {
    id: 'prevencion',
    nombre: 'Señales de prevención',
    que: 'Avisan. Advierten un peligro o un obstáculo más adelante para que llegués preparado, no para que frenés de golpe.',
  },
];

export const senalesDe = (categoria: CategoriaSenal): readonly Senal[] =>
  SENALES.filter((senal) => senal.categoria === categoria);
