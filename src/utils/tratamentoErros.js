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
