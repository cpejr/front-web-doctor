import { login } from "../../services/auth";
import requisicaoErro from "../../utils/HttpErros";
import * as requesterService from "../RequesterService/requesterService";
import { toast } from "react-toastify";
import { redirecionamento } from "../../utils/sleep";
import { recebeTipo } from "../../services/auth";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const requisicaoLogin = async (email, senha) => {
  try {
    const resposta = await requesterService.logarUsuario(email, senha);
    if (resposta.data.tipo === "PACIENTE") {
      toast.error("Paciente deve fazer login exclusivamente pelo App");
    } else {
      login(resposta.data.token, resposta.data.email, resposta.data.tipo);

      if (resposta.data.tipo === "MASTER") {
        toast.success("Login realizado com sucesso!");
        await sleep(1500);
        window.location.href = "/web/listadeusuarios";
      } else {
        toast.success("Login realizado com sucesso!");
        await sleep(1500);
        window.location.href = "/web/listadeusuarios";
      }
    }
  } catch (error) {}

  return;
};

export const Cadastrando = async (usuario, endereco) => {
  const resposta = await requesterService.requisicaoDadosUsuario(usuario.email);

  if (resposta.status != 204) {
    sleep(1500);
    toast.error("E-mail já cadastrado");
    return;
  }

  await requesterService
    .criarUsuario(endereco, usuario)
    .then(() => {
      toast.success("Usuário cadastrado com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = "/cadastro"));
      return false;
    });
  return false;
};

export const EnviandoEmail = async (email) => {
  const resposta = await requesterService.requisicaoDadosUsuario(email);
  if (resposta.status === 204) {
    sleep(1500);
    toast.error("E-mail inexistente!");
    return;
  }

  await requesterService
    .recuperarSenha(email)
    .then(() => {
      toast.success("Verifique a sua caixa de entrada para alterar sua senha.");
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
      toast.success("Consulta criada com sucesso.");
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
      toast.success("Consulta atualizada com sucesso!");
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

export const GetDadosConsultorios = async () => {
  let dadosConsultorios = {};
  let dadosEndereco = {};

  await requesterService
    .requisicaoDadosConsultorios()
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
    toast.error("Senha incorreta!");
    return true;
  }
};

export const AlterarSenha = async (novaSenha, id) => {
  await requesterService
    .alterarSenha(id, novaSenha)
    .then(() => {
      toast.success("Senha alterada com sucesso!");
      setTimeout(() => {
        window.location.href = "/wb/perfil";
      }, 2000);
    })
    .catch(() => {
      toast.error(
        "Erro ao alterar senha. Reenvie o e-mail de recuperação e entre no link mais atual para alterá-la com sucesso"
      );
      setTimeout(() => {
        window.location.href = "/alterarsenha_requisicao";
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
      toast.success("Dados alterados com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = "/web/editarperfil"));
      return false;
    });

  return false;
};

export const UpdateCodigo = async (id_usuario, codigo) => {
  await requesterService
    .updateCodigo(id_usuario, codigo)
    .then(() => {
      toast.success("Código atualizado com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = "/web/editarperfil"));
      return false;
    });

  return false;
};

export const DeletarEnderecoEUsuario = async (id_endereco) => {
  await requesterService
    .deletarEnderecoEUsuario(id_endereco)
    .then(() => {
      toast.success("Usuário deletado com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(
        error,
        () => (window.location.href = "/web/perfildopaciente")
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
      toast.success("Consulta deletada com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(
        error,
        () => (window.location.href = "/web/perfildopaciente")
      );

      return false;
    });

  return false;
};

export const DeletarExameMarcado = async (id) => {
  await requesterService
    .deletarExameMarcado(id)
    .then(() => {
      toast.success("Exame deletado com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(
        error,
        () => (window.location.href = "/web/perfildopaciente")
      );

      return false;
    });

  return false;
};

export const EnviandoFormularioPaciente = async (
  status,
  notificacao_ativa,
  id_formulario,
  id_usuario
) => {
  await requesterService
    .enviarFormularioPaciente(
      status,
      notificacao_ativa,
      id_formulario,
      id_usuario
    )
    .then(() => {
      toast.success("Formulario enviado com sucesso!");
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
      toast.success("Formulario deletado com sucesso.");
      window.location.href = "/web/listaformularios";
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
      toast.success("Formulário criado com sucesso.");
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

export const EditarPerguntasFormulario = async (id, perguntas) => {
  await requesterService
    .editarPerguntasFormulario(id, perguntas)
    .then(() => {
      sleep(1500);
      toast.success("Ação realizada com sucesso.");
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = "/"));
      return false;
    });

  return false;
};

export const EditarFormularios = async (id, campos) => {
  await requesterService
    .editarCamposFormulario(id, campos)
    .then(() => {
      toast.success("Formulario atualizado com sucesso.");
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
      toast.success("Receita deletada com sucesso.");
      window.location.href = "/web/areareceitas";
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = "/web/areareceitas"));

      return false;
    });

  return false;
};
