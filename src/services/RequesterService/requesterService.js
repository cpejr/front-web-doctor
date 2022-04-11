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

export const requisicaoVerificar = (email, senha) =>
  api.post("/verificar", {
    email,
    senha,
  });
