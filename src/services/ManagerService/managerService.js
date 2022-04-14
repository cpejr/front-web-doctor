import { login } from "../../services/auth";
import requisicaoErro from "../../utils/HttpErros";
import * as requesterService from "../RequesterService/requesterService";

export const requisicaoLogin = async (email, senha) => {
    if (email.lenght === 0 || senha.lenght === 0) {
        alert("Preencha os campos email e senha!");
    } else {
        try {
            const resposta = await requesterService.logarUsuario(email,senha)
            alert("Bem vindo");
            login(resposta.data.token, resposta.data.email);
            window.location.href = "/";
        } catch (error) {
            requisicaoErro(error, () => window.location.href = "/login");
        }
    }
    return 
}

export const Cadastrando = async (estado, endereco) => {
        await requesterService.criarUsuario(endereco, estado)
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
    
    await requesterService.requisicaoDadosUsuario(emailUrl)
    .then((res) => {
        dadosUsuario = res.data        
      })
    .catch((error) => {
        requisicaoErro(error);
    })

    await requesterService.requisicaoDadosEndereco(dadosUsuario)
    .then((res) => {
       dadosEndereco = res.data
    })
    .catch((error) => {
        requisicaoErro(error);
    })
    return {dadosEndereco, dadosUsuario};
}

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