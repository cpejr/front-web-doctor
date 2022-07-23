import { brParaPadrao } from "./date";

export const cpf = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const telefone = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)$/, "$1");
};
export const apenasNumeros = (value) => {
  return value.replace(/\D/g, "");
};
export const apenasNumerosCpfTel = (value) => {
  return value.replace(/\D/g, "").replace(/(\d{11})(\d)/, "$1");
};
export const apenasNumerosCep = (value) => {
  return value.replace(/\D/g, "").replace(/(\d{8})(\d)/, "$1");
};

export const data = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1");
};

export const dataBack = (value) => {
  return brParaPadrao(value);
};

export const dataAgendamentoBack = (value) => {
  var [dia, mes, ano] = value.split("/");

  if (ano.toString().length > 4) {
    ano = ano.substring(0, ano.toString().length - (ano.toString().length - 4));
  }
  if (mes > 12 || dia > 31) {
    return "Data Invalida";
  }
  const resposta = ano + "-" + mes + "-" + dia;
  const dataAtual = new Date();
  const aux = new Date(resposta);
  if ((aux.getUTCDate() === 1 && dia === "31") || aux < dataAtual) {
    return "Data Invalida";
  }

  return resposta;
};

export const apenasLetras = (value) => {
  return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
};

export const cep = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})(\d)/, "$1");
};
