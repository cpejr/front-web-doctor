import { brParaPadrao } from "./date";

export const apenasNumeros = (value) => {
  return value.replace(/\D/g, "");
};
