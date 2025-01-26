/**
 * Crea un slug a partir de un nombre.
 * @param name Nombre a convertir en slug.
 * @returns El slug generado.
 */
export function createSlug(name: string): string | undefined {
    try {
      return name
        .toLowerCase() // Convierte a minúsculas
        .normalize("NFD") // Normaliza los caracteres a su forma más simple
        .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos
        .replace(/&/g, 'y') // Reemplaza la & por 'y'
        .replace(/ñ/g, "n") // Reemplaza la ñ por 'n'
        .trim() // Elimina espacios al inicio y al final
        .replace(/[^a-z0-9\s]/g, '') // Elimina caracteres no alfanuméricos (excepto espacios)
        .replace(/\s+/g, '-') // Reemplaza los espacios por guiones
        .replace(/^-+|-+$/g, ''); // Elimina guiones al inicio y al final
    } catch (error) {
      return undefined;
    }
  }