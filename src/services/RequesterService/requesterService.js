import api from "../../services/api";

export const EnviandoImagem = (base64) =>
  api.post("/arquivo", { file: base64 });


export const EnviandoArquivo = (base64) => api.post("/arquivofile", {file: base64});


export const logarUsuario = (email, senha) =>
  api.post("/login", {
    email,
    senha,
  });

export const criarUsuario = async (endereco, usuario) => {
  const res = await api.post("/enderecos", endereco);
  const response = await api.post("/usuarios", {
    ...usuario,
    id_endereco: res.data.id,
  });
  const userId = response.data.id;
  return userId;
};

export const recuperarSenha = (email) => api.put(`/alterar_senha/${email}`);

export const criarConsulta = (consulta) => api.post("/consultas", consulta);

export const criarExame = (exame) => api.post("/exame_marcados", exame);

export const updateConsulta = (id_consulta, consulta) =>
  api.put(`/consultas/${id_consulta}`, consulta);

export const updateExameMarcado = (id, exame) =>
  api.put(`/exame_marcados/${id}`, exame);

export const updateDadosUsuario = (id_usuario, id_endereco, endereco, estado) =>
  api.put(`/enderecos/${id_endereco}`, endereco).then((res) => {
    api.put(`/usuarios/${id_usuario}`, { ...estado, id_endereco: res.data.id });
  });

export const updateNotificacaoAtivaFormularioPaciente = (
  id,
  notificacao_ativa
) =>
  api.put(`/formularios_pacientes/${id}`, {
    notificacao_ativa: notificacao_ativa,
  });

export const updateCodigo = (id_usuario, codigo) =>
  api.put(`/usuarios/${id_usuario}`, { codigo: codigo });

export const UpdateComentario = (id, comentario) =>
  api.put(`/comentarios/${id}`, { comentario: comentario });

export const DeleteComentario = (id, comentario) =>
  api.delete(`/comentarios/${id}`, { comentario: comentario });

export const CriandoComentario = (comentario) =>
  api.post('/comentarios', comentario);

export const requisicaoComentario = () =>
  api.get(`/comentarios`);

export const requisicaoDadosUsuario = (emailUrl) =>
  api.get(`/usuarios/${emailUrl}`);

export const requisicaoUsuarioPorId = (id_usuario) =>
  api.get(`/usuarios_id/${id_usuario}`);

export const requisicaoReceitasPorUsuarioId = (id_usuario) =>
  api.get(`/usuarios_receitas/${id_usuario}`);

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

export const requisicaoDadosConsultorios = (filtro) =>
  api.get(`/consultorios`, { tipo: filtro });

export const requisicaoDadosExames = () => api.get(`/exames`);

export const requisicaoDadosConsultoriosPorId = (id) =>
  api.get(`/consultorios/${id}`);

export const deletarConsulta = (id) => api.delete(`/consultas/${id}`);

export const deletarExameMarcado = (id) => api.delete(`/exame_marcados/${id}`);

export const requisicaoFormularios = () => api.get(`/formularios/`);
 
export const requisicaoIndicacaoEspecifica = () => api.get(`/indicacoes_especificas/`);

export const requisicaoMedicosIndicados = (id_indicacao_especifica) => api.get(`/medicos_indicados/${id_indicacao_especifica}`);

export const indicarMedico = (id_indicacao_especifica, nome, telefone, local_atendimento) => api.post(`/medicos_indicados` ,
 {id_indicacao_especifica, nome, telefone, local_atendimento});

export const alterarMedicoIndicado = (id,estado) => api.put(`/medicos_indicados/${id}` ,estado);

export const deletarMedicoIndicado = (id) => api.delete(`/medicos_indicados/${id}`);

export const requisicaoFormularioEspecifico = (id) =>
  api.get(`/formularios/${id}`);

export const deletarFormulario = (id) => api.delete(`/formularios/${id}`);

export const requisicaoRespostaFormularioIdUsuario = (id_usuario) =>
  api.get(`/formularios_pacientes_usuario/${id_usuario}`);

export const requisicaoRespostaReceitaIdUsuario = (id_usuario) =>
  api.get(`/receitas_usuario/${id_usuario}`);

export const criarFormulario = (estado) => api.post('/formularios', estado);

export const requisicaoRespostaFormulario = (id) =>
  api.get(`/formularios_pacientes/${id}`);

export const requisicaoFormularioPacientes = (id_formulario) =>
  api.get(`/formularios_pacientes_formularios/${id_formulario}`);

export const requisicaoReceitas = () => api.get(`/receitas/`);

export const criarReceita = (id_usuario, nomePaciente, dataNascimento, tituloReceita, descricao) => 
  api.post(`/receitas`, {
    id_usuario: id_usuario,
    nome: nomePaciente,
    data: dataNascimento,
    titulo: tituloReceita,
    descricao: descricao,
  });
export const criarReceitaComArquivo = (
  id_usuario,
  tituloReceita,
  descricao,
  base64
) =>
  api.post(`/receitasarquivo`, {
    id_usuario: id_usuario,
    titulo: tituloReceita,
    descricao: descricao,
    file:base64,
  });

export const deletarReceita = (id) => api.delete(`/receitas/${id}`);

export const editarPerguntasFormulario = (id, perguntas) =>
  api.put(`/formularios/${id}`, { perguntas: perguntas });

export const editarCamposFormulario = (id, campos) =>
  api.put(`/formularios/${id}`, campos);

  export const requisicaoTodosFormulariosPaciente = () =>
  api.get('/formularios_pacientes');

export const updateFotoDePerfil = (id, base64) =>
  api.post(`/usuariosimagem/${id}`,{
    file: base64
  });
export const enviarFormularioPaciente = (
  status,
  notificacao_ativa,
  id_formulario,
  id_usuario
) => 
   api.post("/formularios_pacientes", {
    status,
  notificacao_ativa,
  id_formulario,
  id_usuario,
   });


export const deleteFotoDePerfil = (id, base64) =>
  api.put(`/usuariosdeletarimagem/${id}`, {
    file: base64,
  });

  
export const requisicaoArquivo = (chave) => api.get(`/arquivo/${chave}`);

export const criarConversa = (conversa) => api.post(`/conversas`, conversa);

export const enviarMensagemDeConfirmarPagamento = (id_usuario) =>
  api.post(`/conversas_whatsapp/${id_usuario}`);

export const requisicaoConversasPorUsuario = (id_usuario) =>
  api.get(`/conversas/${id_usuario}/usuario`);

export const updateConversaAtiva = (id) => api.put(`/conversas/ativacao/${id}`);
export const updateConversaFinalizada = (id) =>
  api.put(`/conversas/finalizacao/${id}`);
export const deletarConversasInativas = (id_usuario) =>
  api.delete(`/conversas/${id_usuario}/usuario`);

export const criarMensagem = (mensagem) => api.post(`/mensagems`, mensagem);

export const criarMensagemComArquivo = (mensagem) => api.post(`/mensagemsfile`, mensagem);

export const requisicaoMensagensPorConversaUsuario = (
  id_usuario,
  id_conversa
) => api.get(`/mensagems/${id_conversa}/conversa/${id_usuario}`);

export const updateMensagemVisualizada = (id, atualizacoes) =>
  api.put(`/mensagems/${id}`, atualizacoes);

export const updateMensagensVisualizadas = (id_usuario, id_conversa) =>
  api.put(`/mensagems/${id_conversa}/visualizadas/${id_usuario}`);

export const dispostivoById = (id) => api.get(`/dispositivos/${id}`);

export const enviarArquivoMensagem = (base64) =>
  api.post(`/arquivofile/`,{
    file: base64
  });

export const requisicaoHomes = () =>
  api.get(`/homes`);

export const TokenById = (id_usuario) => api.get(`/token_usuarios/${id_usuario}`);

export const getTokenDispositivo = (token_dispositivo) =>
  api.get("/token_usuarios", {
    token_dispositivo,
  });

export const requisicaoSobreMimDados = () =>
  api.get('/sobremims');

export const criarSobreMim = (dados) => 
  api.post(`/sobremims`, dados, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });

export const atualizarSobreMim = (id, dados) => 
  api.put(`/sobremims/${id}`, dados, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });

export const deletarSobreMim = (id) => api.delete(`/sobre_mims/${id}`);

export const enviarMensagemComunicadoUrgencia = (id_usuario) =>
  api.post(`/conversas_whatsapp/comunicado_urgencia`, {
    id_usuario
  });

export const enviarMensagemExameMarcado = (id_usuario) =>
  api.post(`/conversas_whatsapp/exame_marcado`, {
    id_usuario
  });

export const enviarMensagemConfirmarPagamento = (id_usuario) =>
  api.post(`/conversas_whatsapp/confirmar_pagamento`, {
    id_usuario
  });

export const updateDadosHomes = (id, titulo_um, texto_um, titulo_dois, texto_dois, titulo_tres, texto_tres, titulo_quatro, texto_quatro, video) =>
  api.put(`/homes/${id}`, { titulo_um, texto_um, titulo_dois, texto_dois, titulo_tres, texto_tres, titulo_quatro, texto_quatro, video });
;

export const requisicaoCarrossel = () =>
  api.get(`/imagem_carrossels/`);

export const updateImagemCarrossel = (id, base64) =>
  api.put(`/imagem_carrossels_img/${id}`, {
    file: base64
  });

  export const updateImagemHomes = (id, base64) =>
  api.put(`/homesImagem/${id}`, {
    file: base64
  } );
