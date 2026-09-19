import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Une clases de Tailwind resolviendo los conflictos entre ellas: con
 * `cn('p-2', 'p-4')` gana `p-4`, no las dos a la vez.
 *
 * Existe porque los componentes que se copian del registry de React Bits la
 * esperan en `@/lib/utils`. No se le agrega nada más.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
