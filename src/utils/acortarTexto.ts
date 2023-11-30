export const acortarTexto = (texto: string, longitudMaxima: number) => {
  if (texto.length > longitudMaxima) {
    return texto.slice(0, longitudMaxima) + "...";
  } else {
    return texto;
  }
};
