import { login } from '../../services/auth';
import requisicaoErro from '../../utils/HttpErros';
import * as requesterService from '../RequesterService/requesterService';
import { toast } from 'react-toastify';

const tipoUsuarioLogado = sessionStorage.getItem('@doctorapp-Tipo');

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const EnviandoImagem = async (file) => {
  let data = {};
  await requesterService
    .EnviandoImagem(file)
    .then((res) => {
      data = res.data
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });

  return data;
};

export const EnviandoArquivo = async (file) => {
  let data = {};
  await requesterService
    .EnviandoArquivo(file)
    .then((res) => {
      data = res.data
      return data;
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });

  return;
};

export const requisicaoLogin = async (email, senha) => {
  try {
    const resposta = await requesterService.logarUsuario(email, senha);
    if (resposta.data.tipo === 'PACIENTE') {
      toast.error('Paciente deve fazer login exclusivamente pelo App');
    } else {
      login(resposta.data.token, resposta.data.email, resposta.data.tipo);
      sessionStorage.setItem('@doctorapp-Token', resposta.data.token);
      const ehMedico = resposta.data.tipo === 'MASTER';
      toast.success('Login realizado com sucesso!');
      await sleep(1500);
      window.location.href = ehMedico ? '/web/home' : '/web/listadeusuarios';
    }
  } catch (error) { }

  return;
};

export const Cadastrando = async (
  usuario,
  endereco,
  callbackError = () => { }
) => {
  const resposta = await requesterService.requisicaoDadosUsuario(usuario.email);

  if (resposta.status !== 204) {
    sleep(1500);
    toast.error('E-mail já cadastrado');

    callbackError(tipoUsuarioLogado);

    return false;
  }

  const dados = await requesterService
    .criarUsuario(endereco, usuario)
    .then((res) => {
      toast.success('Usuário cadastrado com sucesso.');
      return res;
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/cadastro'));
      return false;
    });
  return dados;
};

export const EnviandoEmail = async (email) => {
  const resposta = await requesterService.requisicaoDadosUsuario(email);
  if (resposta.status === 204) {
    sleep(1500);
    toast.error('E-mail inexistente!');
    return;
  }

  await requesterService
    .recuperarSenha(email)
    .then(() => {
      toast.success('Verifique a sua caixa de entrada para alterar sua senha.');
    })
    .catch((error) => {
      sleep(1500);
      requisicaoErro(error);
      return false;
    });
  return false;
};

export const CriandoConsulta = async (consulta) => {
  await requesterService
    .criarConsulta(consulta)
    .then(() => {
      toast.success('Consulta criada com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
  return;
};

export const CriandoExame = async (exame) => {
  await requesterService
    .criarExame(exame)
    .then(() => {
      toast.success('Exame criado com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
  return;
};

export const UpdateConsulta = async (id_consulta, consulta) => {
  await requesterService
    .updateConsulta(id_consulta, consulta)
    .then(() => {
      toast.success('Consulta atualizada com sucesso!');
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
  return;
};
export const UpdateExame = async (id_exame, exame) => {
  await requesterService
    .updateExameMarcado(id_exame, exame)
    .then(() => {
      toast.success("Exame atualizado com sucesso!");
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
  return;
};

export const UpdateNotificacaoAtivaFormulario = async (
  id,
  notificacao_ativa
) => {
  await requesterService
    .updateNotificacaoAtivaFormularioPaciente(id, notificacao_ativa)
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
  return;
};

export const GetConsultaPorId = async (id) => {
  let dadosConsulta = {};

  await requesterService
    .requisicaoConsultaUsuario(id)

    .then((res) => {
      dadosConsulta = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosConsulta;
};

export const GetReceitasPorUsuarioId = async (id_usuario) => {
  try {
    const res = await requesterService.requisicaoReceitasPorUsuarioId(
      id_usuario
    );
    return res.data;
  } catch (err) {
    requisicaoErro(err);
  }
};

export const GetDadosPessoais = async () => {
  let dadosUsuario = {};
  await requesterService
    .requisicaoDadosPessoais()
    .then((res) => {
      dadosUsuario = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosUsuario;
};

export const GetDadosPessoaisAlfabetico = async () => {
  let dadosUsuario = {};
  await requesterService
    .requisicaoDadosPessoais()
    .then((res) => {
      dadosUsuario = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  dadosUsuario.sort(function (a, b) {
    var nomeA = a.nome.toLowerCase(), nomeB = b.nome.toLowerCase();
    if (nomeA < nomeB)
      return -1;
    if (nomeA > nomeB)
      return 1;
    return 0;
  });
  return dadosUsuario;
};

export const GetDadosConsultasExamesMarcados = async (id_usuario) => {
  let dadosConsultas = {};
  let dadosExamesMarcados = {};

  await requesterService
    .requisicaoConsultaUsuario(id_usuario)
    .then((res) => {
      dadosConsultas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  await requesterService
    .requisicaoExamesMarcadosUsuario(id_usuario)
    .then((res) => {
      dadosExamesMarcados = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  return { dadosConsultas, dadosExamesMarcados };
};

export const GetDadosExame = async (id) => {
  let dadosExame = {};

  await requesterService
    .requisicaoExame(id)

    .then((res) => {
      dadosExame = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosExame;
};

export const GetDadosUsuario = async (emailUrl) => {
  let dadosUsuario = {};
  let dadosEndereco = {};

  await requesterService
    .requisicaoDadosUsuario(emailUrl)
    .then((res) => {
      dadosUsuario = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  await requesterService
    .requisicaoDadosEndereco(dadosUsuario)
    .then((res) => {
      dadosEndereco = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return { dadosEndereco, dadosUsuario };
};

export const GetDadosUsuarioPorToken = async (token_usuario) => {
  let dadosUsuario = {};

  await requesterService
    .requisicaoDadosUsuarioPorToken(token_usuario)
    .then((res) => {
      dadosUsuario = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  return { dadosUsuario };
};

export const GetDadosConsultorios = async (filtro) => {
  let dadosConsultorios = {};
  let dadosEndereco = {};

  await requesterService
    .requisicaoDadosConsultorios(filtro)
    .then((res) => {
      dadosConsultorios = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  await requesterService
    .requisicaoDadosEndereco(dadosConsultorios)
    .then((res) => {
      dadosEndereco = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return { dadosEndereco, dadosConsultorios };
};

export const GetDadosExames = async () => {
  let dadosExames = {};

  await requesterService
    .requisicaoDadosExames()
    .then((res) => {
      dadosExames = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  return dadosExames;
};


export const GetConsultorioPorId = async (id) => {
  let dadosConsultorio = {};

  await requesterService
    .requisicaoDadosConsultoriosPorId(id)

    .then((res) => {
      dadosConsultorio = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosConsultorio;
};

export const ConferirSenha = async (email, senhaAtual) => {
  try {
    await requesterService.requisicaoVerificar(email, senhaAtual);
    await sleep(1500);
    return false;
  } catch (error) {
    toast.error('Senha incorreta!');
    return true;
  }
};

export const AlterarSenha = async (novaSenha, id) => {
  await requesterService
    .alterarSenha(id, novaSenha)
    .then(() => {
      toast.success('Senha alterada com sucesso!');
      setTimeout(() => {
        window.location.href = '/wb/perfil';
      }, 2000);
    })
    .catch(() => {
      toast.error(
        'Erro ao alterar senha. Reenvie o e-mail de recuperação e entre no link mais atual para alterá-la com sucesso'
      );
      setTimeout(() => {
        window.location.href = '/alterarsenha_requisicao';
      }, 5200);
    });
  return;
};

export const UpdateDadosUsuario = async (
  id_usuario,
  id_endereco,
  endereco,
  estado
) => {
  await requesterService
    .updateDadosUsuario(id_usuario, id_endereco, endereco, estado)
    .then(() => {
      toast.success('Dados alterados com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/web/editarperfil'));
      return false;
    });

  return false;
};

export const UpdateCodigo = async (id_usuario, codigo) => {
  await requesterService
    .updateCodigo(id_usuario, codigo)
    .then(() => {
      toast.success('Código atualizado com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/web/editarperfil'));
      return false;
    });

  return false;
};

export const DeleteComentario = async (id) => {
  await requesterService
    .DeleteComentario(id)
    .then(() => {
      toast.success('Comentário deletado com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/web/edicaocomentario'));
      return false;
    });

  return false;
};

export const UpdateComentario = async (id, comentario) => {
  await requesterService
    .UpdateComentario(id, comentario)
    .then(() => {
      toast.success('Comentário atualizado com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/web/edicaocomentario'));
      return false;
    });

  return false;
};

export const CriandoComentario = async (comentario) => {
  await requesterService
    .CriandoComentario(comentario)
    .then(() => {
      toast.success('Comentário criado com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/web/edicaocomentario'));
      return false;
    });

  return;
};

export const InicializandoPDF = async (data) => {
  let pdfIncializado = {}

  await requesterService
    .inicializarPDF(data)
    .then((res) => {
      toast.success('Assinatura iniciada  com sucesso.');
      pdfIncializado = res.data;
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/web/areareceitas'));
      return false;
    });
  console.log(pdfIncializado);
  return pdfIncializado;
};
export const FinalizandoPDF = async (extensiondata) => {
  let pdfFinalizado = {}
  await requesterService
    .finalizarPDF(extensiondata)
    .then((res) => {
      toast.success('Assinatura finalizada com sucesso.');
      pdfFinalizado = res.data;
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/web/areareceitas'));
      return false;
    });

  return pdfFinalizado;
};





export const GetComentario = async () => {
  let dadosComentario = [];

  await requesterService
    .requisicaoComentario()

    .then((res) => {
      dadosComentario = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosComentario;
};

export const DeletarEnderecoEUsuario = async (id_endereco) => {
  await requesterService
    .deletarEnderecoEUsuario(id_endereco)
    .then(() => {
      toast.success('Usuário deletado com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(
        error,
        () => (window.location.href = '/web/perfildopaciente')
      );

      return false;
    });
};

export const GetDadosConsultasExamesMarcadosGeral = async () => {
  let dadosConsultas = {};
  let dadosExamesMarcados = {};

  await requesterService
    .requisicaoConsultas()
    .then((res) => {
      dadosConsultas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  await requesterService
    .requisicaoExamesMarcados()
    .then((res) => {
      dadosExamesMarcados = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  return { dadosConsultas, dadosExamesMarcados };
};

export const DeletarConsulta = async (id) => {
  await requesterService
    .deletarConsulta(id)
    .then(() => {
      toast.success('Consulta deletada com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(
        error,
        () => (window.location.href = '/web/perfildopaciente')
      );

      return false;
    });

  return false;
};

export const DeletarExameMarcado = async (id) => {
  await requesterService
    .deletarExameMarcado(id)
    .then(() => {
      toast.success('Exame deletado com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(
        error,
        () => (window.location.href = '/web/perfildopaciente')
      );

      return false;
    });

  return false;
};

export const EnviandoFormularioPaciente = async (
  status,
  notificacao_ativa,
  id_formulario,
  id_usuario,
  mostrarToast = true
) => {
  await requesterService
    .enviarFormularioPaciente(
      status,
      notificacao_ativa,
      id_formulario,
      id_usuario
    )
    .then(() => {
      if (mostrarToast) {
        toast.success('Formulario enviado com sucesso!');
      }
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
  return;
};
export const GetFormularios = async () => {
  let dadosFormularios = {};
  await requesterService
    .requisicaoFormularios()
    .then((res) => {
      dadosFormularios = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosFormularios;
};

export const GetFormularioEspecifico = async (id) => {
  let dadosFormulario = {};

  await requesterService
    .requisicaoFormularioEspecifico(id)

    .then((res) => {
      dadosFormulario = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosFormulario;
};

export const DeletarFormulario = async (id) => {
  await requesterService
    .deletarFormulario(id)
    .then(() => {
      toast.success('Formulario deletado com sucesso.');
    })
    .catch((error) => {
      requisicaoErro();

      return false;
    });

  return false;
};

export const GetRespostaFormularioIdUsuario = async (id_usuario) => {
  let dadosResposta = {};

  await requesterService
    .requisicaoRespostaFormularioIdUsuario(id_usuario)

    .then((res) => {
      dadosResposta = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosResposta;
};

export const GetRespostaReceitasIdUsuario = async (id_usuario) => {
  let dadosResposta = {};

  await requesterService
    .requisicaoRespostaReceitaIdUsuario(id_usuario)

    .then((res) => {
      dadosResposta = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosResposta;
};

export const confirmarPagamentoExame = async (id_paciente, id_usuario) => {
  const formulariosPaciente = await GetRespostaFormularioIdUsuario(id_paciente);
  let possuiFormulario = false;
  let posicao = -1;

  for (const [index, value] of formulariosPaciente.entries()) {
    if (value.tipo === "exame_actigrafia") {
      possuiFormulario = true;
      posicao = index;
    }
  }

  if (!possuiFormulario)
    toast.error("O paciente não possui um formulário desse exame");
  else if (possuiFormulario && formulariosPaciente[posicao].respostas === null) {
    toast.error("O paciente não respondeu as perguntas do formulário");
  }
  else {
    await MandandoMensagemConfirmarPagamento(id_usuario);
  }
}

export const GetResposta = async (id) => {
  let dadosResposta = {};

  await requesterService
    .requisicaoRespostaFormulario(id)

    .then((res) => {
      dadosResposta = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosResposta;
};
export const GetIndicacaoEspecifica = async () => {
  let dadosIndicacaoEspecifica = {};

  await requesterService
    .requisicaoIndicacaoEspecifica()

    .then((res) => {
      dadosIndicacaoEspecifica = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosIndicacaoEspecifica;
};
export const GetMedicosIndicadosPorID = async (id_indicacao_especifica) => {
  let dadosMedicosIndicadosID = {};

  await requesterService
    .requisicaoMedicosIndicados(id_indicacao_especifica)

    .then((res) => {
      dadosMedicosIndicadosID = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosMedicosIndicadosID;
};

export const IndicandoMedicos = async (
  id_indicacao_especifica,
  nome,
  telefone,
  local_atendimento,
  usarToast = {
    mensagemSucesso: 'Operação bem sucedida',
    tempo: 1500,
    onClose: () => { },
  }
) => {
  return requesterService
    .indicarMedico(
      id_indicacao_especifica,
      nome,
      telefone,
      local_atendimento,
    )
    .then(() => {
      if (usarToast) {
        toast.success(usarToast.mensagemSucesso, {
          autoClose: usarToast.tempo,
          onClose: usarToast.onClose,
        });
      }
      return true;
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
};
export const EditarMedicoIndicado = async (id, estado) => {
  await requesterService
    .alterarMedicoIndicado(id, estado)
    .then(() => {
      toast.success('Indicação atualizada com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });

  return;
};
export const DeletarIndicao = async (id) => {
  await requesterService
    .deletarMedicoIndicado(id)
    .then(() => {
      toast.success('Indicação deletada com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(
        error,
        () => (window.location.href = '/web/edicaoindicacoesesugestoes')
      );

      return false;
    });

  return false;
};
export const GetFormularioPacientesPorFormulario = async (id_formulario) => {
  let dadosResposta = {};

  await requesterService
    .requisicaoFormularioPacientes(id_formulario)

    .then((res) => {
      dadosResposta = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosResposta;
};

export const GetTodosFormulariosPacientes = async () => {
  let dadosResposta = {};

  await requesterService
    .requisicaoTodosFormulariosPaciente()

    .then((res) => {
      dadosResposta = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosResposta;
};

export const CriarFormulario = async (estado) => {
  await requesterService
    .criarFormulario(estado)
    .then(() => {
      toast.success('Formulário criado com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
  return false;
};

export const GetReceitas = async () => {
  let dadosReceitas = {};
  await requesterService
    .requisicaoReceitas()
    .then((res) => {
      dadosReceitas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosReceitas;
};

export const CriandoReceita = async (
  id_usuario,
  nomePaciente,
  dataNascimento,
  tituloReceita,
  descricao,
  usarToast = {
    mensagemSucesso: 'Operação bem sucedida',
    tempo: 1500,
    onClose: () => { },
  }
) => {
  return requesterService

    .criarReceita(
      id_usuario,
      nomePaciente,
      dataNascimento,
      tituloReceita,
      descricao
    )
    .then(() => {
      if (usarToast) {
        toast.success(usarToast.mensagemSucesso, {
          autoClose: usarToast.tempo,
          onClose: usarToast.onClose,
        });
      }
      return true;
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
};

export const CriandoReceitaComArquivo = async (
  id_usuario,
  tituloReceita,
  descricao,
  base64,
  usarToast = {
    mensagemSucesso: 'Operação bem sucedida',
    tempo: 1500,
    onClose: () => { },
  }
) => {
  return requesterService.criarReceitaComArquivo(
    id_usuario,
    tituloReceita,
    descricao,
    base64,
  )
    .then(() => {
      if (usarToast) {
        toast.success(usarToast.mensagemSucesso, {
          autoClose: usarToast.tempo,
          onClose: usarToast.onClose,
        });
      }
      return true;
    })
    .catch((error) => {
      requisicaoErro(error);
      return false;
    });
};

export const EditarPerguntasFormulario = async (id, perguntas) => {
  await requesterService
    .editarPerguntasFormulario(id, perguntas)
    .then(() => {
      sleep(1500);
      toast.success('Ação realizada com sucesso.');
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/'));
      return false;
    });

  return false;
};

export const EditarFormularios = async (id, campos) => {
  await requesterService
    .editarCamposFormulario(id, campos)
    .then(() => {
      toast.success('Formulario atualizado com sucesso.');
    })
    .catch((error) => {
      return false;
    });

  return false;
};

export const DeletarReceita = async (id) => {
  await requesterService
    .deletarReceita(id)
    .then(() => {
      toast.success('Receita deletada com sucesso.');
      window.location.href = '/web/areareceitas';
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/web/areareceitas'));

      return false;
    });

  return false;
};

export const GetArquivoPorChave = async (chave) => {
  let arquivo = '';
  await requesterService
    .requisicaoArquivo(chave)

    .then((res) => {
      arquivo = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return arquivo;

};

export const CriandoConversa = async (
  conversa,
) => {
  let dadosConversaCriada = {};
  await requesterService
    .criarConversa(conversa)
    .then((res) => {
      return (dadosConversaCriada = res.data);
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosConversaCriada;
};

export const MandandoMensagemConfirmarPagamento = async (id_usuario) => {
  await requesterService
    .enviarMensagemDeConfirmarPagamento(id_usuario)
    .then(() => {
      toast.success("Pagamento solicitado com sucesso!")
    })
    .catch((error) => {
      requisicaoErro(error);
    })
}


export const GetConversasUsuario = async (id_usuario) => {
  let dadosConversas = {};
  await requesterService
    .requisicaoConversasPorUsuario(id_usuario)
    .then((res) => {
      dadosConversas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosConversas;
};

export const UpdateConversaAtiva = async (id) => {
  let dadosConversa = {};
  await requesterService
    .updateConversaAtiva(id)
    .then((res) => {
      dadosConversa = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosConversa;
};

export const UpdateConversaFinalizada = async (id) => {
  let dadosConversa = {};
  await requesterService
    .updateConversaFinalizada(id)
    .then((res) => {
      toast.success("Conversa finalizada com sucesso!")
      dadosConversa = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosConversa;
};

export const deletarConversasInativas = async (id_usaurio) => {
  let conversasApagadas = {};
  await requesterService
    .deletarConversasInativas(id_usaurio)
    .then((res) => {
      conversasApagadas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return conversasApagadas;
};

export const deletarConversa = async (id) => {
  let conversaApagada = {};
  await requesterService
    .deletarConversa(id)
    .then((res) => {
      conversaApagada = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return conversaApagada;
};

export const CriandoMensagem = async (mensagem) => {
  let dadosMensagemCriada = {};
  await requesterService
    .criarMensagem(mensagem)
    .then((res) => {
      dadosMensagemCriada = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosMensagemCriada;
};

export const CriandoMensagemComArquivo = async (mensagem) => {
  let dadosMensagemCriada = {};
  await requesterService
    .criarMensagemComArquivo(mensagem)
    .then((res) => {
      dadosMensagemCriada = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosMensagemCriada;
};

export const GetMensagensPorConversaUsuario = async (
  id_usuario,
  id_conversa
) => {
  let dadosMensagens = {};
  await requesterService
    .requisicaoMensagensPorConversaUsuario(id_usuario, id_conversa)
    .then((res) => {
      dadosMensagens = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosMensagens;
};

export const UpdateMensagemVisualizada = async (id, atualizacoes) => {
  let mensagemAtualizada = {};
  await requesterService
    .updateMensagemVisualizada(id, atualizacoes)
    .then((res) => {
      mensagemAtualizada = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  return mensagemAtualizada;
};

export const UpdateMensagensVisualizadas = async (id_usuario, id_conversa) => {
  let mensagensAtualizadas = {};
  await requesterService
    .updateMensagensVisualizadas(id_usuario, id_conversa)
    .then((res) => {
      mensagensAtualizadas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  return mensagensAtualizadas;
};

export const UpdateFotoDePerfil = async (id, file) => {
  await requesterService
    .updateFotoDePerfil(id, file)
    .then(() => {
      toast.success('Foto atualizada com sucesso');
    })
    .catch((error) => {
      requisicaoErro(error);
      return;
    });
  return;
};

export const deletarFotoDePerfil = async (id, file) => {
  await requesterService
    .deleteFotoDePerfil(id, file)
    .then(() => {
      toast.success('Foto deletada com sucesso');
    })
    .catch((error) => {
      requisicaoErro(error);
      return;
    });
  return;
};

export const GetUsuarioPorId = async (id_usuario) => {
  try {
    const res = await requesterService.requisicaoUsuarioPorId(id_usuario);
    return res.data;
  } catch (err) {
    requisicaoErro(err);
  }
};

export const dispostivoById = async (id) => {
  let dispositivo = {};

  await requesterService
    .dispostivoById(id)
    .then((res) => {
      dispositivo = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dispositivo;
};

export const TokenById = async (id_usuario) => {
  let dispositivo = {};

  await requesterService
    .TokenById(id_usuario)
    .then((res) => {
      dispositivo = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dispositivo;
};

export const getTokenDispositivo = async (token_dispositivo) => {
  let token = {};

  await requesterService
    .getTokenDispositivo(token_dispositivo)
    .then((res) => {
      token = res.data
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return token;
};

export const GetImagensCarrossel = async () => {
  let dadosCarrossel = {};

  await requesterService
    .requisicaoCarrossel()

    .then((res) => {
      dadosCarrossel = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosCarrossel;
};

export const GetHomes = async () => {
  let dadosHomes = {};

  await requesterService
    .requisicaoHomes()

    .then((res) => {
      dadosHomes = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return dadosHomes[0];
};

export const enviarArquivoMensagem = async (file) => {

  console.log(file);
  let formData = new FormData();
  console.log(file.file.originFileObj);
  formData.append('file', file.file.originFileObj);

  console.log(formData.get('file'));
  let id;
  await requesterService
    .enviarArquivoMensagem(formData)
    .then((res) => {
      toast.success('Arquivo PDF enviado com sucesso');
      id = res.data;

    })
    .catch((error) => {
      requisicaoErro(error);
      return;
    });
  return id;
};

export const requisicaoSobreMimDados = async () => {
  let sobreMimDados = {};
  await requesterService
    .requisicaoSobreMimDados()
    .then((res) => {
      sobreMimDados = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  return sobreMimDados[0];
};

export const criarSobreMim = async (dados) => {
  let sobreMimDados = {}
  await requesterService
    .criarSobreMim(dados)
    .then((res) => {
      toast.success('Dados da página "Sobre mim" criados com sucesso!');
      sobreMimDados = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });
  return sobreMimDados;
};

export const atualizarSobreMim = async (id, titulo_um, texto_um, titulo_dois, texto_dois) => {
  await requesterService
    .atualizarSobreMim(id, titulo_um, texto_um, titulo_dois, texto_dois)
    .then(() => {
      toast.success('Dados da página "Sobre mim" atualizados com sucesso!');
    })
    .catch((error) => {
      requisicaoErro(error);
    });
};

export const deletarSobreMim = async (id) => {
  await requesterService
    .deletarSobreMim(id)
    .then(() => {
      toast.success('Dados da página "Sobre mim" deletados com sucesso!');
    })
    .catch((error) => {
      requisicaoErro(error);
    });
};


export const UpdateDadosHomes = async (
  id,
  titulo_um, 
  texto_um, 
  titulo_dois, 
  texto_dois, 
  titulo_tres, 
  texto_tres, 
  video
) => {
  await requesterService
    .updateDadosHomes(id, titulo_um, texto_um, titulo_dois, texto_dois, titulo_tres, texto_tres, video)
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = '/web/editarhome'));
      return false;
    });

  return false;
};

export const updateImagemCarrossel = async (id, file) => {
  try {
    const res = await requesterService
      .updateImagemCarrossel(id, file)
    return res;
  } catch (error) {
    requisicaoErro(error);
    return;
  };
};

export const updateImagemHomes = async (id, file) => {
  try {
    const res = await requesterService
      .updateImagemHomes(id, file)
    return res;

  } catch (error) {
    requisicaoErro(error);
    return;
  };

};
export const MandandoMensagemComunicadoUrgencia = async (id_usuario) => {
  await requesterService
    .enviarMensagemComunicadoUrgencia(id_usuario)
    .then(() => {
      toast.success("Exame finalizado com sucesso!")
    })
    .catch((error) => {
      requisicaoErro(error);
    })
}

export const MandandoMensagemExameMarcado = async (id_usuario) => {
  await requesterService
    .enviarMensagemExameMarcado(id_usuario)
    .then(() => {
      toast.success("Exame finalizado com sucesso!")
    })
    .catch((error) => {
      requisicaoErro(error);
    })
  }

export const updateImagemUmSobreMim = async (id, file) => {
    try {
      const res = await requesterService
        .updateImagemUmSobreMim(id, file)
      return res;
  
    } catch (error) {
      requisicaoErro(error);
      return;
    };
  
  };

  export const updateImagemDoisSobreMim = async (id, file) => {
    try {
      const res = await requesterService
        .updateImagemDoisSobreMim(id, file)
      return res;
  
    } catch (error) {
      requisicaoErro(error);
      return;
    };
  
  };