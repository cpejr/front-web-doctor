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
    .replace(/(\d{4})(\d)/, "$1")
};

export const dataBack = (value) => {
  return brParaPadrao(value);
};

export const dataAgendamentoBack = (value) => {
  
  const ano = value.replace(/\D/g, "").replace(/\d{4}/, "").replace(/(\d{4})(\d)/, "");
  console.log("ano: ", ano)
  const mes = value.replace(/\d{2}/, "").replace(/(\d{2})/, "-$1-").replace(/(\d)/, "");
  console.log("mes: ",mes)
  const dia = value.replace(/(\d{2})(\d)/, "$1");
  console.log("dia: ",dia)
  const data_formatada = ano.toString() + mes.toString() + dia.toString();
  return data_formatada;
  // const [dia, mes, ano] = value.split("/")
  //   if (!dia?.length || !mes?.length || !ano?.length) throw new Error()
  //   if (mes !== "02"){
  //       if ( mes % 2 === 0 && dia > "30" )
  //           return "Data Invalida"
  //   } else {
  //       if ( dia > "28" )
  //           return "Data Invalida"
  //   }
  //   if (ano > new Date().getFullYear()){
  //       return "Data Invalida"
  //   }
  //   const dataFormatada = `${ano.padStart(4,"00")}-${mes.padStart(2,"0")}-${dia.padStart(2,"0")}`
  //   dataFormatada.replace(/\D/g, "")
  //   .replace(/(\d{4})(\d)/, "$1-$2")
  //   .replace(/(\d{2})(\d)/, "$1-$2")
  //   .replace(/(\d{2})(\d)/, "$1");
    
    
    
  //   //isNaN false = existe
  //   console.log("🚀 ~ file: date.js ~ line 23 ~ brParaPadrao ~ dataFormatada", dataFormatada)
  //   if (isNaN(new Date(dataFormatada)) === false) { 
  //       return dataFormatada 
  //   } else {
  //       return "Data Invalida" 
  //   }
 
  
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
