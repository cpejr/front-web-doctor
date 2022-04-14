import api from "../../services/api";

export const logarUsuario = (email, senha) =>
  api.post("/login", {
    email,
    senha,
  });

export const criarUsuario = (endereco, estado) =>
  api.post("/enderecos", endereco).then((res) => {
    api.post("/usuarios", { ...estado, id_endereco: res.data.id });
  });

export const requisicaoDadosUsuario = (emailUrl) =>
  api.get(`/usuarios/${emailUrl}`);

export const requisicaoDadosEndereco = (dadosUsuario) =>
  api.get(`/enderecos/${dadosUsuario.id_endereco}`);

export const updateDadosUsuario = (id, endereco, estado) =>
  api.put(`/usuarios/${id}`, endereco).then((res) => {
    api.put(`/usuarios/${id}`, { ...estado, id_endereco: res.data.id });
    console.log(endereco);
    console.log(estado);
    console.log(id);
  });
