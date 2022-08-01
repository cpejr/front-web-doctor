export const compararDataAgendamentos = (a, b) => {
  var data1 = new Date(a.data_hora);
  var data2 = new Date(b.data_hora);

  if (data1 > data2) {
    return 1;
  } else {
    return -1;
  }
};
