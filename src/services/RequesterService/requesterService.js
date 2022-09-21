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

export const recuperarSenha = (email) => api.put(`/alterar_senha/${email}`);

export const criarConsulta = (consulta) => api.post("/consultas", consulta);

export const updateConsulta = (id_consulta, consulta) =>
	api.put(`/consultas/${id_consulta}`, consulta);

export const updateDadosUsuario = (id_usuario, id_endereco, endereco, estado) =>
	api.put(`/enderecos/${id_endereco}`, endereco).then((res) => {
		api.put(`/usuarios/${id_usuario}`, { ...estado, id_endereco: res.data.id });
	});

export const updateCodigo = (id_usuario, codigo) =>
	api.put(`/usuarios/${id_usuario}`, { codigo: codigo });

export const requisicaoDadosUsuario = (emailUrl) =>
	api.get(`/usuarios/${emailUrl}`);

export const requisicaoDadosUsuarioPorToken = (token_usuario) =>
	api.get(`/usuarios_token/${token_usuario}`);

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

export const deletarEnderecoEUsuario = (id_endereco) =>
	api.delete(`/enderecos/${id_endereco}`);

export const requisicaoExamesMarcados = () => api.get(`/exame_marcados`);

export const requisicaoExamesMarcadosUsuario = (id_usuario) =>
	api.get(`/exame_marcados/${id_usuario}`);

export const requisicaoConsultas = () => api.get(`/consultas`);

export const requisicaoConsultaUsuario = (id_usuario) =>
	api.get(`/consultas/${id_usuario}`);

export const requisicaoExame = (id) => api.get(`/exames/${id}`);

export const requisicaoDadosConsultorios = () => api.get(`/consultorios`);

export const requisicaoDadosConsultoriosPorId = (id) =>
	api.get(`/consultorios/${id}`);

export const deletarConsulta = (id) => api.delete(`/consultas/${id}`);

export const deletarExameMarcado = (id) => api.delete(`/exame_marcados/${id}`);

export const requisicaoFormularios = () => api.get(`/formularios/`);

export const requisicaoFormularioEspecifico = (id) =>
	api.get(`/formularios/${id}`);

export const deletarFormulario = (id) => api.delete(`/formularios/${id}`);

export const requisicaoRespostaFormularioIdUsuario = (id_usuario) =>
	api.get(`/formularios_pacientes_usuario/${id_usuario}`);

export const criarFormulario = (estado) => api.post("/formularios", estado);

export const requisicaoRespostaFormulario = (id) =>
	api.get(`/formularios_pacientes/${id}`);

export const requisicaoFormularioPacientes = (id_formulario) =>
	api.get(`/formularios_pacientes_formularios/${id_formulario}`);

export const requisicaoReceitas = () => api.get(`/receitas/`);

export const criarReceita = (receita) => api.post(`/receitas`, receita);
export const deletarReceita = (id) => api.delete(`/receitas/${id}`);

export const editarPerguntasFormulario = (id, perguntas) =>
	api.put(`/formularios/${id}`, { perguntas: perguntas });

export const editarCamposFormulario = (id, campos) =>
	api.put(`/formularios/${id}`, campos);

export const enviarFormularioPaciente = (status, id_formulario, id_usuario) =>
	api.post("/formularios_pacientes", { status, id_formulario, id_usuario });
