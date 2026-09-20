/**
 * Las seis pantallas de la app, redibujadas con HTML y CSS. No son capturas.
 *
 * Se dibujan al TAMAÑO REAL de un teléfono (390 px de ancho lógico) y el CSS
 * las encoge para meterlas en el marco. Así todos los valores salen del código
 * de la app tal cual están —14 px es 14 px— sin recalcular nada a mano, y si
 * el marco cambia de tamaño no hay que tocar ni una medida.
 *
 * Dos decisiones que el código de la app obliga a tomar, y que separan estas
 * pantallas de las capturas de la ficha de Play:
 *
 *   · En práctica, la opción elegida NUNCA se pinta de coral. El veredicto vive
 *     en el panel de abajo. Está escrito así a propósito en `AnswerOption`.
 *   · El número grande de la racha no lleva llama: es un número verde con
 *     contorno verde oscuro. La llama solo sale en los días congelados.
 *
 * Los textos que se leen son ejemplos con la forma real de la app, no datos de
 * nadie. Los nombres de usuario son inventados.
 */

import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ClipboardCheck,
  CircleAlert,
  Clock,
  Flag,
  GraduationCap,
  Map,
  Info,
  Search,
  Sparkles,
  Store,
  Trophy,
  Users,
  Wallet,
  X,
  XCircle,
} from 'lucide-react';

/* Opacas: translúcidas se componían contra dos fondos —el relleno del anillo
   por dentro, la pantalla por fuera— y el aro se leía partido en dos. */
const PISTA_LIMA = 'color-mix(in srgb, var(--app-lima) 20%, var(--app-elevado))';
const PISTA_EXAMEN = 'color-mix(in srgb, rgb(59 130 246) 35%, var(--app-elevado))';

/**
 * El anillo de un día en curso. Mismas medidas que el `CircularProgress` de la
 * app: el trazo va centrado en el radio (36 - 2.5) / 2, el arco arranca arriba
 * y —esto es lo que un `conic-gradient` no puede dar— termina en punta
 * redondeada. El disco de adentro mide 31 y lleva la superficie elevada.
 */
function AnilloDia({
  avance,
  color,
  pista,
  children,
}: {
  avance: number;
  color: string;
  pista: string;
  children: React.ReactNode;
}) {
  const LADO = 36;
  const TRAZO = 2.5;
  const radio = (LADO - TRAZO) / 2;
  const vuelta = 2 * Math.PI * radio;
  return (
    <span className="ap-anillo">
      {/* El lienzo lleva 2 de margen: el trazo del aro termina justo en el
          borde de los 36 y, sin ese aire, el SVG lo recorta y el anillo sale
          con huecos donde toca el filo. */}
      <svg viewBox={`-2 -2 ${LADO + 4} ${LADO + 4}`} aria-hidden="true">
        {/* Como el `CircularProgress` de la app: el relleno va en el SVG y
            antes del trazo, si no queda una costura contra la tapa del centro. */}
        <circle cx={LADO / 2} cy={LADO / 2} r={radio} fill="var(--app-elevado)" />
        <circle
          cx={LADO / 2}
          cy={LADO / 2}
          r={radio}
          fill="none"
          stroke={pista}
          strokeWidth={TRAZO}
        />
        <circle
          cx={LADO / 2}
          cy={LADO / 2}
          r={radio}
          fill="none"
          stroke={color}
          strokeWidth={TRAZO}
          strokeDasharray={`${vuelta} ${vuelta}`}
          strokeDashoffset={vuelta * (1 - avance)}
          strokeLinecap="round"
          transform={`rotate(-90 ${LADO / 2} ${LADO / 2})`}
        />
      </svg>
      <span className="ap-anillo__interior">{children}</span>
    </span>
  );
}

/** Los siete discos de la semana de racha. */
function SemanaRacha() {
  // Hoy es lunes: el día en curso lleva el anillo de avance y los otros seis
  // todavía no llegaron. La app no puede pintar verde un día que no pasó.
  const dias = [
    { letra: 'L', estado: 'hoy' },
    { letra: 'M', estado: 'futuro' },
    { letra: 'M', estado: 'futuro' },
    { letra: 'J', estado: 'futuro' },
    { letra: 'V', estado: 'futuro' },
    { letra: 'S', estado: 'futuro' },
    { letra: 'D', estado: 'futuro' },
  ];
  return (
    <div className="ap-semana">
      {dias.map((d, i) =>
        d.estado === 'hoy' ? (
          <AnilloDia key={i} avance={0.35} color="var(--app-lima)" pista={PISTA_LIMA}>
            <span className="ap-dia__letra">{d.letra}</span>
          </AnilloDia>
        ) : (
          <span key={i} className={`ap-dia ap-dia--${d.estado}`}>
            <span>{d.letra}</span>
          </span>
        ),
      )}
    </div>
  );
}

/** 1 · Plan del día. El "Hoy." con la meta y las tarjetas de abajo. */
export function PantallaHoy() {
  return (
    <div className="ap ap--hoy">
      {/* Los chips van a la izquierda y las acciones a la derecha. El de liga
          lleva la insignia del tier, el nombre y el EXP del ciclo; el de
          Kolones, la moneda. Las dos imágenes son los assets de la app. */}
      <div className="ap-header">
        <div className="ap-chips">
          <span className="ap-chip">
            <img className="ap-chip__insignia" src="/app/liga-aprendiz.webp" alt="" />
            <span className="ap-chip__liga">Aprendiz</span>
            <span className="ap-chip__punto" />
            <span className="ap-chip__cifra">240</span>
          </span>
          <span className="ap-chip ap-chip--kolones">
            <img className="ap-chip__moneda" src="/app/kolones.webp" alt="" />
            <span className="ap-chip__cifra">320</span>
          </span>
        </div>
        <div className="ap-acciones">
          <span className="ap-accion ap-accion--tienda">
            <Store size={20} strokeWidth={2.2} />
            <span className="ap-accion__punto ap-accion__punto--nuevo" />
          </span>
          <span className="ap-accion">
            <Users size={20} />
          </span>
          <span className="ap-accion">
            <Bell size={20} />
            <span className="ap-accion__punto" />
          </span>
        </div>
      </div>

      <div className="ap-racha-bloque">
        <SemanaRacha />
        <span className="ap-vercal">VER CALENDARIO</span>
      </div>

      <div className="ap-hero">
        {/* El personaje del módulo, de fondo al 14%: sale por la esquina
            inferior derecha igual que en la app. */}
        <img className="ap-hero__personaje" src="/app/personaje-paa.webp" alt="" />
        <p className="ap-hero__fecha">Lunes, 14 · sep · 2026</p>
        <p className="ap-hero__titulo">
          Hoy<span className="ap-hero__punto">.</span>
        </p>
        <p className="ap-hero__modulo">Prueba de Admisión</p>
        <div className="ap-hero__linea" />
        <div className="ap-hero__stats">
          <div>
            <p className="ap-hero__rotulo">META DIARIA</p>
            <p className="ap-hero__cifra">
              12<span>/20</span>
            </p>
            <p className="ap-hero__pie">preguntas</p>
          </div>
          <span className="ap-hero__division" />
          <div>
            <p className="ap-hero__rotulo">DOMINIO</p>
            <p className="ap-hero__cifra">
              64<span>%</span>
            </p>
            <p className="ap-hero__pie">del temario</p>
          </div>
        </div>
        <div className="ap-hero__linea ap-hero__linea--baja" />
        <div className="ap-hero__cta">
          Empezar la sesión
          <ArrowRight size={18} strokeWidth={2} />
        </div>
      </div>

      {/* El rótulo va FUERA de la tarjeta, encima: adentro solo el tema y su
          frase. Desbloqueadas conservan el vidrio y el degradado —el efecto lo
          decide la feature, no el plan— y solo pierden el candado y el badge.
          Las dos son Plus, así que las dos van doradas. */}
      <div className="ap-feature">
        <p className="ap-feature__rotulo">RUTA ADAPTATIVA</p>
        <div className="ap-tarjeta">
          <span className="ap-tarjeta__circulo">
            <Sparkles size={18} fill="currentColor" />
          </span>
          <div className="ap-tarjeta__stack">
            <p className="ap-tarjeta__titulo">Razonamiento Matemático</p>
            <p className="ap-tarjeta__sub">Tema recomendado hoy</p>
          </div>
          <ChevronRight className="ap-tarjeta__flecha" size={20} strokeWidth={2.4} />
        </div>
      </div>

      <div className="ap-feature">
        <p className="ap-feature__rotulo">SIMULACRO</p>
        <div className="ap-tarjeta">
          <span className="ap-tarjeta__circulo">
            <ClipboardCheck size={20} strokeWidth={2.2} />
          </span>
          <div className="ap-tarjeta__stack">
            <p className="ap-tarjeta__titulo">Simulacro</p>
            <p className="ap-tarjeta__sub">45 preguntas · 110 min</p>
          </div>
          <ChevronRight className="ap-tarjeta__flecha" size={20} strokeWidth={2.4} />
        </div>
      </div>
    </div>
  );
}

/** 2 · La explicación del error. */
export function PantallaError() {
  const opciones = [
    { letra: 'A', texto: 'Ceder el paso y esperar' },
    { letra: 'B', texto: 'Avanzar con precaución', elegida: true },
    { letra: 'C', texto: 'Tocar la bocina' },
  ];
  return (
    <div className="ap ap--error">
      <div className="ap-err-header">
        <X size={24} />
        <span className="ap-err-marcas">
          <span className="ap-err-ok">
            <Check size={16} strokeWidth={2.5} /> 7
          </span>
          <span className="ap-err-mal">
            <X size={16} strokeWidth={2.5} /> 2
          </span>
        </span>
      </div>

      <div className="ap-pizarra">
        <p className="ap-pizarra__materia">NORMAS DE CIRCULACIÓN</p>
        <span className="ap-pizarra__tiza" />
        <p className="ap-pizarra__texto">
          Llegás a una intersección sin señales y otro vehículo se acerca por tu derecha. ¿Qué
          corresponde hacer?
        </p>
      </div>

      <div className="ap-opciones">
        {opciones.map((o) => (
          <div key={o.letra} className={`ap-opcion${o.elegida ? ' ap-opcion--elegida' : ''}`}>
            <span className="ap-opcion__letra">{o.letra}</span>
            <span className="ap-opcion__texto">{o.texto}</span>
          </div>
        ))}
      </div>

      <div className="ap-panel">
        <div className="ap-panel__titulo">
          <span>
            <XCircle size={24} />
            Incorrecto
          </span>
          {/* Reportar la pregunta: vive acá, a la derecha del veredicto. */}
          <Flag className="ap-panel__reportar" size={20} />
        </div>
        <div>
          <p className="ap-panel__rotulo">Respuesta correcta:</p>
          <p className="ap-panel__correcta">Ceder el paso y esperar</p>
        </div>
        <div>
          <p className="ap-panel__rotulo ap-panel__rotulo--gris">Explicación</p>
          <p className="ap-panel__texto">
            Sin señales que indiquen otra cosa, la preferencia es de quien viene por la derecha.
          </p>
        </div>
        <div className="ap-panel__botones">
          <span className="ap-boton ap-boton--linea">Explica mi error</span>
          <span className="ap-boton ap-boton--lleno">Entendido</span>
        </div>
      </div>
    </div>
  );
}

/** 3 · Partida Kodi: el marcador y la ruleta. */
export function PantallaPartida() {
  // Los sectores de una partida son las materias del módulo MÁS la corona, que
  // no es materia sino el derecho a elegir cuál capturar. Estas cinco son las
  // de PNE Secundaria con su color y su arte de ruleta del panel; la corona
  // sale de `game_wheel_config` y hoy en producción es dorada.
  const SECTORES = [
    { color: '#408d99', arte: '/app/ruleta-sociales.webp' },
    { color: '#5db7e8', arte: '/app/ruleta-matematicas.webp' },
    { color: '#9bcb6c', arte: '/app/ruleta-ciencias.webp' },
    { color: '#f47c6b', arte: '/app/ruleta-espanol.webp' },
    { color: '#f4a261', arte: '/app/ruleta-civica.webp' },
    { color: '#e3b23c', arte: '/app/ruleta-corona.webp' },
  ];

  // Las medidas salen de RouletteWheel con un lienzo de 350.
  const LADO = 350;
  const RADIO = LADO / 2;
  const ARO = Math.max(5, Math.round(LADO * 0.026));
  const DISCO = RADIO - ARO;
  const FILO = Math.max(2, Math.round(LADO * 0.023));
  const ANGULO = 360 / SECTORES.length;
  const SOLAPE = 0.6;
  const ARTE = LADO * 0.2;
  const ORBITA = DISCO * 0.62;
  const PIN_ANCHO = LADO * 0.27;
  const PIN_ALTO = PIN_ANCHO * (28 / 25);

  const polar = (r: number, grados: number) => {
    const rad = ((grados - 90) * Math.PI) / 180;
    return { x: RADIO + r * Math.cos(rad), y: RADIO + r * Math.sin(rad) };
  };
  const cuña = (r: number, desde: number, hasta: number) => {
    const a = polar(r, desde);
    const b = polar(r, hasta);
    return `M ${RADIO} ${RADIO} L ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y} Z`;
  };
  // El filo del arco exterior es el mismo color un 21% más oscuro.
  const oscurecer = (hex: string) => {
    const c = (i: number) =>
      Math.round(parseInt(hex.slice(i, i + 2), 16) * 0.79)
        .toString(16)
        .padStart(2, '0');
    return `#${c(1)}${c(3)}${c(5)}`;
  };

  return (
    <div className="ap ap--partida">
      {/* La escena de la partida va de fondo, velada con el color del tema:
          0.82 en claro y 0.93 en oscuro. */}
      <img className="ap-pk-escena" src="/app/escena-partida.webp" alt="" />
      <span className="ap-pk-velo" />

      <div className="ap-pk-header">
        <ArrowLeft size={24} />
      </div>

      <div className="ap-pk-contenido">
        <div className="ap-pk-marcador">
          <div className="ap-pk-lado">
            <span className="ap-pk-aro">
              <img src="/app/avatar-cafetalero.webp" alt="" />
            </span>
            <p className="ap-pk-nombre">camila_v</p>
          </div>

          <div className="ap-pk-tanteo">
            <span className="ap-pk-pastilla">
              <span className="ap-pk-num ap-pk-num--yo">2</span>
              <span className="ap-pk-vs">vs</span>
              <span className="ap-pk-num ap-pk-num--rival">1</span>
            </span>
          </div>

          <div className="ap-pk-lado">
            <span className="ap-pk-aro">
              <img src="/app/avatar-surfista.webp" alt="" />
            </span>
            <p className="ap-pk-nombre">andre.cr</p>
          </div>
        </div>

        <div className="ap-pk-zona">
          <p className="ap-pk-turno">Te toca</p>

          <div className="ap-pk-ruleta" style={{ width: LADO, height: LADO }}>
            <svg width={LADO} height={LADO} aria-hidden="true">
              {SECTORES.map((s, i) => (
                <path
                  key={`filo-${i}`}
                  d={cuña(DISCO, i * ANGULO, (i + 1) * ANGULO + SOLAPE)}
                  fill={oscurecer(s.color)}
                />
              ))}
              {SECTORES.map((s, i) => (
                <path
                  key={i}
                  d={cuña(DISCO - FILO, i * ANGULO, (i + 1) * ANGULO + SOLAPE)}
                  fill={s.color}
                />
              ))}
            </svg>

            {/* El arte de cada sector orbita a 0.62 del disco y va girado al eje
                de su cuña, para quedar derecho bajo el puntero. */}
            {SECTORES.map((s, i) => {
              const angulo = i * ANGULO + ANGULO / 2;
              const at = polar(ORBITA, angulo);
              return (
                <img
                  key={`arte-${i}`}
                  className="ap-pk-arte"
                  src={s.arte}
                  alt=""
                  style={{
                    left: at.x,
                    top: at.y,
                    width: ARTE,
                    height: ARTE,
                    transform: `translate(-50%, -50%) rotate(${angulo}deg)`,
                  }}
                />
              );
            })}

            <span className="ap-pk-anillo" style={{ borderWidth: ARO }} />
            <span className="ap-pk-filo" />
            <span className="ap-pk-filo" style={{ inset: ARO - 1, borderRadius: RADIO }} />

            {/* El botón es un SVG propio: pin, rótulo y sombra en el archivo. Su
                círculo no está en el centro del lienzo, sino a 15.5 de 28. */}
            <img
              className="ap-pk-girar"
              src="/app/girar.svg"
              alt=""
              style={{
                width: PIN_ANCHO,
                height: PIN_ALTO,
                left: RADIO - PIN_ANCHO / 2,
                top: RADIO - PIN_ALTO * (15.5 / 28),
              }}
            />
          </div>
        </div>

        <div className="ap-pk-pie">
          {/* Las barritas son MIS turnos perfectos, no materias: al llenarse se
              elige la materia a disputar. */}
          <span className="ap-pk-barra">
            <span className="ap-pk-barra__lleno" style={{ width: '66.667%' }} />
            <span className="ap-pk-barra__div" style={{ left: '33.333%' }} />
            <span className="ap-pk-barra__div" style={{ left: '66.667%' }} />
          </span>

          <span className="ap-pk-reportar">
            <Flag size={20} fill="currentColor" />
          </span>
        </div>
      </div>
    </div>
  );
}

/** 4 · La tabla de la liga. */
export function PantallaLiga() {
  // Tres de la lista llevan avatar de la tienda (los tres Koko que hoy están
  // activos); el resto cae a la inicial sobre un color de marca, que es lo que
  // hace `UserFace` cuando no hay arte.
  const gente = [
    { pos: 1, nombre: 'valeria_r', exp: '1 240', foto: '/app/avatar-surfista.webp' },
    { pos: 2, nombre: 'nachomora', exp: '1 180', color: '#5db7e8' },
    { pos: 3, nombre: 'kodi_fan', exp: '1 120', foto: '/app/avatar-faroles.webp' },
    { pos: 4, nombre: 'camila_v', exp: '980', foto: '/app/avatar-cafetalero.webp', yo: true },
    { pos: 5, nombre: 'andre.cr', exp: '920', color: '#f47c6b' },
    { pos: 6, nombre: 'sofi_pq', exp: '860', color: '#b79ae8', baja: true },
    { pos: 7, nombre: 'el_tico', exp: '610', color: '#e3b23c' },
  ];

  // Los tres del podio llevan los tokens oficiales y un facetado diagonal: la
  // mitad inferior-derecha se sombrea con el color del aro al 22%.
  const PODIO: Record<number, { fondo: string; aro: string; texto: string }> = {
    1: { fondo: '#feea66', aro: '#ffc800', texto: '#ff9600' },
    2: { fondo: '#d6e4ef', aro: '#aac1d4', texto: '#849fb5' },
    3: { fondo: '#f7be8b', aro: '#d7975d', texto: '#cd7900' },
  };

  return (
    <div className="ap ap--liga">
      <div className="ap-lg-header">
        <img className="ap-lg-insignia" src="/app/liga-aprendiz.webp" alt="" />
        <div className="ap-lg-identidad">
          <p className="ap-lg-tier">
            Aprendiz
            <ChevronDown size={16} strokeWidth={2.6} />
          </p>
          <p className="ap-lg-tiempo">
            <Clock size={14} strokeWidth={2} />
            Termina en 2d 14h
          </p>
        </div>
        <span className="ap-lg-accion">
          <Trophy size={20} strokeWidth={2} />
        </span>
        <span className="ap-lg-accion">
          <Info size={20} strokeWidth={2} />
        </span>
      </div>

      <div className="ap-lg-tabs">
        <span className="ap-lg-tab ap-lg-tab--activa">Tu Liga</span>
        <span className="ap-lg-tab">Amigos</span>
        <span className="ap-lg-tab">Misiones</span>
      </div>

      <div className="ap-lg-columnas">
        <span>POSICIÓN</span>
        <span>EXPERIENCIA</span>
      </div>

      <p className="ap-lg-zona ap-lg-zona--sube">
        <ChevronUp size={20} strokeWidth={3} />
        ZONA DE ASCENSO
        <ChevronUp size={20} strokeWidth={3} />
      </p>

      {gente.map((p, i) => (
        <div key={p.pos}>
          {p.baja && (
            <p className="ap-lg-zona ap-lg-zona--baja">
              <ChevronDown size={20} strokeWidth={3} />
              ZONA DE DESCENSO
              <ChevronDown size={20} strokeWidth={3} />
            </p>
          )}
          <div className={`ap-lg-fila${p.yo ? ' ap-lg-fila--yo' : ''}`}>
            <span className="ap-lg-puesto">
              {p.pos <= 3 ? (
                <span
                  className="ap-lg-keycap ap-lg-keycap--podio"
                  style={{
                    background: PODIO[p.pos].fondo,
                    borderColor: PODIO[p.pos].aro,
                    color: PODIO[p.pos].texto,
                    ['--faceta' as string]: PODIO[p.pos].aro,
                  }}
                >
                  {p.pos}
                </span>
              ) : (
                <span className="ap-lg-keycap">{p.pos}</span>
              )}
            </span>

            {p.foto ? (
              <img className="ap-lg-cara" src={p.foto} alt="" />
            ) : (
              <span className="ap-lg-cara ap-lg-cara--inicial" style={{ background: p.color }}>
                {p.nombre[0].toUpperCase()}
              </span>
            )}

            <span className="ap-lg-nombre">{p.nombre}</span>

            <span className="ap-lg-exp">
              <b>EXP</b>
              {p.exp}
            </span>
          </div>
          {i < gente.length - 1 && <span className="ap-lg-divisor" />}
        </div>
      ))}
    </div>
  );
}

/** 5 · La racha, con el calendario del mes. */
export function PantallaRacha() {
  // Septiembre de 2026 empieza en martes. El backend NO expone historial por
  // día: solo la semana en curso trae estado, y todo lo anterior queda neutro
  // —es un "no sé", no un "no practicaste"—. Por eso el mes se ve casi todo
  // gris y solo la semana viva está encendida.
  const DIAS_MES = 30;
  const HUECO_INICIAL = 1; // septiembre de 2026 arranca en martes
  const HOY = 14; // lunes, y el día 14 de la racha
  const PROTEGIDOS = [4, 9];
  const EXAMEN = 27;

  function estado(dia: number): string {
    if (dia === HOY) return 'hoy';
    if (PROTEGIDOS.includes(dia)) return 'frio';
    if (dia < HOY) return 'hecho';
    if (dia === EXAMEN) return 'examen';
    return 'futuro';
  }

  return (
    <div className="ap ap--racha">
      <div className="ap-rc-header">
        <span className="ap-rc-hbtn">
          <X size={24} />
        </span>
        <p className="ap-rc-titulo">Días de racha</p>
        <span className="ap-rc-hbtn ap-rc-hbtn--info">
          <CircleAlert size={24} />
        </span>
      </div>

      <div className="ap-rc-tabs">
        <span className="ap-rc-tab ap-rc-tab--activa">PERSONAL</span>
        <span className="ap-rc-tab">AMIGOS</span>
      </div>

      <div className="ap-rc-cuerpo">
        <div className="ap-rc-hero">
          {/* Dos copias: la de atrás hace de contorno grueso, la de adelante es
              el número. Con una sola y `paint-order`, los huecos del 4 dejarían
              ver el fondo en vez del verde oscuro. */}
          <span className="ap-rc-numero">
            <span className="ap-rc-numero__borde" aria-hidden="true">
              14
            </span>
            <span className="ap-rc-numero__cara">14</span>
          </span>
          <p className="ap-rc-pie">días de racha</p>
        </div>

        <div className="ap-rc-pills">
          <div className="ap-rc-pill">
            <div className="ap-rc-pill__alto">
              <img src="/app/meta-racha.svg" alt="" width="18" height="18" />
              <span className="ap-rc-pill__dato">14 / 30</span>
              <ChevronRight className="ap-rc-pill__chevron" size={14} />
            </div>
            <p className="ap-rc-pill__rotulo">meta de racha</p>
          </div>
          <div className="ap-rc-pill">
            <div className="ap-rc-pill__alto">
              <img src="/app/llama-congelada.svg" alt="" width="16" height="20" />
              <span className="ap-rc-pill__dato">1</span>
            </div>
            <p className="ap-rc-pill__rotulo">protectores esta semana</p>
          </div>
        </div>

        <div className="ap-rc-cal">
          <div className="ap-rc-cal__cabeza">
            <span className="ap-rc-cal__nav">
              <ChevronLeft size={24} strokeWidth={2.2} />
            </span>
            <p className="ap-rc-mes">Septiembre 2026</p>
            <span className="ap-rc-cal__nav">
              <ChevronRight size={24} strokeWidth={2.2} />
            </span>
          </div>

          <div className="ap-rc-cabecera">
            {['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="ap-rc-grilla">
            {Array.from({ length: HUECO_INICIAL }, (_, i) => (
              <span key={`hueco-${i}`} />
            ))}
            {Array.from({ length: DIAS_MES }, (_, i) => i + 1).map((d) => {
              const e = estado(d);
              if (e === 'hoy' || e === 'examen') {
                // El día de examen es una MARCA, no un avance: lleva el aro
                // entero en el color de su examen y ningún arco encima.
                const esExamen = e === 'examen';
                return (
                  <AnilloDia
                    key={d}
                    avance={esExamen ? 0 : 0.35}
                    color="var(--app-lima)"
                    pista={esExamen ? PISTA_EXAMEN : PISTA_LIMA}
                  >
                    <span className="ap-dia__letra">{d}</span>
                  </AnilloDia>
                );
              }
              return (
                <span key={d} className={`ap-rc-dia ap-rc-dia--${e}`}>
                  {e === 'frio' ? (
                    <img src="/app/llama-congelada.svg" alt="" width="15" height="19" />
                  ) : (
                    <span>{d}</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        <p className="ap-rc-examenes">Fechas de exámenes</p>
        <div className="ap-rc-lista">
          <div className="ap-rc-examen">
            <span className="ap-rc-examen__disco">
              <GraduationCap size={18} strokeWidth={2.4} />
            </span>
            <div className="ap-rc-examen__texto">
              <p className="ap-rc-examen__nombre">Examen UCR · UNA</p>
              <p className="ap-rc-examen__meta">27 de septiembre · en 13 días</p>
            </div>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * La silueta del cupón en UN solo trazo: esquinas redondeadas, las dos
 * mordidas del troquel y el canto. Se dibuja como SVG porque así banda,
 * cuerpo, borde y agujeros son un único raster: dentro de la capa escalada
 * del teléfono, tres capas HTML tocándose en un borde fraccionario dejaban
 * costuras de 1px (la línea clara bajo la banda y el aro alrededor del hueco)
 * que la app no tiene porque dibuja a píxel entero.
 */
const CUPON = { ancho: 166.25, alto: 255, radio: 20, mordida: 8, costura: 133 };

function siluetaCupon(): string {
  const { ancho: W, alto: H, radio: R, mordida: r, costura: y } = CUPON;
  return [
    `M ${R} 0`,
    `H ${W - R} A ${R} ${R} 0 0 1 ${W} ${R}`,
    `V ${y - r} A ${r} ${r} 0 0 0 ${W} ${y + r}`,
    `V ${H - R} A ${R} ${R} 0 0 1 ${W - R} ${H}`,
    `H ${R} A ${R} ${R} 0 0 1 0 ${H - R}`,
    `V ${y + r} A ${r} ${r} 0 0 0 0 ${y - r}`,
    `V ${R} A ${R} ${R} 0 0 1 ${R} 0`,
    'Z',
  ].join(' ');
}

/** 6 · Los cupones. */
export function PantallaBeneficios() {
  // Producción hoy tiene el catálogo en cero, así que estas marcas son de
  // ejemplo. La anatomía —banda, troquel, cuerpo y pie— sí es la de la app.
  const cupones = [
    {
      marca: 'Librería Andina',
      inicial: 'L',
      color: '#408d99',
      tier: 'BÁSICO',
      punto: '#5db7e8',
      beneficio: '20% en libros de texto',
      precio: '450',
      stock: '12 disp.',
    },
    {
      marca: 'Café del Valle',
      inicial: 'C',
      color: '#b34734',
      tier: 'ESTÁNDAR',
      punto: '#e3b23c',
      beneficio: 'Café gratis con tu combo',
      precio: '300',
      stock: '8 disp.',
    },
  ];

  return (
    <div className="ap ap--benef">
      <div className="ap-header">
        <div className="ap-chips">
          <span className="ap-chip">
            <img className="ap-chip__insignia" src="/app/liga-aprendiz.webp" alt="" />
            <span className="ap-chip__liga">Aprendiz</span>
            <span className="ap-chip__punto" />
            <span className="ap-chip__cifra">240</span>
          </span>
          <span className="ap-chip ap-chip--kolones">
            <img className="ap-chip__moneda" src="/app/kolones.webp" alt="" />
            <span className="ap-chip__cifra">320</span>
          </span>
        </div>
        <div className="ap-acciones">
          <span className="ap-accion">
            <CircleAlert size={20} />
          </span>
          <span className="ap-accion">
            <Map size={20} />
          </span>
          <span className="ap-accion">
            <Wallet size={20} />
            <span className="ap-accion__cuenta">2</span>
          </span>
        </div>
      </div>

      {/* El destacado: portada del color de la marca con un degradado negro
          encima, y el precio y el CTA sobre esa base. Debajo, los puntos del
          carrusel (el activo se alarga en vez de cambiar de color). */}
      <div className="ap-bf-destacado">
        <div className="ap-bf-destacado__portada" style={{ background: '#6b4fa8' }}>
          {/* La inicial va de fondo, enorme y apenas visible: sale por la
              esquina y hace de arte cuando la marca no tiene logo. */}
          <span className="ap-bf-destacado__inicial" aria-hidden="true">
            P
          </span>
        </div>
        <span className="ap-bf-destacado__velo" />
        <div className="ap-bf-destacado__contenido">
          <span className="ap-bf-destacado__pastilla">PREMIUM · DESTACADO</span>
          <div>
            <p className="ap-bf-destacado__marca">PAPELERÍA CENTRAL</p>
            <p className="ap-bf-destacado__beneficio">2x1 en cuadernos y blocs</p>
            <span className="ap-bf-destacado__linea" />
            <div className="ap-bf-destacado__pie">
              <span className="ap-bf-destacado__precio">
                <img src="/app/kolones.webp" alt="" width="18" height="18" />
                600
              </span>
              <span className="ap-bf-destacado__cta">
                CANJEAR
                <ArrowRight size={14} strokeWidth={2.6} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="ap-bf-puntos">
        <i className="ap-bf-punto ap-bf-punto--activo" />
        <i className="ap-bf-punto" />
        <i className="ap-bf-punto" />
      </div>

      <div className="ap-bf-buscador">
        <Search size={16} />
        <span>Buscar cupones o marcas</span>
      </div>

      <div className="ap-bf-chips">
        <span className="ap-bf-chip ap-bf-chip--activo">Todos</span>
        <span className="ap-bf-chip">Académico</span>
        <span className="ap-bf-chip">Librerías</span>
        <span className="ap-bf-chip">Restaurantes</span>
      </div>

      <p className="ap-bf-rotulo">TODOS LOS CUPONES</p>

      <div className="ap-bf-grid">
        {cupones.map((c) => (
          <div key={c.marca} className="ap-bf-card">
            {/* Todo lo que es "forma" va acá, en un solo SVG: la silueta con
                sus agujeros, el borde, la banda recortada por la misma silueta
                y la punteada. El HTML de arriba solo pone texto e íconos. */}
            <svg
              className="ap-bf-forma"
              viewBox={`0 0 ${CUPON.ancho} ${CUPON.alto}`}
              aria-hidden="true"
            >
              <defs>
                <clipPath id={`cupon-${c.inicial}`}>
                  <path d={siluetaCupon()} />
                </clipPath>
              </defs>
              <path className="ap-bf-forma__cuerpo" d={siluetaCupon()} />
              <rect
                width={CUPON.ancho}
                height={CUPON.costura}
                fill={c.color}
                clipPath={`url(#cupon-${c.inicial})`}
              />
              {/* Veinte guiones de 4 repartidos parejo entre mordida y
                  mordida, como el `space-between` de la app. */}
              <line
                className="ap-bf-forma__perfo"
                x1={CUPON.mordida + 2}
                x2={CUPON.ancho - CUPON.mordida - 2}
                y1={CUPON.costura}
                y2={CUPON.costura}
              />
              <path className="ap-bf-forma__borde" d={siluetaCupon()} />
            </svg>

            <div className="ap-bf-banda">
              <span className="ap-bf-inicial">{c.inicial}</span>
              <span className="ap-bf-tier">
                <i style={{ background: c.punto }} />
                {c.tier}
              </span>
            </div>

            <div className="ap-bf-cuerpo">
              <p className="ap-bf-meta">
                <span className="ap-bf-marca">{c.marca}</span>
                <i className="ap-bf-meta__punto" />
                <span className="ap-bf-stock">{c.stock}</span>
              </p>
              <p className="ap-bf-beneficio">{c.beneficio}</p>
            </div>

            <span className="ap-bf-linea" />

            <div className="ap-bf-pie">
              <span className="ap-bf-precio">
                <img src="/app/kolones.webp" alt="" width="16" height="16" />
                {c.precio}
              </span>
              <ArrowRight size={14} strokeWidth={2.4} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const PANTALLAS = [
  <PantallaHoy key="hoy" />,
  <PantallaError key="error" />,
  <PantallaPartida key="partida" />,
  <PantallaLiga key="liga" />,
  <PantallaRacha key="racha" />,
  <PantallaBeneficios key="beneficios" />,
];
