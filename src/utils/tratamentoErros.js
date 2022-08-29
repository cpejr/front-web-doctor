export const compararData = (a, b) => {
  var data1 = new Date(a.data_hora);
  var data2 = new Date(b.data_hora);

  if (data1 > data2) {
    return 1;
  } else {
    return -1;
  }
};

export const compararNomes = (a, b) => {
  var nome1 = a.nome.toUpperCase();
  var nome2 = b.nome.toUpperCase();

  if (nome1 > nome2) {
    return 1;
  } else {
    return -1;
  }
};
