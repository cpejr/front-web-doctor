export const compararDataAntiga = (a, b) => {
  var data1 = new Date(a.data_hora || a.data_criacao);
  var data2 = new Date(b.data_hora || b.data_criacao);

  return data1 - data2;
}

export const compararDataRecente = (a, b) => {
  var data1 = new Date(a.data_hora || a.data_criacao);
  var data2 = new Date(b.data_hora || b.data_criacao);

  return data2 - data1;
}

export function FormatarDataShort(value) {
  const date = new Date(value);
  
  if (date.getDay() < 10 && date.getMonth() < 10) {
    return ('0' + date.getDate() + '/0' + (date.getMonth() + 1) + '/' + date.getFullYear());

  } else if (date.getDay() < 10 && date.getMonth() >= 10) {
    return ('0' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());

  } else if (date.getDay() >= 10 && date.getMonth() < 10) {
    return (date.getDate() + '/0' + (date.getMonth() + 1) + '/' + date.getFullYear());

  } else {
    return (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
  }
}

export const compararNomes = (a, b) => {
  var nome1 = a.nome.toUpperCase();
  var nome2 = b.nome.toUpperCase();

  if (nome1 > nome2) {
    return 1;
  } else {
    return -1;
  }
};
