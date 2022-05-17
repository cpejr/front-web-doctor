import api from "../../services/api";

export const logarUsuario = (email, senha) =>
  api.post("/login", {
    email,
    senha,
  });

export const criarUsuario = (endereco, usuario) =>
  api.post("/enderecos", endereco).then((res) => {
    api.post("/usuarios", { ...usuario, id_endereco: res.data.id });
  });

export const updateDadosUsuario = (id_usuario, id_endereco, endereco, estado) =>
  api.put(`/enderecos/${id_endereco}`, endereco).then((res) => {
    api.put(`/usuarios/${id_usuario}`, { ...estado, id_endereco: res.data.id });
  });

export const requisicaoDadosUsuario = (emailUrl) =>
  api.get(`/usuarios/${emailUrl}`);

export const requisicaoDadosPessoais = () => api.get(`/usuarios/`);

export const requisicaoDadosEndereco = (dadosUsuario) =>
  api.get(`/enderecos/${dadosUsuario.id_endereco}`);

export const requisicaoVerificar = (email, senha) =>
  api.post("/verificar", {
    email,
    senha,
  });

export const requisicaoConsultas = (id_usuario) =>
  api.get(`/consultas/${id_usuario}`);

export const requisicaoExamesMarcados = (id_usuario) =>
  api.get(`/exame_marcados/${id_usuario}`);

export const requisicaoExame = (id) => api.get(`/exames/${id}`);

export const alterarSenha = (id, senha) =>
  api.put(`/usuarios/${id}`, { senha: senha });

export const deletarConsulta = (id) => api.delete(`/consultas/${id}`);

export const deletarExameMarcado = (id) => api.delete(`/exame_marcados/${id}`);

export const deletarUsuario = (id) => api.delete(`/usuarios/${id}`);
