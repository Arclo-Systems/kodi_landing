import ScrollPortal from '@/components/react-bits/scroll-portal';

/**
 * Andamio de la tarea 1: prueba que un componente del registry monta, anima y
 * recibe los colores de la marca. Se borra en la última tarea; la isla de
 * verdad para la sección de exámenes se construye en la tarea 6.
 *
 * Los colores salen de los tokens de la app, no inventados acá.
 */
const ESCENAS = [
  { id: 'admision', background: '#f47c6b', accent: '#4a1f18', content: <Escena numero="01" titulo="Admisión" /> },
  { id: 'auto', background: '#e3b23c', accent: '#3f2d05', content: <Escena numero="02" titulo="COSEVI Auto" /> },
  { id: 'moto', background: '#5db7e8', accent: '#0d3a52', content: <Escena numero="03" titulo="COSEVI Moto" /> },
];

function Escena({ numero, titulo }: { numero: string; titulo: string }) {
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100%', gap: 12 }}>
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.7 }}>
        {numero} / 03
      </span>
      <strong style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}>
        {titulo}
      </strong>
    </div>
  );
}

export default function PruebaPortal() {
  return <ScrollPortal scenes={ESCENAS} />;
}
