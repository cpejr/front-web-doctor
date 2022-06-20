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

export const criarConsulta = (consulta) => api.post("/consultas", consulta);

export const updateDadosUsuario = (id_usuario, id_endereco, endereco, estado) =>
  api.put(`/enderecos/${id_endereco}`, endereco).then((res) => {
    api.put(`/usuarios/${id_usuario}`, { ...estado, id_endereco: res.data.id });
  });

export const updateCodigo = (id_usuario, codigo) =>
  api.put(`/usuarios/${id_usuario}`, { codigo: codigo });

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

export const alterarSenha = (id, senha) =>
  api.put(`/usuarios/${id}`, { senha: senha });

export const deletarUsuario = (id) => api.delete(`/usuarios/${id}`);

export const requisicaoExamesMarcados = () => api.get(`/exame_marcados/`);

export const requisicaoConsultas = () => api.get(`/consultas/`);

export const requisicaoExame = (id) => api.get(`/exames/${id}`);

export const requisicaoDadosConsultorios = () => api.get(`/consultorios`);

export const deletarConsulta = (id) => api.delete(`/consultas/${id}`);

export const deletarExameMarcado = (id) => api.delete(`/exame_marcados/${id}`);

export const requisicaoFormularios = () => api.get(`/formularios/`);

export const requisicaoFormularioEspecifico = (id) => api.get(`/formularios/${id}`);

export const deletarFormulario = (id) => api.delete(`/formularios/${id}`);