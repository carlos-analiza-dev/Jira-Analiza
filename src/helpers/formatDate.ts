export function formatFecha(fechaString?: string | Date): string {
  if (!fechaString) return "Fecha no disponible";

  const date =
    fechaString instanceof Date ? fechaString : new Date(fechaString);

  if (isNaN(date.getTime())) return "Fecha inválida";

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${day}-${month}-${year}`;
}
