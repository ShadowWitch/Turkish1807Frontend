export const formatearFecha = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Se agrega 1 al mes porque en JavaScript los meses van de 0 a 11
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatearISO = (fechaISO: string) => {
  const fecha = new Date(fechaISO);

  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Meses van de 0 a 11
  const day = String(fecha.getDate()).padStart(2, "0");

  const fechaFormateada = `${year}-${month}-${day}`;

  return fechaFormateada;
};
