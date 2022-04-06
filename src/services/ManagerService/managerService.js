import { login } from "../../services/auth";
import requisicaoErro from "../../utils/HttpErros";
import { useHistory } from "react-router-dom";
import * as requesterService from "../RequesterService/requesterService"

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

export const requisicaoCadastro = async (estado, endereco) => {
    


    
    
    return
}