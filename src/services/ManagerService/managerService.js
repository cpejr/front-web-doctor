import { login } from "../../services/auth";
import requisicaoErro from "../../utils/HttpErros";
import * as requesterService from "../RequesterService/requesterService";

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

export const Cadastrando = async (estado, endereco) => {
  await requesterService
    .criarUsuario(endereco, estado)
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
  //comparar a senha do Email  com a senha digitada
  //se as senhas forem iguais retornar true
  //se as senhas nao forem iguais retornar false
  try {
    await requesterService.requisicaoVerificar(
      email,
      senhaAtual
    );
    return false;
  } catch (error) {
    requisicaoErro(error, () => (window.location.href = "/web/alterarsenha"));
  }
};

export const AlterarSenha = async (novaSenha, email) => {
  //passar a "novaSenha" como senha do usuário que possui esse "email"
};
