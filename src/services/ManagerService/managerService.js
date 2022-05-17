import { login } from "../../services/auth";
import requisicaoErro from "../../utils/HttpErros";
import * as requesterService from "../RequesterService/requesterService";
import AddToast from "../../components/AddToast/AddToast";
import { toast } from "react-toastify";

export const requisicaoLogin = async (email, senha) => {
  if (email.lenght === 0 || senha.lenght === 0) {
    alert("Preencha os campos email e senha!");
  } else {
    try {
      const resposta = await requesterService.logarUsuario(email, senha);
      alert("Bem vindo");
      login(resposta.data.token, resposta.data.email);
      window.location.href = "/";
    } catch (error) {
      requisicaoErro(error, () => (window.location.href = "/login"));
    }
  }
  return;
};

export const Cadastrando = async (usuario, endereco) => {
  await requesterService
    .criarUsuario(endereco, usuario)
    .then(() => {
      alert("Usuário cadastrado com sucesso.");
      window.location.href = "/login";
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = "/cadastro"));
      return false;
    });
  return false;
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
    .requisicaoConsultas(id_usuario)
    .then((res) => {
      dadosConsultas = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

    await requesterService
    .requisicaoExamesMarcados(id_usuario)
    .then((res) => {
      dadosExamesMarcados = res.data;
    })
    .catch((error) => {
      requisicaoErro(error);
    });

  return { dadosConsultas, dadosExamesMarcados};
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

export const ConferirSenha = async (email, senhaAtual) => {
  //comparar a senha do Email com a senha digitada
  //se as senhas forem iguais retornar true
  //se as senhas nao forem iguais retornar false
  try {
    await requesterService.requisicaoVerificar(email, senhaAtual);
    return false;
  } catch (error) {
    alert("Senha incorreta!");
    window.location.href = "/web/alterarsenha";
  }
};

export const AlterarSenha = async (novaSenha, id) => {
  //passar a "novaSenha" como senha do usuário que possui esse "email"
  await requesterService
    .alterarSenha(id, novaSenha)
    .then(() => {
      alert("Senha alterada com sucesso!");
      window.location.href = "/web/perfil";
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = "/web/alterarsenha"));
      return false;
    });
  return false;
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
      alert("Usuário atualizado com sucesso.");
      window.location.href = "/web/perfil";
    })
    .catch((error) => {
      requisicaoErro(error, () => (window.location.href = "/web/editarperfil"));
      return false;
    });

  return false;
};

export const DeletarUsuario = async (id) => {
  await requesterService
    .deletarUsuario(id)
    .then(() => {
      alert("Usuário deletado com sucesso.");
      window.location.href = "/web/listadeusuariosmedico";
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

export const GetDadosConsultasExamesMarcados = async () => {
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

  return { dadosConsultas, dadosExamesMarcados};
};


export const DeletarConsulta = async (id) => {
  await requesterService
    .deletarConsulta(id)
    .then(() => {
      alert("Consulta deletada com sucesso.");
      window.location.href = "/web/perfildopaciente";
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
      alert("Exame deletado com sucesso.");
      window.location.href = "/web/perfildopaciente";
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

