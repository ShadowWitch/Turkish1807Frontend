export const formatearFecha = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Se agrega 1 al mes porque en JavaScript los meses van de 0 a 11
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
